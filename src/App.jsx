import { useState } from "react"
import {
  BookOpenCheck,
  CheckCircle2,
} from "lucide-react"



/* ---------- QUESTIONS DATA ---------- */

const QUESTIONS = [
  ["I enjoy exploring multiple subject areas before choosing one.", "interests"],
  ["I prefer structured analytical problem-solving tasks.", "structure"],
  ["I want my future work to reflect my personal values.", "values"],
  ["Job security strongly affects my major choice.", "pressure"],

  ["I am curious about interdisciplinary learning.", "interests"],
  ["I like working with systems and frameworks.", "structure"],
  ["Social contribution matters in my study decisions.", "values"],
  ["Salary expectations influence my choices.", "pressure"],

  ["I enjoy discovering how different fields connect.", "interests"],
  ["Logical reasoning is one of my strengths.", "structure"],
  ["Purpose matters more than prestige.", "values"],
  ["Family expectations affect my decision.", "pressure"],

  ["I am open to unexpected academic directions.", "interests"],
  ["I enjoy structured argumentation.", "structure"],
  ["Ethical alignment matters in career choice.", "values"],
  ["Employment rates affect my decisions.", "pressure"],

  ["I like comparing different academic pathways.", "interests"],
  ["I enjoy working with formal models.", "structure"],
  ["Long-term meaning matters more than speed of employment.", "values"],
  ["Market demand influences my thinking.", "pressure"],
]



/* ---------- UI COMPONENTS ---------- */

function Card({ children }) {
  return (
    <div className="rounded-[28px] border border-[#e6e9e2] bg-white p-7 shadow-sm">
      {children}
    </div>
  )
}

function PrimaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full bg-[#29443a] px-6 py-3 text-sm font-medium text-white hover:bg-[#21352d]"
    >
      {children}
    </button>
  )
}

function SecondaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border border-[#d7dbd2] bg-white px-6 py-3 text-sm font-medium text-[#29443a]"
    >
      {children}
    </button>
  )
}



/* ---------- MAIN APP ---------- */

