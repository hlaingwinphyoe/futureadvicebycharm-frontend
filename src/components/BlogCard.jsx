import {
  ArrowUpRight,
  Bookmark,
  BookmarkPlus,
  Calendar,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useEffect, useState } from "react";
import { http } from "@/utils/axios";
import { useToast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";

export default function BlogCard({ post }) {
  const [saved, setSaved] = useState(false);
  const { toast } = useToast();

  const { user } = useSelector((state) => state.user);

  const handleSavedPost = async (postId) => {
    try {
      if (!saved) {
        await http.post(`/api/posts/${postId}/saved`);
        setSaved(true);
        toast({ description: "Saved Post." });
      } else {
        await http.delete(`/api/posts/${postId}/unsaved`);
        setSaved(false);
        toast({ description: "Removed from Saved." });
      }
    } catch (err) {
      console.log("error", err);
      toast({
        variant: "destructive",
        description: "Failed to save post. Please try again.",
      });
    }
  };

  useEffect(() => {
    if (user?.saved_posts) {
      const isSaved = user.saved_posts.some(
        (savedPost) => savedPost.id === post.id
      );
      setSaved(isSaved);
    }
  }, [user, post.id]);

  return (
    <div className="relative border bg-primary-950/5 border-primary-600/20 p-3.5 xl:p-4 cursor-pointer hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 hover:border-primary-950">
      <Link to={`/blogs/${post?.slug}`}>
        <img
          src={
            post?.poster_url
              ? post?.poster_url
              : "https://images.pexels.com/photos/7947733/pexels-photo-7947733.jpeg?auto=compress&cs=tinysrgb&w=1200"
          }
          className="h-36 w-full object-cover"
          alt="poster"
          loading="lazy"
        />
      </Link>
      <div className="absolute top-8 left-6">
        <Badge variant="secondary">
          {post?.category && post?.category.name}
        </Badge>
        {/* <span className="text-white/80 text-sm block">{post?.read_time}</span> */}
      </div>
      <div className="pb-8 mt-3">
        <h1 className="text-lg xl:text-xl text-primary-200 hover:text-primary-500 font-medium mb-1 line-clamp-2">
          <Link to={`/blogs/${post?.slug}`}>{post?.title}</Link>
        </h1>
        <div className="flex items-center gap-4 text-xs xl:text-sm text-gray-500 mb-3">
          <h6 className="flex gap-1.5 items-center">
            <User size={14} /> {post?.author}
          </h6>
          <h6 className="flex gap-1.5 items-center">
            <Calendar size={14} /> {post?.published_at}
          </h6>
        </div>
        <article className="text-white/65 mb-4 line-clamp-3 text-sm md:text-base">
          {post?.excerpt?.replace(/<[^>]*>?/gm, "")}
        </article>
        <div className="flex justify-between items-center mt-4">
          <Link
            to={`/blogs/${post?.slug}`}
            className="astro-secondary-btn text-sm absolute bottom-4"
          >
            Read More
            <ArrowUpRight size={16} />
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleSavedPost(post?.id)}
                  type="button"
                  className="absolute right-5 bottom-5 text-gray-500"
                >
                  {saved ? <Bookmark fill="currentColor" /> : <BookmarkPlus />}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{saved ? "Unsave Post" : "Save Post"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
