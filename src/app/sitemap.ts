import { getProjects } from "@/utils/utils";
import { baseURL, locales, localePath, routes as routesConfig } from "@/resources";

export default async function sitemap() {
  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route as keyof typeof routesConfig],
  );

  const today = new Date().toISOString().split("T")[0];

  // Every enabled route, in every locale.
  const pages = locales.flatMap((locale) =>
    activeRoutes.map((route) => ({
      url: `${baseURL}${localePath(locale, route)}`,
      lastModified: today,
    })),
  );

  // Project case studies, per locale — a locale with no translations yet
  // simply contributes nothing.
  const projects = locales.flatMap((locale) =>
    getProjects(locale).map((project) => ({
      url: `${baseURL}${localePath(locale, `/work/${project.slug}`)}`,
      lastModified: project.metadata.publishedAt,
    })),
  );

  return [...pages, ...projects];
}
