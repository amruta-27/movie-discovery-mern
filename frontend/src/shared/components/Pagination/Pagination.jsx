import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Pagination.css";

export default function Pagination({ page, totalPages, onChange }) {
  const safeTotal = Math.max(1, totalPages);
  return (
    <div className="pagination">
      <button disabled={page <= 1} onClick={() => onChange(page - 1)}><ChevronLeft size={17} /> Prev</button>
      <span>Page <b>{page}</b> of <b>{safeTotal}</b></span>
      <button disabled={page >= safeTotal} onClick={() => onChange(page + 1)}>Next <ChevronRight size={17} /></button>
    </div>
  );
}
