// ATS Resume Analyzer Core Logic
// All analysis runs entirely in the browser — no backend, no paid APIs.

export const SKILL_LIST = [
  { name: 'Python',           pattern: /\bpython\b/i,                    category: 'Language' },
  { name: 'Java',             pattern: /\bjava\b(?!script)/i,             category: 'Language' },
  { name: 'C',                pattern: /\b(?:^|\s)C(?:\s|,|$|\.|;)/,     category: 'Language' },
  { name: 'C++',              pattern: /\bc\+\+\b/i,                      category: 'Language' },
  { name: 'JavaScript',       pattern: /\bjavascript\b|\bjs\b/i,          category: 'Language' },
  { name: 'HTML',             pattern: /\bhtml\b/i,                       category: 'Web' },
  { name: 'CSS',              pattern: /\bcss\b/i,                        category: 'Web' },
  { name: 'React',            pattern: /\breact(?:\.?js)?\b/i,            category: 'Framework' },
  { name: 'Node.js',          pattern: /\bnode(?:\.?js)?\b/i,             category: 'Framework' },
  { name: 'SQL',              pattern: /\bsql\b/i,                        category: 'Database' },
  { name: 'Git',              pattern: /\bgit\b/i,                        category: 'Tool' },
  { name: 'GitHub',           pattern: /\bgithub\b/i,                     category: 'Tool' },
  { name: 'Machine Learning', pattern: /\bmachine\s?learning\b|\bml\b/i, category: 'AI/ML' },
  { name: 'REST API',         pattern: /\brest\s?api\b|\brestful\b/i,     category: 'Architecture' },
  { name: 'Data Structures',  pattern: /\bdata\s?structure[s]?\b/i,       category: 'CS Fundamentals' },
  { name: 'Algorithms',       pattern: /\balgorithm[s]?\b/i,             category: 'CS Fundamentals' },
];

const BONUS_PATTERNS = [
  { pattern: /\bprojects?\b/i,           label: 'Projects section',          weight: 5 },
  { pattern: /\bexperience\b/i,          label: 'Experience section',        weight: 5 },
  { pattern: /\beducation\b/i,           label: 'Education section',         weight: 5 },
  { pattern: /\bskills?\b/i,             label: 'Skills section',            weight: 5 },
  { pattern: /\bsummary|objective\b/i,   label: 'Summary/Objective',         weight: 3 },
  { pattern: /\bcertif/i,                label: 'Certifications',             weight: 4 },
  { pattern: /\bachiev/i,                label: 'Achievements',               weight: 4 },
  { pattern: /\blinkedin\.com\b/i,       label: 'LinkedIn profile',           weight: 3 },
  { pattern: /\bgithub\.com\b/i,         label: 'GitHub profile link',        weight: 3 },
  { pattern: /\b\d{4}\b/,               label: 'Dates / Years mentioned',    weight: 2 },
  { pattern: /\binternship\b/i,          label: 'Internship experience',      weight: 4 },
  { pattern: /\bteam(?:work)?\b/i,       label: 'Teamwork keyword',           weight: 2 },
  { pattern: /\bleadership\b/i,          label: 'Leadership keyword',         weight: 2 },
  { pattern: /\bcommunication\b/i,       label: 'Communication keyword',      weight: 2 },
  { pattern: /\bopen[\s-]?source\b/i,   label: 'Open source contributions',  weight: 3 },
];

const SUGGESTION_RULES = [
  {
    id: 'missing_skills',
    check: (_, missing) => missing.length > 5,
    message: (_, missing) =>
      `Add more technical skills. Currently missing ${missing.length} key skills: ${missing.slice(0, 4).map(s => s.name).join(', ')} and more.`,
    priority: 'high',
  },
  {
    id: 'no_github',
    check: (text) => !/\bgithub\b/i.test(text),
    message: () => 'Include your GitHub profile URL to showcase your projects and open-source contributions.',
    priority: 'high',
  },
  {
    id: 'no_linkedin',
    check: (text) => !/\blinkedin\b/i.test(text),
    message: () => 'Add your LinkedIn profile link — most ATS and recruiters actively check LinkedIn.',
    priority: 'high',
  },
  {
    id: 'no_projects',
    check: (text) => !/\bprojects?\b/i.test(text),
    message: () => 'Add a "Projects" section with details about personal or academic projects you\'ve built.',
    priority: 'high',
  },
  {
    id: 'no_quantified',
    check: (text) => !/\b\d+[\s%+x]\b/.test(text),
    message: () => 'Quantify your achievements — e.g., "Improved performance by 30%" or "Managed a team of 5".',
    priority: 'medium',
  },
  {
    id: 'no_education',
    check: (text) => !/\beducation\b/i.test(text),
    message: () => 'Make sure you have a clearly labeled "Education" section with your degree and institution.',
    priority: 'medium',
  },
  {
    id: 'no_summary',
    check: (text) => !/\b(summary|objective|about me)\b/i.test(text),
    message: () => 'Add a professional "Summary" or "Objective" at the top of your resume for better ATS context.',
    priority: 'medium',
  },
  {
    id: 'no_certifications',
    check: (text) => !/\bcertif/i.test(text),
    message: () => 'Add certifications (e.g., AWS, Google, Coursera) to increase your resume score.',
    priority: 'medium',
  },
  {
    id: 'no_algorithms',
    check: (text) => !/\balgorithm[s]?\b/i.test(text),
    message: () => 'Mention "Algorithms" and "Data Structures" — these are critical keywords for developer roles.',
    priority: 'medium',
  },
  {
    id: 'no_api',
    check: (text) => !/\brest\s?api\b|\bapi[s]?\b/i.test(text),
    message: () => 'Add REST API or API experience — most modern tech roles require API development knowledge.',
    priority: 'medium',
  },
  {
    id: 'short_resume',
    check: (text) => text.trim().split(/\s+/).length < 150,
    message: () => 'Your resume seems too short. Aim for 300–600 words with detailed descriptions of your experience.',
    priority: 'low',
  },
  {
    id: 'no_action_verbs',
    check: (text) => !/\b(developed|built|designed|implemented|led|created|managed|deployed|optimized|improved)\b/i.test(text),
    message: () => 'Use strong action verbs like "Developed", "Built", "Implemented", "Optimized" to describe your work.',
    priority: 'low',
  },
  {
    id: 'no_ml',
    check: (text) => !/\bmachine\s?learning\b|\bml\b|\bai\b|\bdeep learning\b/i.test(text),
    message: () => 'Consider mentioning Machine Learning, AI, or Data Science skills if relevant to your target role.',
    priority: 'low',
  },
];

