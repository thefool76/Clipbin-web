"use client";

import { FormEvent, useState } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function TestingWaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }

    try {
      setStatus("saving");
      setMessage("");

      const response = await fetch("/api/testing-emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail })
      });

      const data = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error ?? "Could not save your email. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(data.message ?? "Successfully registered for testing.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <form className="testing-waitlist-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="testing-email" className="testing-waitlist-label">
        Testing email
      </label>
      <div className="testing-waitlist-row">
        <input
          id="testing-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="name@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="testing-waitlist-input"
          disabled={status === "saving"}
          required
        />
        <button type="submit" className="testing-waitlist-btn" disabled={status === "saving"}>
          {status === "saving" ? "Saving..." : "Join Waiting List"}
        </button>
      </div>
      <p className={`testing-waitlist-message is-${status}`} aria-live="polite">
        {message || " "}
      </p>
    </form>
  );
}
