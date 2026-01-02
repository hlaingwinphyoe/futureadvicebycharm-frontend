import FetchError from "@/components/FetchError";
import PackageCard from "@/components/PackageCard";
import PageLoading from "@/components/PageLoading";
import SEO from "@/components/SEO";
import { fetchPackages, incrementPage } from "@/redux/reducers/PackagesSlice";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function PackageIndex() {
  const dispatch = useDispatch();
  const { packages, status, error, hasMore, loadingMore } = useSelector(
    (state) => state.packages
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPackages());
    }
  }, [status, dispatch]);

  const handleLoadMore = () => {
    dispatch(incrementPage());
    dispatch(fetchPackages());
  };

  // Structured Data for a List of Services
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Tarot & Astrology Packages",
    description:
      "Professional spiritual guidance packages ranging from basic questions to full life readings.",
    url: "https://futureadvicebycharm.com/packages",
    numberOfItems: packages?.length || 0,
    itemListElement:
      packages?.map((pkg, index) => ({
        "@type": "Service",
        position: index + 1,
        name: pkg.name,
        description: pkg.description,
        provider: {
          "@type": "Organization",
          name: "Future Advice by Charm",
          image: "https://futureadvicebycharm.com/logo.png",
        },
        areaServed: "Worldwide",
        serviceType: "Spiritual Consultation",
      })) || [],
  };

  if (status === "loading") {
    return <PageLoading />;
  }

  if (status === "failed") {
    return <FetchError error={error} />;
  }

  const motionVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: "easeOut" },
  };

  return (
    <>
      <SEO
        title="Service Packages & Pricing"
        description="Choose the right tarot reading for you. We offer affordable packages for Love, Career, Health, and General life guidance. Book online today."
        keywords="tarot reading prices, tarot packages, spiritual reading cost, love prediction service, career guidance tariff, online fortune telling rates, Future Advice by Charm services, တားရော့ဝန်ဆောင်မှု, ဗေဒင်နှုန်းထားများ"
        url="/packages"
        structuredData={structuredData}
      />

      <div className="container mx-auto mt-24 mb-20 px-6 md:px-0">
        <motion.h1
          className="header-title text-3xl md:text-4xl lg:text-5xl text-center"
          variants={motionVariants}
          initial="initial"
          animate="animate"
          transition={{ ...motionVariants.transition, delay: 0.2 }}
        >
          <span className="italic">Our</span> Packages
        </motion.h1>
        <p className="text-center text-gray-400 text-lg mt-4 max-w-3xl mx-auto">
          From love readings to career guidance, find the perfect tarot session
          for your needs.
        </p>

        <div className="mt-8 package-grid grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-6">
          {packages &&
            packages.map((item, index) => (
              <PackageCard key={item.id || index} item={item} />
            ))}
        </div>

        {hasMore && (
          <div className="flex justify-center">
            <button
              className="astro-primary-btn mt-10"
              onClick={handleLoadMore}
              disabled={loadingMore}
            >
              {loadingMore ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Loading...
                </>
              ) : (
                <>See More</>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