export function analyzeResume(text) {
  if (!text || text.trim().length < 20) return null;

  // --- Skill Detection ---
  const found = [];
  const missing = [];
  for (const skill of SKILL_LIST) {
    if (skill.pattern.test(text)) {
      found.push(skill);
    } else {
      missing.push(skill);
    }
  }

  // --- Bonus Section Score ---
  let bonusScore = 0;
  const bonusMaxScore = BONUS_PATTERNS.reduce((acc, b) => acc + b.weight, 0);
  const bonusFound = [];
  for (const bonus of BONUS_PATTERNS) {
    if (bonus.pattern.test(text)) {
      bonusScore += bonus.weight;
      bonusFound.push(bonus.label);
    }
  }

  // --- Score Calculation ---
  // Skills: 60 points total (each skill worth ~3.75 pts)
  const skillScore = Math.round((found.length / SKILL_LIST.length) * 60);
  // Bonus: 40 points total
  const normalizedBonus = Math.round((bonusScore / bonusMaxScore) * 40);
  const totalScore = Math.min(100, skillScore + normalizedBonus);

  // --- Suggestions ---
  const suggestions = SUGGESTION_RULES
    .filter(rule => rule.check(text, missing))
    .map(rule => ({
      id: rule.id,
      message: rule.message(text, missing),
      priority: rule.priority,
    }));

  // --- Score Label ---
  let scoreLabel, scoreColor;
  if (totalScore >= 80) {
    scoreLabel = 'Excellent';
    scoreColor = 'green';
  } else if (totalScore >= 60) {
    scoreLabel = 'Good';
    scoreColor = 'blue';
  } else if (totalScore >= 40) {
    scoreLabel = 'Fair';
    scoreColor = 'yellow';
  } else {
    scoreLabel = 'Needs Work';
    scoreColor = 'red';
  }

  return {
    score: totalScore,
    scoreLabel,
    scoreColor,
    found,
    missing,
    suggestions,
    bonusFound,
    wordCount: text.trim().split(/\s+/).length,
  };
}

export const CATEGORY_COLORS = {
  Language:        { bg: 'bg-violet-500/20', text: 'text-violet-300', border: 'border-violet-500/40', dot: 'bg-violet-400' },
  Web:             { bg: 'bg-blue-500/20',   text: 'text-blue-300',   border: 'border-blue-500/40',   dot: 'bg-blue-400' },
  Framework:       { bg: 'bg-cyan-500/20',   text: 'text-cyan-300',   border: 'border-cyan-500/40',   dot: 'bg-cyan-400' },
  Database:        { bg: 'bg-amber-500/20',  text: 'text-amber-300',  border: 'border-amber-500/40',  dot: 'bg-amber-400' },
  Tool:            { bg: 'bg-emerald-500/20',text: 'text-emerald-300',border: 'border-emerald-500/40',dot: 'bg-emerald-400' },
  'AI/ML':         { bg: 'bg-pink-500/20',   text: 'text-pink-300',   border: 'border-pink-500/40',   dot: 'bg-pink-400' },
  Architecture:    { bg: 'bg-orange-500/20', text: 'text-orange-300', border: 'border-orange-500/40', dot: 'bg-orange-400' },
  'CS Fundamentals':{ bg: 'bg-indigo-500/20',text: 'text-indigo-300', border: 'border-indigo-500/40', dot: 'bg-indigo-400' },
};

export const PRIORITY_CONFIG = {
  high:   { label: 'High Priority',   icon: '🔴', color: 'text-red-400',    bg: 'bg-red-500/10',    border: 'border-red-500/30' },
  medium: { label: 'Medium Priority', icon: '🟡', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
  low:    { label: 'Low Priority',    icon: '🟢', color: 'text-emerald-400',bg: 'bg-emerald-500/10',border: 'border-emerald-500/30' },
};
