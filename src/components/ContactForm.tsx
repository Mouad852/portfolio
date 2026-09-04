"use client";

import { useMemo, useRef, useState } from "react";

import {
  Button,
  Column,
  Feedback,
  Heading,
  Input,
  Row,
  SegmentedControl,
  Select,
  Text,
  Textarea,
} from "@once-ui-system/core";

import { getContent, type Locale } from "@/resources";

type FieldName = "name" | "detail" | "need" | "message";
type Errors = Partial<Record<FieldName, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[+()\d][\d\s()-]{5,}$/;

/**
 * Public by design. Web3Forms' free tier only accepts submissions from the
 * browser — a server-side POST answers 403 "Pro plan is required" — so the key
 * ships in the bundle. It is a form identifier, not a credential: it cannot
 * read past submissions or reach the account, and the worst it permits is spam
 * to this form, which their filtering and the honeypot below absorb.
 */
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export const ContactForm = ({ locale }: { locale: Locale }) => {
  const { contact } = getContent(locale);
  const { fields, validation } = contact;

  const [channel, setChannel] = useState(fields.channel.options[0].value);
  const [values, setValues] = useState({ name: "", detail: "", need: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const honeypot = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const activeChannel = useMemo(
    () =>
      fields.channel.options.find((option) => option.value === channel) ??
      fields.channel.options[0],
    [channel, fields.channel.options],
  );

  /** Validation is a courtesy to the visitor; the API route re-checks everything. */
  const validateField = (field: FieldName, value: string): string | undefined => {
    if (!value.trim()) return validation.required;

    if (field === "detail") {
      if (activeChannel.inputType === "email" && !EMAIL.test(value)) return validation.email;
      if (activeChannel.inputType === "tel" && !PHONE.test(value)) return validation.phone;
    }

    return undefined;
  };

  const setField = (field: FieldName, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    // Clear an existing error as soon as the visitor starts fixing it, but
    // never introduce one mid-keystroke.
    if (errors[field]) {
      setErrors((previous) => ({ ...previous, [field]: validateField(field, value) }));
    }
  };

  const blurField = (field: FieldName) => {
    setErrors((previous) => ({ ...previous, [field]: validateField(field, values[field]) }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const nextErrors: Errors = {};
    (Object.keys(values) as FieldName[]).forEach((field) => {
      const error = validateField(field, values[field]);
      if (error) nextErrors[field] = error;
    });

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // Honeypot: pretend it worked so a bot gets no signal to learn from.
    if (honeypot.current?.value) {
      setStatus("sent");
      return;
    }

    if (!ACCESS_KEY) {
      console.error("NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is not set; cannot send.");
      setStatus("failed");
      return;
    }

    setStatus("sending");

    const channelLabel =
      fields.channel.options.find((option) => option.value === channel)?.label ?? channel;
    const needLabel =
      fields.need.options.find((option) => option.value === values.need)?.label ?? values.need;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        // charset is explicit because French submissions carry accents, and a
        // provider guessing latin-1 would mangle them.
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Portfolio enquiry — ${values.name}`,
          from_name: "Portfolio contact form",
          // Only meaningful when they actually gave an address — someone who
          // chose WhatsApp has no email to reply to, and a bogus reply-to is
          // worse than none.
          ...(channel === "email" ? { replyto: values.detail } : {}),
          // Web3Forms' own honeypot convention: they drop the submission
          // server-side if this arrives non-empty.
          botcheck: "",
          Name: values.name,
          "Preferred channel": channelLabel,
          "Reach them at": values.detail,
          "Looking for": needLabel,
          Message: values.message,
        }),
      });

      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success) {
        throw new Error(result?.message ?? String(response.status));
      }

      setStatus("sent");
      // Move focus to the confirmation so screen readers land on it.
      requestAnimationFrame(() => successRef.current?.focus());
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setStatus("failed");
    }
  };

  if (status === "sent") {
    return (
      <Column
        ref={successRef}
        tabIndex={-1}
        fillWidth
        maxWidth="s"
        id={contact.id}
        style={{ scrollMarginTop: "6rem" }}
      >
        <Feedback
          variant="success"
          icon
          title={contact.success.title}
          description={contact.success.description}
          fillWidth
        />
      </Column>
    );
  }

  return (
    <Column
      fillWidth
      maxWidth="s"
      gap="24"
      id={contact.id}
      style={{ scrollMarginTop: "6rem" }}
      horizontal="center"
    >
      <Column fillWidth gap="8" horizontal="center" align="center">
        <Heading as="h2" variant="display-strong-xs">
          {contact.title}
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-weak" wrap="balance">
          {contact.description}
        </Text>
      </Column>

      {/* Native <form> so noValidate can suppress the browser's own bubbles —
          the inline messages below are the ones the visitor should see. */}
      <form onSubmit={handleSubmit} noValidate style={{ width: "100%" }}>
        <Column fillWidth gap="20">
          {status === "failed" && (
            <Feedback
              variant="danger"
              icon
              title={contact.error.title}
              description={contact.error.description}
              fillWidth
            />
          )}

          <Input
            id="contact-name"
            name="name"
            label={fields.name.label}
            placeholder={fields.name.placeholder}
            value={values.name}
            onChange={(event) => setField("name", event.target.value)}
            onBlur={() => blurField("name")}
            error={Boolean(errors.name)}
            errorMessage={errors.name}
            required
          />

          <Column fillWidth gap="8">
            <Text
              variant="label-default-s"
              onBackground="neutral-strong"
              as="span"
              id="channel-label"
            >
              {fields.channel.label}
            </Text>
            <SegmentedControl
              fillWidth
              aria-labelledby="channel-label"
              selected={channel}
              onToggle={(value) => {
                setChannel(value);
                // The detail field means something different now — drop any
                // error left over from the previous channel's rules.
                setErrors((previous) => ({ ...previous, detail: undefined }));
              }}
              buttons={fields.channel.options.map((option) => ({
                value: option.value,
                label: option.label,
                prefixIcon: option.icon,
              }))}
            />
          </Column>

          {/* One field, reshaped by the choice above, rather than one per channel. */}
          <Input
            id="contact-detail"
            name="detail"
            type={activeChannel.inputType}
            label={fields.detail.label}
            placeholder={activeChannel.placeholder}
            value={values.detail}
            onChange={(event) => setField("detail", event.target.value)}
            onBlur={() => blurField("detail")}
            error={Boolean(errors.detail)}
            errorMessage={errors.detail}
            required
          />

          <Select
            id="contact-need"
            name="need"
            label={fields.need.label}
            placeholder={fields.need.placeholder}
            value={values.need}
            options={fields.need.options.map((option) => ({
              value: option.value,
              label: option.label,
            }))}
            onSelect={(value) => {
              const next = typeof value === "string" ? value : (value?.value ?? "");
              setValues((previous) => ({ ...previous, need: next }));
              setErrors((previous) => ({ ...previous, need: undefined }));
            }}
            error={Boolean(errors.need)}
            errorMessage={errors.need}
          />

          <Textarea
            id="contact-message"
            name="message"
            lines={5}
            label={fields.message.label}
            placeholder={fields.message.placeholder}
            value={values.message}
            onChange={(event) => setField("message", event.target.value)}
            onBlur={() => blurField("message")}
            error={Boolean(errors.message)}
            errorMessage={errors.message}
            required
          />

          {/* Honeypot: off-screen, skipped by keyboard, hidden from assistive tech. */}
          <input
            ref={honeypot}
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
          />

          <Row fillWidth horizontal="center" paddingTop="8">
            <Button
              type="submit"
              size="m"
              variant="primary"
              disabled={status === "sending"}
              suffixIcon={status === "sending" ? undefined : "arrowRight"}
            >
              {status === "sending" ? contact.sending : contact.submit}
            </Button>
          </Row>

          {/* Announced to screen readers without stealing focus. */}
          <Text aria-live="polite" style={{ position: "absolute", left: "-9999px" }}>
            {status === "sending" ? contact.sending : ""}
          </Text>
        </Column>
      </form>
    </Column>
  );
};
