import { useMemo, useState } from "react";
import {
  BookOpenCheck,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Scale,
  Compass,
  Briefcase,
} from "lucide-react";

/* -----------------------------
   DATA
----------------------------- */

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
];

const LIKERT = [
  ["Strongly disagree", 1],
  ["Disagree", 2],
  ["Neutral", 3],
  ["Agree", 4],
  ["Strongly agree", 5],
];

const MAJOR_CLUSTERS = [
  {
    key: "law",
    title: "Law & Legal Studies",
    icon: Scale,
    description:
      "Suited to students who enjoy argument, interpretation, institutions, and structured reasoning.",
    learning:
      "Reading-heavy, discussion-based, and focused on cases, argument, and policy.",
    outcomes:
      "Law, public policy, advocacy, government, compliance, consulting.",
    compare: {
      structure: "High",
      flexibility: "Moderate",
      values: "High",
      employability: "Moderate to High",
    },
  },
  {
    key: "social",
    title: "Social Sciences & Global Studies",
    icon: Compass,
    description:
      "Strong fit for students interested in society, systems, people, and real-world issues.",
    learning:
      "Research, writing, theory, interpretation, and comparative analysis.",
    outcomes:
      "Public sector, research, NGOs, communications, policy, international work.",
    compare: {
      structure: "Moderate",
      flexibility: "High",
      values: "High",
      employability: "Moderate",
    },
  },
  {
    key: "business",
    title: "Business & Economics",
    icon: Briefcase,
    description:
      "Well suited to students who value structured thinking, incentives, outcomes, and practical decision-making.",
    learning:
      "Applied analysis, quantitative reasoning, models, and strategic problem-solving.",
    outcomes:
      "Finance, consulting, management, analysis, economics, operations.",
    compare: {
      structure: "High",
      flexibility: "High",
      values: "Moderate",
      employability: "High",
    },
  },
];

/* -----------------------------
   SMALL HELPERS
----------------------------- */

function dimensionLabel(key) {
  switch (key) {
    case "interests":
      return "Interests";
    case "structure":
      return "Analytical structure";
    case "values":
      return "Values alignment";
    case "pressure":
      return "Employment pressure";
    default:
      return key;
  }
}

function scoreDescriptor(key, score) {
  if (key === "pressure") {
    if (score >= 4.2) return "Active influence";
    if (score >= 3.2) return "Moderate influence";
    return "Limited influence";
  }

  if (key === "values") {
    if (score >= 4.2) return "Strong importance";
    if (score >= 3.2) return "Moderate importance";
    return "Emerging importance";
  }

  if (key === "structure") {
    if (score >= 4.2) return "Strong preference";
    if (score >= 3.2) return "Moderate preference";
    return "Emerging preference";
  }

  if (key === "interests") {
    if (score >= 4.2) return "Strong focus";
    if (score >= 3.2) return "Emerging focus";
    return "Developing focus";
  }

  return "Moderate";
}

function scoreWidth(score) {
  return `${(score / 5) * 100}%`;
}

function recommendedMajors(profile) {
  if (!profile) return MAJOR_CLUSTERS;

  const { interests, structure, values, pressure } = profile;

  const scored = MAJOR_CLUSTERS.map((major) => {
    let fit = 0;

    if (major.key === "law") {
      fit =
        interests * 0.25 +
        structure * 0.3 +
        values * 0.25 +
        pressure * 0.2;
    }

    if (major.key === "social") {
      fit =
        interests * 0.35 +
        structure * 0.15 +
        values * 0.35 +
        (6 - pressure) * 0.15;
    }

    if (major.key === "business") {
      fit =
        structure * 0.35 +
        pressure * 0.3 +
        interests * 0.15 +
        values * 0.2;
    }

    return { ...major, fit };
  });

  return scored.sort((a, b) => b.fit - a.fit);
}

