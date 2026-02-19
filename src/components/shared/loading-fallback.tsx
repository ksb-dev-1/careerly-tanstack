// Relative imports
import { Spinner } from "./spinner";

// Loading fallback component
export function LoadingFallback({ color }: { color?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-around">
      <Spinner size={32} color={color} />
    </div>
  );
}
