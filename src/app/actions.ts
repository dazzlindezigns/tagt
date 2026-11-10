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

export async function submitMinistry(_: FormState, form: FormData): Promise<FormState> {
  const ministry = clean(form.get("ministry"), 60);
  if (clean(form.get("website"))) redirect(`/ministries/thanks?m=${encodeURIComponent(ministry)}`);
  const data = {
    ministry,
    name: clean(form.get("name"), 120),
    email: clean(form.get("email"), 200),
    phone: clean(form.get("phone"), 40),
    note: clean(form.get("note")),
  };
  if (!data.name) return { error: "Please tell us your name.", values: data };
  if (!data.email && !data.phone) return { error: "Please add an email or phone number so the leaders can reach you.", values: data };
  console.info("[ministry form, not stored yet]", { ministry: data.ministry, at: new Date().toISOString() });
  redirect(`/ministries/thanks?m=${encodeURIComponent(ministry)}`);
}

export type GiveState = FormState & { notConnected?: boolean };

export async function submitGift(_: GiveState, form: FormData): Promise<GiveState> {
  const { list } = await import("@/lib/content");
  const { startCheckout } = await import("@/lib/giving");
  const funds = list("20-give-online", 6);
  const frequencies = list("20-give-online", 8);
  const raw = clean(form.get("amount"), 12).replace(/[$,\s]/g, "");
  const amount = Number(raw);
  const values = {
    amount: raw,
    fund: clean(form.get("fund"), 80),
    frequency: clean(form.get("frequency"), 40),
    coverFee: form.get("coverFee") ? "on" : "",
    name: clean(form.get("name"), 120),
    email: clean(form.get("email"), 200),
  };
  if (!Number.isFinite(amount) || amount < 1) return { error: "Please enter an amount of at least $1.", values };
  if (amount > 25000) return { error: "For gifts over $25,000, please contact the church office.", values };
  if (!funds.includes(values.fund)) return { error: "Please choose where your gift goes.", values };
  if (!frequencies.includes(values.frequency)) return { error: "Please choose how often to give.", values };
  if (!values.name) return { error: "Please tell us your name for your giving receipt.", values };
  if (!/^\S+@\S+\.\S+$/.test(values.email)) return { error: "Please enter an email for your receipt.", values };

  const url = await startCheckout({
    amountCents: Math.round(amount * 100),
    fund: values.fund,
    frequency: values.frequency,
    coverFee: !!values.coverFee,
    name: values.name,
    email: values.email,
  });
  if (!url) return { notConnected: true, values };
  redirect(url);
}
