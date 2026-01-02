import { Calendar, User2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";

export default function BlogHorCard({ post }) {
  return (
    <div className="md:col-span-2 relative overflow-hidden bg-white shadow-lg group cursor-pointer">
      <img
        src={
          post?.poster_url
            ? post?.poster_url
            : "https://images.pexels.com/photos/7947733/pexels-photo-7947733.jpeg?auto=compress&cs=tinysrgb&w=1200"
        }
        alt={post?.title}
        className="w-full h-[450px] object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 group-hover:from-black/70" />
      <div className="absolute bottom-0 left-0 p-6 w-full transform transition-transform duration-300 group-hover:translate-y-[-8px]">
        <div className="flex items-center gap-4 mb-2">
          <Badge variant="secondary">
            {post?.category && post?.category.name}
          </Badge>
          <span className="text-white/80 text-sm block">{post?.read_time}</span>
        </div>
        {/* <div className="flex items-center gap-4 text-white/70 text-sm">
          <span className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            {number_format(posts[0].views)}
          </span>
          <span className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            {number_format(posts[0].comments)}
          </span>
        </div> */}
        <Link
          to={`/blogs/${post?.slug}`}
          className="text-primary-200 text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight line-clamp-3"
        >
          {post?.title}
        </Link>
        <article className="text-white/65 mb-4 line-clamp-3 text-sm md:text-base">
          {post?.excerpt?.replace(/<[^>]*>?/gm, "")}
        </article>
        <div className="flex items-center gap-3">
          <Link
            to={`/blogs/${post?.slug}`}
            className="astro-secondary-btn text-sm transition-all duration-300 group"
          >
            <span>Read article</span>
            <span className="transform transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
          <div className="flex flex-col ss:flex-row ss:items-center ss:gap-3 text-xs ss:text-sm">
            <div className="flex items-center gap-2">
              <User2 size={16} />
              <span className="text-white/90 text-sm">{post?.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span className="text-white/90 text-sm">
                {post?.published_at}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
