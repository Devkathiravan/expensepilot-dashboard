import { useState } from "react";
import ExportCSV from "./ExportCSV";
import ExportPDF from "./ExportPDF";

export default function ExportMenu({ expenses }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="export-menu">
      {/* MAIN BUTTON */}
      <button className="export-main-btn" onClick={() => setOpen(!open)}>
        Export <span>▼</span>
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="export-dropdown">
          <ExportCSV expenses={expenses} />
          <ExportPDF expenses={expenses} />
        </div>
      )}
    </div>
  );
}
