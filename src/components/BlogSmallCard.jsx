import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";

export default function BlogSmallCard({ post, cardHeight = "h-[250px]" }) {
  return (
    <div className="md:col-span-2 relative overflow-hidden bg-white shadow-lg group cursor-pointer">
      <img
        loading="lazy"
        src={
          post?.poster_url
            ? post?.poster_url
            : "https://images.pexels.com/photos/7947733/pexels-photo-7947733.jpeg?auto=compress&cs=tinysrgb&w=1200"
        }
        alt={post?.title}
        className={`w-full ${cardHeight} object-cover transition-transform duration-500 group-hover:scale-105`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 group-hover:from-black/70" />
      <div className="absolute bottom-0 left-0 p-4 w-full transform transition-transform duration-300 group-hover:translate-y-[-8px]">
        <div className="flex items-center gap-4 mb-2">
          <Badge variant="secondary">
            {post?.category && post?.category.name}
          </Badge>
          <span className="text-white/80 text-sm block">{post?.read_time}</span>
        </div>
        <Link
          to={`/blogs/${post?.slug}`}
          className="text-primary-200 text-lg ss:text-xl lg:text-2xl font-bold leading-tight line-clamp-2"
        >
          {post?.title}
        </Link>
        <article className="text-white/65 mb-4 line-clamp-3 text-sm md:text-base">
          {post?.excerpt?.replace(/<[^>]*>?/gm, "")}
        </article>
        {/* <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <User2 size={16} />
            <span className="text-white/90 text-sm">{post?.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span className="text-white/90 text-sm">{post?.published_at}</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}
