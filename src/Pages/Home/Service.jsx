import PackageCard from "@/components/PackageCard";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPackages } from "@/redux/reducers/PackagesSlice";
import { motion, useInView } from "framer-motion";

export default function Service() {
  const dispatch = useDispatch();
  const { packages, status } = useSelector((state) => state.packages);

  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const packagesRef = useRef(null);

  const headingInView = useInView(headingRef, { once: true });
  const subHeadingInView = useInView(subHeadingRef, { once: true });
  const packagesInView = useInView(packagesRef, { once: true });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPackages(8));
    }
  }, [status, dispatch]);

  return (
    <div className="relative pt-16 pb-40 px-6 md:px-0" id="service-section">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-24">
          <motion.h1
            ref={headingRef}
            className="text-5xl text-white"
            initial={{ opacity: 0, x: -50 }}
            animate={headingInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <span className="text-4xl italic mr-1">Featured</span> Services
          </motion.h1>

          <motion.h4
            ref={subHeadingRef}
            className="text-gray-400 text-lg italic text-center"
            initial={{ opacity: 0, x: 50 }}
            animate={subHeadingInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Personalized horoscopes, compatibility readings,{" "}
            <br className="hidden md:block" /> and life guidance based on birth
            charts.
          </motion.h4>
        </div>
        <div>
          <motion.h1
            ref={headingRef}
            className="text-5xl text-center mb-10"
            initial={{ opacity: 0, y: 50 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Our <span className="text-4xl italic">Packages</span>
          </motion.h1>
          <div
            ref={packagesRef}
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
          >
            {packages &&
              packages.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={packagesInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <PackageCard item={item} />
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
