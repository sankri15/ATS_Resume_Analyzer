export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between glass-card rounded-2xl px-5 py-3 border border-white/[0.06]">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-violet-500/30">
            A
          </div>
          <span className="font-bold text-slate-100 text-sm hidden sm:block">ATS Analyzer</span>
        </div>

        {/* Author Info */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-200">Sanjana Pal</p>
            <a
              href="mailto:sanjanapal004@gmail.com"
              className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
            >
              sanjanapal004@gmail.com
            </a>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
            SP
          </div>
        </div>
      </div>
    </header>
  );
}
