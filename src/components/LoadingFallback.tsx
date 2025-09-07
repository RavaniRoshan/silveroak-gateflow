import { Loader2 } from "lucide-react";

interface LoadingFallbackProps {
  message?: string;
}

export const LoadingFallback = ({ message = "Loading..." }: LoadingFallbackProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground text-sm">{message}</p>
      </div>
    </div>
  );
};

export default LoadingFallback;