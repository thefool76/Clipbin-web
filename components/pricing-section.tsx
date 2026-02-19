"use client";

import { useEffect, useRef, useState } from "react";

type BillingCycle = "yearly" | "monthly";

const valueBullets = [
  "Unlimited active clips",
  "Longer text limits",
  "Advanced link controls",
  "Full view history",
  "Priority delivery"
] as const;

const freeFeatures = [
  "Create and share clips",
  "Password protection",
  "Up to 2 active clips",
  "Basic expiry",
  "Basic view tracking"
] as const;

const paidFeatures = [
  "Unlimited active clips",
  "Higher character limits",
  "Custom expiry durations",
  "Unlimited view history",
  "Advanced link controls"
] as const;

export function PricingSection() {
  const [cycle, setCycle] = useState<BillingCycle>("yearly");
  const toggleRef = useRef<HTMLDivElement>(null);
  const yearlyBtnRef = useRef<HTMLButtonElement>(null);
  const monthlyBtnRef = useRef<HTMLButtonElement>(null);
  const savePillRef = useRef<HTMLSpanElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 96 });
  const isYearly = cycle === "yearly";

  useEffect(() => {
    const syncIndicator = () => {
      const container = toggleRef.current;
      const yearlyBtn = yearlyBtnRef.current;
      const monthlyBtn = monthlyBtnRef.current;
      const savePill = savePillRef.current;
      if (!container || !yearlyBtn || !monthlyBtn) return;

      const containerRect = container.getBoundingClientRect();
      const paddingLeft = parseFloat(getComputedStyle(container).paddingLeft) || 0;

      if (cycle === "yearly" && savePill) {
        const yearlyRect = yearlyBtn.getBoundingClientRect();
        const saveRect = savePill.getBoundingClientRect();
        setIndicator({
          left: yearlyRect.left - containerRect.left - paddingLeft,
          width: saveRect.right - yearlyRect.left + 8
        });
      } else {
        const monthlyRect = monthlyBtn.getBoundingClientRect();
        setIndicator({
          left: monthlyRect.left - containerRect.left - paddingLeft,
          width: monthlyRect.width
        });
      }
    };

    syncIndicator();
    window.addEventListener("resize", syncIndicator);
    return () => window.removeEventListener("resize", syncIndicator);
  }, [cycle]);

  return (
    <section className="pricing-section" aria-labelledby="pricing-section-title">
      <h2 id="pricing-section-title" className="pricing-section-title">
        Pricing
      </h2>

      <div className="pricing-layout">
        <div className="pricing-copy">
          <h3>Share without limits. Stay in control.</h3>
          <p>
            Unlock unlimited clips, higher limits, and advanced controls for your daily workflow.
          </p>
          <ul className="pricing-value-bullets" aria-label="What you get">
            {valueBullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="pricing-side">
          <div className="pricing-toggle" role="tablist" aria-label="Billing cycle" ref={toggleRef}>
            <span
              className="pricing-toggle-active"
              style={{
                width: `${indicator.width}px`,
                transform: `translateX(${indicator.left}px)`
              }}
              aria-hidden="true"
            />

            <button
              type="button"
              role="tab"
              aria-selected={cycle === "yearly"}
              className={`pricing-toggle-btn ${cycle === "yearly" ? "is-active" : ""}`}
              onClick={() => setCycle("yearly")}
              ref={yearlyBtnRef}
            >
              Yearly
            </button>

            <span className={`pricing-save-pill ${isYearly ? "is-active" : ""}`} ref={savePillRef}>
              Save 40%
            </span>

            <button
              type="button"
              role="tab"
              aria-selected={cycle === "monthly"}
              className={`pricing-toggle-btn ${cycle === "monthly" ? "is-active" : ""}`}
              onClick={() => setCycle("monthly")}
              ref={monthlyBtnRef}
            >
              Monthly
            </button>
          </div>

          <div className="pricing-cards-shell">
            <div className="pricing-cards">
              <article className="pricing-card">
                <div className="pricing-card-content">
                  <h3>Free</h3>
                  <p className="pricing-sub">Perfect for occasional sharing</p>
                  <ul>
                    {freeFeatures.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="pricing-card-cta">
                  <span className="pricing-card-cta-text">Continue with Free</span>
                </div>
              </article>

              <article className="pricing-card pricing-card-paid">
                <div className="pricing-card-content">
                  <span className="pricing-badge">Best Value</span>
                  <p className="pricing-price pricing-swap" key={`price-${cycle}`}>
                    <span className="pricing-amount">{isYearly ? "$34.99" : "$4.99"}</span>
                    <span className="pricing-period">{isYearly ? "/year" : "/month"}</span>
                  </p>
                  <p className="pricing-sub pricing-swap" key={`detail-${cycle}`}>
                    {isYearly ? "Billed annually" : "or $34.99 / year"}
                  </p>
                  <p className="pricing-sub">Built for frequent workflows</p>
                  <ul>
                    {paidFeatures.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="pricing-card-cta">
                  <span className="pricing-card-cta-text pricing-card-cta-text-primary">Start Pro</span>
                  <p className="pricing-microcopy">Cancel anytime</p>
                </div>
              </article>
            </div>
          </div>
          <p className="pricing-trust-footer">No ads. Your data stays private.</p>
        </div>
      </div>
    </section>
  );
}
