import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Search, X, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import BlogSmallCard from "@/components/BlogSmallCard";

export default function SearchModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { posts, searchStatus, searchError } = useSelector(
    (state) => state.posts
  );

  // Filter posts based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPosts([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = posts.filter(
      (post) =>
        post?.title.toLowerCase().includes(query) ||
        post?.desc.toLowerCase().includes(query)
    );
    setFilteredPosts(results);
  }, [searchQuery, posts]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    // Handle '/' key to open search
    const handleSlash = (e) => {
      if (e.key === "/" && !isOpen) {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    window.addEventListener("keydown", handleSlash);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("keydown", handleSlash);
    };
  }, [onClose, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      document.getElementById("search-input")?.focus();
    } else {
      setSearchQuery("");
      setFilteredPosts([]);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
          >
            <div className="w-[80vw] h-[80vh] bg-gradient-to-r from-[#141122] to-secondary-500 shadow-2xl overflow-auto rounded-xl">
              {/* Search Header */}
              <div className="relative flex items-center p-4 border-b border-secondary-800">
                <Search className="w-5 h-5 text-primary-400" />
                <input
                  id="search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search posts..."
                  className="flex-1 ml-3 bg-transparent border-none outline-none text-primary-200 placeholder-primary-200"
                  autoComplete="off"
                />
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-secondary-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-primary-400" />
                </button>
              </div>

              {/* Search Results */}
              <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                {searchStatus === "loading" ? (
                  <div className="flex items-center justify-center p-8">
                    <Loader2 className="w-6 h-6 animate-spin text-primary-500" />
                    <span className="ml-2 text-primary-200">Searching...</span>
                  </div>
                ) : searchError ? (
                  <div className="flex items-center justify-center p-8 text-red-500">
                    <AlertCircle className="w-6 h-6 mr-2" />
                    <span>{searchError}</span>
                  </div>
                ) : filteredPosts.length > 0 ? (
                  <div className="p-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredPosts.map((post) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                        className="border border-primary-950/20 rounded-md"
                      >
                        <BlogSmallCard post={post} />
                      </motion.div>
                    ))}
                  </div>
                ) : searchQuery ? (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-16 h-16 bg-secondary-800 rounded-full flex items-center justify-center mb-4">
                      <Search className="w-8 h-8 text-primary-200" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary-200">
                      No results found
                    </h3>
                    <p className="mt-1 text-primary-200">
                      Try adjusting your search terms
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-16 h-16 bg-secondary-800 rounded-full flex items-center justify-center mb-4">
                      <Search className="w-8 h-8 text-primary-200" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary-200">
                      Search posts
                    </h3>
                    <p className="mt-1 text-primary-200">
                      Start typing to search
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
