import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import appLogo from "@/Assests/app logo.png";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Clipbin Terms of Service. Rules and conditions for using Clipbin to create and share temporary clips."
};

export default function TermsPage() {
  return (
    <div className="legal-page">
      <header className="legal-header">
        <Link href="/" className="legal-brand" aria-label="Clipbin home">
          <Image src={appLogo} alt="" width={32} height={32} className="legal-logo" />
          <span>Clipbin</span>
        </Link>
      </header>

      <main className="legal-main">
        <h1 className="legal-title">Terms of Service</h1>
        <p className="legal-updated">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

        <section className="legal-prose">
          <p>
            Welcome to Clipbin. By using our website or app (&ldquo;Service&rdquo;), you agree to these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree, please do not use the Service.
          </p>

          <h2>Use of the Service</h2>
          <p>
            Clipbin lets you create temporary text clips, share them via short links, and optionally protect them with a password. You may use the Service only for lawful purposes and in line with these Terms. You are responsible for what you create and share.
          </p>
          <p>
            You agree not to use the Service to: (a) share illegal, harmful, or offensive content; (b) harass, threaten, or abuse others; (c) infringe others&rsquo; intellectual property or privacy; (d) distribute malware or attempt to compromise our systems or users; or (e) circumvent any limits or security features of the Service.
          </p>

          <h2>Your content</h2>
          <p>
            You retain any rights you have in the content you create. By using the Service, you grant us the limited rights needed to operate Clipbin (e.g. to store, display, and deliver your clips until they expire). We do not claim ownership of your content and do not use it for advertising or sell it.
          </p>

          <h2>Expiry and availability</h2>
          <p>
            Clips are temporary by design. They will expire according to the settings you choose. We are not responsible for content that has expired or been removed. We strive for reliability but do not guarantee uninterrupted availability.
          </p>

          <h2>Account and paid features</h2>
          <p>
            Some features may require an account or payment. If you sign up or subscribe, you agree to provide accurate information and to pay any applicable fees. Refund and cancellation terms will be shown at the time of purchase or in separate subscription terms.
          </p>

          <h2>Disclaimer of warranties</h2>
          <p>
            The Service is provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; We disclaim all warranties, express or implied, including merchantability and fitness for a particular purpose. We do not guarantee that the Service will be error-free or secure.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, Clipbin and its team shall not be liable for any indirect, incidental, special, or consequential damages, or for loss of data or profits, arising from your use of the Service. Our total liability shall not exceed the amount you paid us in the twelve months before the claim (or, if you have not paid, zero).
          </p>

          <h2>Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Clipbin and its affiliates from any claims, damages, or expenses (including legal fees) arising from your use of the Service, your content, or your violation of these Terms.
          </p>

          <h2>Changes</h2>
          <p>
            We may change these Terms from time to time. We will post the updated Terms on this page and, for material changes, we will provide notice (e.g. in the app or by email). Continued use after changes means you accept the new Terms.
          </p>

          <h2>Termination</h2>
          <p>
            We may suspend or terminate your access to the Service if you breach these Terms or for other operational or legal reasons. You may stop using the Service at any time.
          </p>

          <h2>General</h2>
          <p>
            These Terms are governed by the laws of the jurisdiction in which Clipbin operates, without regard to conflict of law rules. If any part of these Terms is held invalid, the rest remains in effect. Our failure to enforce a right does not waive that right.
          </p>

          <h2>Contact</h2>
          <p>
            For questions about these Terms: <a href="mailto:support@clipbin.app">support@clipbin.app</a> (or the contact address on the Clipbin website or app).
          </p>
        </section>
      </main>

      <footer className="legal-footer">
        <nav aria-label="Footer">
          <Link href="/">Home</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </nav>
        <p>© {new Date().getFullYear()} Clipbin.</p>
      </footer>
    </div>
  );
}
