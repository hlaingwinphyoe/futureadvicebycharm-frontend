import { facebook, twitterX } from "@/assets";
import BlogSmallCard from "@/components/BlogSmallCard";
import NotFound from "@/components/NotFound";
import PageLoading from "@/components/PageLoading";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchRecommendedPosts } from "@/redux/reducers/PostsSlice";
import { Calendar, Copy, Dot, Eye, Search, ThumbsUp, User } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SearchModal from "./SearchModal";
import { http, publicHttp } from "@/utils/axios";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";

export default function BlogDetails() {
  const { slug } = useParams();
  const { user } = useSelector((state) => state.user);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { recommendedPosts } = useSelector((state) => state.posts);
  const [post, setPost] = useState(null);
  const [upVotes, setUpVotes] = useState(0);
  const { toast } = useToast();

  const [copied, setCopied] = useState(false);
  const [vote, setVote] = useState(false);

  const contentRef = useRef(null);

  const copyToClipboard = () => {
    let link = window.location.href;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  useEffect(() => {
    if (slug) {
      fetchCurrentPost(slug);
    }
  }, [slug, dispatch]);

  useEffect(() => {
    if (post) {
      const params = {
        postId: post.id,
        category: post.category.slug,
      };
      dispatch(fetchRecommendedPosts(params));
      getVotes(post.id);
    }
  }, [post, dispatch]);

  const fetchCurrentPost = async (slug) => {
    try {
      setLoading(true);
      const response = await publicHttp.get(
        `api/posts-list/${slug}?userId=${user?.id}`
      );
      setPost(response.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const checkVote = () => {
    if (post?.votes.length > 0) {
      const userVoted = post.votes.some((vote) => vote.user_id === user?.id);
      setVote(userVoted);
    }
  };

  const getVotes = async (postId) => {
    try {
      const response = await publicHttp.get(`/api/posts/${postId}/votes`);
      setUpVotes(response.data.data.length);
      checkVote();
    } catch (error) {
      console.error("Error fetching votes:", error);
    }
  };

  const handleVotes = async () => {
    try {
      await http.post(`/api/posts/${post?.id}/votes/store`);

      const votesResponse = await publicHttp.get(
        `/api/posts/${post?.id}/votes`
      );
      setUpVotes(votesResponse.data.data.length);
      setPost((prev) => ({
        ...prev,
        votes: votesResponse.data.data,
      }));

      checkVote();
    } catch (err) {
      console.error(err);
      setVote(false);
      toast({
        description: "✅ Unauthenticated. Please Log In!",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <PageLoading />;
  }
  if (!post) {
    return <NotFound />;
  }

  // --- SEO Helpers ---

  // 1. Clean up Description (Remove HTML tags for Meta Description)
  const plainDescription = post.desc
    ? post.desc.replace(/<[^>]*>?/gm, "").substring(0, 160) + "..."
    : "";

  // 2. Ensure Image is a Full URL
  const baseUrl = "https://futureadvicebycharm.com";
  const fullImageUrl = post.poster_url?.startsWith("http")
    ? post.poster_url
    : `${baseUrl}${post.poster_url || "/website.png"}`;

  // 3. Dynamic Keywords
  const seoKeywords = [
    post.title,
    post.category?.name,
    ...(post.tags?.map((tag) => tag.name) || []),
    "Future Advice by Charm",
    "Tarot by Charm",
    "spiritual insights",
    // Burmese
    "နက္ခတ်ဗေဒင်ဆောင်းပါး",
    "တားရော့ဗဟုသုတ",
  ]
    .filter(Boolean)
    .join(", ");

  // 4. BlogPosting Schema
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: plainDescription,
    image: [fullImageUrl],
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    author: {
      "@type": "Person",
      name: post.author || "Charm",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Future Advice by Charm",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blogs/${post.slug}`,
    },
  };

  return (
    <>
      <SEO
        title={post.title}
        description={plainDescription}
        keywords={seoKeywords}
        image={fullImageUrl}
        url={`/blogs/${post.slug}`}
        type="article" // Important for Facebook/LinkedIn to display as an article
        structuredData={structuredData}
      />

      <div className="relative">
        <div className="container mx-auto mt-24 mb-20 px-6 md:px-0">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/blogs">Blogs</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">
                  {post.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex flex-wrap items-start gap-4 md:gap-6">
            <div className="w-full md:w-[70%]" ref={contentRef}>
              <div className="mt-8 relative">
                <img
                  src={fullImageUrl}
                  className="max-h-[22rem] w-full object-cover"
                  alt={post.title} // Better alt text for SEO
                  loading="lazy"
                />
                <Badge className="absolute top-4 left-4 px-3">
                  {post.category ? post.category.name : "Article"}
                </Badge>
                <h1 className="text-4xl mb-4 mt-8 text-primary-300">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm mb-8">
                  <h4 className="flex items-center gap-1">
                    <User size={16} /> {post.author}
                  </h4>
                  <h4 className="flex items-center gap-1">
                    <Calendar size={16} /> {post.published_at}
                  </h4>
                  <h4 className="flex items-center gap-1">
                    <Eye size={16} /> {post.views} views
                  </h4>
                  <Dot size={20} />
                  <h4 className="flex items-center">{post.read_time}</h4>
                </div>

                {/* Blog Content */}
                <article
                  className="text-white/60 leading-7 mb-[55px] prose prose-headings:text-white prose-a:text-primary-300 prose-strong:text-white"
                  dangerouslySetInnerHTML={{ __html: post.desc }}
                />

                <div className="flex justify-between items-center border-y py-3.5 mt-10 text-sm">
                  <div className="flex items-center gap-4">
                    <button
                      className={`flex items-center gap-2 ${
                        vote ? "text-primary-500" : "text-gray-500"
                      }`}
                      onClick={handleVotes}
                    >
                      <ThumbsUp size={20} /> {upVotes}
                    </button>
                  </div>
                  <div className="flex items-center text-sm">
                    <h4 className="mr-4">Share: </h4>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={copyToClipboard}
                        type="button"
                        disabled={copied}
                        className="bg-slate-800 disabled:hover:bg-slate-800 cursor-pointer hover:bg-slate-700 rounded-full p-2"
                      >
                        {copied ? (
                          <span className="text-green-500 px-2">Copied!</span>
                        ) : (
                          <Copy size={17} />
                        )}
                      </button>
                      <a
                        href={`https://www.facebook.com/sharer.php?u=${window.location.href}`}
                        target="_blank"
                        className="bg-slate-800 hover:bg-slate-700 rounded-full p-2"
                      >
                        <img src={facebook} alt="facebook" loading="lazy" />
                      </a>
                      <a
                        href={`https://www.x.com/share?url=${window.location.href}`}
                        target="_blank"
                        className="bg-slate-800 hover:bg-slate-700 rounded-full p-2"
                      >
                        <img src={twitterX} alt="twitter-x" loading="lazy" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-full md:w-[28%] mt-8">
              <div className="space-y-6">
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

                <Card className="bg-primary-950/5 border-primary-600/20">
                  <CardHeader className="border-b py-3">
                    <CardTitle className="text-xl text-white underline underline-offset-4">
                      Tags
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-3 space-x-1 flex flex-wrap gap-2">
                    {post?.tags?.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="mb-1">
                        # {tag?.name}
                      </Badge>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-primary-950/5 border-primary-600/20">
                  <CardHeader className="border-b py-3">
                    <CardTitle className="text-xl text-white underline underline-offset-4">
                      Recommended Posts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 ss:grid-cols-2 md:grid-cols-1">
                      {recommendedPosts &&
                        recommendedPosts.map((recommendedPost) => (
                          <div key={recommendedPost.id} className="mx-2 my-1">
                            <BlogSmallCard
                              cardHeight="h-[250px] xl:h-[300px]"
                              post={recommendedPost}
                            />
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
