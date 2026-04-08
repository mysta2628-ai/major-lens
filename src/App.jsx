import { useState } from "react"
import {
  BookOpenCheck,
  ArrowRight,
} from "lucide-react"


function PrimaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full bg-[#29443a] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#21352d]"
    >
      {children}
    </button>
  )
}


function SecondaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border border-[#d7dbd2] bg-white px-6 py-3 text-sm font-medium text-[#29443a] transition hover:bg-[#f6f7f3]"
    >
      {children}
    </button>
  )
}


function EditorialCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-[28px] border border-[#e6e9e2] bg-white shadow-sm ${className}`}
    >
      {children}
    </div>
  )
}


export default function App() {

  const [screen, setScreen] = useState("home")


  return (
    <div className="min-h-screen bg-[#f7f7f4] text-[#21352d]">

      {/* HEADER */}

      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d7dbd2] bg-white">
            <BookOpenCheck className="h-5 w-5 text-[#29443a]" />
          </div>

          <div>

            <div className="text-lg font-semibold tracking-[-0.02em]">
              Major Lens
            </div>

            <div className="text-xs text-[#7a867c]">
              Reflective academic decision-support prototype
            </div>

          </div>

        </div>


        <nav className="hidden gap-6 text-sm text-[#5f6d62] md:flex">

          <button onClick={() => setScreen("home")}>
            Home
          </button>

          <button onClick={() => setScreen("assessment")}>
            Assessment
          </button>

          <button onClick={() => setScreen("profile")}>
            Profile
          </button>

          <button onClick={() => setScreen("explore")}>
            Explore
          </button>

          <button onClick={() => setScreen("compare")}>
            Compare
          </button>

          <button onClick={() => setScreen("next")}>
            Next Steps
          </button>

        </nav>

      </header>


      {/* MAIN */}

      <main className="mx-auto max-w-7xl px-6 pb-24">

        {screen === "home" && (

          <>

            {/* HERO */}

            <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8a9488]">
                  Reflective academic decision-support prototype
                </p>


                <h1 className="mt-5 text-5xl font-semibold leading-[0.96] tracking-[-0.05em] lg:text-7xl">
                  Make a better decision.
                </h1>


                <p className="mt-8 max-w-2xl text-lg leading-8 text-[#5f6d62]">
                  Major Lens helps high school graduates and first-year
                  university students make better major decisions through a
                  structured assessment of interests, strengths, values, and
                  employment pressure.
                </p>


                <div className="mt-8 flex gap-4">

                  <PrimaryButton
                    onClick={() => setScreen("assessment")}
                  >
                    Take the 5-minute assessment
                  </PrimaryButton>


                  <SecondaryButton
                    onClick={() => setScreen("explore")}
                  >
                    Explore study directions
                  </SecondaryButton>

                </div>

              </div>


              {/* PROFILE PREVIEW */}

              <aside>

                <EditorialCard className="p-7">

                  <h2 className="text-2xl font-semibold tracking-[-0.03em]">
                    Your decision profile
                  </h2>


                  <p className="mt-3 text-sm text-[#5f6d62]">
                    A preview of the dimensions Major Lens helps you reflect on.
                  </p>


                  <dl className="mt-7 space-y-4">

                    {[
                      ["Interests", "Emerging focus"],
                      ["Analytical structure", "Moderate preference"],
                      ["Values alignment", "Strong importance"],
                      ["Employment pressure", "Active influence"],
                    ].map(([label, value]) => (

                      <div
                        key={label}
                        className="flex justify-between border-b border-[#ecefe8] pb-3 last:border-none"
                      >

                        <dt className="text-[#486156]">
                          {label}
                        </dt>

                        <dd className="font-medium">
                          {value}
                        </dd>

                      </div>

                    ))}

                  </dl>


                  <div className="mt-8 rounded-[24px] bg-[#f1f2ec] p-5">

                    <h3 className="text-sm font-semibold text-[#486156]">
                      What this tool does
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[#5f6d62]">
                      Major Lens does not tell you who you are. It helps you
                      identify what is driving your decision, compare study
                      directions more carefully, and leave with a clearer
                      shortlist.
                    </p>

                  </div>

                </EditorialCard>

              </aside>

            </section>


            {/* VALUE CARDS */}

            <section className="mt-20 grid gap-6 md:grid-cols-3">

              <EditorialCard className="p-7">

                <h3 className="text-lg font-semibold">
                  Interpret fit beyond prestige
                </h3>

                <p className="mt-3 text-[#5f6d62]">
                  Move away from inherited assumptions and toward evidence
                  about how you think, learn, and decide.
                </p>

              </EditorialCard>


              <EditorialCard className="p-7">

                <h3 className="text-lg font-semibold">
                  Compare majors through multiple criteria
                </h3>

                <p className="mt-3 text-[#5f6d62]">
                  Interest, structure, flexibility, values, and outcomes can
                  all matter at once instead of letting salary dominate the
                  decision.
                </p>

              </EditorialCard>


              <EditorialCard className="p-7">

                <h3 className="text-lg font-semibold">
                  Leave with a clearer shortlist
                </h3>

                <p className="mt-3 text-[#5f6d62]">
                  The goal is not certainty, but a more confident and
                  defensible next step in your exploration.
                </p>

              </EditorialCard>

            </section>


            {/* HOW IT WORKS */}

            <section className="mt-24">

              <h2 className="text-2xl font-semibold tracking-[-0.03em]">
                How Major Lens works
              </h2>


              <ol className="mt-10 grid gap-6 md:grid-cols-3">

                {[
                  [
                    "Assess",
                    "Answer short statements about your interests, strengths, values, and decision pressures.",
                  ],
                  [
                    "Interpret",
                    "Receive a profile showing what may be shaping your current major decision.",
                  ],
                  [
                    "Compare",
                    "Explore study directions across learning style, flexibility, values, and outcomes.",
                  ],
                ].map(([title, text], i) => (

                  <EditorialCard key={i} className="p-6">

                    <div className="text-sm font-semibold text-[#7a867c]">
                      Step {i + 1}
                    </div>

                    <h3 className="mt-2 text-lg font-semibold">
                      {title}
                    </h3>

                    <p className="mt-2 text-[#5f6d62]">
                      {text}
                    </p>

                  </EditorialCard>

                ))}

              </ol>

            </section>


            {/* TRUST BLOCK */}

            <section className="mt-24 max-w-3xl">

              <h2 className="text-2xl font-semibold tracking-[-0.03em]">
                Designed for reflective major exploration
              </h2>

              <p className="mt-4 text-[#5f6d62] leading-7">
                Major Lens is a concept tool for students who want a more
                thoughtful way to narrow their options. It is not a replacement
                for academic advising, but a structured starting point for
                better questions and better comparisons.
              </p>

            </section>

          </>

        )}

      </main>

    </div>
  )
}
