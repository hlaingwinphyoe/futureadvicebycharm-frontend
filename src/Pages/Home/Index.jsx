import { homeCard, mainAstro, doubleStars } from "@/assets";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import SEO from "../../components/SEO";

const fadeInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const Index = () => {
  // Enhanced Schema for the Home Page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService", // Specific for service-based businesses
    name: "Future Advice by Charm",
    alternateName: "Future Advice by Charm",
    description:
      "Professional tarot readings and astrology insights. We provide guidance on love, career, and future decisions.",
    url: "https://futureadvicebycharm.com",
    logo: "https://futureadvicebycharm.com/logo.png",
    image: "https://futureadvicebycharm.com/website.png",
    priceRange: "$$",
    areaServed: "Worldwide",
    address: {
      "@type": "PostalAddress",
      addressCountry: "MM", // Primary audience seems to be Myanmar based on language
    },
    sameAs: [
      "https://www.facebook.com/profile.php?id=61567142620648",
      "https://www.tiktok.com/@fabc153",
    ],
  };

  return (
    <>
      <SEO
        title="Home"
        description="Unlock your future with Future Advice by Charm. Expert tarot readings, astrology predictions, and spiritual guidance for love and career. Book online today."
        keywords="Future Advice by Charm, Tarot by Charm, online tarot reading, astrology predictions, spiritual guidance, love tarot, career advice, Myanmar tarot reading, တားရော့, ဗေဒင်, နက္ခတ်ဗေဒင်, အွန်လိုင်းဗေဒင်"
        url="/"
        structuredData={structuredData}
      />

      <div className="relative min-h-screen py-16">
        {/* Animated Background Stars */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(45)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ opacity: 0.2, scale: 0.5 }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <Star className="w-3 h-3 text-primary-300" />
            </motion.div>
          ))}
        </div>

        {/* Main Content Area */}
        <div
          className="relative mx-auto bg-no-repeat bg-center h-screen flex flex-col md:flex-row items-center justify-center main-bg-img"
          style={{ backgroundImage: `url(${mainAstro})` }}
        >
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            {/* First Card - Left Side */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              className="relative md:mr-28 xl:mr-60"
            >
              <div className="absolute -bottom-3.5 -right-3 w-[10rem] lg:w-[16rem] h-full xl:w-[18.5rem] border border-gray-400" />
              <div className="relative bg-transparent">
                <img
                  src={doubleStars}
                  className="absolute -top-10 md:-top-16 left-16 md:left-20 h-20 md:h-auto"
                  alt="Decorative stars"
                  loading="lazy"
                />
                <img
                  src={homeCard}
                  alt="Tarot Card Back Design"
                  className="w-48 h-[18rem] lg:w-72 lg:h-[25rem] xl:h-[30rem] xl:w-80 object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Center Text Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              className="md:max-w-md xl:max-w-lg px-6 text-center"
            >
              <div>
                <div className="space-y-3 mt-10 mx-auto max-w-2xl text-4xl lg:text-5xl font-bold xl:text-6xl">
                  <p>Mystic Visions</p>
                  <p className="italic text-3xl lg:text-4xl xl:text-5xl font-normal">
                    Guiding{" "}
                    <span className="text-4xl lg:text-5xl xl:text-6xl not-italic font-bold">
                      You
                    </span>{" "}
                    for
                  </p>
                  <p>Better Future</p>
                </div>
                <div className="mt-8 xl:mt-12 flex justify-center">
                  <Link to="/appointment" className="astro-primary-btn w-fit">
                    Make Appointment Now
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Second Card - Right Side */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              className="relative md:ml-28 xl:ml-60"
            >
              <div className="absolute -top-3.5 -left-3 w-[10rem] lg:w-[16rem] h-full xl:w-[18.5rem] border border-gray-300" />
              <div className="relative bg-transparent">
                <img
                  src={homeCard}
                  alt="Tarot Card Deck"
                  className="w-48 h-[18rem] lg:w-72 lg:h-[25rem] xl:h-[30rem] xl:w-80 object-cover"
                  loading="lazy"
                />
                <img
                  src={doubleStars}
                  className="absolute -bottom-10 md:-bottom-16 left-16 md:left-20 h-20 md:h-auto"
                  alt="Decorative stars"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
