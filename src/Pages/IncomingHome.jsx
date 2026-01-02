import { motion } from "framer-motion";
import {
  Sparkles,
  Star,
  Wand2,
  Heart,
  Book,
  Compass,
  Eye,
  Gem,
  Feather,
} from "lucide-react";

function IncomingHome() {
  return (
    <div className="pt-16">
      {/* Animated stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
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
            <Star className="w-2 h-2 text-primary-300" />
          </motion.div>
        ))}
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-indigo-600/20 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-32 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 inline-block"
          >
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary-500/20 to-indigo-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary-500/30 relative">
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full border border-primary-400/20"
              />
              <Sparkles className="w-16 h-16 text-primary-200" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-primary-200 to-indigo-200 mb-6"
          >
            Future Advice By Charm
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-primary-200/80 mb-16 max-w-2xl mx-auto"
          >
            Unlock the mysteries of your destiny through mystical tarot readings
          </motion.p>
        </motion.div>

        {/* Services Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-32"
        >
          {[
            {
              title: "Free Reading",
              description: "Begin your spiritual journey",
              icon: <Wand2 className="w-8 h-8" />,
              gradient: "from-primary-500/20 to-pink-500/20",
            },
            {
              title: "Love Reading",
              description: "Unlock your heart's destiny",
              icon: <Heart className="w-8 h-8" />,
              gradient: "from-indigo-500/20 to-primary-500/20",
            },
            {
              title: "Yes / No",
              description: "Quick answers to life's questions",
              icon: <Compass className="w-8 h-8" />,
              gradient: "from-pink-500/20 to-indigo-500/20",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group cursor-pointer relative"
            >
              <div
                className={`h-full bg-gradient-to-br ${item.gradient} backdrop-blur-md border border-primary-500/30 rounded-2xl p-8 transition-all duration-300`}
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 rounded-2xl border border-primary-400/20"
                />
                <div className="relative">
                  <div className="w-16 h-16 mb-6 bg-primary-900/50 rounded-xl flex items-center justify-center group-hover:bg-primary-800/50 transition-colors">
                    <div className="text-primary-200 group-hover:text-white transition-colors">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-primary-200/80 group-hover:text-primary-100 transition-colors">
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500/30 to-indigo-500/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-center mb-32 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-indigo-500/5 rounded-3xl backdrop-blur-sm -z-10" />
          <Feather className="w-12 h-12 mx-auto mb-6 text-primary-300" />
          <h2 className="text-4xl font-serif text-white mb-8">
            About Future Advice By Charm
          </h2>
          <p className="text-lg text-primary-200/90 mb-6 px-6">
            With over a decade of experience in spiritual guidance and tarot
            reading, Future Advice By Charm offers profound insights into your life
            journey. Our readings combine ancient wisdom with modern
            understanding to provide you with clarity and direction.
          </p>
          <p className="text-lg text-primary-200/90 px-6">
            Each reading is performed with the utmost care and attention to
            detail, ensuring you receive the guidance you seek in your spiritual
            journey.
          </p>
        </motion.div>

        {/* Packages Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-32"
        >
          <h2 className="text-4xl font-serif text-white text-center mb-16">
            Premium Packages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Essential",
                price: "$29",
                features: [
                  "30-minute reading",
                  "3 card spread",
                  "Written summary",
                  "One follow-up question",
                ],
                icon: <Star className="w-6 h-6" />,
                gradient: "from-primary-500/20 to-indigo-500/20",
              },
              {
                title: "Comprehensive",
                price: "$59",
                features: [
                  "60-minute reading",
                  "Celtic Cross spread",
                  "Detailed PDF report",
                  "3 follow-up questions",
                  "Voice recording",
                ],
                icon: <Gem className="w-6 h-6" />,
                gradient: "from-indigo-500/20 to-primary-500/20",
                featured: true,
              },
              {
                title: "Ultimate",
                price: "$99",
                features: [
                  "90-minute reading",
                  "Custom spread",
                  "In-depth PDF report",
                  "Unlimited questions for 24h",
                  "Voice recording",
                  "Priority booking",
                ],
                icon: <Sparkles className="w-6 h-6" />,
                gradient: "from-primary-500/20 to-pink-500/20",
              },
            ].map((pkg) => (
              <motion.div
                key={pkg.title}
                whileHover={{ y: -10 }}
                className={`relative p-8 rounded-2xl backdrop-blur-md border border-primary-500/30 
                  ${
                    pkg.featured
                      ? "bg-gradient-to-br from-primary-600/30 to-indigo-600/30"
                      : "bg-gradient-to-br " + pkg.gradient
                  }`}
              >
                <div className="absolute inset-0.5 bg-gradient-to-r from-primary-500/10 to-indigo-500/10 rounded-2xl blur-xl -z-10" />
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-serif text-white">
                    {pkg.title}
                  </h3>
                  {pkg.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-6">
                  {pkg.price}
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center text-primary-200/90"
                    >
                      <Star className="w-4 h-4 mr-2 text-primary-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-primary-500 to-indigo-500 text-white font-semibold hover:from-primary-600 hover:to-indigo-600 transition-colors">
                  Choose {pkg.title}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Blog Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-serif text-white text-center mb-16">
            Latest Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Understanding the Major Arcana",
                excerpt:
                  "Dive deep into the powerful symbolism and meanings behind the Major Arcana cards...",
                date: "March 15, 2024",
                readTime: "5 min read",
                image:
                  "https://images.unsplash.com/photo-1601314002592-b8734bca6604?auto=format&fit=crop&w=600&q=80",
              },
              {
                title: "Moon Phases & Tarot Reading",
                excerpt:
                  "Learn how lunar cycles can enhance your tarot practice and spiritual journey...",
                date: "March 12, 2024",
                readTime: "4 min read",
                image:
                  "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?auto=format&fit=crop&w=600&q=80",
              },
              {
                title: "Cleansing Your Tarot Deck",
                excerpt:
                  "Essential practices for maintaining the spiritual energy of your tarot cards...",
                date: "March 10, 2024",
                readTime: "3 min read",
                image:
                  "https://images.unsplash.com/photo-1633204339691-9d3645430e14?auto=format&fit=crop&w=600&q=80",
              },
            ].map((post) => (
              <motion.div
                key={post.title}
                whileHover={{ y: -10 }}
                className="group relative rounded-2xl overflow-hidden backdrop-blur-md border border-primary-500/30"
              >
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover w-full h-48"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-primary-300 mb-3">
                    <Book className="w-4 h-4 mr-2" />
                    {post.date} • {post.readTime}
                  </div>
                  <h3 className="text-xl font-serif text-white mb-3 group-hover:text-primary-300 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-primary-200/80 mb-4">{post.excerpt}</p>
                  <button className="text-primary-300 hover:text-white transition-colors flex items-center">
                    Read more
                    <Eye className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default IncomingHome;
