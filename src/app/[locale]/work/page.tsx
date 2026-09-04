import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { notFound } from "next/navigation";
import { baseURL, getContent, isLocale, localePath } from "@/resources";
import { Projects } from "@/components/work/Projects";

type LocaleParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { work } = getContent(locale);

  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: localePath(locale, work.path),
  });
}

export default async function Work({ params }: LocaleParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { work, about, person } = getContent(locale);

  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={localePath(locale, work.path)}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${localePath(locale, about.path)}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {work.title}
      </Heading>
      <Projects locale={locale} />
    </Column>
  );
}
