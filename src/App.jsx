import React, { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Briefcase,
  CheckCircle2,
  Compass,
  GraduationCap,
  Scale,
  Sparkles,
} from 'lucide-react'

const questions = [
  { id: 1, text: 'I enjoy subjects that ask me to interpret ideas, arguments, or social issues.', scale: 'curiosity' },
  { id: 2, text: 'I prefer tasks with clear methods and correct answers.', scale: 'structure' },
  { id: 3, text: 'A major’s long-term income matters a lot in my decision.', scale: 'employment' },
  { id: 4, text: 'I would consider a field I truly enjoy even if its career path is less predictable.', scale: 'values' },
  { id: 5, text: 'I like discussing institutions, law, politics, or public issues.', scale: 'curiosity' },
  { id: 6, text: 'I feel confident when working through structured analysis or quantitative logic.', scale: 'structure' },
  { id: 7, text: 'Choosing a major that feels meaningful is just as important as choosing a practical one.', scale: 'values' },
  { id: 8, text: 'Job security makes me rule out some majors before I explore them deeply.', scale: 'employment' },
  { id: 9, text: 'I’m drawn to questions about society, justice, and how systems shape people’s lives.', scale: 'curiosity' },
  { id: 10, text: 'I prefer assignments where expectations, methods, and success criteria are clear.', scale: 'structure' },
  { id: 11, text: 'A major should reflect what I care about, not only what the market rewards.', scale: 'values' },
  { id: 12, text: 'I often worry that liking a subject is not enough if the career outcomes seem uncertain.', scale: 'employment' },
  { id: 13, text: 'I enjoy analysing complex social problems that do not have one correct answer.', scale: 'curiosity' },
  { id: 14, text: 'I prefer learning environments where evaluation criteria are explicit and predictable.', scale: 'structure' },
  { id: 15, text: 'It is important that my future work contributes to society in a meaningful way.', scale: 'values' },
  { id: 16, text: 'I feel pressure to choose a major with strong employment prospects even if it is not my first interest.', scale: 'employment' },
  { id: 17, text: 'Reading theory, arguments, or policy debates feels intellectually engaging to me.', scale: 'curiosity' },
  { id: 18, text: 'I am comfortable working with numbers, models, or structured frameworks to solve problems.', scale: 'structure' },
  { id: 19, text: 'Personal interest should guide my academic decisions more than external expectations.', scale: 'values' },
  { id: 20, text: 'Concerns about salary or job stability strongly influence how I evaluate different majors.', scale: 'employment' },
]

const likert = [
  { label: 'Strongly disagree', value: 1 },
  { label: 'Disagree', value: 2 },
  { label: 'Neutral', value: 3 },
  { label: 'Agree', value: 4 },
  { label: 'Strongly agree', value: 5 },
]

const majorData = [
  {
    id: 'law',
    title: 'Law & Legal Studies',
    icon: Scale,
    why: 'You show strong interest in argument, institutions, public issues, and analytical reading.',
    learning: 'Reading-intensive, discussion-based, case-focused, and argumentative.',
    careers: 'Law, public policy, advocacy, government, compliance, consulting.',
    scores: {
      interest: 92,
      strength: 88,
      values: 90,
      flexibility: 74,
      stability: 78,
      income: 82,
      socialImpact: 95,
    },
    assessmentStyle: 'Essays, cases, argument',
    workStyle: 'Structured, persuasive, institutional',
  },
  {
    id: 'social',
    title: 'Social Sciences & Global Studies',
    icon: Compass,
    why: 'You appear motivated by understanding people, systems, institutions, and real-world issues.',
    learning: 'Research, writing, theory, policy analysis, and critical reflection.',
    careers: 'Research, NGOs, public sector, communications, strategy, international work.',
    scores: {
      interest: 89,
      strength: 80,
      values: 91,
      flexibility: 69,
      stability: 65,
      income: 60,
      socialImpact: 93,
    },
    assessmentStyle: 'Essays, reports, analysis',
    workStyle: 'Analytical, people-focused, research-based',
  },
  {
    id: 'business',
    title: 'Business & Economics',
    icon: Briefcase,
    why: 'You balance practical concerns with interest in systems, incentives, outcomes, and structured analysis.',
    learning: 'Applied analysis, data interpretation, problem-solving, and decision models.',
    careers: 'Finance, management, consulting, business analysis, economics, operations.',
    scores: {
      interest: 76,
      strength: 90,
      values: 70,
      flexibility: 92,
      stability: 90,
      income: 91,
      socialImpact: 62,
    },
    assessmentStyle: 'Exams, reports, quantitative tasks',
    workStyle: 'Commercial, analytical, outcome-driven',
  },
]

