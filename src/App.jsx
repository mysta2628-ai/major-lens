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

function EditorialCard({ children, className = '' }) {
  return (
    <div className={`rounded-[30px] border border-slate-200 bg-white ${className}`}>
      {children}
    </div>
  )
}

function PrimaryButton({ children, className = '', ...props }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  )
}

function SecondaryButton({ children, className = '', ...props }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  )
}

function ProgressBar({ value }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
      <div className="h-full rounded-full bg-slate-800 transition-all" style={{ width: `${value}%` }} />
    </div>
  )
}

function SectionIntro({ eyebrow, title, text }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-900 lg:text-4xl">{title}</h2>
      <p className="mt-3 text-base leading-7 text-slate-500">{text}</p>
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
    if (questionIndex < questions.length - 1) setQuestionIndex((prev) => prev + 1)
    else setScreen('results')
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
    <div className="min-h-screen bg-[#f7f6f2] text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-[#f7f6f2]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <button onClick={() => setScreen('home')} className="flex items-center gap-3 text-left">
            <div className="rounded-full border border-slate-300 bg-white p-3">
              <GraduationCap className="h-5 w-5 text-slate-700" />
            </div>
            <div>
              <div className="text-[2rem] font-semibold tracking-[-0.05em] text-slate-900">Major Lens</div>
              <p className="text-sm text-slate-500">Editorial academic prototype</p>
            </div>
          </button>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map(([key, label]) => (
              <button
                key={key}
                onClick={() => setScreen(key)}
                className={`text-sm transition ${
                  screen === key
                    ? 'font-semibold text-slate-900'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:py-14">
        <AnimatePresence mode="wait">
          {screen === 'home' && (
            <motion.section
              key="home"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-10"
            >
              <section className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
                <div className="max-w-4xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Reflective decision-support prototype
                  </p>

                  <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.96] tracking-[-0.06em] text-slate-900 lg:text-7xl">
                    Choose a degree direction with more clarity, less inherited pressure.
                  </h1>

                  <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">
                    Major Lens helps high school graduates and first-year university students explore possible study pathways through interests, values, analytical strengths, and real-world outcomes.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <PrimaryButton onClick={() => setScreen('assessment')}>
                      Start the assessment <ArrowRight className="ml-2 h-4 w-4" />
                    </PrimaryButton>
                    <SecondaryButton onClick={() => setScreen('explore')}>
                      Browse study directions
                    </SecondaryButton>
                  </div>
                </div>

                <EditorialCard className="overflow-hidden">
                  <div className="border-b border-slate-200 px-7 py-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">At a glance</p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-900">
                      A more reflective way to narrow your options
                    </h3>
                  </div>

                  <div className="space-y-6 px-7 py-7">
                    {[
                      {
                        label: 'Interests',
                        value: profile.curiosity,
                      },
                      {
                        label: 'Analytical structure',
                        value: profile.structure,
                      },
                      {
                        label: 'Values alignment',
                        value: profile.values,
                      },
                      {
                        label: 'Employment pressure',
                        value: profile.employment,
                      },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-700">{item.label}</span>
                          <span className="text-sm text-slate-400">{bandLabel(item.value)}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full rounded-full bg-slate-800" style={{ width: `${item.value}%` }} />
                        </div>
                      </div>
                    ))}

                    <div className="rounded-[24px] bg-slate-50 p-5">
                      <p className="text-sm font-medium text-slate-700">What this tool does</p>
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        It does not tell you who you are. It helps you compare possible directions more carefully.
                      </p>
                    </div>
                  </div>
                </EditorialCard>
              </section>

              <section className="grid gap-6 lg:grid-cols-3">
                {[
                  {
                    icon: Sparkles,
                    title: 'Interpret fit beyond prestige',
                    text: 'Move away from inherited assumptions and toward evidence about how you think, learn, and decide.',
                  },
                  {
                    icon: BarChart3,
                    title: 'Compare majors through multiple criteria',
                    text: 'Interest, structure, flexibility, social impact, and outcomes can all matter at once.',
                  },
                  {
                    icon: CheckCircle2,
                    title: 'Leave with a more defensible shortlist',
                    text: 'The aim is not certainty, but a clearer basis for your next round of exploration.',
                  },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <EditorialCard key={item.title} className="p-7">
                      <div className="rounded-full border border-slate-300 bg-slate-50 p-3 w-fit">
                        <Icon className="h-5 w-5 text-slate-700" />
                      </div>
                      <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-slate-900">{item.title}</h3>
                      <p className="mt-3 text-base leading-7 text-slate-500">{item.text}</p>
                    </EditorialCard>
                  )
                })}
              </section>
            </motion.section>
          )}

          {screen === 'assessment' && (
            <motion.section
              key="assessment"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="mx-auto max-w-4xl"
            >
              <EditorialCard className="p-8 lg:p-10">
                <SectionIntro
                  eyebrow="Assessment"
                  title="Build your academic profile"
                  text="Answer 20 short statements to clarify how you learn, what motivates you, and how strongly employability pressure is shaping your decision."
                />

                <div className="mt-8 space-y-2">
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>
                      Question {questionIndex + 1} of {questions.length}
                    </span>
                    <span>{Math.round(((questionIndex + 1) / questions.length) * 100)}%</span>
                  </div>
                  <ProgressBar value={((questionIndex + 1) / questions.length) * 100} />
                </div>

                <div className="mt-10 rounded-[28px] bg-[#fbfaf7] p-6 ring-1 ring-slate-200">
                  <p className="text-2xl font-medium leading-9 tracking-[-0.02em] text-slate-900">
                    {currentQuestion.text}
                  </p>

                  <div className="mt-7 grid gap-3">
                    {likert.map((option) => {
                      const selected = answers[currentQuestion.id] === option.value
                      return (
                        <button
                          key={option.value}
                          onClick={() => setAnswer(option.value)}
                          className={`rounded-[20px] border px-4 py-4 text-left transition ${
                            selected
                              ? 'border-slate-900 bg-slate-900 text-white'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{option.label}</span>
                            <span className={`text-sm ${selected ? 'text-slate-300' : 'text-slate-400'}`}>
                              {option.value}
                            </span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                  <SecondaryButton onClick={prevQuestion} disabled={questionIndex === 0}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                  </SecondaryButton>

                  <div className="text-sm text-slate-500">
                    Interests · Strengths · Values · Pressures
                  </div>

                  <PrimaryButton onClick={nextQuestion} disabled={!answers[currentQuestion.id]}>
                    {questionIndex === questions.length - 1 ? 'Finish assessment' : 'Next'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </PrimaryButton>
                </div>
              </EditorialCard>
            </motion.section>
          )}

          {screen === 'results' && (
            <motion.section
              key="results"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]"
            >
              <EditorialCard className="p-8 lg:p-10">
                <SectionIntro
                  eyebrow="Results"
                  title="Your Major Lens profile"
                  text={`${summary.line1} ${summary.line2}`}
                />

                <div className="mt-10 space-y-7">
                  {Object.entries(profile).map(([key, value]) => (
                    <div key={key}>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">{sentenceCase(key)}</span>
                        <span className="text-sm text-slate-400">{bandLabel(value)}</span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-slate-900" style={{ width: `${value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </EditorialCard>

              <div className="grid gap-6">
                <EditorialCard className="p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Interpretation</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-900">What stands out</h3>
                  <p className="mt-4 text-base leading-7 text-slate-500">{summary.standout}</p>
                </EditorialCard>

                <EditorialCard className="p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Leading direction</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-900">{topMatch?.title}</h3>
                  <p className="mt-4 text-base leading-7 text-slate-500">
                    This pathway currently ranks highest because your profile aligns with its mix of learning style, values fit, and outcome pattern.
                  </p>
                </EditorialCard>

                <EditorialCard className="p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Next move</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-900">Use this as a starting point</h3>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <PrimaryButton onClick={() => setScreen('explore')}>Explore matching directions</PrimaryButton>
                    <SecondaryButton onClick={resetAssessment}>Retake assessment</SecondaryButton>
                  </div>
                </EditorialCard>
              </div>
            </motion.section>
          )}

          {screen === 'explore' && (
            <motion.section
              key="explore"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-8"
            >
              <SectionIntro
                eyebrow="Explore"
                title="Study directions that may fit you"
                text="Rather than pointing to one correct answer, the tool highlights several plausible directions for deeper investigation."
              />

              <div className="grid gap-6 lg:grid-cols-3">
                {rankedMajors.map((major, index) => {
                  const Icon = major.icon
                  return (
                    <EditorialCard key={major.id} className="p-7">
                      <div className="flex items-center justify-between">
                        <div className="rounded-full border border-slate-300 bg-slate-50 p-3">
                          <Icon className="h-5 w-5 text-slate-700" />
                        </div>
                        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                          Match {index + 1}
                        </div>
                      </div>

                      <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-slate-900">{major.title}</h3>
                      <p className="mt-2 text-sm text-slate-400">Overall fit score: {major.fit}/100</p>

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
                    </EditorialCard>
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
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
            >
              <EditorialCard className="p-8 lg:p-10">
                <SectionIntro
                  eyebrow="Compare"
                  title="Compare your options"
                  text="Most students are not choosing between certainty and uncertainty. They are choosing between several plausible futures."
                />

                <div className="mt-8 overflow-x-auto">
                  <table className="w-full min-w-[760px] border-separate border-spacing-y-3 text-left">
                    <thead>
                      <tr className="text-sm text-slate-400">
                        <th className="px-4 py-2">Criteria</th>
                        {majorData.map((major) => (
                          <th key={major.id} className="px-4 py-2">{major.title}</th>
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
                        <tr key={key} className="bg-[#fbfaf7]">
                          <td className="rounded-l-2xl px-4 py-4 font-medium text-slate-800">{label}</td>
                          {majorData.map((major) => {
                            const highlighted = priority === key
                            return (
                              <td
                                key={major.id + key}
                                className={`px-4 py-4 ${
                                  highlighted ? 'font-semibold text-slate-900' : 'text-slate-500'
                                }`}
                              >
                                {bandLabel(major.scores[key])}
                              </td>
                            )
                          })}
                        </tr>
                      ))}

                      <tr className="bg-[#fbfaf7]">
                        <td className="rounded-l-2xl px-4 py-4 font-medium text-slate-800">Assessment style</td>
                        {majorData.map((major) => (
                          <td key={major.id + 'assessment'} className="px-4 py-4 text-slate-500">
                            {major.assessmentStyle}
                          </td>
                        ))}
                      </tr>

                      <tr className="bg-[#fbfaf7]">
                        <td className="rounded-l-2xl px-4 py-4 font-medium text-slate-800">Work style after graduation</td>
                        {majorData.map((major) => (
                          <td key={major.id + 'work'} className="px-4 py-4 text-slate-500">
                            {major.workStyle}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </EditorialCard>

              <div className="grid gap-6">
                <EditorialCard className="p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Priority lens</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-900">
                    What matters most right now?
                  </h3>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {priorities.map((item) => (
                      <button
                        key={item.key}
                        onClick={() => setPriority(item.key)}
                        className={`rounded-full px-4 py-2 text-sm transition ${
                          priority === item.key
                            ? 'bg-slate-900 text-white'
                            : 'border border-slate-300 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </EditorialCard>

                <EditorialCard className="p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Current leader</p>
                  {(() => {
                    const top = [...majorData].sort((a, b) => b.scores[priority] - a.scores[priority])[0]
                    return (
                      <>
                        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-900">{top.title}</h3>
                        <p className="mt-4 text-base leading-7 text-slate-500">
                          This option currently performs strongest on{' '}
                          <span className="font-medium text-slate-700">
                            {priorities.find((p) => p.key === priority)?.label.toLowerCase()}
                          </span>.
                        </p>
                      </>
                    )
                  })()}
                </EditorialCard>

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
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-8"
            >
              <SectionIntro
                eyebrow="Next steps"
                title="Your next step, not your final answer"
                text="A useful decision tool should not force certainty too early. It should help you ask better questions and gather better evidence."
              />

              <div className="grid gap-6 lg:grid-cols-2">
                <EditorialCard className="p-7">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-slate-900">Reflection prompts</h3>
                  <div className="mt-5 space-y-4">
                    {[
                      'Which recommendation feels genuinely exciting, not merely safe?',
                      'Which option fits your values as well as your abilities?',
                      'What information do you still need before committing to a degree path?',
                    ].map((prompt) => (
                      <div key={prompt} className="rounded-[22px] bg-[#fbfaf7] p-4 text-slate-600 ring-1 ring-slate-200">
                        {prompt}
                      </div>
                    ))}
                  </div>
                </EditorialCard>

                <EditorialCard className="p-7">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-slate-900">Suggested actions</h3>
                  <div className="mt-5 space-y-4">
                    {[
                      'Explore degree structures for your top two study directions on university websites.',
                      'Talk to current students studying these majors or attend university information sessions.',
                      'Compare sample first-year courses across universities offering these study directions.',
                    ].map((action) => (
                      <div key={action} className="rounded-[22px] bg-[#fbfaf7] p-4 text-slate-600 ring-1 ring-slate-200">
                        {action}
                      </div>
                    ))}
                  </div>
                </EditorialCard>
              </div>

              <EditorialCard className="p-8 lg:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Summary</p>
                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
                  You are not lacking direction.
                </h3>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-500">
                  You are balancing curiosity with caution. Your next best step is to explore two possible study directions before committing to a degree path.
                </p>

                <div className="mt-7 rounded-[26px] bg-[#fbfaf7] p-6 ring-1 ring-slate-200">
                  <p className="font-medium text-slate-800">About Major Lens</p>
                  <p className="mt-2 text-base leading-7 text-slate-500">
                    Major Lens is a concept tool designed to support more reflective and informed degree choice. It does not replace university advising, but helps students make their decision process clearer and more structured.
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <PrimaryButton onClick={() => setScreen('home')}>Back to home</PrimaryButton>
                  <SecondaryButton onClick={resetAssessment}>Start again</SecondaryButton>
                </div>
              </EditorialCard>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
