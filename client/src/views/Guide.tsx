"use client";

import { OrganisationLogos } from "@/components/OrganisationLogos";
import { Button } from "@/components/ui/button";
import { capabilityLabel, capabilitiesFor } from "@shared/access";
import {
  ASSISTANT_FUNCTIONS,
  ESCALATION_LEVELS,
  NATIONAL_SECTIONS,
  OFFICER_DUTIES,
  REFERRAL_CRITERIA,
  escalationLabel,
} from "@shared/delegation";
import { matterTypeValues } from "@shared/matters";
import { ROLE_DESCRIPTIONS, ROLE_TITLES, ROLE_VALUES } from "@shared/roles";
import { STATUS_LABELS, STATUS_VALUES } from "@shared/statuses";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * The officer's guide.
 *
 * Reachable without a session, because the sign-in screen offers it and an
 * officer who cannot yet sign in is the one who most needs it. It answers the
 * questions that come up before a first case is filed-how do I get in, what do
 * I file, what do the status codes mean, what are each role's responsibilities
 * under the Manual, and how the province relates to the National Sections.
 * Anything an officer needs to *do* belongs in the application, not in a page
 * that can drift away from it.
 *
 * The lists are read from `shared/` rather than written out, so a status, a
 * role or a referral trigger added there appears here without a second edit.
 * A guide that quotes a stale list of status codes is worse than no guide.
 */

const SECTIONS = [
  {
    heading: "Signing in",
    body: [
      "Use the username the platform administrator issued you and the password they set. Accounts are not created from this platform: the administrator registers each officer, assigns a role, and re-keys a forgotten password.",
      "“Remember sign in details” keeps your username on this device. It never stores your password.",
    ],
  },
  {
    heading: "Filing a matter",
    body: [
      "Choose Register matter from the navigation. Every matter is filed under one of three classes, one province and one of the eleven status codes below.",
      "The province decides the office that receives it, and the class decides the National Section it is referred to by default.",
    ],
  },
  {
    heading: "Keeping the register honest",
    body: [
      "Deadlines drive escalation. A matter that passes its due date is flagged as delayed on the overview, and matters that stay delayed long enough move to Escalated due to delay.",
      "Update a matter as it moves rather than at the end. The quarterly returns and the reports are counted from what is on the register at the moment they are run.",
    ],
  },
] as const;

