import Zodiac from "./Home/Zodiac";
import SEO from "@/components/SEO";

export default function Zodiacs() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Zodiac Signs & Horoscope Guide",
    description:
      "Comprehensive guide to the 12 Zodiac signs. Discover personality traits, love compatibility, and career advice for every star sign.",
    url: "https://futureadvicebycharm.com/zodiacs",
    publisher: {
      "@type": "Organization",
      name: "Future Advice by Charm",
      logo: "https://futureadvicebycharm.com/logo.png",
    },
  };

  return (
    <>
      <SEO
        title="Zodiac Signs & Horoscopes"
        description="Unlock the secrets of your personality. Explore dates, traits, and love compatibility for all 12 Zodiac signs (Aries to Pisces). Expert astrological insights."
        keywords="zodiac signs, horoscope meanings, astrology compatibility, star signs, aries, taurus, gemini, cancer, leo, virgo, libra, scorpio, sagittarius, capricorn, aquarius, pisces, ရာသီခွင်, ဗေဒင်, နေ့နံ, နက္ခတ်ဗေဒင်"
        url="/zodiacs"
        structuredData={structuredData}
      />
      <div className="pt-24 pb-12 min-h-screen">
        <Zodiac />
      </div>
    </>
  );
}
