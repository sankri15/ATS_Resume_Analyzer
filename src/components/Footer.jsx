export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Top Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
          {/* Author Card */}
          <div className="glass-card rounded-2xl px-6 py-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-violet-500/30 flex-shrink-0">
              SP
            </div>
            <div>
              <p className="font-bold text-slate-100 text-base">Sanjana Pal</p>
              <a
                href="mailto:sanjanapal004@gmail.com"
                className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
              >
                sanjanapal004@gmail.com
              </a>
            </div>
          </div>

          {/* Digital Heroes CTA */}
          <a
            id="digital-heroes-footer-link"
          
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm shimmer-btn transition-all duration-300 hover:scale-105 shadow-xl shadow-violet-900/40"
          >
            <span className="text-base">&#9889;</span>
            Built for Users
          </a>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {[
            { icon: '&#128274;', label: '100% Private — runs in your browser' },
            { icon: '&#9889;',   label: 'No backend, no APIs' },
            { icon: '&#128205;', label: 'Instant ATS scoring' },
            { icon: '&#127919;', label: '16 skills detected' },
          ].map(item => (
            <span
              key={item.label}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-slate-400 bg-white/[0.03] border border-white/[0.06]"
              dangerouslySetInnerHTML={{ __html: `<span>${item.icon}</span> ${item.label}` }}
            />
          ))}
        </div>

        {/* Bottom */}
        <p className="text-center text-xs text-slate-600">
          &copy; {currentYear} Sanjana Pal &mdash; ATS Resume Analyzer. Built with React &amp; Tailwind CSS.
          <br />
          <a
            
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-600 hover:text-violet-400 transition-colors"
          >
            
          </a>
        </p>
      </div>
    </footer>
  );
}
