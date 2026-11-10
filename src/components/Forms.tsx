"use client";

import { useActionState } from "react";
import { submitPrayer, submitVisit, type FormState } from "@/app/actions";
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
