"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import type { ResolveResponse } from "@/lib/types";

export function ClipViewer({ shortCode }: { shortCode: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResolveResponse | null>(null);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    window.localStorage.setItem("clipbin_route_theme", nextTheme);
  };

  const copyText = useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    } finally {
      window.setTimeout(() => setCopyState("idle"), 1200);
    }
  }, []);

  const resolveClip = useCallback(async (passwordValue?: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/resolve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shortCode, password: passwordValue ?? null })
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Failed to resolve clip");
        setResult(null);
        return;
      }

      setResult(json as ResolveResponse);
      if (json.status !== "invalid_password") {
        setPassword("");
      }
    } catch {
      setError("Network request failed");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, [shortCode]);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("clipbin_route_theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
      return;
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    void resolveClip();
  }, [resolveClip]);

  const onUnlock = async (event: FormEvent) => {
    event.preventDefault();
    await resolveClip(password);
  };

  return (
    <section className="clip-route" data-theme={theme}>
      <div className="clip-route-card">
        <header className="clip-route-head">
          <div>
            <p className="clip-route-eyebrow">Clipbin Route</p>
            <h1 className="clip-route-title">/{shortCode}</h1>
          </div>
          <div className="clip-route-head-controls">
            <a
              className="route-capsule-download"
              href="https://apps.apple.com/us/app/example-app/id000000000"
              target="_blank"
              rel="noreferrer"
              aria-label="Download app now"
            >
              <span aria-hidden="true"></span>
              <span>Download</span>
            </a>
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              <span className="theme-track" />
              <span className="theme-thumb" />
            </button>
          </div>
        </header>

        <div className="clip-route-actions">
          <button
            type="button"
            className="route-action-btn"
            onClick={() => copyText(window.location.href)}
            aria-label="Copy clip link"
          >
            <CopyIcon />
            Copy Link
          </button>
          <span className={`copy-hint copy-hint-${copyState}`}>
            {copyState === "copied" ? "Copied successfully" : copyState === "error" ? "Copy failed" : " "}
          </span>
        </div>

        <div className="clip-route-main">
          {loading ? <p className="state">Loading clip...</p> : null}

          {!loading && error ? (
            <div className="route-state-stack">
              <p className="error">{error}</p>
              <button className="route-btn route-btn-secondary" onClick={() => void resolveClip()}>
                Retry
              </button>
            </div>
          ) : null}

          {!loading && !error && !result ? <p className="state">Unable to load clip.</p> : null}

          {!loading && !error && result && (result.status === "password_required" || result.status === "invalid_password") ? (
            <div className="route-state-stack">
              <p className="state">This clip is password protected.</p>
              <form onSubmit={onUnlock} className="inputRow">
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="route-btn" type="submit">
                  Unlock
                </button>
              </form>
              {result.status === "invalid_password" ? <p className="error">Invalid password.</p> : null}
            </div>
          ) : null}

          {!loading && !error && result?.status === "expired" ? <p className="state">This clip has expired.</p> : null}
          {!loading && !error && result?.status === "not_found" ? <p className="state">Clip not found.</p> : null}

          {!loading && !error && result?.status === "ok" ? (
            <div className="clip-content-wrap">
              <div className="clip-content-head">
                <p className="state">{result.click_count ?? 0} views</p>
                <button
                  type="button"
                  className="route-action-btn"
                  onClick={() => copyText(result.content ?? "")}
                  aria-label="Copy clip content"
                >
                  <CopyIcon />
                  Copy Text
                </button>
              </div>
              <pre>{result.content ?? ""}</pre>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="4" y="4" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" opacity="0.82" />
    </svg>
  );
}
