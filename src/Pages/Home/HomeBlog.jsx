import { sun } from "@/assets";
import BlogCard from "@/components/BlogCard";
import { fetchPosts } from "@/redux/reducers/PostsSlice";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

export default function HomeBlog() {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.posts);

  const headingRef = useRef(null);
  const gridRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true });
  const gridInView = useInView(gridRef, { once: true });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts({ pageSize: 8 }));
    }
  }, [status, dispatch]);

  return (
    <div className="relative container mx-auto px-6 md:px-0 py-20">
      <img
        src={sun}
        className="absolute -bottom-[14rem] xl:-bottom-[2rem] -right-72 xl:-right-[22rem] opacity-10 h-[62rem] xl:h-[80rem]"
        alt="sun"
        loading="lazy"
      />
      <div className="flex justify-between">
        <motion.h1
          ref={headingRef}
          className="bottom-title text-4xl md:text-5xl xl:text-6xl"
          initial={{ opacity: 0, y: 50 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="text-3xl md:text-4xl xl:text-5xl italic">
            Latest
          </span>{" "}
          Blogs
        </motion.h1>
        <Link
          to="/blogs"
          className="bottom-title z-10 astro-border-btn flex items-center text-sm italic"
        >
          View All <span className="hidden md:block">Our Blogs</span>
          <ArrowUpRight size={16} className="hidden md:block" />
        </Link>
      </div>
      <motion.div
        ref={gridRef}
        className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 xl:gap-6 grid-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={gridInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {posts && posts.map((post) => <BlogCard key={post.id} post={post} />)}
      </motion.div>
    </div>
  );
}
