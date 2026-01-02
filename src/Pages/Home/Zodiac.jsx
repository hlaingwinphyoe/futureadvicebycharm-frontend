import { moon, star } from "@/assets";
import ZCard from "@/components/ZCard";
import { fetchZodiacs } from "@/redux/reducers/ZodiacsSlice";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, useInView } from "framer-motion";

export default function Zodiac() {
  const dispatch = useDispatch();
  const { zodiacs, status } = useSelector((state) => state.zodiacs);

  const headingRef = useRef(null);
  const gridRef = useRef(null);

  const headingInView = useInView(headingRef, { once: true });
  const gridInView = useInView(gridRef, { once: true });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchZodiacs());
    }
  }, [status, dispatch]);

  return (
    <div id="zodiac-section" className="relative px-6 md:px-0 py-20 z-30">
      <div className="container mx-auto z-30">
        <motion.div
          ref={headingRef}
          className="text-center mb-10 xl:mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl xl:text-5xl italic mb-7 xl:mb-10">
            Choose
            <span className="mx-3 xl:mx-5 text-5xl xl:text-6xl not-italic">
              Your Zodiac
            </span>
            Sign
          </h1>
          <h4 className="text-lg xl:text-xl italic text-gray-400">
            What is Your Sign?
          </h4>
          <h4 className="text-lg xl:text-xl italic text-gray-400">
            Read Your Daily Horoscope Today
          </h4>
        </motion.div>
        <motion.div
          ref={gridRef}
          className="grid md:grid-cols-4 gap-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={gridInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          {zodiacs &&
            zodiacs.map((zodiac) => <ZCard key={zodiac.id} zodiac={zodiac} />)}
        </motion.div>
      </div>
      <img
        src={moon}
        className="absolute -left-20 -top-60 opacity-10 h-[28rem] xl:h-[40rem]"
        alt="moon bg"
        loading="lazy"
      />
      <img
        src={star}
        className="absolute right-52 top-0 opacity-10 h-40 xl:h-52"
        alt="star bg"
        loading="lazy"
      />
    </div>
  );
}