export default function App() {

  const [screen, setScreen] = useState("home")

  const [answers, setAnswers] = useState(
    Array(QUESTIONS.length).fill(null)
  )

  const [profile, setProfile] = useState(null)



/* ---------- SCORE ENGINE ---------- */

  function calculateProfile() {

    const totals = {
      interests: 0,
      structure: 0,
      values: 0,
      pressure: 0,
    }

    const counts = {
      interests: 0,
      structure: 0,
      values: 0,
      pressure: 0,
    }

    QUESTIONS.forEach(([_, dimension], i) => {
      if (answers[i] != null) {
        totals[dimension] += answers[i]
        counts[dimension]++
      }
    })

    const result = {}

    Object.keys(totals).forEach(key => {
      result[key] = Math.round(totals[key] / counts[key])
    })

    setProfile(result)
    setScreen("profile")
  }



/* ---------- HEADER ---------- */

  function Header() {

    const tabs = [
      ["Home", "home"],
      ["Assessment", "assessment"],
      ["Profile", "profile"],
      ["Explore", "explore"],
      ["Compare", "compare"],
      ["Next Steps", "next"],
    ]

    return (
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-full border bg-white">
            <BookOpenCheck size={18} />
          </div>

          <div>
            <div className="font-semibold">Major Lens</div>
            <div className="text-xs text-[#7a867c]">
              Reflective academic decision-support prototype
            </div>
          </div>

        </div>


        <nav className="hidden gap-6 md:flex text-sm">

          {tabs.map(([label, key]) => (
            <button key={key} onClick={() => setScreen(key)}>
              {label}
            </button>
          ))}

        </nav>

      </header>
    )
  }



/* ---------- HOME ---------- */

  function HomeScreen() {

    return (
      <>

        <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">

          <div>

            <p className="text-xs uppercase tracking-[0.2em] text-[#8a9488]">
              Reflective academic decision-support prototype
            </p>

            <h1 className="mt-5 text-6xl font-semibold">
              Make a better decision.
            </h1>

            <p className="mt-8 max-w-2xl text-lg text-[#5f6d62]">
              Major Lens helps high school graduates and first-year university
              students make better major decisions through a structured
              assessment of interests, strengths, values, and employment pressure.
            </p>

            <div className="mt-8 flex gap-4">

              <PrimaryButton onClick={() => setScreen("assessment")}>
                Take the 5-minute assessment
              </PrimaryButton>

              <SecondaryButton onClick={() => setScreen("explore")}>
                Explore study directions
              </SecondaryButton>

            </div>

          </div>


          <Card>

            <h2 className="text-2xl font-semibold">
              Your decision profile
            </h2>

            <p className="mt-3 text-sm text-[#5f6d62]">
              A preview of the dimensions Major Lens helps you reflect on.
            </p>

            <dl className="mt-6 space-y-3">

              {[
                ["Interests", "Emerging focus"],
                ["Analytical structure", "Moderate preference"],
                ["Values alignment", "Strong importance"],
                ["Employment pressure", "Active influence"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b pb-2">
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}

            </dl>

          </Card>

        </section>

      </>
    )
  }



/* ---------- ASSESSMENT ---------- */

  function AssessmentScreen() {

    function answer(i, v) {
      const copy = [...answers]
      copy[i] = v
      setAnswers(copy)
    }

    return (
      <section className="max-w-3xl">

        <h2 className="text-3xl font-semibold">
          Assessment
        </h2>

        <div className="mt-10 space-y-6">

          {QUESTIONS.map(([text], i) => (

            <Card key={i}>

              <p>{text}</p>

              <div className="mt-3 flex gap-2">

                {[1, 2, 3, 4, 5].map(v => (
                  <button
                    key={v}
                    onClick={() => answer(i, v)}
                    className={`px-4 py-2 rounded-full border ${
                      answers[i] === v
                        ? "bg-[#29443a] text-white"
                        : ""
                    }`}
                  >
                    {v}
                  </button>
                ))}

              </div>

            </Card>

          ))}

        </div>

        <div className="mt-10">

          <PrimaryButton onClick={calculateProfile}>
            View your profile
          </PrimaryButton>

        </div>

      </section>
    )
  }



/* ---------- PROFILE ---------- */

  function ProfileScreen() {

    if (!profile) {
      return <p>Please complete assessment first.</p>
    }

    return (
      <section>

        <h2 className="text-3xl font-semibold">
          Decision Profile
        </h2>

        <div className="mt-10 grid md:grid-cols-2 gap-6">

          {Object.entries(profile).map(([k, v]) => (

            <Card key={k}>

              <h3 className="capitalize">{k}</h3>

              <p className="mt-2 text-2xl font-semibold">
                {v}/5
              </p>

            </Card>

          ))}

        </div>

      </section>
    )
  }



/* ---------- EXPLORE ---------- */

  function ExploreScreen() {

    return (
      <section>

        <h2 className="text-3xl font-semibold">
          Explore study directions
        </h2>

        <div className="mt-10 grid md:grid-cols-3 gap-6">

          {["Law", "Economics", "Psychology"].map(m => (

            <Card key={m}>
              <h3>{m}</h3>
              <p className="mt-2 text-[#5f6d62]">
                Example pathway description.
              </p>
            </Card>

          ))}

        </div>

      </section>
    )
  }



/* ---------- COMPARE ---------- */

  function CompareScreen() {

    return (
      <section>

        <h2 className="text-3xl font-semibold">
          Compare majors
        </h2>

        <p className="mt-4 text-[#5f6d62]">
          Compare shortlisted majors across structure, flexibility, values, and outcomes.
        </p>

      </section>
    )
  }



/* ---------- NEXT STEPS ---------- */

  function NextScreen() {

    return (
      <section>

        <h2 className="text-3xl font-semibold">
          Next Steps
        </h2>

        <ul className="mt-6 space-y-3">

          {[
            "Discuss options with an advisor",
            "Review course structures",
            "Compare long-term pathways",
          ].map(step => (

            <li key={step} className="flex gap-2 items-center">

              <CheckCircle2 size={18} />

              {step}

            </li>

          ))}

        </ul>

      </section>
    )
  }



/* ---------- ROUTER ---------- */

  function ScreenRouter() {

    switch (screen) {

      case "assessment":
        return <AssessmentScreen />

      case "profile":
        return <ProfileScreen />

      case "explore":
        return <ExploreScreen />

      case "compare":
        return <CompareScreen />

      case "next":
        return <NextScreen />

      default:
        return <HomeScreen />

    }
  }



/* ---------- APP RETURN ---------- */

  return (
    <div className="min-h-screen bg-[#f7f7f4] text-[#21352d]">

      <Header />

      <main className="mx-auto max-w-7xl px-6 pb-24">

        <ScreenRouter />

      </main>

    </div>
  )
}
