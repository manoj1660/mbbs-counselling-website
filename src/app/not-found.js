import Link from "next/link";
import { Home, ArrowRight, ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 font-sans">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon / Badge */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-600/20 border border-blue-400/30 text-blue-400 mx-auto shadow-2xl backdrop-blur-md">
          <ShieldAlert size={36} />
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-6xl font-black text-white tracking-tight">404</h1>
          <h2 className="text-2xl font-bold text-slate-200">Page Not Found</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            The medical university or page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Link
            href="/"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 px-6 rounded-2xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-600/30"
          >
            <Home size={18} />
            Back to Home
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}