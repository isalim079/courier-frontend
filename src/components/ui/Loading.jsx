import { Loader2 } from "lucide-react";

function Loading() {
  return (
    <div className="flex items-center justify-center p-4 h-screen">
      <Loader2 className="h-8 w-8 text-orange-600 animate-spin" />
    </div>
  );
}

export default Loading;
