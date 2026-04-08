import React, { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Compass,
  GraduationCap,
  Scale,
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
    <div className={`rounded-[30px] border border-[#d9ddd5] bg-white ${className}`}>
      {children}
    </div>
  )
}

function PrimaryButton({ children, className = '', ...props }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-full bg-[#29443a] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#1f352d] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  )
}

function SecondaryButton({ children, className = '', ...props }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-full border border-[#cfd5cb] bg-white px-5 py-3 text-sm font-medium text-[#486156] transition hover:bg-[#f1f2ec] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  )
}

function ProgressBar({ value }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-[#e6e9e1]">
      <div className="h-full rounded-full bg-[#29443a] transition-all" style={{ width: `${value}%` }} />
    </div>
  )
}

function SectionIntro({ eyebrow, title, text }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a9488]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#21352d] lg:text-4xl">{title}</h2>
      <p className="mt-3 text-base leading-7 text-[#5f6d62]">{text}</p>
    </div>
  )
}

function HomeValueCard({ title, text }) {
  return (
    <div className="rounded-[24px] border border-[#d9ddd5] bg-white p-6">
      <h3 className="text-xl font-semibold tracking-[-0.02em] text-[#21352d]">{title}</h3>
      <p className="mt-3 leading-7 text-[#5f6d62]">{text}</p>
    </div>
  )
}