function profileNarrative(profile) {
  if (!profile) return "";

  const { interests, structure, values, pressure } = profile;

  if (values >= 4 && pressure >= 4) {
    return "Your profile suggests a tension between meaningful fit and employment pressure. You appear to care strongly about purpose and alignment, but market and security concerns may also be shaping your decision more than you would like.";
  }

  if (structure >= 4 && pressure >= 4) {
    return "Your profile suggests you prefer structured, outcome-oriented pathways. You may feel most comfortable with majors that offer clear analytical frameworks and visible employment pathways.";
  }

  if (interests >= 4 && values >= 4) {
    return "Your profile suggests a reflective and exploratory decision style. You appear motivated by curiosity, meaning, and long-term fit rather than external pressure alone.";
  }

  return "Your profile suggests a balanced decision pattern. You appear to weigh interests, structure, values, and practical considerations together rather than relying on one factor alone.";
}

/* -----------------------------
   UI COMPONENTS
----------------------------- */

function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-[28px] border border-[#dfe3db] bg-white shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

function PrimaryButton({ children, onClick, className = "", type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-full bg-[#29443a] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#21352d] ${className}`}
    >
      {children}
    </button>
  );
}

function SecondaryButton({
  children,
  onClick,
  className = "",
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-full border border-[#d1d7cd] bg-white px-6 py-3 text-sm font-medium text-[#29443a] transition hover:bg-[#f4f5f0] ${className}`}
    >
      {children}
    </button>
  );
}

function Header({ screen, setScreen }) {
  const tabs = [
    ["Home", "home"],
    ["Assessment", "assessment"],
    ["Profile", "profile"],
    ["Explore", "explore"],
    ["Compare", "compare"],
    ["Next Steps", "next"],
  ];

  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
      <button
        onClick={() => setScreen("home")}
        className="flex items-center gap-3 text-left"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d7dbd2] bg-white">
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
      </button>

      <nav className="hidden gap-6 text-sm text-[#5f6d62] md:flex">
        {tabs.map(([label, key]) => (
          <button
            key={key}
            onClick={() => setScreen(key)}
            className={screen === key ? "font-semibold text-[#29443a]" : ""}
          >
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
}

/* -----------------------------
   SCREENS
----------------------------- */

function HomeScreen({ setScreen, previewProfile }) {
  return (
    <>
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8a9488]">
            Reflective academic decision-support prototype
          </p>

          <h1 className="mt-5 text-5xl font-semibold leading-[0.96] tracking-[-0.05em] text-[#21352d] lg:text-7xl">
            Make a better decision.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#5f6d62]">
            Major Lens helps high school graduates and first-year university
            students make better major decisions through a structured assessment
            of interests, strengths, values, and employment pressure.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <PrimaryButton onClick={() => setScreen("assessment")}>
              Take the 5-minute assessment
            </PrimaryButton>

            <SecondaryButton onClick={() => setScreen("explore")}>
              Explore study directions
            </SecondaryButton>
          </div>
        </div>

        <aside>
          <Card className="p-7">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#21352d]">
              Your decision profile
            </h2>

            <p className="mt-3 text-sm text-[#5f6d62]">
              A preview of the dimensions Major Lens helps you reflect on.
            </p>

            <dl className="mt-7 space-y-5">
              {Object.entries(previewProfile).map(([key, value]) => (
                <div key={key}>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <dt className="text-[#486156]">{dimensionLabel(key)}</dt>
                    <dd className="font-medium text-[#21352d]">
                      {scoreDescriptor(key, value)}
                    </dd>
                  </div>

                  <div className="h-2 rounded-full bg-[#e7ebe3]">
                    <div
                      className="h-2 rounded-full bg-[#29443a]"
                      style={{ width: scoreWidth(value) }}
                    />
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-8 rounded-[24px] bg-[#f1f2ec] p-5">
              <h3 className="text-sm font-semibold text-[#486156]">
                What this tool does
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#5f6d62]">
                Major Lens helps you identify what is driving your decision,
                compare study directions more carefully, and leave with a
                clearer shortlist.
              </p>
            </div>
          </Card>
        </aside>
      </section>

      <section className="mt-20 grid gap-6 md:grid-cols-3">
        <Card className="p-7">
          <h3 className="text-lg font-semibold text-[#21352d]">
            Interpret fit beyond prestige
          </h3>
          <p className="mt-3 leading-7 text-[#5f6d62]">
            Move away from inherited assumptions and toward evidence about how
            you think, learn, and decide.
          </p>
        </Card>

        <Card className="p-7">
          <h3 className="text-lg font-semibold text-[#21352d]">
            Compare majors through multiple criteria
          </h3>
          <p className="mt-3 leading-7 text-[#5f6d62]">
            Interest, structure, flexibility, values, and outcomes can all
            matter at once instead of letting salary dominate the decision.
          </p>
        </Card>

        <Card className="p-7">
          <h3 className="text-lg font-semibold text-[#21352d]">
            Leave with a clearer shortlist
          </h3>
          <p className="mt-3 leading-7 text-[#5f6d62]">
            The goal is not certainty, but a more confident and defensible next
            step in your exploration.
          </p>
        </Card>
      </section>

      <section className="mt-24">
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#21352d]">
          How Major Lens works
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            [
              "Assess",
              "Answer 20 short statements about your interests, analytical strengths, values, and decision pressures.",
            ],
            [
              "Interpret",
              "Receive a profile showing what may be shaping your current major decision.",
            ],
            [
              "Compare",
              "Explore study directions across learning style, flexibility, values, and outcomes.",
            ],
          ].map(([title, text]) => (
            <Card key={title} className="p-6">
              <h3 className="text-lg font-semibold text-[#21352d]">{title}</h3>
              <p className="mt-3 leading-7 text-[#5f6d62]">{text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-24 max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#21352d]">
          Designed for reflective major exploration
        </h2>

        <p className="mt-4 leading-8 text-[#5f6d62]">
          Major Lens is a concept tool for students who want a more thoughtful
          way to narrow their options. It is not a replacement for academic
          advising, but a structured starting point for better questions and
          better comparisons.
        </p>
      </section>
    </>
  );
}

function AssessmentScreen({
  answers,
  setAnswers,
  currentQuestion,
  setCurrentQuestion,
  onFinish,
}) {
  const total = QUESTIONS.length;
  const answeredCount = answers.filter((a) => a !== null).length;

  function setAnswer(value) {
    const updated = [...answers];
    updated[currentQuestion] = value;
    setAnswers(updated);
  }

  function nextQuestion() {
    if (currentQuestion < total - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onFinish();
    }
  }

  function prevQuestion() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }

  const [questionText] = QUESTIONS[currentQuestion];

  return (
    <section className="max-w-4xl">
      <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#21352d]">
        Assessment
      </h2>

      <p className="mt-4 max-w-2xl leading-7 text-[#5f6d62]">
        Answer 20 short statements to reflect on your interests, analytical
        strengths, values, and employment pressure.
      </p>

      <div className="mt-8 text-sm text-[#7a867c]">
        Question {currentQuestion + 1} of {total} · {answeredCount} answered
      </div>

      <div className="mt-3 h-2 rounded-full bg-[#e7ebe3]">
        <div
          className="h-2 rounded-full bg-[#29443a]"
          style={{ width: `${((currentQuestion + 1) / total) * 100}%` }}
        />
      </div>

      <Card className="mt-8 p-8">
        <p className="text-xl leading-8 text-[#21352d]">{questionText}</p>

        <div className="mt-8 grid gap-3">
          {LIKERT.map(([label, value]) => {
            const selected = answers[currentQuestion] === value;
            return (
              <button
                key={value}
                onClick={() => setAnswer(value)}
                className={`rounded-[20px] border px-4 py-4 text-left transition ${
                  selected
                    ? "border-[#29443a] bg-[#29443a] text-white"
                    : "border-[#d9ddd5] bg-white text-[#486156] hover:bg-[#f8f8f4]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{label}</span>
                  <span className="text-sm">{value}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap justify-between gap-4">
          <SecondaryButton onClick={prevQuestion}>
            <span className="inline-flex items-center gap-2">
              <ArrowLeft size={16} />
              Previous
            </span>
          </SecondaryButton>

          <PrimaryButton onClick={nextQuestion}>
            <span className="inline-flex items-center gap-2">
              {currentQuestion === total - 1 ? "View profile" : "Next"}
              <ArrowRight size={16} />
            </span>
          </PrimaryButton>
        </div>
      </Card>
    </section>
  );
}

function ProfileScreen({ profile, setScreen }) {
  if (!profile) {
    return (
      <section className="max-w-3xl">
        <h2 className="text-3xl font-semibold text-[#21352d]">Profile</h2>
        <p className="mt-4 text-[#5f6d62]">
          Please complete the assessment first.
        </p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#21352d]">
        Your decision profile
      </h2>

      <p className="mt-4 max-w-3xl leading-8 text-[#5f6d62]">
        {profileNarrative(profile)}
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {Object.entries(profile).map(([key, value]) => (
          <Card key={key} className="p-7">
            <h3 className="text-lg font-semibold text-[#21352d]">
              {dimensionLabel(key)}
            </h3>

            <p className="mt-2 text-sm text-[#7a867c]">
              {scoreDescriptor(key, value)}
            </p>

            <div className="mt-5 h-3 rounded-full bg-[#e7ebe3]">
              <div
                className="h-3 rounded-full bg-[#29443a]"
                style={{ width: scoreWidth(value) }}
              />
            </div>

            <p className="mt-4 text-2xl font-semibold text-[#21352d]">
              {value.toFixed(1)} / 5
            </p>
          </Card>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <PrimaryButton onClick={() => setScreen("explore")}>
          Explore study directions
        </PrimaryButton>

        <SecondaryButton onClick={() => setScreen("compare")}>
          Compare majors
        </SecondaryButton>
      </div>
    </section>
  );
}

function ExploreScreen({ profile }) {
  const majors = recommendedMajors(profile);

  return (
    <section>
      <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#21352d]">
        Explore study directions
      </h2>

      <p className="mt-4 max-w-3xl leading-8 text-[#5f6d62]">
        These study directions reflect the kinds of pathways Major Lens thinks
        may deserve closer attention based on your current decision profile.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {majors.map((major) => {
          const Icon = major.icon;
          return (
            <Card key={major.key} className="p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d7dbd2] bg-[#f7f8f4]">
                  <Icon className="h-5 w-5 text-[#29443a]" />
                </div>
                <h3 className="text-lg font-semibold text-[#21352d]">
                  {major.title}
                </h3>
              </div>

              <p className="mt-4 leading-7 text-[#5f6d62]">
                {major.description}
              </p>

              <div className="mt-5">
                <p className="text-sm font-semibold text-[#486156]">
                  Typical learning style
                </p>
                <p className="mt-1 text-sm leading-6 text-[#5f6d62]">
                  {major.learning}
                </p>
              </div>

              <div className="mt-5">
                <p className="text-sm font-semibold text-[#486156]">
                  Possible outcomes
                </p>
                <p className="mt-1 text-sm leading-6 text-[#5f6d62]">
                  {major.outcomes}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

function CompareScreen({ profile }) {
  const majors = recommendedMajors(profile);

  return (
    <section>
      <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#21352d]">
        Compare majors
      </h2>

      <p className="mt-4 max-w-3xl leading-8 text-[#5f6d62]">
        Compare shortlisted study directions across structure, flexibility,
        values alignment, and employability.
      </p>

      <div className="mt-10 overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left text-sm text-[#7a867c]">
              <th className="px-4 py-2">Criteria</th>
              {majors.map((major) => (
                <th key={major.key} className="px-4 py-2">
                  {major.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {["structure", "flexibility", "values", "employability"].map(
              (criterion) => (
                <tr key={criterion} className="rounded-[20px] bg-white">
                  <td className="rounded-l-[18px] border border-r-0 border-[#e6e9e2] px-4 py-4 font-medium capitalize text-[#21352d]">
                    {criterion}
                  </td>

                  {majors.map((major, i) => (
                    <td
                      key={major.key + criterion}
                      className={`border border-[#e6e9e2] px-4 py-4 text-[#5f6d62] ${
                        i === majors.length - 1 ? "rounded-r-[18px]" : "border-l-0"
                      }`}
                    >
                      {major.compare[criterion]}
                    </td>
                  ))}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function NextStepsScreen({ profile }) {
  const narrative = profile ? profileNarrative(profile) : null;

  return (
    <section>
      <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#21352d]">
        Next steps
      </h2>

      <p className="mt-4 max-w-3xl leading-8 text-[#5f6d62]">
        The goal is not to force certainty too early. It is to leave you with a
        better basis for what to explore next.
      </p>

      {narrative && (
        <Card className="mt-8 p-7">
          <h3 className="text-lg font-semibold text-[#21352d]">
            What your profile suggests
          </h3>
          <p className="mt-3 leading-7 text-[#5f6d62]">{narrative}</p>
        </Card>
      )}

      <div className="mt-10 space-y-4">
        {[
          "Review the course structures of your top two shortlisted majors.",
          "Compare first-year units, not only long-term job titles.",
          "Discuss your shortlist with an advisor, teacher, or current student.",
          "Notice whether employment pressure is outweighing genuine fit.",
          "Use your profile as a starting point, not a final verdict.",
        ].map((step) => (
          <div
            key={step}
            className="flex items-start gap-3 rounded-[24px] border border-[#e6e9e2] bg-white p-5"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#29443a]" />
            <p className="leading-7 text-[#5f6d62]">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -----------------------------
   APP
----------------------------- */

export default function App() {
  const [screen, setScreen] = useState("home");
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const profile = useMemo(() => {
    const totals = {
      interests: 0,
      structure: 0,
      values: 0,
      pressure: 0,
    };

    const counts = {
      interests: 0,
      structure: 0,
      values: 0,
      pressure: 0,
    };

    QUESTIONS.forEach(([_, dimension], i) => {
      if (answers[i] !== null) {
        totals[dimension] += answers[i];
        counts[dimension] += 1;
      }
    });

    const hasAnyAnswers = counts.interests + counts.structure + counts.values + counts.pressure > 0;
    if (!hasAnyAnswers) return null;

    return {
      interests: counts.interests ? totals.interests / counts.interests : 0,
      structure: counts.structure ? totals.structure / counts.structure : 0,
      values: counts.values ? totals.values / counts.values : 0,
      pressure: counts.pressure ? totals.pressure / counts.pressure : 0,
    };
  }, [answers]);

  const previewProfile = profile || {
    interests: 3.4,
    structure: 3.6,
    values: 4.3,
    pressure: 4.1,
  };

  function finishAssessment() {
    setScreen("profile");
  }

  function renderScreen() {
    switch (screen) {
      case "assessment":
        return (
          <AssessmentScreen
            answers={answers}
            setAnswers={setAnswers}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            onFinish={finishAssessment}
          />
        );

      case "profile":
        return <ProfileScreen profile={profile} setScreen={setScreen} />;

      case "explore":
        return <ExploreScreen profile={profile} />;

      case "compare":
        return <CompareScreen profile={profile} />;

      case "next":
        return <NextStepsScreen profile={profile} />;

      default:
        return <HomeScreen setScreen={setScreen} previewProfile={previewProfile} />;
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f7f4] text-[#21352d]">
      <Header screen={screen} setScreen={setScreen} />

      <main className="mx-auto max-w-7xl px-6 pb-24">{renderScreen()}</main>
    </div>
  );
}
