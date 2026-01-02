import { Loader } from "lucide-react";

export default function PageLoading() {
  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10">
      <Loader className="w-8 h-8 text-primary-400 animate-spin" />
    </div>
  );
}
