import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import appLogo from "@/Assests/app logo.png";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Clipbin Privacy Policy. How we handle your data when you create, share, and view temporary clips."
};

export default function PrivacyPage() {
  return (
    <div className="legal-page">
      <header className="legal-header">
        <Link href="/" className="legal-brand" aria-label="Clipbin home">
          <Image src={appLogo} alt="" width={32} height={32} className="legal-logo" />
          <span>Clipbin</span>
        </Link>
      </header>

      <main className="legal-main">
        <h1 className="legal-title">Privacy Policy</h1>
        <p className="legal-updated">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

        <section className="legal-prose">
          <p>
            Clipbin (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;the service&rdquo;) provides fast, temporary text sharing. This policy describes how we handle information when you use the Clipbin website and app.
          </p>

          <h2>Information we collect</h2>
          <p>
            <strong>Content you create.</strong> When you create a clip, the text and any optional password you set are processed to generate a short link and to display or deliver the content when the link is opened. We do not use clip content for advertising or sell it to third parties.
          </p>
          <p>
            <strong>Usage data.</strong> We may collect anonymous usage data (e.g. how often features are used, errors) to improve the service. We may use standard analytics or crash reporting that does not identify you personally.
          </p>
          <p>
            <strong>Device and app.</strong> To provide the app (e.g. push notifications, if offered), we may receive device-related information such as platform and app version. We minimize what we collect to what is necessary.
          </p>

          <h2>How we use information</h2>
          <p>
            We use the information above to operate Clipbin, deliver and expire clips as you choose, fix issues, and improve the product. We do not use your clip content for marketing or profiling.
          </p>

          <h2>Data retention and expiry</h2>
          <p>
            Clips are designed to be temporary. They are removed according to the expiry you set (e.g. after a number of views or a time window). We may retain minimal metadata (e.g. that a clip existed) for a short period for operational or legal purposes, but we do not retain the clip body after expiry beyond what is required by law.
          </p>

          <h2>Sharing and disclosure</h2>
          <p>
            We do not sell your data. We may share data only: (1) with service providers that help us run the service under strict confidentiality; (2) if required by law or to protect rights and safety; (3) in connection with a merger or sale of assets, with notice where required.
          </p>

          <h2>Security</h2>
          <p>
            We use industry-standard measures to protect data in transit and at rest. Optional password protection on clips is intended to add a layer of access control; you are responsible for sharing links and passwords only with people you trust.
          </p>

          <h2>Your rights</h2>
          <p>
            Depending on where you live, you may have rights to access, correct, delete, or restrict use of your personal data, or to object to processing. To exercise these rights or ask questions, contact us using the details below.
          </p>

          <h2>Children</h2>
          <p>
            Clipbin is not directed at children under 13. We do not knowingly collect personal information from children. If you believe a child has provided us data, please contact us and we will delete it.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy from time to time. We will post the updated policy on this page and, for material changes, we will provide additional notice (e.g. in the app or by email where appropriate). Your continued use of Clipbin after changes constitutes acceptance of the updated policy.
          </p>

          <h2>Contact</h2>
          <p>
            For privacy-related questions or requests: <a href="mailto:privacy@clipbin.app">privacy@clipbin.app</a> (or the contact address listed on the Clipbin website or app).
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
