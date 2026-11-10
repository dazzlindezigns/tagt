"use client";

import { useActionState } from "react";
import { submitGift, submitMinistry, submitPrayer, submitVisit, type FormState, type GiveState } from "@/app/actions";
import { useState } from "react";
import { buttonClass } from "./Button";

function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Leave this empty <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

function ErrorLine({ state }: { state: FormState }) {
  return state.error ? (
    <p role="alert" className="rounded-xl bg-[#fbe9e7] px-4 py-3 text-sm text-[#8a2a1c]">
      {state.error}
    </p>
  ) : null;
}

export function VisitForm({ sendLabel, sheetAttrs }: { sendLabel: string; sheetAttrs: Record<string, string | number> }) {
  const [state, action, pending] = useActionState(submitVisit, {});
  return (
    <form action={action} className="relative flex flex-col gap-4">
      <Honeypot />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="field-label">Name</span>
          <input name="name" defaultValue={state.values?.name} required autoComplete="name" className="field-input" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="field-label">Email</span>
          <input name="email" defaultValue={state.values?.email} type="email" autoComplete="email" className="field-input" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="field-label">Phone</span>
          <input name="phone" defaultValue={state.values?.phone} type="tel" autoComplete="tel" className="field-input" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="field-label">How many are coming?</span>
          <input name="guests" type="number" min={1} max={30} defaultValue={state.values?.guests || 1} className="field-input" />
        </label>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className="field-label">Anything we should know?</span>
        <textarea name="note" defaultValue={state.values?.note} rows={3} className="field-input" />
      </label>
      <ErrorLine state={state} />
      <button type="submit" disabled={pending} className={buttonClass("gold", "self-start disabled:opacity-60")}>
        <span {...sheetAttrs}>{sendLabel}</span>
      </button>
    </form>
  );
}

export function PrayerForm({
  labels,
  sheet,
}: {
  labels: { name: string; contact: string; request: string; question: string; options: string[]; submit: string };
  sheet: Record<"name" | "contact" | "request" | "question" | "submit", Record<string, string | number>>;
}) {
  const [state, action, pending] = useActionState(submitPrayer, {});
  const values = ["pastors", "team", "wall"];
  return (
    <form action={action} className="relative flex flex-col gap-4">
      <Honeypot />
      <label className="flex flex-col gap-1.5">
        <span className="field-label" {...sheet.name}>{labels.name}</span>
        <input name="name" defaultValue={state.values?.name} autoComplete="name" className="field-input" />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="field-label" {...sheet.contact}>{labels.contact}</span>
        <input name="contact" defaultValue={state.values?.contact} autoComplete="email" className="field-input" />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="field-label" {...sheet.request}>{labels.request}</span>
        <textarea name="request" defaultValue={state.values?.request} required rows={5} className="field-input" />
      </label>
      <fieldset className="flex flex-col gap-2" {...sheet.question}>
        <legend className="field-label mb-2">{labels.question}</legend>
        {labels.options.map((o, i) => (
          <label key={values[i]} className="flex cursor-pointer items-center gap-3 rounded-xl border border-cream-line bg-white px-4 py-3 text-sm has-[:checked]:border-purple-600 has-[:checked]:bg-purple-100">
            <input type="radio" name="visibility" value={values[i]} defaultChecked={(state.values?.visibility ?? "pastors") === values[i]} className="h-4 w-4 accent-purple-800" />
            {o}
          </label>
        ))}
      </fieldset>
      <ErrorLine state={state} />
      <button type="submit" disabled={pending} className={buttonClass("gold", "w-full disabled:opacity-60")}>
        <span {...sheet.submit}>{labels.submit}</span>
      </button>
    </form>
  );
}

export function MinistryForm({ ministry, sendLabel, sheetAttrs }: { ministry: string; sendLabel: string; sheetAttrs: Record<string, string | number> }) {
  const [state, action, pending] = useActionState(submitMinistry, {});
  return (
    <form action={action} className="relative flex flex-col gap-4">
      <Honeypot />
      <input type="hidden" name="ministry" value={ministry} />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="field-label">Name</span>
          <input name="name" required autoComplete="name" defaultValue={state.values?.name} className="field-input" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="field-label">Email</span>
          <input name="email" type="email" autoComplete="email" defaultValue={state.values?.email} className="field-input" />
        </label>
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="field-label">Phone</span>
          <input name="phone" type="tel" autoComplete="tel" defaultValue={state.values?.phone} className="field-input" />
        </label>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className="field-label">Anything you&apos;d like the leaders to know?</span>
        <textarea name="note" rows={3} defaultValue={state.values?.note} className="field-input" />
      </label>
      <ErrorLine state={state} />
      <button type="submit" disabled={pending} className={buttonClass("gold", "self-start disabled:opacity-60")}>
        <span {...sheetAttrs}>{sendLabel}</span>
      </button>
    </form>
  );
}

