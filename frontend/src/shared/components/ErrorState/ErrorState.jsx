import { RefreshCw } from "lucide-react";
import "./ErrorState.css";

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state">
      <strong>We hit a snag.</strong>
      <span>{message || "Please try again."}</span>
      {onRetry && (
        <button onClick={onRetry} className="error-retry">
          <RefreshCw size={16} /> Retry
        </button>
      )}
    </div>
  );
}
