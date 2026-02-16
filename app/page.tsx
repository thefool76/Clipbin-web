import Image from "next/image";
import { LightTrailCanvas } from "@/components/light-trail-canvas";
import appLogo from "@/Assests/app logo.png";
import iphoneFrame from "@/Assests/iphone frame.png";
import leftHand from "@/Assests/left hand.png";
import peoplesIcon from "@/Assests/peoples.png";
import rightHand from "@/Assests/right hand.png";
import { PricingSection } from "@/components/pricing-section";

const features = [
  {
    title: "Simple And Fast",
    body: "From rough note to shared link in seconds. No setup, no extra steps.",
    points: ["Paste text", "Pick expiry", "Share short URL"],
    ascii: [
      "┌──────────────────────────┐",
      "│ $ clipbin new            │",
      "│ • content: pasted        │",
      "│ • expiry : 24h           │",
      "│ • short  : cbn.sh/x7Q    │",
      "└──────────────────────────┘"
    ].join("\n")
  },
  {
    title: "Private By Default",
    body: "Add a lock for sensitive content. Only people with the password can open it.",
    points: ["Optional password gate", "Secure access flow"],
    ascii: [
      "          .--------.       ",
      "       .-'  .--.   '-.     ",
      "      /    /    \\    \\     ",
      "     |    | ()  |    |     ",
      "     |    |_____|    |     ",
      "     |   .------.    |     ",
      "      \\  '------'   /      ",
      "       '-._______.-'       "
    ].join("\n")
  },
  {
    title: "Speaks Your Workflow",
    body: "Share snippets across product, support, and engineering without changing tools.",
    points: ["Logs", "Config blocks", "One-time notes"],
    ascii: [
      "┌────────┬────────┬────────┐",
      "│   JS   │ PYTHON │  DOCS  │",
      "├────────┼────────┼────────┤",
      "│  API   │  OPS   │  CHAT  │",
      "├────────┼────────┼────────┤",
      "│  QA    │  SRE   │  NOTES │",
      "└────────┴────────┴────────┘"
    ].join("\n")
  },
  {
    title: "View Tracking",
    body: "Know if a clip was opened without extra analytics tooling.",
    points: ["Open count", "Fast delivery signal"],
    ascii: [
      "        .-============-.    ",
      "     .-'      __        '-. ",
      "   .'      .-'  '-.       '.",
      "  /      .'  ()   '.        \\",
      " |      |    __     |        |",
      "  \\      '.______.''        /",
      "   '.                     .' ",
      "     '-.______________.-'   "
    ].join("\n")
  },
  {
    title: "Auto Expiry",
    body: "Clips disappear when they should. Keep shared data temporary by design.",
    points: ["Minutes to days", "No stale links"],
    ascii: [
      "        .---------------.    ",
      "      .' 12         1   '.   ",
      "     / 11             2   \\  ",
      "    | 10       •       3   | ",
      "    |          |\\          | ",
      "    |  9       | \\      4  | ",
      "     \\  8             5   /  ",
      "      '. 7         6   .'    ",
      "        '---------------'    "
    ].join("\n")
  }
] as const;

