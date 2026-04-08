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
    why: 'You show strong interest in argument, institutions, and social impact.',
    learning: 'Reading-heavy, analytical, discussion-based.',
    careers: 'Law, policy, government, advocacy, consulting.',
    scores: { interest: 92, strength: 88, values: 90, flexibility: 74, stability: 78, income: 82, socialImpact: 95 },
    assessmentStyle: 'Essays, cases, argument',
    workStyle: 'Structured, persuasive, institutional',
  },
  {
    id: 'social',
    title: 'Social Sciences & Global Studies',
    icon: Compass,
    why: 'You appear motivated by understanding people, systems, and real-world issues.',
    learning: 'Research, writing, theory, case analysis.',
    careers: 'Research, public sector, NGOs, strategy, communications.',
    scores: { interest: 89, strength: 80, values: 91, flexibility: 69, stability: 65, income: 60, socialImpact: 93 },
    assessmentStyle: 'Essays, reports, analysis',
    workStyle: 'Analytical, people-focused, research-based',
  },
  {
    id: 'business',
    title: 'Business & Economics',
    icon: Briefcase,
    why: 'You balance practical concerns with interest in systems, incentives, and outcomes.',
    learning: 'Applied analysis, data interpretation, structured problem-solving.',
    careers: 'Finance, consulting, business analysis, policy, management.',
    scores: { interest: 76, strength: 90, values: 70, flexibility: 92, stability: 90, income: 91, socialImpact: 62 },
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

const navItems = [
  ['home', 'Home'],
  ['assessment', 'Assessment'],
  ['results', 'Results'],
  ['explore', 'Explore Majors'],
  ['compare', 'Compare'],
  ['next', 'Next Steps'],
]

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

function bandLabel(value) {
  if (value >= 80) return 'High'
  if (value >= 60) return 'Medium'
  return 'Low'
}

function sentenceCase(scale) {
  return {
    curiosity: 'Intellectual Curiosity',
    structure: 'Structured / Analytical Strength',
    values: 'Values Alignment',
    employment: 'Employment Dependence',
  }[scale]
}

function scoreToPercent(avg) {
  return Math.round(((avg - 1) / 4) * 100)
}

function Card({ className = '', children }) {
  return <div className={cn('rounded-[2rem] border border-slate-200 bg-white shadow-sm', className)}>{children}</div>
}

function Button({ className = '', variant = 'default', size = 'md', ...props }) {
  const variants = {
    default: 'bg-slate-900 text-white hover:bg-slate-800',
    outline: 'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
  }
  const sizes = {
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  }
  return <button className={cn('inline-flex items-center justify-center rounded-2xl transition', variants[variant], sizes[size], className)} {...props} />
}

function ProgressBar({ value }) {
  return (
    <div className="h-3 overflow-hidden rounded-full bg-slate-100">
      <div className="h-full rounded-full bg-slate-900 transition-all" style={{ width: `${value}%` }} />
    </div>
  )
}

function Badge({ className = '', children }) {
  return <span className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs font-medium', className)}>{children}</span>
}

export default function App() {
  const [screen, setScreen] = useState('home')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [priority, setPriority] = useState('interest')

  const currentQuestion = questions[questionIndex]

  const profile = useMemo(() => {
    const grouped = { curiosity: [], structure: [], values: [], employment: [] }
    questions.forEach((q) => {
      if (answers[q.id]) grouped[q.scale].push(answers[q.id])
    })
    return Object.fromEntries(
      Object.entries(grouped).map(([k, arr]) => {
        const avg = arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 3
        return [k, scoreToPercent(avg)]
      }),
    )
  }, [answers])

  const summary = useMemo(() => {
    const s = profile.structure
    const e = profile.employment
    let line1 = 'You are strongly driven by curiosity and meaning'
    if (s >= 75) line1 += ', with a clear preference for structured thinking'
    line1 += '.'

    let line2 = 'Your choices'
    if (e >= 70) line2 += ' are also shaped by a notable concern for stability and employability.'
    else if (e >= 50) line2 += ' are shaped by a moderate concern for stability and future employability.'
    else line2 += ' appear to be guided more by fit than by labour-market pressure.'

    let standout = 'You seem to care deeply about choosing a field that feels meaningful'
    if (e >= 65) standout += ', but you may still be filtering out options too early because of job security concerns.'
    else if (s >= 75) standout += ', and you may thrive in study directions that combine reflection with rigorous problem-solving.'
    else standout += ', which suggests you should test options through deeper exploration rather than default assumptions.'

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

  const resetAssessment = () => {
    setAnswers({})
    setQuestionIndex(0)
    setScreen('assessment')
  }

  const topPriorityMajor = [...majorData].sort((a, b) => b.scores[priority] - a.scores[priority])[0]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <div className="flex items-center gap-2 text-lg font-semibold">
              <GraduationCap className="h-5 w-5" />
              <span>Major Lens</span>
            </div>
            <p className="text-sm text-slate-500">An academic decision tool</p>
          </div>
          <nav className="hidden gap-2 lg:flex">
            {navItems.map(([key, label]) => (
              <button
                key={key}
                onClick={() => setScreen(key)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm transition',
                  screen === key ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
                )}
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
            <motion.section key="home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
                <Badge className="mb-5 bg-slate-900 text-white">Decision-support prototype</Badge>
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight lg:text-6xl">Choose your major with more than job pressure.</h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                  Major Lens helps high school graduates and early university students explore degree directions through interests, strengths, values, and real-world considerations — not just salary or employability.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button size="lg" onClick={() => setScreen('assessment')}>
                    Start the assessment <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => setScreen('explore')}>See how it works</Button>
                </div>
              </div>
              <div className="grid gap-4">
                {['Clarify what actually fits you', 'Compare majors beyond salary', 'Turn uncertainty into a clearer next step'].map((item, idx) => (
                  <Card key={item} className="rounded-3xl">
                    <div className="flex items-start gap-4 p-6">
                      <div className="rounded-2xl bg-slate-100 p-3">
                        {idx === 0 && <Sparkles className="h-5 w-5" />}
                        {idx === 1 && <BarChart3 className="h-5 w-5" />}
                        {idx === 2 && <CheckCircle2 className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="text-lg font-medium">{item}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-500">Designed as a reflective web app flow rather than a static information page.</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.section>
          )}

          {screen === 'assessment' && (
            <motion.section key="assessment" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mx-auto max-w-4xl">
              <Card>
                <div className="space-y-4 p-8">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h2 className="text-3xl font-semibold">Build your academic profile</h2>
                      <p className="mt-2 max-w-2xl text-base leading-7 text-slate-600">Answer 20 short statements to help us understand how you learn, what motivates you, and how much employability is shaping your decisions.</p>
                    </div>
                    <div className="text-sm text-slate-500">Estimated time: 5–7 minutes</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <span>Question {questionIndex + 1} of {questions.length}</span>
                      <span>{Math.round(((questionIndex + 1) / questions.length) * 100)}%</span>
                    </div>
                    <ProgressBar value={((questionIndex + 1) / questions.length) * 100} />
                  </div>
                </div>

                <div className="p-8 pt-0">
                  <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
                    <p className="text-xl font-medium leading-8">{currentQuestion.text}</p>
                    <div className="mt-6 grid gap-3">
                      {likert.map((option) => {
                        const selected = answers[currentQuestion.id] === option.value
                        return (
                          <button
                            key={option.value}
                            onClick={() => setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option.value }))}
                            className={cn(
                              'rounded-2xl border px-4 py-4 text-left transition',
                              selected ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white hover:border-slate-400',
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{option.label}</span>
                              <span className={cn('text-sm', selected ? 'text-slate-200' : 'text-slate-500')}>{option.value}</span>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                    <Button variant="outline" onClick={() => setQuestionIndex((i) => Math.max(0, i - 1))} disabled={questionIndex === 0} className={questionIndex===0 ? 'opacity-50 cursor-not-allowed' : ''}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                    </Button>
                    <div className="text-sm text-slate-500">Four dimensions: Intellectual Interests · Academic Strengths · Personal Values · Decision Pressures</div>
                    <Button
                      onClick={() => {
                        if (questionIndex < questions.length - 1) setQuestionIndex((i) => i + 1)
                        else setScreen('results')
                      }}
                      disabled={!answers[currentQuestion.id]}
                      className={!answers[currentQuestion.id] ? 'opacity-50 cursor-not-allowed' : ''}
                    >
                      {questionIndex === questions.length - 1 ? 'Finish assessment' : 'Next'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.section>
          )}

          {screen === 'results' && (
            <motion.section key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <Card>
                <div className="p-8">
                  <h2 className="text-3xl font-semibold">Your Major Lens profile</h2>
                  <p className="mt-2 max-w-2xl text-base leading-7 text-slate-600">{summary.line1} {summary.line2}</p>
                </div>
                <div className="space-y-6 px-8 pb-8">
                  {Object.entries(profile).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{sentenceCase(key)}</span>
                        <span className="text-sm text-slate-500">{bandLabel(value)}</span>
                      </div>
                      <ProgressBar value={value} />
                    </div>
                  ))}
                </div>
              </Card>

              <div className="grid gap-6">
                <Card>
                  <div className="p-8">
                    <h3 className="text-xl font-semibold">What stands out</h3>
                    <p className="mt-3 leading-7 text-slate-600">{summary.standout}</p>
                  </div>
                </Card>
                <Card>
                  <div className="p-8">
                    <h3 className="text-xl font-semibold">Next move</h3>
                    <p className="mt-2 text-slate-600">Don’t treat this as a final verdict. Treat it as a sharper starting point.</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Button onClick={() => setScreen('explore')}>Explore matching study directions</Button>
                      <Button variant="outline" onClick={resetAssessment}>Retake assessment</Button>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.section>
          )}

          {screen === 'explore' && (
            <motion.section key="explore" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              <div>
                <h2 className="text-3xl font-semibold">Study directions that may fit you</h2>
                <p className="mt-2 max-w-3xl text-slate-600">Rather than presenting one “correct” answer, the prototype recommends clusters you can explore more deeply.</p>
              </div>
              <div className="grid gap-6 lg:grid-cols-3">
                {rankedMajors.map((major, index) => {
                  const Icon = major.icon
                  return (
                    <Card key={major.id}>
                      <div className="p-8">
                        <div className="flex items-center justify-between">
                          <div className="rounded-2xl bg-slate-100 p-3"><Icon className="h-5 w-5" /></div>
                          <Badge className="bg-slate-100 text-slate-700">Match #{index + 1}</Badge>
                        </div>
                        <h3 className="mt-3 text-2xl font-semibold">{major.title}</h3>
                        <p className="mt-1 text-sm text-slate-500">Overall fit score: {major.fit}/100</p>
                        <div className="mt-5 space-y-5 text-sm leading-7 text-slate-600">
                          <div><p className="font-medium text-slate-900">Why it fits you</p><p>{major.why}</p></div>
                          <div><p className="font-medium text-slate-900">Typical learning style</p><p>{major.learning}</p></div>
                          <div><p className="font-medium text-slate-900">Could lead to</p><p>{major.careers}</p></div>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
              <div className="flex justify-end"><Button onClick={() => setScreen('compare')}>Compare these majors <ArrowRight className="ml-2 h-4 w-4" /></Button></div>
            </motion.section>
          )}

          {screen === 'compare' && (
            <motion.section key="compare" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <Card>
                <div className="p-8">
                  <h2 className="text-3xl font-semibold">Compare your options</h2>
                  <p className="mt-2 text-slate-600">Students often are not completely lost — they are choosing between several plausible directions.</p>
                </div>
                <div className="overflow-x-auto px-8 pb-8">
                  <table className="w-full min-w-[760px] border-separate border-spacing-y-3 text-left">
                    <thead>
                      <tr className="text-sm text-slate-500">
                        <th className="px-4 py-2">Criteria</th>
                        {majorData.map((major) => <th key={major.id} className="px-4 py-2">{major.title}</th>)}
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
                          <td className="rounded-l-2xl px-4 py-4 font-medium">{label}</td>
                          {majorData.map((major) => (
                            <td key={major.id + key} className={cn('px-4 py-4', priority === key ? 'font-semibold text-slate-900' : 'text-slate-600')}>
                              {bandLabel(major.scores[key])}
                            </td>
                          ))}
                        </tr>
                      ))}
                      <tr className="bg-slate-50">
                        <td className="rounded-l-2xl px-4 py-4 font-medium">Assessment style</td>
                        {majorData.map((major) => <td key={major.id + 'assessment'} className="px-4 py-4 text-slate-600">{major.assessmentStyle}</td>)}
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="rounded-l-2xl px-4 py-4 font-medium">Work style after graduation</td>
                        {majorData.map((major) => <td key={major.id + 'work'} className="px-4 py-4 text-slate-600">{major.workStyle}</td>)}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              <div className="grid gap-6">
                <Card>
                  <div className="p-8">
                    <h3 className="text-xl font-semibold">What matters most to you right now?</h3>
                    <p className="mt-2 text-slate-600">Switch the priority to surface a different decision lens.</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {priorities.map((item) => (
                        <button key={item.key} onClick={() => setPriority(item.key)} className={cn('rounded-full px-4 py-2 text-sm transition', priority === item.key ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200')}>
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="p-8">
                    <h3 className="text-xl font-semibold">Current top match by priority</h3>
                    <p className="mt-3 text-lg font-semibold">{topPriorityMajor.title}</p>
                    <p className="mt-2 leading-7 text-slate-600">This option currently leads because it scores strongest on <span className="font-medium text-slate-900">{priorities.find((p) => p.key === priority)?.label.toLowerCase()}</span>.</p>
                  </div>
                </Card>
                <div className="flex justify-end"><Button onClick={() => setScreen('next')}>See next steps <ArrowRight className="ml-2 h-4 w-4" /></Button></div>
              </div>
            </motion.section>
          )}

          {screen === 'next' && (
            <motion.section key="next" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              <div>
                <h2 className="text-3xl font-semibold">Your next step, not your final answer</h2>
                <p className="mt-2 max-w-3xl text-slate-600">The tool should not push students into a single identity too early. It should move them toward better questions and better evidence.</p>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <div className="p-8">
                    <h3 className="text-xl font-semibold">Reflection prompts</h3>
                    <div className="mt-4 space-y-4 text-slate-600">
                      {[
                        'Which recommendation feels genuinely exciting, not just safe?',
                        'Which option fits your values as well as your abilities?',
                        'What information do you still need before making a confident decision?',
                      ].map((prompt) => <div key={prompt} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">{prompt}</div>)}
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="p-8">
                    <h3 className="text-xl font-semibold">Action cards</h3>
                    <div className="mt-4 space-y-4 text-slate-600">
                      {[
                        'Explore degree structures for your top two study directions on university websites.',
                        'Talk to current students studying these majors or attend university information sessions.',
                        'Compare sample first-year courses across universities offering these study directions.',
                      ].map((action) => <div key={action} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">{action}</div>)}
                    </div>
                  </div>
                </Card>
              </div>
              <Card>
                <div className="space-y-4 p-8 text-slate-600">
                  <p>You are not lacking direction — you are balancing curiosity with caution. Your next best step is to explore two possible study directions before committing to a degree path.</p>
                  <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                    <p className="font-medium text-slate-900">About Major Lens</p>
                    <p className="mt-2 leading-7">Major Lens is a concept tool designed to support more reflective and informed major choice. It does not replace academic advising, but helps students see their decision more clearly.</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={() => setScreen('home')}>Back to home</Button>
                    <Button variant="outline" onClick={resetAssessment}>Start again</Button>
                  </div>
                </div>
              </Card>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
