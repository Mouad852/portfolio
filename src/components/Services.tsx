import { Column, Grid, Heading, Icon, Row, Text } from "@once-ui-system/core";

import { getContent, type Locale } from "@/resources";

/**
 * What a visitor can hire him for.
 *
 * The Work section proves what has been built; this says what is on offer, and
 * deliberately includes a smaller tier. Without it the site reads as
 * platform-scale only, and a visitor with a modest job assumes they are in the
 * wrong place — while writing the positioning down to the smallest job on offer
 * would cost the rate on everything else.
 */
export const Services = ({ locale }: { locale: Locale }) => {
  const { services } = getContent(locale);

  if (!services.display) return null;

  return (
    <Column fillWidth gap="32" paddingX="l" marginBottom="40">
      <Column fillWidth gap="8" horizontal="center" align="center">
        <Heading as="h2" variant="display-strong-xs" wrap="balance">
          {services.title}
        </Heading>
        <Text
          variant="body-default-l"
          onBackground="neutral-weak"
          wrap="balance"
          style={{ maxWidth: "44rem" }}
        >
          {services.description}
        </Text>
      </Column>

      <Grid fillWidth columns={2} s={{ columns: 1 }} gap="16">
        {services.items.map((item) => (
          <Column
            key={item.title}
            fillWidth
            gap="12"
            padding="24"
            radius="l"
            background="surface"
            border="neutral-alpha-weak"
          >
            <Row gap="12" vertical="center">
              <Icon name={item.icon} size="s" onBackground="brand-medium" />
              <Text variant="heading-strong-s">{item.title}</Text>
            </Row>
            <Text variant="body-default-m" onBackground="neutral-weak">
              {item.description}
            </Text>
          </Column>
        ))}
      </Grid>
    </Column>
  );
};