const priorities = [
  { key: 'interest', label: 'Interest' },
  { key: 'stability', label: 'Stability' },
  { key: 'socialImpact', label: 'Social impact' },
  { key: 'flexibility', label: 'Flexibility' },
  { key: 'income', label: 'Income potential' },
]

function scoreToPercent(avg) {
  return Math.round(((avg - 1) / 4) * 100)
}

function bandLabel(value) {
  if (value >= 80) return 'High'
  if (value >= 60) return 'Moderate'
  return 'Developing'
}

function sentenceCase(scale) {
  const map = {
    curiosity: 'Intellectual Curiosity',
    structure: 'Structured / Analytical Strength',
    values: 'Values Alignment',
    employment: 'Employment Dependence',
  }
  return map[scale]
}

function SectionCard({ className = '', children }) {
  return (
    <div
      className={`rounded-[28px] border border-slate-200 bg-white shadow-[0_6px_24px_rgba(15,23,42,0.04)] ${className}`}
    >
      {children}
    </div>
  )
}

function PrimaryButton({ children, className = '', ...props }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-xl bg-slate-800 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  )
}

function SecondaryButton({ children, className = '', ...props }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  )
}

function ProgressBar({ value }) {
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
      <div
        className="h-full rounded-full bg-slate-700 transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState('home')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [priority, setPriority] = useState('interest')

  const currentQuestion = questions[questionIndex]

  const profile = useMemo(() => {
    const grouped = {
      curiosity: [],
      structure: [],
      values: [],
      employment: [],
    }

    questions.forEach((q) => {
      if (answers[q.id]) grouped[q.scale].push(answers[q.id])
    })

    return Object.fromEntries(
      Object.entries(grouped).map(([key, arr]) => {
        const avg = arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 3
        return [key, scoreToPercent(avg)]
      })
    )
  }, [answers])

  const summary = useMemo(() => {
    const s = profile.structure
    const e = profile.employment

    let line1 = 'You appear motivated by interest, meaning, and reflective decision-making'
    if (s >= 75) line1 += ', with a strong preference for structured thinking'
    line1 += '.'

    let line2 = 'Your choices'
    if (e >= 70) line2 += ' are also shaped by a strong concern for stability and employability.'
    else if (e >= 50) line2 += ' are shaped by a moderate concern for stability and future outcomes.'
    else line2 += ' seem to be guided more by fit than by external labour-market pressure.'

    let standout = 'You care about finding a study direction that feels meaningful and intellectually sustainable'
    if (e >= 65) standout += ', but you may also be filtering options through career security concerns earlier than necessary.'
    else if (s >= 75) standout += ', and you may do particularly well in pathways that combine reflection with rigorous analysis.'
    else standout += ', which suggests that deeper exploration may be more useful than quick elimination.'

    return { line1, line2, standout }
  }, [profile])

  const rankedMajors = useMemo(() => {
    return [...majorData]
      .map((major) => {
        const fit =
          major.scores.interest * (profile.curiosity / 100) * 0.3 +
          major.scores.strength * (profile.structure / 100) * 0.25 +
          major.scores.values * (profile.values / 100) * 0.25 +
          major.scores.stability * (profile.employment / 100) * 0.2

        return { ...major, fit: Math.round(fit) }
      })
      .sort((a, b) => b.fit - a.fit)
  }, [profile])

  const topMatch = rankedMajors[0]

  function setAnswer(value) {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }))
  }

  function nextQuestion() {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((prev) => prev + 1)
    } else {
      setScreen('results')
    }
  }

  function prevQuestion() {
    if (questionIndex > 0) setQuestionIndex((prev) => prev - 1)
  }

  function resetAssessment() {
    setAnswers({})
    setQuestionIndex(0)
    setScreen('assessment')
  }

  const navItems = [
    ['home', 'Home'],
    ['assessment', 'Assessment'],
    ['results', 'Results'],
    ['explore', 'Explore'],
    ['compare', 'Compare'],
    ['next', 'Next Steps'],
  ]

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-800">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-[#f5f7fb]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <button
            onClick={() => setScreen('home')}
            className="flex items-center gap-3 text-left"
          >
            <div className="rounded-xl border border-slate-200 bg-white p-2.5">
              <GraduationCap className="h-5 w-5 text-slate-700" />
            </div>
            <div>
              <div className="text-[1.65rem] font-semibold tracking-[-0.03em] text-slate-800">
                Major Lens
              </div>
              <p className="text-sm text-slate-500">An academic decision tool</p>
            </div>
          </button>

          <nav className="hidden items-center gap-2 lg:flex">
            {navItems.map(([key, label]) => (
              <button
                key={key}
                onClick={() => setScreen(key)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  screen === key
                    ? 'bg-slate-800 text-white'
                    : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <AnimatePresence mode="wait">
          {screen === 'home' && (
            <motion.section
              key="home"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]"
            >
              <SectionCard className="p-8 lg:p-12">
                <div className="mb-5 inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                  Reflective decision-support prototype
                </div>

                <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] text-slate-800 lg:text-6xl">
                  Choose a degree direction based on interests, values, and real-world outcomes.
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-500">
                  <span className="font-semibold text-slate-700">Major Lens</span> helps high school graduates and first-year university students explore degree pathways using structured self-assessment across interests, values, and employment expectations.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <PrimaryButton onClick={() => setScreen('assessment')}>
                    Start the assessment <ArrowRight className="ml-2 h-4 w-4" />
                  </PrimaryButton>
                  <SecondaryButton onClick={() => setScreen('explore')}>
                    See the tool
                  </SecondaryButton>
                </div>
              </SectionCard>

              <div className="grid gap-4">
                {[
                  {
                    icon: Sparkles,
                    title: 'Clarify what actually fits you',
                    text: 'Move beyond assumptions and identify study directions that align with how you think, learn, and decide.',
                  },
                  {
                    icon: BarChart3,
                    title: 'Compare majors beyond salary',
                    text: 'Weigh interest, structure, flexibility, social impact, and outcomes instead of relying on one metric.',
                  },
                  {
                    icon: CheckCircle2,
                    title: 'Turn uncertainty into a clearer next step',
                    text: 'Leave with a smaller, more defensible shortlist rather than a vague sense of direction.',
                  },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <SectionCard key={item.title} className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                          <Icon className="h-5 w-5 text-slate-700" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800">{item.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-slate-500">{item.text}</p>
                        </div>
                      </div>
                    </SectionCard>
                  )
                })}
              </div>
            </motion.section>
          )}

          {screen === 'assessment' && (
            <motion.section
              key="assessment"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              className="mx-auto max-w-4xl"
            >
              <SectionCard className="p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-800">
                      Build your academic profile
                    </h2>
                    <p className="mt-2 max-w-2xl text-base leading-7 text-slate-500">
                      Answer 20 short statements to help identify how you learn, what motivates you, and how strongly employability pressures influence your decision-making.
                    </p>
                  </div>
                  <div className="text-sm text-slate-500">Estimated time: 5–7 minutes</div>
                </div>

                <div className="mt-6 space-y-2">
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>
                      Question {questionIndex + 1} of {questions.length}
                    </span>
                    <span>{Math.round(((questionIndex + 1) / questions.length) * 100)}%</span>
                  </div>
                  <ProgressBar value={((questionIndex + 1) / questions.length) * 100} />
                </div>

                <div className="mt-8 rounded-[24px] border border-slate-200 bg-slate-50 p-6">
                  <p className="text-xl font-medium leading-8 text-slate-800">
                    {currentQuestion.text}
                  </p>

                  <div className="mt-6 grid gap-3">
                    {likert.map((option) => {
                      const selected = answers[currentQuestion.id] === option.value
                      return (
                        <button
                          key={option.value}
                          onClick={() => setAnswer(option.value)}
                          className={`rounded-2xl border px-4 py-4 text-left transition ${
                            selected
                              ? 'border-slate-800 bg-slate-800 text-white'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{option.label}</span>
                            <span className={`text-sm ${selected ? 'text-slate-200' : 'text-slate-400'}`}>
                              {option.value}
                            </span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <SecondaryButton onClick={prevQuestion} disabled={questionIndex === 0}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                  </SecondaryButton>

                  <div className="text-sm text-slate-500">
                    Four dimensions: Intellectual Interests · Academic Strengths · Personal Values · Decision Pressures
                  </div>

                  <PrimaryButton onClick={nextQuestion} disabled={!answers[currentQuestion.id]}>
                    {questionIndex === questions.length - 1 ? 'Finish assessment' : 'Next'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </PrimaryButton>
                </div>
              </SectionCard>
            </motion.section>
          )}

          {screen === 'results' && (
            <motion.section
              key="results"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
            >
              <SectionCard className="p-8">
                <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-800">
                  Your Major Lens profile
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
                  {summary.line1} {summary.line2}
                </p>

                <div className="mt-8 space-y-6">
                  {Object.entries(profile).map(([key, value]) => (
                    <div key={key}>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-medium text-slate-700">{sentenceCase(key)}</span>
                        <span className="text-sm text-slate-500">{bandLabel(value)}</span>
                      </div>
                      <div className="h-3.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-slate-700"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <div className="grid gap-6">
                <SectionCard className="p-7">
                  <h3 className="text-xl font-semibold text-slate-800">What stands out</h3>
                  <p className="mt-3 leading-7 text-slate-500">{summary.standout}</p>
                </SectionCard>

                <SectionCard className="p-7">
                  <h3 className="text-xl font-semibold text-slate-800">Current strongest match</h3>
                  <p className="mt-3 text-lg font-semibold text-slate-700">{topMatch?.title}</p>
                  <p className="mt-2 leading-7 text-slate-500">
                    This recommendation is currently strongest because your profile shows a close alignment with its expected learning style, values fit, and decision pattern.
                  </p>
                </SectionCard>

                <SectionCard className="p-7">
                  <h3 className="text-xl font-semibold text-slate-800">Next move</h3>
                  <p className="mt-3 leading-7 text-slate-500">
                    Treat this result as a structured starting point, not a final verdict.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <PrimaryButton onClick={() => setScreen('explore')}>
                      Explore matching directions
                    </PrimaryButton>
                    <SecondaryButton onClick={resetAssessment}>
                      Retake assessment
                    </SecondaryButton>
                  </div>
                </SectionCard>
              </div>
            </motion.section>
          )}

          {screen === 'explore' && (
            <motion.section
              key="explore"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-800">
                  Study directions that may fit you
                </h2>
                <p className="mt-2 max-w-3xl text-slate-500">
                  Rather than offering one “correct” answer, the tool highlights several plausible study directions for deeper exploration.
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                {rankedMajors.map((major, index) => {
                  const Icon = major.icon
                  return (
                    <SectionCard key={major.id} className="p-7">
                      <div className="flex items-center justify-between">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                          <Icon className="h-5 w-5 text-slate-700" />
                        </div>
                        <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                          Match #{index + 1}
                        </div>
                      </div>

                      <h3 className="mt-5 text-2xl font-semibold tracking-[-0.02em] text-slate-800">
                        {major.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-500">Overall fit score: {major.fit}/100</p>

                      <div className="mt-6 space-y-5 text-sm leading-7 text-slate-500">
                        <div>
                          <p className="font-medium text-slate-800">Why it fits you</p>
                          <p>{major.why}</p>
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">Typical learning style</p>
                          <p>{major.learning}</p>
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">Could lead to</p>
                          <p>{major.careers}</p>
                        </div>
                      </div>
                    </SectionCard>
                  )
                })}
              </div>

              <div className="flex justify-end">
                <PrimaryButton onClick={() => setScreen('compare')}>
                  Compare these directions <ArrowRight className="ml-2 h-4 w-4" />
                </PrimaryButton>
              </div>
            </motion.section>
          )}

          {screen === 'compare' && (
            <motion.section
              key="compare"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
            >
              <SectionCard className="p-8">
                <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-800">
                  Compare your options
                </h2>
                <p className="mt-3 text-slate-500">
                  Students often are not completely unsure. More often, they are deciding between several plausible directions.
                </p>

                <div className="mt-6 overflow-x-auto">
                  <table className="w-full min-w-[760px] border-separate border-spacing-y-3 text-left">
                    <thead>
                      <tr className="text-sm text-slate-500">
                        <th className="px-4 py-2">Criteria</th>
                        {majorData.map((major) => (
                          <th key={major.id} className="px-4 py-2">
                            {major.title}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Interest fit', 'interest'],
                        ['Strength fit', 'strength'],
                        ['Values fit', 'values'],
                        ['Career flexibility', 'flexibility'],
                      ].map(([label, key]) => (
                        <tr key={key} className="bg-slate-50">
                          <td className="rounded-l-2xl px-4 py-4 font-medium text-slate-800">
                            {label}
                          </td>
                          {majorData.map((major) => {
                            const highlighted = priority === key
                            return (
                              <td
                                key={major.id + key}
                                className={`px-4 py-4 ${
                                  highlighted ? 'font-semibold text-slate-800' : 'text-slate-500'
                                }`}
                              >
                                {bandLabel(major.scores[key])}
                              </td>
                            )
                          })}
                        </tr>
                      ))}

                      <tr className="bg-slate-50">
                        <td className="rounded-l-2xl px-4 py-4 font-medium text-slate-800">
                          Assessment style
                        </td>
                        {majorData.map((major) => (
                          <td key={major.id + 'assessment'} className="px-4 py-4 text-slate-500">
                            {major.assessmentStyle}
                          </td>
                        ))}
                      </tr>

                      <tr className="bg-slate-50">
                        <td className="rounded-l-2xl px-4 py-4 font-medium text-slate-800">
                          Work style after graduation
                        </td>
                        {majorData.map((major) => (
                          <td key={major.id + 'work'} className="px-4 py-4 text-slate-500">
                            {major.workStyle}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </SectionCard>

              <div className="grid gap-6">
                <SectionCard className="p-7">
                  <h3 className="text-xl font-semibold text-slate-800">
                    What matters most to you right now?
                  </h3>
                  <p className="mt-2 text-slate-500">
                    Shift the priority to examine the same options through a different decision lens.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {priorities.map((item) => (
                      <button
                        key={item.key}
                        onClick={() => setPriority(item.key)}
                        className={`rounded-full px-4 py-2 text-sm transition ${
                          priority === item.key
                            ? 'bg-slate-800 text-white'
                            : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </SectionCard>

                <SectionCard className="p-7">
                  <h3 className="text-xl font-semibold text-slate-800">Current top match by priority</h3>
                  {(() => {
                    const top = [...majorData].sort((a, b) => b.scores[priority] - a.scores[priority])[0]
                    return (
                      <>
                        <p className="mt-3 text-lg font-semibold text-slate-700">{top.title}</p>
                        <p className="mt-2 leading-7 text-slate-500">
                          This option currently leads because it performs strongest on{' '}
                          <span className="font-medium text-slate-700">
                            {priorities.find((p) => p.key === priority)?.label.toLowerCase()}
                          </span>.
                        </p>
                      </>
                    )
                  })()}
                </SectionCard>

                <div className="flex justify-end">
                  <PrimaryButton onClick={() => setScreen('next')}>
                    See next steps <ArrowRight className="ml-2 h-4 w-4" />
                  </PrimaryButton>
                </div>
              </div>
            </motion.section>
          )}

          {screen === 'next' && (
            <motion.section
              key="next"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-800">
                  Your next step, not your final answer
                </h2>
                <p className="mt-2 max-w-3xl text-slate-500">
                  A useful decision tool should not force certainty too early. It should help you ask better questions and gather better evidence.
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <SectionCard className="p-7">
                  <h3 className="text-xl font-semibold text-slate-800">Reflection prompts</h3>
                  <div className="mt-5 space-y-4">
                    {[
                      'Which recommendation feels genuinely exciting, not merely safe?',
                      'Which option fits your values as well as your abilities?',
                      'What information do you still need before committing to a degree path?',
                    ].map((prompt) => (
                      <div
                        key={prompt}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-600"
                      >
                        {prompt}
                      </div>
                    ))}
                  </div>
                </SectionCard>

                <SectionCard className="p-7">
                  <h3 className="text-xl font-semibold text-slate-800">Suggested actions</h3>
                  <div className="mt-5 space-y-4">
                    {[
                      'Explore degree structures for your top two study directions on university websites.',
                      'Talk to current students studying these majors or attend university information sessions.',
                      'Compare sample first-year courses across universities offering these study directions.',
                    ].map((action) => (
                      <div
                        key={action}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-600"
                      >
                        {action}
                      </div>
                    ))}
                  </div>
                </SectionCard>
              </div>

              <SectionCard className="p-8">
                <h3 className="text-xl font-semibold text-slate-800">Summary</h3>
                <p className="mt-3 leading-7 text-slate-500">
                  You are not lacking direction. You are balancing curiosity with caution. Your next best step is to explore two possible study directions before committing to a degree path.
                </p>

                <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                  <p className="font-medium text-slate-800">About Major Lens</p>
                  <p className="mt-2 leading-7 text-slate-500">
                    Major Lens is a concept tool designed to support more reflective and informed degree choice. It does not replace university advising, but helps students make their decision process clearer and more structured.
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <PrimaryButton onClick={() => setScreen('home')}>
                    Back to home
                  </PrimaryButton>
                  <SecondaryButton onClick={resetAssessment}>
                    Start again
                  </SecondaryButton>
                </div>
              </SectionCard>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
