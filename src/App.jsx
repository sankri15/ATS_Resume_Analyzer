import { useState, useRef, useEffect } from 'react';
import { analyzeResume } from './atsAnalyzer';
import ScoreRing from './components/ScoreRing';
import SkillBadge from './components/SkillBadge';
import SuggestionCard from './components/SuggestionCard';
import Header from './components/Header';
import Footer from './components/Footer';

const PLACEHOLDER = `Paste your resume text here...

Example:
Sanjana Pal | sanjanapal004@gmail.com | github.com/sanjanapal

SUMMARY
Computer Science student skilled in Python, JavaScript, and React. Passionate about building full-stack web applications and exploring Machine Learning.

SKILLS
Languages: Python, Java, C++, JavaScript, HTML, CSS
Frameworks: React, Node.js
Tools: Git, GitHub, VS Code
Databases: SQL, MongoDB
Other: REST API, Data Structures, Algorithms, Machine Learning

PROJECTS
Portfolio Website - Built with React and Node.js; integrated REST API for dynamic content.
ML Classifier - Developed a Python-based Machine Learning model achieving 94% accuracy.

EDUCATION
B.Tech in Computer Science | XYZ University | 2021-2025`;

export default function App() {
  const [resumeText, setResumeText] = useState('');
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const resultRef = useRef(null);

  const handleAnalyze = () => {
    if (!resumeText.trim()) return;
    setIsAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      const analysis = analyzeResume(resumeText);
      setResult(analysis);
      setIsAnalyzing(false);
    }, 1200);
  };

  const handleClear = () => {
    setResumeText('');
    setResult(null);
  };

  useEffect(() => {
    if (result && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [result]);

  const wordCount = resumeText.trim() ? resumeText.trim().split(/\s+/).length : 0;

  return (
    <div className="min-h-screen hero-bg">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl pointer-events-none animate-float" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl pointer-events-none animate-float"
          style={{ animationDelay: '3s' }}
        />

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-violet-300 mb-6 border border-violet-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            No backend &middot; No APIs &middot; 100% Private
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="gradient-text">ATS Resume</span>
            <br />
            <span className="text-slate-100">Analyzer</span>
          </h1>

          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-6 leading-relaxed">
            Instantly analyze your resume against{' '}
            <span className="text-violet-400 font-semibold">Applicant Tracking Systems</span>.
            Discover skill gaps, get an ATS score, and unlock personalized suggestions.
          </p>

          {/* Built for Digital Heroes Button */}
          <a
            
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-sm shimmer-btn transition-all duration-300 hover:scale-105 shadow-xl shadow-violet-900/40 animate-pulse-glow"
          >
            <span className="text-lg">&#9889;</span>
            Built for Users
          </a>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        {/* Resume Input Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 mb-8 animated-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center text-base">
                &#128196;
              </span>
              Paste Your Resume
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500">{wordCount} words</span>
              {resumeText && (
                <button
                  id="clear-btn"
                  onClick={handleClear}
                  className="text-xs text-slate-400 hover:text-red-400 transition-colors px-3 py-1 rounded-full border border-slate-700 hover:border-red-500/50"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <textarea
            id="resume-textarea"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder={PLACEHOLDER}
            rows={16}
            className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-slate-300 placeholder-slate-600 text-sm leading-relaxed resize-none focus:outline-none focus:border-violet-500/50 textarea-glow transition-all duration-300 font-mono"
          />

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-5">
            <button
              id="analyze-btn"
              onClick={handleAnalyze}
              disabled={!resumeText.trim() || isAnalyzing}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shimmer-btn hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-violet-900/40 text-base"
            >
              {isAnalyzing ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Analyzing&hellip;
                </>
              ) : (
                <>
                  <span className="text-xl">&#128269;</span>
                  Analyze Resume
                </>
              )}
            </button>

            <p className="text-xs text-slate-500 text-center sm:text-left">
              
            </p>
          </div>
        </div>

        {/* Analyzing Skeleton */}
        {isAnalyzing && (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="glass-card rounded-2xl p-6 animate-pulse">
                <div className="h-4 bg-white/5 rounded-full w-1/3 mb-4" />
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3, 4, 5, 6].map(j => (
                    <div key={j} className="h-8 bg-white/5 rounded-lg" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results */}
        {result && !isAnalyzing && (
          <div ref={resultRef} className="space-y-6">

            {/* Score Card */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 animated-border result-section stagger-1">
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <ScoreRing
                    score={result.score}
                    scoreLabel={result.scoreLabel}
                    scoreColor={result.scoreColor}
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-slate-100 mb-2">ATS Score Analysis</h2>
                  <p className="text-slate-400 mb-4">
                    Your resume scored{' '}
                    <span className="text-violet-300 font-semibold">{result.score}/100</span> on our
                    ATS compatibility check.{' '}
                    {result.score >= 70
                      ? 'Great job! A few tweaks can push you to the top.'
                      : "There's room to improve — follow the suggestions below."}
                  </p>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Skills Found',   value: result.found.length,   total: 16, icon: '✅' },
                      { label: 'Skills Missing', value: result.missing.length, total: 16, icon: '❌' },
                      { label: 'Word Count',     value: result.wordCount,      total: null, icon: '📝' },
                    ].map(stat => (
                      <div
                        key={stat.label}
                        className="bg-white/[0.03] rounded-xl p-3 border border-white/5 text-center"
                      >
                        <div className="text-xl mb-1">{stat.icon}</div>
                        <div className="text-xl font-bold text-slate-100">
                          {stat.value}{stat.total ? `/${stat.total}` : ''}
                        </div>
                        <div className="text-xs text-slate-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Found */}
            {result.found.length > 0 && (
              <div className="glass-card rounded-2xl p-6 sm:p-8 result-section stagger-2">
                <h2 className="text-xl font-semibold text-slate-100 mb-5 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    ✅
                  </span>
                  Skills Found
                  <span className="ml-auto text-sm font-normal text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                    {result.found.length} / {result.found.length + result.missing.length}
                  </span>
                </h2>
                <div className="flex flex-wrap gap-2">
                  {result.found.map(skill => (
                    <SkillBadge key={skill.name} skill={skill} found={true} />
                  ))}
                </div>
              </div>
            )}

            {/* Missing Skills */}
            {result.missing.length > 0 && (
              <div className="glass-card rounded-2xl p-6 sm:p-8 result-section stagger-3">
                <h2 className="text-xl font-semibold text-slate-100 mb-5 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                    ❌
                  </span>
                  Missing Skills
                  <span className="ml-auto text-sm font-normal text-red-400 bg-red-400/10 px-3 py-1 rounded-full border border-red-400/20">
                    {result.missing.length} missing
                  </span>
                </h2>
                <p className="text-slate-500 text-sm mb-4">
                  Consider adding these skills to your resume if you have experience with them.
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.missing.map(skill => (
                    <SkillBadge key={skill.name} skill={skill} found={false} />
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            {result.suggestions.length > 0 && (
              <div className="glass-card rounded-2xl p-6 sm:p-8 result-section stagger-4">
                <h2 className="text-xl font-semibold text-slate-100 mb-5 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                    &#128161;
                  </span>
                  Improvement Suggestions
                  <span className="ml-auto text-sm font-normal text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                    {result.suggestions.length} tips
                  </span>
                </h2>
                <div className="space-y-3">
                  {result.suggestions.map((suggestion, idx) => (
                    <SuggestionCard key={suggestion.id} suggestion={suggestion} index={idx} />
                  ))}
                </div>
              </div>
            )}

            {result.suggestions.length === 0 && result.score >= 90 && (
              <div className="glass-card rounded-2xl p-8 text-center animated-border result-section stagger-4">
                <div className="text-5xl mb-4">&#127942;</div>
                <h3 className="text-2xl font-bold gradient-text mb-2">Outstanding Resume!</h3>
                <p className="text-slate-400">
                  Your resume is highly optimized for ATS systems. You are in excellent shape!
                </p>
              </div>
            )}

            <div className="text-center pt-2">
              <button
                id="re-analyze-btn"
                onClick={handleClear}
                className="text-sm text-slate-400 hover:text-violet-400 transition-colors underline underline-offset-4"
              >
                Analyze another resume &rarr;
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