type Attrs = Record<string, string | number>;

export function GiveForm({
  words,
  sheet,
  funds,
  frequencies,
  givingPageUrl,
}: {
  words: { amount: string; fund: string; often: string; fee: string; button: string; note: string; notConnected: string; notConnectedButton: string };
  sheet: Record<"amount" | "fund" | "funds" | "often" | "oftenChoices" | "fee" | "button" | "note", Attrs>;
  funds: string[];
  frequencies: string[];
  givingPageUrl: string;
}) {
  const [state, action, pending] = useActionState<GiveState, FormData>(submitGift, {});
  const presets = [25, 50, 100, 250];
  const [amount, setAmount] = useState(state.values?.amount ?? "100");
  const v = state.values;
  return (
    <form action={action} className="flex flex-col gap-6">
      <fieldset className="flex flex-col gap-3">
        <legend className="field-label mb-1" {...sheet.amount}>{words.amount}</legend>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={amount === String(p)}
              onClick={() => setAmount(String(p))}
              className="rounded-full border border-cream-line bg-white px-5 py-2.5 font-semibold tabular-nums text-purple-800 transition aria-pressed:border-purple-800 aria-pressed:bg-purple-800 aria-pressed:text-white"
            >
              ${p}
            </button>
          ))}
        </div>
        <label className="relative">
          <span className="sr-only">Other amount in dollars</span>
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-purple-800">$</span>
          <input
            name="amount"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
            className="field-input pl-9 text-lg font-semibold tabular-nums"
            required
          />
        </label>
      </fieldset>

      <label className="flex flex-col gap-1.5">
        <span className="field-label" {...sheet.fund}>{words.fund}</span>
        <select name="fund" defaultValue={v?.fund ?? funds[0]} className="field-input" {...sheet.funds}>
          {funds.map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>
      </label>

      <fieldset className="flex flex-col gap-2">
        <legend className="field-label mb-2" {...sheet.often}>{words.often}</legend>
        <div className="grid gap-2 sm:grid-cols-3" {...sheet.oftenChoices}>
          {frequencies.map((f, i) => (
            <label key={f} className="flex cursor-pointer items-center gap-3 rounded-xl border border-cream-line bg-white px-4 py-3 text-sm has-[:checked]:border-purple-600 has-[:checked]:bg-purple-100">
              <input type="radio" name="frequency" value={f} defaultChecked={(v?.frequency ?? frequencies[0]) === f || (!v && i === 0)} className="h-4 w-4 accent-purple-800" />
              {f}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="field-label">Name</span>
          <input name="name" autoComplete="name" required defaultValue={v?.name} className="field-input" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="field-label">Email (for your receipt)</span>
          <input name="email" type="email" autoComplete="email" required defaultValue={v?.email} className="field-input" />
        </label>
      </div>

      <label className="flex cursor-pointer items-center gap-3 text-sm text-ink/85">
        <input type="checkbox" name="coverFee" defaultChecked={!!v?.coverFee} className="h-4 w-4 accent-purple-800" />
        <span {...sheet.fee}>{words.fee}</span>
      </label>

      {state.error && (
        <p role="alert" className="rounded-xl bg-[#fbe9e7] px-4 py-3 text-sm text-[#8a2a1c]">
          {state.error}
        </p>
      )}
      {state.notConnected && (
        <div role="alert" className="flex flex-col gap-3 rounded-xl border border-gold bg-[#fbf3e2] px-5 py-4 text-sm text-ink">
          <p>{words.notConnected}</p>
          {givingPageUrl && (
            <a href={givingPageUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("purple", "self-start")}>
              {words.notConnectedButton}
            </a>
          )}
        </div>
      )}

      <button type="submit" disabled={pending} className={buttonClass("gold", "w-full text-base disabled:opacity-60")}>
        <span {...sheet.button}>{words.button}</span>
      </button>
      <p className="text-center text-xs text-sub" {...sheet.note}>{words.note}</p>
    </form>
  );
}