export default function Guide() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-4 px-6 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <OrganisationLogos
              markClassName="h-9 w-12"
              sizes="48px"
              width={48}
              height={36}
            />
            <span className="text-lg font-bold tracking-tight text-slate-900">
              tsc<span className="text-teal-600">matters</span>
            </span>
          </div>
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </header>

      <div className="mx-auto w-full max-w-4xl px-6 py-12 sm:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Officer&apos;s guide
        </h1>
        <p className="mt-2 text-slate-600">
          How the Provincial Matters platform is used, and what each part of it
          means. Nothing here is a substitute for the Provincial Matters
          Administration Manual-this is the short version of the parts you
          touch day to day.
        </p>

        {SECTIONS.map(section => (
          <section key={section.heading} className="mt-10">
            <h2 className="text-lg font-semibold text-slate-900">
              {section.heading}
            </h2>
            {section.body.map(paragraph => (
              <p
                key={paragraph}
                className="mt-2 text-[0.9375rem] leading-7 text-slate-600"
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-slate-900">
            Classes of matter
          </h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-3">
            {matterTypeValues.map(value => (
              <li
                key={value}
                className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-[0.9375rem] text-slate-700"
              >
                {value}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-slate-900">Status codes</h2>
          <p className="mt-2 text-[0.9375rem] leading-7 text-slate-600">
            The standard status codes the Director monitors cases by. A matter
            carries exactly one at a time.
          </p>
          <dl className="mt-4 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
            {STATUS_VALUES.map(status => (
              <div
                key={status}
                className="flex flex-wrap items-baseline gap-x-4 gap-y-1 px-4 py-3"
              >
                <dt className="w-12 shrink-0 font-mono text-xs font-semibold text-slate-500">
                  {status}
                </dt>
                <dd className="text-[0.9375rem] text-slate-700">
                  {STATUS_LABELS[status]}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-slate-900">
            Roles and responsibilities
          </h2>
          <p className="mt-2 text-[0.9375rem] leading-7 text-slate-600">
            The Manual names two provincial tiers-the Provincial Matters
            Officer and the Professional Assistant to the Director-with the
            Director above both, and a teacher never acts in the system. A
            higher tier holds every capability of the tiers below it, and the
            navigation hides a destination a role cannot use rather than
            offering a link that returns a refusal.
          </p>
          <ul className="mt-4 grid gap-4">
            {ROLE_VALUES.map(role => (
              <li
                key={role}
                className="rounded-lg border border-slate-200 bg-white px-4 py-4"
              >
                <span className="block text-[0.9375rem] font-semibold text-slate-800">
                  {ROLE_TITLES[role]}
                </span>
                <span className="mt-1 block text-[0.9375rem] leading-7 text-slate-600">
                  {ROLE_DESCRIPTIONS[role]}
                </span>
                <span className="mt-2 block text-xs font-medium text-slate-500">
                  In this platform:
                </span>
                <ul className="mt-1 flex flex-wrap gap-1.5">
                  {capabilitiesFor(role).map(capability => (
                    <li
                      key={capability}
                      className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs text-slate-600"
                    >
                      {capabilityLabel(capability)}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-slate-900">
            What a Provincial Matters Officer is responsible for
          </h2>
          <p className="mt-2 text-[0.9375rem] leading-7 text-slate-600">
            Six duties, in the order a matter meets them.
          </p>
          <ol className="mt-4 grid gap-2">
            {OFFICER_DUTIES.map(duty => (
              <li
                key={duty.key}
                className="rounded-lg border border-slate-200 bg-white px-4 py-3"
              >
                <span className="block text-[0.9375rem] font-medium text-slate-800">
                  {duty.label}
                  {duty.note ? (
                    <span className="ml-2 text-xs font-normal text-slate-500">
                      ({duty.note})
                    </span>
                  ) : null}
                </span>
                <span className="mt-1 block text-[0.9375rem] leading-7 text-slate-600">
                  {duty.steps.join(" · ")}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-slate-900">
            The Professional Assistant&apos;s five functions
          </h2>
          <p className="mt-2 text-[0.9375rem] leading-7 text-slate-600">
            The role is structured around office coordination, case
            monitoring, briefing the Director, follow-up and
            reporting-exactly what the monitoring board and the reporting set
            put on screen.
          </p>
          <ul className="mt-4 grid gap-2">
            {ASSISTANT_FUNCTIONS.map(fn => (
              <li
                key={fn.key}
                className="rounded-lg border border-slate-200 bg-white px-4 py-3"
              >
                <span className="block text-[0.9375rem] font-medium text-slate-800">
                  {fn.label}
                </span>
                <span className="mt-1 block text-[0.9375rem] leading-7 text-slate-600">
                  {fn.steps.join(" · ")}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-slate-900">
            Working with the National Sections
          </h2>
          <p className="mt-2 text-[0.9375rem] leading-7 text-slate-600">
            Provincial Matters is the Commission&apos;s first-level service
            delivery and case management arm. It works within delegated
            authority, and the officer is the link between the teacher and the
            National Section holding primary technical authority for the
            subject matter-referring matters requiring specialized or
            higher-level determination to the right Section.
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="w-full text-left text-[0.9375rem]">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500">
                <tr>
                  <th className="px-4 py-2">Subject matter</th>
                  <th className="px-4 py-2">Primary technical authority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {NATIONAL_SECTIONS.map(section => (
                  <tr key={section.key}>
                    <td className="px-4 py-2.5 text-slate-700">
                      {section.authority}
                    </td>
                    <td className="px-4 py-2.5 font-medium text-slate-800">
                      {section.label}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[0.9375rem] leading-7 text-slate-600">
            A referral carries its reason and a response due date, and a matter
            with a legal trigger goes to the Legal Section whatever its class.
            Provincial officers never give their own legal opinions-they may
            explain approved TSC policy and procedure, and refer questions of
            legal meaning to the Legal Section.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-slate-900">
            When a matter must be referred
          </h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {REFERRAL_CRITERIA.map(criterion => (
              <li
                key={criterion.key}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-[0.9375rem] text-slate-700"
              >
                {criterion.text}
                {criterion.legalOnly ? (
                  <span className="ml-1.5 text-xs text-slate-500">
                    (legal referral)
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-slate-900">
            Escalation
          </h2>
          <p className="mt-2 text-[0.9375rem] leading-7 text-slate-600">
            A matter should not remain indefinitely with an officer. It climbs
            one level at a time, and the actual levels are aligned with the
            approved TSC delegation instruments.
          </p>
          <ol className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {ESCALATION_LEVELS.map(level => (
              <li
                key={level.level}
                className="rounded-lg border border-slate-200 bg-white px-4 py-3"
              >
                <span className="block text-[0.9375rem] font-medium text-slate-800">
                  {escalationLabel(level.level)}
                </span>
                <span className="mt-1 block text-[0.8125rem] leading-6 text-slate-600">
                  {level.description}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-12 border-t border-slate-200 pt-8">
          <Link href="/login">
            <Button variant="outline">Go to sign in</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
