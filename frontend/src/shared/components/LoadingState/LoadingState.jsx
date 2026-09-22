import "./LoadingState.css";

export default function LoadingState({ text = "Loading movies..." }) {
  return (
    <div className="loading-state" role="status">
      <span className="loading-spinner" />
      <span>{text}</span>
    </div>
  );
}
