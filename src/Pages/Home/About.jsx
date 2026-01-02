import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone } from "lucide-react";
import { astroSign, sunBg, profile } from "@/assets";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      className="relative min-h-[24rem] flex items-center justify-center py-16 md:py-28"
      id="#about"
      ref={ref}
    >
      {/* Background Images */}
      <motion.img
        src={sunBg}
        className="hidden sm:block absolute -left-[22rem] xl:-left-[26rem] -top-48 h-[37.5rem] xl:h-[45rem] opacity-20 select-none pointer-events-none"
        alt="sun bg"
        initial={{ opacity: 0, x: -100 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1 }}
      />
      <motion.img
        src={astroSign}
        className="hidden sm:block absolute -right-20 xl:-right-28 bottom-5 h-72 xl:h-[26rem] opacity-30 select-none pointer-events-none"
        alt="astro-sign"
        initial={{ opacity: 0, x: 100 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
      />
      {/* Main Content */}
      <motion.div
        className="w-full max-w-2xl mx-auto text-center relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <img
          src={profile}
          alt="Future Advice by Charm"
          className="rounded-full w-36 h-36 object-cover border-4 border-primary-300 shadow-md mx-auto mb-4"
        />
        <h3 className="text-2xl font-bold text-primary-200 mb-1">Charm</h3>
        <p className="text-base md:text-lg text-primary-400 mb-6">
          Certified Astrologer & Tarot Reader
        </p>

        {/* Bio Card */}
        <div className="mx-auto max-w-xl mb-8">
          <p className="text-gray-100 text-base md:text-lg leading-relaxed">
            I help people find clarity and guidance through astrology,
            palmistry, and tarot. My approach blends traditional wisdom with a
            modern, compassionate touch. Whether you seek answers about love,
            career, or your life path, I am here to support you on your journey.
          </p>
        </div>

        {/* Divider */}
        <div className="w-full flex justify-center mb-8">
          <div className="h-px w-2/3 bg-gradient-to-r from-transparent via-primary-400 to-transparent opacity-40"></div>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide mb-2 text-primary-300">
          FUTURE ADVICE BY CHARM
        </h1>
        <h2 className="italic text-lg md:text-xl mb-8 text-gray-300">
          Myanmar Astrology, Palm and Tarot Reader
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
          {/* Phone */}
          <a
            href="tel:+959753472946"
            className="text-primary-300 hover:text-primary-200 transition-colors flex flex-col items-center"
            aria-label="Call Phone"
          >
            <Phone className="w-7 h-7 mb-1" />
            <span className="text-xs">Phone</span>
          </a>
          {/* Facebook */}
          <a
            href="https://www.facebook.com/profile.php?id=61567142620648"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-300 hover:text-primary-200 transition-colors flex flex-col items-center"
            aria-label="Facebook"
          >
            {/* Facebook SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              className="mb-1"
            >
              <path
                fill="currentColor"
                d="M17.99 1.596a28 28 0 0 0-3.037-.156C11.59 1.44 9.5 3.582 9.5 7.03v2.341H6.675a.5.5 0 0 0-.5.5v3.85a.5.5 0 0 0 .5.5H9.5v7.72a.5.5 0 0 0 .5.5h3.978a.5.5 0 0 0 .5-.5v-7.72h2.816a.5.5 0 0 0 .496-.435l.497-3.85a.5.5 0 0 0-.496-.565h-3.313V7.412c0-.97.195-1.375 1.408-1.375h2.039a.5.5 0 0 0 .5-.5V2.092a.5.5 0 0 0-.435-.496m-.565 3.44l-1.54.001c-2.157 0-2.407 1.356-2.407 2.375v2.46a.5.5 0 0 0 .499.5h3.246l-.369 2.85h-2.876a.5.5 0 0 0-.5.5v7.718H10.5v-7.718a.5.5 0 0 0-.5-.5H7.176v-2.85H10a.5.5 0 0 0 .5-.5V7.03c0-2.874 1.665-4.59 4.453-4.59c1.009 0 1.92.055 2.472.103z"
              />
            </svg>
            <span className="text-xs">Facebook</span>
          </a>
          {/* Telegram */}
          <a
            href="https://t.me/Tarot_by_Charm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-300 hover:text-primary-200 transition-colors flex flex-col items-center"
            aria-label="Telegram"
          >
            {/* Telegram SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              className="mb-1"
            >
              <path
                fill="currentColor"
                d="M21.945 2.765a1.55 1.55 0 0 0-1.572-.244L2.456 9.754a1.543 1.543 0 0 0 .078 2.884L6.4 13.98l2.095 6.926c.004.014.017.023.023.036a.5.5 0 0 0 .093.15a.5.5 0 0 0 .226.143c.01.004.017.013.027.015h.006l.003.001a.45.45 0 0 0 .233-.012l.025-.005a.5.5 0 0 0 .191-.122c.006-.007.016-.008.022-.014l3.013-3.326l4.397 3.405c.267.209.596.322.935.322c.734 0 1.367-.514 1.518-1.231L22.469 4.25a1.53 1.53 0 0 0-.524-1.486M9.588 15.295l-.707 3.437l-1.475-4.878l7.315-3.81l-4.997 4.998a.5.5 0 0 0-.136.253m8.639 4.772a.54.54 0 0 1-.347.399a.53.53 0 0 1-.514-.078l-4.763-3.689a.5.5 0 0 0-.676.06L9.83 19.07l.706-3.427l7.189-7.19a.5.5 0 0 0-.584-.797L6.778 13.054l-3.917-1.362A.53.53 0 0 1 2.5 11.2a.53.53 0 0 1 .334-.518l17.914-7.233a.54.54 0 0 1 .558.086a.52.52 0 0 1 .182.518z"
              />
            </svg>
            <span className="text-xs">Telegram</span>
          </a>
          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@fabc153"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-300 hover:text-primary-200 transition-colors flex flex-col items-center"
            aria-label="TikTok"
          >
            {/* TikTok SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 256 256"
              className="mb-1"
            >
              <path
                fill="currentColor"
                d="M224 72a48.05 48.05 0 0 1-48-48a8 8 0 0 0-8-8h-40a8 8 0 0 0-8 8v132a20 20 0 1 1-28.57-18.08a8 8 0 0 0 4.57-7.23V88a8 8 0 0 0-9.4-7.88C50.91 86.48 24 119.1 24 156a76 76 0 0 0 152 0v-39.71A103.25 103.25 0 0 0 224 128a8 8 0 0 0 8-8V80a8 8 0 0 0-8-8m-8 39.64a87.2 87.2 0 0 1-43.33-16.15A8 8 0 0 0 160 102v54a60 60 0 0 1-120 0c0-25.9 16.64-49.13 40-57.6v27.67A36 36 0 1 0 136 156V32h24.5A64.14 64.14 0 0 0 216 87.5Z"
              />
            </svg>
            <span className="text-xs">TikTok</span>
          </a>
          {/* Viber */}
          <a
            href="viber://chat?number=+959753472946"
            className="text-primary-300 hover:text-primary-200 transition-colors flex flex-col items-center"
            aria-label="Viber"
          >
            {/* Viber SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              className="mb-1"
            >
              <path
                fill="currentColor"
                d="M7.965 6.202a.82.82 0 0 0-.537.106h-.014c-.375.22-.713.497-1.001.823c-.24.277-.37.557-.404.827c-.02.16-.006.322.041.475l.018.01c.27.793.622 1.556 1.052 2.274a13.4 13.4 0 0 0 2.03 2.775l.024.034l.038.028l.023.027l.028.024a13.6 13.6 0 0 0 2.782 2.04c1.155.629 1.856.926 2.277 1.05v.006c.123.038.235.055.348.055a1.6 1.6 0 0 0 .964-.414c.325-.288.6-.627.814-1.004v-.007c.201-.38.133-.738-.157-.981A12 12 0 0 0 14.41 13c-.448-.243-.903-.096-1.087.15l-.393.496c-.202.246-.568.212-.568.212l-.01.006c-2.731-.697-3.46-3.462-3.46-3.462s-.034-.376.219-.568l.492-.396c.236-.192.4-.646.147-1.094a12 12 0 0 0-1.347-1.88a.75.75 0 0 0-.44-.263M12.58 5a.5.5 0 0 0 0 1c1.264 0 2.314.413 3.145 1.205c.427.433.76.946.978 1.508c.219.563.319 1.164.293 1.766a.5.5 0 0 0 1 .042a5.4 5.4 0 0 0-.361-2.17a5.4 5.4 0 0 0-1.204-1.854l-.01-.01C15.39 5.502 14.085 5 12.579 5"
              />
              <path
                fill="currentColor"
                d="M12.545 6.644a.5.5 0 0 0 0 1h.017c.912.065 1.576.369 2.041.868c.477.514.724 1.153.705 1.943a.5.5 0 0 0 1 .023c.024-1.037-.31-1.932-.972-2.646V7.83c-.677-.726-1.606-1.11-2.724-1.185l-.017-.002z"
              />
              <path
                fill="currentColor"
                d="M12.526 8.319a.5.5 0 1 0-.052.998c.418.022.685.148.853.317c.169.17.295.443.318.87a.5.5 0 1 0 .998-.053c-.032-.6-.22-1.13-.605-1.52c-.387-.39-.914-.58-1.512-.612"
              />
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7.067 2.384a22.15 22.15 0 0 1 9.664 0l.339.075a5.16 5.16 0 0 1 3.872 3.763a19.7 19.7 0 0 1 0 9.7a5.16 5.16 0 0 1-3.872 3.763l-.34.075a22.2 22.2 0 0 1-6.077.499L8 22.633a.75.75 0 0 1-1.24-.435l-.439-2.622a5.16 5.16 0 0 1-3.465-3.654a19.7 19.7 0 0 1 0-9.7a5.16 5.16 0 0 1 3.872-3.763zm9.337 1.463a20.65 20.65 0 0 0-9.01 0l-.34.076A3.66 3.66 0 0 0 4.31 6.591a18.2 18.2 0 0 0 0 8.962a3.66 3.66 0 0 0 2.745 2.668l.09.02a.75.75 0 0 1 .576.608l.294 1.758l1.872-1.675a.75.75 0 0 1 .553-.19a20.7 20.7 0 0 0 5.964-.445l.339-.076a3.66 3.66 0 0 0 2.745-2.668c.746-2.94.746-6.021 0-8.962a3.66 3.66 0 0 0-2.745-2.668z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs">Viber</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
