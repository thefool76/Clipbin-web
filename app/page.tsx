import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AppleLogo } from "@/components/apple-logo";
import { LightTrailCanvas } from "@/components/light-trail-canvas";
import appLogo from "@/Assests/app logo.png";
import iphoneFrame from "@/Assests/iphone frame.png";
import leftHand from "@/Assests/left hand.png";
import peoplesIcon from "@/Assests/peoples.png";
import rightHand from "@/Assests/right hand.png";
import { FeatureBentoIcon } from "@/components/feature-bento-icons";
import { TestingWaitlistForm } from "@/components/testing-waitlist-form";

const features = [
  {
    title: "SIMPLE AND FAST",
    body: "From idea to shareable link in under 5 seconds. Clipbin removes friction so youtes across teams. Less tool switching, faster collaboration.",
    points: ["Paste text", "Pick expiry", "Share short URL"]
  },
  {
    title: "Private By Default",
    body: "Add a lock for sensitive content. Only people with the password can open it.",
    points: ["Optional password gate", "Secure access flow"]
  },
  {
    title: "Speaks Your Workflow",
    body: "Share snippets across product, support, and engineering without changing tools.",
    points: ["Logs", "Config blocks", "One-time notes"]
  },
  {
    title: "VIEW TRACKING",
    body: "Stop guessing if someone saw your message. Know instantly when your clip is opened. Great for support, handoffs, and async updates.",
    points: ["Open count", "Quick delivery confirmation"]
  },
  {
    title: "AUTO EXPIRY",
    body: "Keep your shared data clean and temporary. Clips automatically disappear when they're no longer needed. Perfect for one-time or time-sensitive info.",
    points: ["Flexible expiry from minutes to days", "No outdated or lingering links"]
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
        <div className="topbar-actions">
          <a className="topbar-anchor-link" href="#testing-waitlist-title">
            Join Beta
          </a>
          <a className="download-pill" href="#" aria-label="Download app now">
            <span className="download-icon-left" aria-hidden="true">
              <AppleLogo size={20} />
            </span>
            <span className="download-label-full">Download for iOS</span>
            <span className="download-label-compact">Download</span>
            <span className="download-icon-right" aria-hidden="true">
              <ChevronRight size={20} strokeWidth={2} />
            </span>
          </a>
        </div>
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
              <p>Join the beta phase.</p>
            </div>
          </div>
          <Image src={iphoneFrame} alt="" className="phone-frame" aria-hidden="true" />
        </div>
      </section>

      <section className="home-manifesto" aria-labelledby="manifesto-title">
        <h1 id="manifesto-title">
          Share text in seconds
          <br />
          Stay private by default
          <br />
          Make every link temporary
        </h1>

        <p>
          Clipbin is the fastest way to send snippets, notes, and sensitive text with a short link that expires when
          you choose. No cluttered tools, no extra steps - just paste, share, and move on.
        </p>

        <p>
          Add a password, track opens, and keep control of your data from start to finish. Built for people who want
          speed without sacrificing privacy.
        </p>
      </section>

      <section className="features-section" aria-labelledby="features-title">
        <h2 id="features-title">Features</h2>

        <div className="features-grid">
          {features.map((feature, index) => (
            <article key={feature.title} className={`feature-card feature-slot-${index + 1}`}>
              <header className="feature-head">
                <FeatureBentoIcon index={index} />
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
              {index !== 0 && (
                <div className="feature-icon-area" aria-hidden="true">
                  <FeatureBentoIcon index={index} size="large" />
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="testing-waitlist-section" aria-labelledby="testing-waitlist-title">
        <div className="testing-waitlist-shell">
          <p className="testing-waitlist-kicker">Early Access</p>
          <h2 id="testing-waitlist-title">Join the testing list</h2>
          <p className="testing-waitlist-copy">
            Drop your email to get invited to test upcoming Clipbin builds before public release.
          </p>
          <TestingWaitlistForm />
        </div>
      </section>

      <section className="use-cases-section" aria-labelledby="use-cases-title">
        <h2 id="use-cases-title">Use Cases</h2>
        <Image src={peoplesIcon} alt="" className="use-cases-people" aria-hidden="true" />

        <div className="use-cases-grid">
          <article className="use-case-column">
            <p className="use-case-pill">PERSONAL</p>
            <ul className="use-case-list">
              <li>
                Move text between devices instantly
              </li>
              <li>
                Share private info safely
              </li>
              <li>
                Send one-time messages without leaving a trace
              </li>
            </ul>
            <blockquote className="use-case-quote">
              “Finally a simple way to move text between my phone and laptop without friction.”
            </blockquote>
          </article>

          <article className="use-case-column">
            <p className="use-case-pill">TEAMS</p>
            <ul className="use-case-list">
              <li>
                Share logs and debugging notes instantly
              </li>
              <li>
                Send temporary instructions that expire
              </li>
              <li>
                Track whether updates were seen
              </li>
            </ul>
            <blockquote className="use-case-quote">
              “Clipbin keeps our workflows fast and distraction-free. Share, solve, and move on.”
            </blockquote>
          </article>
        </div>
      </section>

      <footer className="clipbin-footer" aria-label="Site footer">
        <div className="clipbin-footer-top">
          <div>
            <p className="footer-brand">Clipbin</p>
            <p className="footer-copy">Fast, private, temporary text sharing.</p>
          </div>
          <a className="footer-download-pill" href="#" aria-label="Download for iOS">
            <span className="footer-download-icon-left" aria-hidden="true">
              <AppleLogo size={18} />
            </span>
            <span className="footer-download-label">Download iOS</span>
            <span className="footer-download-icon-right" aria-hidden="true">
              <ChevronRight size={18} strokeWidth={2} />
            </span>
          </a>
        </div>
        <div className="clipbin-footer-bottom">
          <p>Share faster. Stay private. Keep it temporary. © {new Date().getFullYear()} Clipbin.</p>
          <p>Made with ❤ by thefool.</p>
          <nav aria-label="Footer">
            <a href="#features-title">Features</a>
            <a href="#use-cases-title">Use Cases</a>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
