import BlogCard from "@/components/BlogCard";
import BlogHorCard from "@/components/BlogHorCard";
import FetchError from "@/components/FetchError";
import PageLoading from "@/components/PageLoading";
import SEO from "@/components/SEO";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  fetchPopularPosts,
  fetchPosts,
  fetchTodaySpecialPost,
  incrementPage,
  setSort,
  setCategory,
} from "@/redux/reducers/PostsSlice";
import { Loader, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import SearchModal from "./SearchModal";
import { publicHttp } from "@/utils/axios";

export default function BlogIndex() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dispatch = useDispatch();
  const {
    posts,
    status,
    error,
    hasMore,
    loadingMore,
    specialPost,
    specialPostStatus,
    popularPostsStatus,
    sortBy,
    selectedCategory,
  } = useSelector((state) => state.posts);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (status === "idle") {
      fetchPostsByCategory();
    }

    if (specialPostStatus === "idle") {
      dispatch(fetchTodaySpecialPost());
    }

    if (popularPostsStatus === "idle") {
      dispatch(fetchPopularPosts());
    }
  }, [status, dispatch, specialPostStatus, popularPostsStatus]);

  useEffect(() => {
    fetchPostsByCategory();
  }, [selectedCategory]);

  const fetchPostsByCategory = () => {
    dispatch(
      fetchPosts({ category: selectedCategory, sortBy: sortBy, page: 1 })
    );
  };

  const handleLoadMore = () => {
    dispatch(incrementPage());
    dispatch(fetchPostsByCategory());
  };

  const fetchCategories = async () => {
    try {
      const response = await publicHttp.get("/api/categories-list");
      setCategories(response.data.data);
    } catch (err) {
      setCategories([]);
      console.log(err);
    }
  };

  const handleSortChange = (value) => {
    const scrollY = window.scrollY;
    dispatch(setSort(value));
    setTimeout(() => {
      window.scrollTo(0, scrollY);
    }, 100);
  };

  const handleCategoryChange = (category) => {
    const scrollY = window.scrollY;
    dispatch(incrementPage(1));
    dispatch(setCategory(category));
    setTimeout(() => {
      window.scrollTo(0, scrollY);
    }, 100);
  };

  // Optimized Structured Data for a "Collection" of Blogs
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage", // Correct type for a list of items
    name: "Future Advice by Charm - Blog",
    description:
      "Read expert articles on Tarot, Astrology, and Spiritual Guidance.",
    url: "https://futureadvicebycharm.com/blogs",
    publisher: {
      "@type": "Organization",
      name: "Future Advice by Charm",
      logo: {
        "@type": "ImageObject",
        url: "https://futureadvicebycharm.com/logo.png",
      },
    },
    // Linking the blog posts in the list
    hasPart:
      posts?.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        url: `https://futureadvicebycharm.com/blogs/${post.slug}`,
        datePublished: post.created_at,
        author: {
          "@type": "Person",
          name: post.author || "Charm",
        },
      })) || [],
  };

  if (specialPostStatus === "loading" || status === "loading") {
    return (
      <div className="mt-20">
        <PageLoading />
      </div>
    );
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
        title="Spiritual Blog & Tarot Articles"
        description="Explore the world of spirituality with Future Advice by Charm. Read our latest articles on Tarot, Astrology, Love Predictions, and Career Guidance."
        keywords="tarot blog, astrology articles, spiritual guidance, daily horoscope, zodiac predictions, love tarot tips, myanmar astrology blog, ဗေဒင်ဆောင်းပါး, တားရော့ဗဟုသုတ, နက္ခတ်ဗေဒင်"
        url="/blogs"
        structuredData={structuredData}
      />

      <div className="container mx-auto mt-24 mb-20 px-6 ss:px-2">
        {/* Header */}
        <div className="my-10">
          <motion.h1
            className="header-title text-3xl ss:text-4xl lg:text-5xl text-center"
            variants={motionVariants}
            initial="initial"
            animate="animate"
            transition={{ ...motionVariants.transition, delay: 0.2 }}
          >
            <span className="italic">Our</span> Blogs
          </motion.h1>
          <p className="text-center text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
            Discover insightful tarot articles, spiritual guidance, and expert
            insights on love, career, and personal growth.
          </p>
        </div>

        <h2 className="text-2xl ss:text-2xl lg:text-4xl ss:mt-20">
          <span className="text-xl ss:text-2xl lg:text-3xl italic">Today</span>{" "}
          Special...
        </h2>

        <div className="flex flex-col ss:flex-row gap-4">
          {/* Today Special */}
          <div className="flex-1 mt-7">
            <BlogHorCard post={specialPost} />
          </div>

          {/* Ad Space / Popular Posts */}
          <div className="w-full ss:w-[30%] ss:mt-7">
            <div className="flex items-center justify-center h-full border bg-primary-950/5 border-primary-600/20 min-h-[200px]">
              <h1 className="text-primary-200">Ad Go Here!</h1>
            </div>
          </div>
        </div>

        {/* Blog List & Controls */}
        <div className="mt-20 blog-list">
          <div className="flex flex-wrap gap-1 items-center justify-between">
            {/* Sort Dropdown */}
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">
                  Sort By{" "}
                  <span className="font-bold italic ml-1.5 text-primary-500">
                    Latest
                  </span>
                </SelectItem>
                <SelectItem value="oldest">
                  Sort By{" "}
                  <span className="font-bold italic ml-1.5 text-primary-500">
                    Oldest
                  </span>
                </SelectItem>
                <SelectItem value="alphabet-asc">
                  Sort By{" "}
                  <span className="font-bold italic ml-1.5 text-primary-500">
                    A-Z
                  </span>
                </SelectItem>
                <SelectItem value="alphabet-desc">
                  Sort By{" "}
                  <span className="font-bold italic ml-1.5 text-primary-500">
                    Z-A
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Categories Tab */}
            <div className="border bg-primary-950/5 border-primary-600/20 flex items-center gap-2 overflow-x-auto p-0.5 w-full ss:w-auto">
              <button
                onClick={() => handleCategoryChange("all")}
                className={`px-4 py-1.5 text-sm whitespace-nowrap transition-colors ${
                  selectedCategory === "all"
                    ? "bg-primary-500 text-white"
                    : "bg-primary-950/5 hover:bg-primary-950/10 text-primary-200"
                }`}
              >
                All
              </button>
              {categories?.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.slug)}
                  className={`px-4 py-1.5 text-sm whitespace-nowrap transition-colors ${
                    selectedCategory === category.slug
                      ? "bg-primary-500 text-white"
                      : "bg-primary-950/5 hover:bg-primary-950/40 text-primary-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Search */}
            <div>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-full max-w-xl text-sm flex items-center gap-3 px-4 h-10 bg-primary-950/5 border-primary-600/20 text-primary-200 border shadow-sm transition-colors"
              >
                <Search className="w-5 h-5 text-gray-400" />
                <span className="text-gray-500">Search posts...</span>
              </button>
              <SearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
              />
            </div>
          </div>

          <div className="mt-8">
            <div className="grid ss:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6">
              {posts &&
                posts.map((post, index) => (
                  // Use ID as key if available for better React performance
                  <BlogCard key={post.id || index} post={post} />
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
        </div>
      </div>
    </>
  );
}
