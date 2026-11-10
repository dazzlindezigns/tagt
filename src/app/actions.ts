"use server";

import { redirect } from "next/navigation";

/**
 * Form handlers. Until Supabase is connected (Phase 1, step 7), submissions are
 * validated and logged on the server only. Nothing is stored or emailed yet, so
 * these forms must not go live before that step. See docs/RUNBOOK.md.
 */
const clean = (v: FormDataEntryValue | null, max = 2000) => String(v ?? "").trim().slice(0, max);

/** On an error the form re-renders with what the person typed, so nothing is lost. */
export type FormState = { error?: string; values?: Record<string, string> };

export async function submitVisit(_: FormState, form: FormData): Promise<FormState> {
  if (clean(form.get("website"))) redirect("/visit/thanks"); // honeypot
  const data = {
    name: clean(form.get("name"), 120),
    email: clean(form.get("email"), 200),
    phone: clean(form.get("phone"), 40),
    service: clean(form.get("service"), 60),
    guests: clean(form.get("guests"), 10),
    note: clean(form.get("note")),
  };
  if (!data.name) return { error: "Please tell us your name.", values: data };
  if (!data.email && !data.phone) return { error: "Please add an email or phone number so we can say hello.", values: data };
  console.info("[visit form, not stored yet]", { ...data, at: new Date().toISOString() });
  redirect("/visit/thanks");
}

export async function submitPrayer(_: FormState, form: FormData): Promise<FormState> {
  if (clean(form.get("website"))) redirect("/prayer/thanks");
  const visibility = clean(form.get("visibility"), 20);
  const data = {
    name: clean(form.get("name"), 120),
    contact: clean(form.get("contact"), 200),
    request: clean(form.get("request"), 4000),
    visibility: ["pastors", "team", "wall"].includes(visibility) ? visibility : "pastors",
  };
  if (!data.request) return { error: "Please write your prayer request.", values: data };
  // Prayer text is sensitive: never log the request body.
  console.info("[prayer form, not stored yet]", { visibility: data.visibility, at: new Date().toISOString() });
  redirect("/prayer/thanks");
}
