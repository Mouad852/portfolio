import { Flex, Meta, Schema } from "@once-ui-system/core";
import GalleryView from "@/components/gallery/GalleryView";
import { notFound } from "next/navigation";
import { baseURL, getContent, isLocale, localePath } from "@/resources";

type LocaleParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { gallery } = getContent(locale);

  return Meta.generate({
    title: gallery.title,
    description: gallery.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(gallery.title)}`,
    path: localePath(locale, gallery.path),
  });
}

export default async function Gallery({ params }: LocaleParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { gallery, person } = getContent(locale);

  return (
    <Flex maxWidth="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={gallery.title}
        description={gallery.description}
        path={localePath(locale, gallery.path)}
        image={`/api/og/generate?title=${encodeURIComponent(gallery.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${localePath(locale, gallery.path)}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <GalleryView locale={locale} />
    </Flex>
  );
}