export default function HomePage() {
  return (
    <main className="home-scene">
      <header className="home-topbar">
        <div className="brand-mark">
          <Image src={appLogo} alt="Clipbin logo" className="home-logo" priority />
          <span>Clipbin</span>
        </div>
        <a className="download-pill" href="#" aria-label="Download app now">
          <span className="download-icon-left" aria-hidden="true">
            
          </span>
          <span className="download-label-full">Download for iOS</span>
          <span className="download-label-compact">Download</span>
          <span className="download-icon-right" aria-hidden="true">
            →
          </span>
        </a>
      </header>

      <section className="hero-stage" aria-label="Interlude hero">
        <Image src={leftHand} alt="" className="hand hand-left" aria-hidden="true" priority />
        <Image src={rightHand} alt="" className="hand hand-right" aria-hidden="true" priority />

        <div className="phone-shell">
          <div className="phone-screen">
            <div className="screen-aura" />
            <LightTrailCanvas />
            <div className="screen-copy">
              <p>You are here.</p>
              <p>So are others.</p>
            </div>
          </div>
          <Image src={iphoneFrame} alt="" className="phone-frame" aria-hidden="true" />
        </div>
      </section>

      <section className="home-manifesto" aria-labelledby="manifesto-title">
        <h1 id="manifesto-title">
          Share text instantly,
          <br />
          stay in control,
          <br />
          and let it expire on your terms.
        </h1>

        <p>
          Clipbin gives you a fast place to share snippets, notes, and temporary text with a short link. Post in
          seconds, send anywhere, and keep collaboration moving.
        </p>

        <p>
          Add a password when needed, track opens, and set automatic expiry so shared text does not live forever. No
          feed, no profiles, no distractions.
        </p>
      </section>

      <section className="features-section" aria-labelledby="features-title">
        <h2 id="features-title">Features</h2>

        <div className="features-grid">
          {features.map((feature, index) => (
            <article key={feature.title} className={`feature-card feature-slot-${index + 1}`}>
              <header className="feature-head">
                <h3>{feature.title}</h3>
              </header>
              <div className="feature-body">
                <p>{feature.body}</p>
                <ul className="feature-list">
                  {feature.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
              <pre className="feature-ascii" aria-hidden="true">
                {feature.ascii}
              </pre>
            </article>
          ))}
        </div>
      </section>

      <PricingSection />

      <section className="use-cases-section" aria-labelledby="use-cases-title">
        <h2 id="use-cases-title">Use Cases</h2>
        <Image src={peoplesIcon} alt="" className="use-cases-people" aria-hidden="true" />

        <div className="use-cases-grid">
          <article className="use-case-column">
            <p className="use-case-pill">Personal Use</p>
            <ul className="use-case-list">
              <li>
                <strong>Quick notes</strong> Save temporary thoughts, reminders, and drafts you do not want sitting in
                your main notes app.
              </li>
              <li>
                <strong>Private snippets</strong> Keep personal info in a short clip and protect it with a password
                before sharing.
              </li>
              <li>
                <strong>One-time sharing</strong> Send text once, let it expire, and avoid old links hanging around.
              </li>
            </ul>
            <blockquote className="use-case-quote">
              “Exactly what I needed for quick copy-paste between phone and laptop without opening ten apps.”
            </blockquote>
          </article>

          <article className="use-case-column">
            <p className="use-case-pill">Teams & Work</p>
            <ul className="use-case-list">
              <li>
                <strong>Code handoff</strong> Share logs, config blocks, and repro steps in seconds during debugging.
              </li>
              <li>
                <strong>Support workflows</strong> Send temporary troubleshooting steps that can expire after a case is
                closed.
              </li>
              <li>
                <strong>Async collaboration</strong> Post plain-text updates with short links and track view count as a
                read signal.
              </li>
            </ul>
            <blockquote className="use-case-quote">
              “Clipbin keeps our incident notes fast and clean. Post, share, resolve, and let the data disappear.”
            </blockquote>
          </article>
        </div>
      </section>

      <footer className="clipbin-footer" aria-label="Site footer">
        <div className="clipbin-footer-top">
          <div>
            <p className="footer-brand">Clipbin</p>
            <p className="footer-copy">Fast, temporary, and private text sharing for everyday workflows.</p>
          </div>
          <a className="footer-download-pill" href="#" aria-label="Download for iOS">
            <span className="footer-download-icon-left" aria-hidden="true">
              
            </span>
            <span className="footer-download-label">Download iOS</span>
            <span className="footer-download-icon-right" aria-hidden="true">
              →
            </span>
          </a>
        </div>
        <div className="clipbin-footer-bottom">
          <p>Built for quick notes, secure snippets, and links that expire when you want. © {new Date().getFullYear()} Clipbin.</p>
          <p>Made with ❤ by thefool.</p>
          <nav aria-label="Footer">
            <a href="#features-title">Features</a>
            <a href="#use-cases-title">Use Cases</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