function HomeStepCard({ number, title, text }) {
  return (
    <div>
      <h3 className="text-xl font-semibold tracking-[-0.02em] text-[#21352d]">
        {number}. {title}
      </h3>
      <p className="mt-3 leading-7 text-[#5f6d62]">{text}</p>
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
    else setScreen('profile')
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
    ['profile', 'Profile'],
    ['explore', 'Explore'],
    ['compare', 'Compare'],
    ['next', 'Next Steps'],
  ]

  return (
    <div className="min-h-screen bg-[#f6f4ef] text-[#21352d]">
      <header className="sticky top-0 z-30 border-b border-[#d9ddd5] bg-[#f6f4ef]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <button onClick={() => setScreen('home')} className="flex items-center gap-3 text-left">
            <div className="rounded-full border border-[#cfd5cb] bg-white p-3">
              <GraduationCap className="h-5 w-5 text-[#486156]" />
            </div>
            <div>
              <div className="text-[2rem] font-semibold tracking-[-0.05em] text-[#21352d]">Major Lens</div>
              <p className="text-sm text-[#6f7d68]">Reflective academic decision-support prototype</p>
            </div>
          </button>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map(([key, label]) => (
              <button
                key={key}
                onClick={() => setScreen(key)}
                className={`text-sm transition ${
                  screen === key
                    ? 'font-semibold text-[#29443a]'
                    : 'text-[#6f7d68] hover:text-[#29443a]'
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
              className="space-y-16"
            >
              <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
                <div className="max-w-4xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8a9488]">
                    Reflective academic decision-support prototype
                  </p>

                  <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.96] tracking-[-0.06em] text-[#21352d] lg:text-7xl">
                    Choose a degree direction with more clarity, less inherited pressure.
                  </h1>

                  <p className="mt-8 max-w-2xl text-lg leading-8 text-[#5f6d62]">
                    Major Lens helps high school graduates and first-year university students make more balanced major decisions through a structured assessment of interests, strengths, values, and employment pressure.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <PrimaryButton onClick={() => setScreen('assessment')}>
                      Take the 5-minute assessment
                    </PrimaryButton>
                    <SecondaryButton onClick={() => setScreen('explore')}>
                      Explore study directions
                    </SecondaryButton>
                  </div>
                </div>

                <aside>
                  <EditorialCard className="p-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a9488]">
                      At a glance
                    </p>

                    <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#21352d]">
                      Your decision profile
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-[#5f6d62]">
                      A preview of the dimensions Major Lens helps you reflect on.
                    </p>

                    <dl className="mt-7 space-y-4">
                      {[
                        ['Interests', 'Emerging focus'],
                        ['Analytical structure', 'Moderate preference'],
                        ['Values alignment', 'Strong importance'],
                        ['Employment pressure', 'Active influence'],
                      ].map(([label, value]) => (
                        <div key={label} className="flex items-center justify-between gap-4 border-b border-[#ecefe8] pb-3 last:border-b-0 last:pb-0">
                          <dt className="text-[#486156]">{label}</dt>
                          <dd className="text-right font-medium text-[#21352d]">{value}</dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-8 rounded-[24px] bg-[#f1f2ec] p-5">
                      <h3 className="text-sm font-semibold text-[#486156]">What this tool does</h3>
                      <p className="mt-2 text-sm leading-6 text-[#5f6d62]">
                        Major Lens does not tell you who you are. It helps you identify what is driving your decision, compare study directions more carefully, and leave with a clearer shortlist.
                      </p>
                    </div>
                  </EditorialCard>
                </aside>
              </section>

              <section className="grid gap-6 lg:grid-cols-3">
                <HomeValueCard
                  title="Interpret fit beyond prestige"
                  text="Move away from inherited assumptions and toward evidence about how you think, learn, and decide."
                />
                <HomeValueCard
                  title="Compare majors through multiple criteria"
                  text="Interest, structure, flexibility, values, and outcomes can all matter at once, instead of letting salary dominate the decision."
                />
                <HomeValueCard
                  title="Leave with a clearer shortlist"
                  text="The goal is not certainty, but a more confident and defensible next step in your exploration."
                />
              </section>

              <section id="how-it-works" className="space-y-8">
                <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#21352d]">
                  How Major Lens works
                </h2>

                <div className="grid gap-10 lg:grid-cols-3">
                  <HomeStepCard
                    number="1"
                    title="Assess"
                    text="Answer 20 short statements about your interests, analytical strengths, values, and current decision pressures."
                  />
                  <HomeStepCard
                    number="2"
                    title="Interpret"
                    text="Receive a profile that shows what may be shaping your current major decision — including where job pressure may be outweighing genuine fit."
                  />
                  <HomeStepCard
                    number="3"
                    title="Compare"
                    text="Explore recommended study directions and compare them across criteria such as learning style, flexibility, values, and outcomes."
                  />
                </div>
              </section>

              <section className="mx-auto max-w-4xl border-t border-[#d9ddd5] pt-12 text-center">
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#21352d]">
                  Designed for reflective major exploration
                </h2>
                <p className="mt-4 leading-8 text-[#5f6d62]">
                  Major Lens is a concept tool for students who want a more thoughtful way to narrow their options. It is not a replacement for academic advising, but a structured starting point for better questions and better comparisons.
                </p>
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
                  <div className="flex items-center justify-between text-sm text-[#6f7d68]">
                    <span>
                      Question {questionIndex + 1} of {questions.length}
                    </span>
                    <span>{Math.round(((questionIndex + 1) / questions.length) * 100)}%</span>
                  </div>
                  <ProgressBar value={((questionIndex + 1) / questions.length) * 100} />
                </div>

                <div className="mt-10 rounded-[28px] bg-[#fbfaf7] p-6 ring-1 ring-[#d9ddd5]">
                  <p className="text-2xl font-medium leading-9 tracking-[-0.02em] text-[#21352d]">
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
                              ? 'border-[#29443a] bg-[#29443a] text-white'
                              : 'border-[#d9ddd5] bg-white text-[#486156] hover:bg-[#f8f8f4]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{option.label}</span>
                            <span className={`text-sm ${selected ? 'text-[#dfe6e1]' : 'text-[#8a9488]'}`}>
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

                  <div className="text-sm text-[#6f7d68]">
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

          {screen === 'profile' && (
            <motion.section
              key="profile"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]"
            >
              <EditorialCard className="p-8 lg:p-10">
                <SectionIntro
                  eyebrow="Profile"
                  title="Your Major Lens profile"
                  text={`${summary.line1} ${summary.line2}`}
                />

                <div className="mt-10 space-y-7">
                  {Object.entries(profile).map(([key, value]) => (
                    <div key={key}>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-[#486156]">{sentenceCase(key)}</span>
                        <span className="text-sm text-[#8a9488]">{bandLabel(value)}</span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-[#e6e9e1]">
                        <div className="h-full rounded-full bg-[#29443a]" style={{ width: `${value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </EditorialCard>

              <div className="grid gap-6">
                <EditorialCard className="p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a9488]">Interpretation</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#21352d]">What stands out</h3>
                  <p className="mt-4 text-base leading-7 text-[#5f6d62]">{summary.standout}</p>
                </EditorialCard>

                <EditorialCard className="p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a9488]">Leading direction</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#21352d]">{topMatch?.title}</h3>
                  <p className="mt-4 text-base leading-7 text-[#5f6d62]">
                    This pathway currently ranks highest because your profile aligns with its mix of learning style, values fit, and outcome pattern.
                  </p>
                </EditorialCard>

                <EditorialCard className="p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a9488]">Next move</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#21352d]">Use this as a starting point</h3>
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
                        <div className="rounded-full border border-[#cfd5cb] bg-[#f1f2ec] p-3">
                          <Icon className="h-5 w-5 text-[#486156]" />
                        </div>
                        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8a9488]">
                          Match {index + 1}
                        </div>
                      </div>

                      <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-[#21352d]">{major.title}</h3>
                      <p className="mt-2 text-sm text-[#8a9488]">Overall fit score: {major.fit}/100</p>

                      <div className="mt-6 space-y-5 text-sm leading-7 text-[#5f6d62]">
                        <div>
                          <p className="font-medium text-[#486156]">Why it fits you</p>
                          <p>{major.why}</p>
                        </div>
                        <div>
                          <p className="font-medium text-[#486156]">Typical learning style</p>
                          <p>{major.learning}</p>
                        </div>
                        <div>
                          <p className="font-medium text-[#486156]">Could lead to</p>
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
                      <tr className="text-sm text-[#8a9488]">
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
                          <td className="rounded-l-2xl px-4 py-4 font-medium text-[#486156]">{label}</td>
                          {majorData.map((major) => {
                            const highlighted = priority === key
                            return (
                              <td
                                key={major.id + key}
                                className={`px-4 py-4 ${
                                  highlighted ? 'font-semibold text-[#21352d]' : 'text-[#5f6d62]'
                                }`}
                              >
                                {bandLabel(major.scores[key])}
                              </td>
                            )
                          })}
                        </tr>
                      ))}

                      <tr className="bg-[#fbfaf7]">
                        <td className="rounded-l-2xl px-4 py-4 font-medium text-[#486156]">Assessment style</td>
                        {majorData.map((major) => (
                          <td key={major.id + 'assessment'} className="px-4 py-4 text-[#5f6d62]">
                            {major.assessmentStyle}
                          </td>
                        ))}
                      </tr>

                      <tr className="bg-[#fbfaf7]">
                        <td className="rounded-l-2xl px-4 py-4 font-medium text-[#486156]">Work style after graduation</td>
                        {majorData.map((major) => (
                          <td key={major.id + 'work'} className="px-4 py-4 text-[#5f6d62]">
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
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a9488]">Priority lens</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#21352d]">
                    What matters most right now?
                  </h3>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {priorities.map((item) => (
                      <button
                        key={item.key}
                        onClick={() => setPriority(item.key)}
                        className={`rounded-full px-4 py-2 text-sm transition ${
                          priority === item.key
                            ? 'bg-[#29443a] text-white'
                            : 'border border-[#cfd5cb] bg-white text-[#486156] hover:bg-[#f1f2ec]'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </EditorialCard>

                <EditorialCard className="p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a9488]">Current leader</p>
                  {(() => {
                    const top = [...majorData].sort((a, b) => b.scores[priority] - a.scores[priority])[0]
                    return (
                      <>
                        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#21352d]">{top.title}</h3>
                        <p className="mt-4 text-base leading-7 text-[#5f6d62]">
                          This option currently performs strongest on{' '}
                          <span className="font-medium text-[#486156]">
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
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#21352d]">Reflection prompts</h3>
                  <div className="mt-5 space-y-4">
                    {[
                      'Which recommendation feels genuinely exciting, not merely safe?',
                      'Which option fits your values as well as your abilities?',
                      'What information do you still need before committing to a degree path?',
                    ].map((prompt) => (
                      <div key={prompt} className="rounded-[22px] bg-[#fbfaf7] p-4 text-[#5f6d62] ring-1 ring-[#d9ddd5]">
                        {prompt}
                      </div>
                    ))}
                  </div>
                </EditorialCard>

                <EditorialCard className="p-7">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#21352d]">Suggested actions</h3>
                  <div className="mt-5 space-y-4">
                    {[
                      'Explore degree structures for your top two study directions on university websites.',
                      'Talk to current students studying these majors or attend university information sessions.',
                      'Compare sample first-year courses across universities offering these study directions.',
                    ].map((action) => (
                      <div key={action} className="rounded-[22px] bg-[#fbfaf7] p-4 text-[#5f6d62] ring-1 ring-[#d9ddd5]">
                        {action}
                      </div>
                    ))}
                  </div>
                </EditorialCard>
              </div>

              <EditorialCard className="p-8 lg:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a9488]">Summary</p>
                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#21352d]">
                  You are not lacking direction.
                </h3>
                <p className="mt-4 max-w-3xl text-base leading-7 text-[#5f6d62]">
                  You are balancing curiosity with caution. Your next best step is to explore two possible study directions before committing to a degree path.
                </p>

                <div className="mt-7 rounded-[26px] bg-[#f1f2ec] p-6 ring-1 ring-[#d9ddd5]">
                  <p className="font-medium text-[#486156]">About Major Lens</p>
                  <p className="mt-2 text-base leading-7 text-[#5f6d62]">
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
