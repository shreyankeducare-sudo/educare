/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { urlFor } from "@/sanity/lib/image";

export function JsonLd({ schema }: { schema: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Dr. Shreyank Educare",
    url: "https://www.drshreyankeducare.com",
    logo: "https://www.drshreyankeducare.com/assets/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-672-514-7587",
      contactType: "customer service",
      email: "info@drshreyankeducare.com",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "2088 Madison Avenue",
      addressLocality: "Burnaby",
      addressRegion: "BC",
      postalCode: "V5C 6T5",
      addressCountry: "CA",
    },
    sameAs: [
      "https://www.facebook.com/DrShreyankEducare/",
      "https://www.instagram.com/drshreyankeducare/",
    ],
  };
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Dr. Shreyank Educare",
    image: "https://www.drshreyankeducare.com/assets/logo.png",
    "@id": "",
    url: "https://www.drshreyankeducare.com/",
    telephone: "+1 (672) 514-7587",
    priceRange: "-",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2088 Madison Avenue",
      addressLocality: "Burnaby",
      addressRegion: "BC",
      postalCode: "V5C 6T5",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 49.26607809999999,
      longitude: -123.0083239,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "08:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "09:00",
        closes: "05:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/DrShreyankEducare/",
      "https://www.instagram.com/drshreyankeducare/",
    ],
  };
}

export function getBlogMainPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.drshreyankeducare.com/blog",
    },
    headline: "Explore expert study tips, academic guides and insights from Dr. Shreyank Educare.",
    image: "https://www.drshreyankeducare.com/_next/image?url=%2Fassets%2FservicesPage%2FServicesHeroImg.webp&w=750&q=75",
    author: {
      "@type": "Organization",
      name: "Dr. Shreyank Educare",
      url: "https://www.drshreyankeducare.com/",
    },
    publisher: {
      "@type": "Organization",
      name: "Organisation",
      logo: {
        "@type": "ImageObject",
        url: "https://www.drshreyankeducare.com/assets/logo.png",
      },
    },
    datePublished: "",
  };
}

export function getFaqSchema(faqs: any[]) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getPageSchema(data: any, currentUrl: string) {
  const seo = data?.metaData;
  const title = seo?.metaTitle || data?.title || "Dr. Shreyank Educare";
  const description = seo?.metaDescription || "Expert academic tutoring, coding classes, and test preparation to help students excel in their educational journey.";
  const type = data?._type === "programPage" ? "Course" : "WebPage";

  let normalizedUrl = currentUrl;
  if (normalizedUrl.startsWith("https://drshreyankeducare.com")) {
    normalizedUrl = normalizedUrl.replace("https://drshreyankeducare.com", "https://www.drshreyankeducare.com");
  }

  const schema: any = {
    "@context": "https://schema.org",
    "@type": type,
    name: title,
    description: description,
    url: normalizedUrl,
    publisher: {
      "@type": "EducationalOrganization",
      name: "Dr. Shreyank Educare",
    },
  };

  if (type === "Course") {
    schema.provider = {
      "@type": "EducationalOrganization",
      name: "Dr. Shreyank Educare",
    };
    schema.courseMode = "Online, Offline";
    schema.hasCourseInstance = {
      "@type": "CourseInstance",
      courseMode: "Mixed",
    };
  }

  return schema;
}

export function getBlogPostSchema(post: any, currentUrl: string): Record<string, any> {
  if (!post) return {};

  const seo = post?.metaData;
  const title = seo?.metaTitle || post?.title || "Blog Post";
  const description = seo?.metaDescription || post?.excerpt || "Expert academic tutoring, coding classes, and test preparation.";

  let imageUrl = "https://www.drshreyankeducare.com/assets/logo.png";
  if (post?.mainImage) {
    try {
      imageUrl = urlFor(post.mainImage).url();
    } catch (e) {
      console.error("Error building image URL for post schema:", e);
    }
  }

  let normalizedUrl = currentUrl;
  if (normalizedUrl.startsWith("https://drshreyankeducare.com")) {
    normalizedUrl = normalizedUrl.replace("https://drshreyankeducare.com", "https://www.drshreyankeducare.com");
  }

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": normalizedUrl,
    },
    "headline": title,
    "description": description,
    "image": imageUrl,
    "author": {
      "@type": "Organization",
      "name": "Dr. Shreyank Educare",
      "url": "https://www.drshreyankeducare.com",
    },
    "publisher": {
      "@type": "EducationalOrganization",
      "name": "Dr. Shreyank Educare",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.drshreyankeducare.com/assets/logo.png",
      },
    },
    "datePublished": post.publishedAt || new Date().toISOString(),
    "dateModified": post._updatedAt || post.publishedAt || new Date().toISOString(),
  };
}
