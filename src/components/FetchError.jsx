import { AlertCircle } from "lucide-react";

export default function FetchError({ error }) {
  return (
    <div className="flex items-center justify-center p-8 text-red-500">
      <AlertCircle className="w-6 h-6 mr-2" />
      <span>{error}</span>
    </div>
  );
}
