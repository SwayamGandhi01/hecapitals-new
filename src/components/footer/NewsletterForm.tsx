"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { useId, useState } from "react";

import { CONTACT } from "@/lib/contact";
import { isValidEmail, subscribeToNewsletter } from "@/lib/subscribe";

type Status =
  | { kind: "idle" }
  | { kind: "pending" }
  | { kind: "ok" }
  | { kind: "error"; message: string };

export function NewsletterForm() {
  const inputId = useId();
  const statusId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const pending = status.kind === "pending";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return; // guards against double submits

    if (!isValidEmail(email)) {
      setStatus({ kind: "error", message: "Enter a valid email address." });
      return;
    }

    setStatus({ kind: "pending" });
    const result = await subscribeToNewsletter(email);

    if (result.ok) {
      setStatus({ kind: "ok" });
      setEmail("");
      return;
    }

    // Never claim success. While no provider is wired up, point the visitor at
    // an address that actually reaches the company.
    setStatus({
      kind: "error",
      message:
        result.reason === "invalid"
          ? "Enter a valid email address."
          : `Sign-up isn't connected yet — please email ${CONTACT.email.label}.`,
    });
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full sm:max-w-[34rem]">
      <label htmlFor={inputId} className="sr-only">
        Your email address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id={inputId}
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          aria-describedby={status.kind === "idle" ? undefined : statusId}
          aria-invalid={status.kind === "error" || undefined}
          className="min-w-0 flex-1 rounded-lg border border-brand/25 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-muted/70 focus:border-brand focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-navy-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? (
            <>
              <Loader2
                aria-hidden
                className="size-4 animate-spin motion-reduce:animate-none"
              />
              Subscribing
            </>
          ) : (
            <>
              Subscribe
              <ArrowRight aria-hidden className="size-4" />
            </>
          )}
        </button>
      </div>

      {status.kind !== "idle" ? (
        <p
          id={statusId}
          role="status"
          aria-live="polite"
          className={`mt-2.5 text-[0.8125rem] ${
            status.kind === "ok" ? "text-brand" : "text-ink-muted"
          }`}
        >
          {status.kind === "ok"
            ? "Thank you — you're subscribed."
            : status.kind === "pending"
              ? "Sending…"
              : status.message}
        </p>
      ) : null}
    </form>
  );
}
