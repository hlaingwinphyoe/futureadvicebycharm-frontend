import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  structuredData,
}) => {
  // Base constants
  const siteName = "Future Advice by Charm";
  const baseUrl = "https://futureadvicebycharm.com";

  // 1. Optimized Defaults
  const defaultTitle = `${siteName} | Accurate Tarot Readings & Spiritual Guidance`;
  const defaultDescription =
    "Unlock clarity with Future Advice by Charm. We offer professional online tarot readings, astrology insights, and spiritual guidance for love, career, and personal growth.";

  // 2. Keywords
  const defaultKeywords = [
    "Future Advice by Charm",
    "Tarot by Char",
    "Charm Astrology",
    "online tarot reading",
    "love tarot reading",
    "career prediction",
    "spiritual guidance",
    "astrology chart reading",
    "zodiac compatibility",
    "တားရော့",
    "တားရော့ဖတ်ခြင်း",
    "ဗေဒင်",
    "နက္ခတ်ဗေဒင်",
    "အချစ်ရေး",
    "အွန်လိုင်းဗေဒင်",
    "Myanmar tarot reading",
  ].join(", ");

  const defaultImage = `${baseUrl}/website.png`;

  // Logic to merge props with defaults
  const finalTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const finalImage = image
    ? image.startsWith("http")
      ? image
      : `${baseUrl}${image}`
    : defaultImage;
  const finalUrl = url ? `${baseUrl}${url}` : baseUrl;

  // 3. Default Organization Schema (JSON-LD)
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: [
      "https://www.facebook.com/profile.php?id=61567142620648",
      "https://www.t.me/Tarot_by_Charm",
      "https://www.tiktok.com/@fabc153",
    ],
  };

  return (
    <Helmet>
      {/* Metadata */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <link rel="canonical" href={finalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@futureadvicebycharm" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />

      {/* Structured Data Injection */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || baseSchema)}
      </script>
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
  structuredData: PropTypes.object,
};

export default SEO;
