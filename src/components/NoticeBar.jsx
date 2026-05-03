"use client";
import { MoveRight } from "lucide-react"; // Agar Lucide icons use kar rahe hain toh

export default function NoticeBar() {
  return (
    <div className="w-full bg-[#0056b3] text-white py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-sm sm:text-base">
        <div className="flex items-center gap-2 overflow-hidden underline-offset-4">
          <span className="bg-red-500 text-[10px] font-bold px-1.5 py-0.5 rounded animate-pulse shrink-0">
            NEW
          </span>
          <p className="truncate font-medium">
            NEET 2026 Answer Key is now available!
          </p>
        </div>
        <a 
          href="/neet-answer-key-2026.pdf" 
          target="_blank"
          className="flex items-center gap-1 bg-white text-[#0056b3] px-3 py-1 rounded-full font-bold text-xs hover:bg-blue-50 transition-colors shrink-0 ml-2"
        >
          Download <span className="hidden sm:inline">PDF</span>
        </a>
      </div>
    </div>
  );
}