import { useEffect } from "react";

type StructuredData = Record<string, unknown>;

interface SEOOptions {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  ogType?: string;
  structuredData?: StructuredData | StructuredData[];
}

const ensureMeta = (key: string, attribute: "name" | "property") => {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null;
  const created = !element;

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  return { element, created };
};

const ensureCanonical = () => {
  let element = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  const created = !element;

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  return { element, created };
};

export const usePageSEO = ({
  title,
  description,
  canonical,
  image,
  ogType = "website",
  structuredData,
}: SEOOptions) => {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const previousTitle = document.title;
    document.title = title;

    const descriptionMeta = ensureMeta("description", "name");
    const previousDescription = descriptionMeta.element.getAttribute("content");
    descriptionMeta.element.setAttribute("content", description);

    const ogTitleMeta = ensureMeta("og:title", "property");
    const previousOgTitle = ogTitleMeta.element.getAttribute("content");
    ogTitleMeta.element.setAttribute("content", title);

    const ogDescriptionMeta = ensureMeta("og:description", "property");
    const previousOgDescription = ogDescriptionMeta.element.getAttribute("content");
    ogDescriptionMeta.element.setAttribute("content", description);

    const ogTypeMeta = ensureMeta("og:type", "property");
    const previousOgType = ogTypeMeta.element.getAttribute("content");
    ogTypeMeta.element.setAttribute("content", ogType);

    const twitterTitleMeta = ensureMeta("twitter:title", "name");
    const previousTwitterTitle = twitterTitleMeta.element.getAttribute("content");
    twitterTitleMeta.element.setAttribute("content", title);

    const twitterDescriptionMeta = ensureMeta("twitter:description", "name");
    const previousTwitterDescription = twitterDescriptionMeta.element.getAttribute("content");
    twitterDescriptionMeta.element.setAttribute("content", description);

    let previousOgImage: string | null = null;
    let previousTwitterImage: string | null = null;
    let ogImageMetaCreated = false;
    let twitterImageMetaCreated = false;

    if (image) {
      const ogImageMeta = ensureMeta("og:image", "property");
      previousOgImage = ogImageMeta.element.getAttribute("content");
      ogImageMeta.element.setAttribute("content", image);
      ogImageMetaCreated = ogImageMeta.created;

      const twitterImageMeta = ensureMeta("twitter:image", "name");
      previousTwitterImage = twitterImageMeta.element.getAttribute("content");
      twitterImageMeta.element.setAttribute("content", image);
      twitterImageMetaCreated = twitterImageMeta.created;
    }

    const canonicalLink = ensureCanonical();
    const previousCanonical = canonicalLink.element.getAttribute("href");
    if (canonical) {
      canonicalLink.element.setAttribute("href", canonical);
    }

    const structuredDataArray = structuredData
      ? Array.isArray(structuredData)
        ? structuredData
        : [structuredData]
      : [];

    const schemaScripts = structuredDataArray.map((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
      return script;
    });

    return () => {
      document.title = previousTitle;

      if (descriptionMeta.created) {
        descriptionMeta.element.remove();
      } else if (previousDescription !== null) {
        descriptionMeta.element.setAttribute("content", previousDescription);
      }

      if (ogTitleMeta.created) {
        ogTitleMeta.element.remove();
      } else if (previousOgTitle !== null) {
        ogTitleMeta.element.setAttribute("content", previousOgTitle);
      }

      if (ogDescriptionMeta.created) {
        ogDescriptionMeta.element.remove();
      } else if (previousOgDescription !== null) {
        ogDescriptionMeta.element.setAttribute("content", previousOgDescription);
      }

      if (ogTypeMeta.created) {
        ogTypeMeta.element.remove();
      } else if (previousOgType !== null) {
        ogTypeMeta.element.setAttribute("content", previousOgType);
      }

      if (twitterTitleMeta.created) {
        twitterTitleMeta.element.remove();
      } else if (previousTwitterTitle !== null) {
        twitterTitleMeta.element.setAttribute("content", previousTwitterTitle);
      }

      if (twitterDescriptionMeta.created) {
        twitterDescriptionMeta.element.remove();
      } else if (previousTwitterDescription !== null) {
        twitterDescriptionMeta.element.setAttribute("content", previousTwitterDescription);
      }

      if (image) {
        const ogImageMeta = ensureMeta("og:image", "property");
        const twitterImageMeta = ensureMeta("twitter:image", "name");

        if (ogImageMetaCreated) {
          ogImageMeta.element.remove();
        } else if (previousOgImage !== null) {
          ogImageMeta.element.setAttribute("content", previousOgImage);
        }

        if (twitterImageMetaCreated) {
          twitterImageMeta.element.remove();
        } else if (previousTwitterImage !== null) {
          twitterImageMeta.element.setAttribute("content", previousTwitterImage);
        }
      }

      if (canonical) {
        if (canonicalLink.created) {
          canonicalLink.element.remove();
        } else if (previousCanonical !== null) {
          canonicalLink.element.setAttribute("href", previousCanonical);
        }
      }

      schemaScripts.forEach((script) => {
        script.remove();
      });
    };
  }, [title, description, canonical, image, ogType, structuredData]);
};
