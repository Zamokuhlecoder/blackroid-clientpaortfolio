"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight, Check, CircleHelp, Clock3, FileText, MessageSquareText, Plus } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/Button";

const sections = ["Overview", "Progress", "Team", "Invoices"] as const;
type Section = (typeof sections)[number];
const ease = [0.16, 1, 0.3, 1] as const;

const milestones = [
  { title: "Discovery & requirements", date: "Complete", status: "done" },
  { title: "Experience and visual design", date: "Complete", status: "done" },
  { title: "Website development", date: "In progress", status: "current" },
  { title: "Review and refinements", date: "Up next", status: "upcoming" },
  { title: "Launch and handover", date: "Up next", status: "upcoming" },
] as const;

const invoices = [
  { number: "BR-2026-014", description: "Project deposit", date: "12 Nov 2026", amount: "R 18,000", status: "Paid" },
  {
    number: "BR-2026-021",
    description: "Design approval milestone",
    date: "03 Dec 2026",
    amount: "R 12,000",
    status: "Paid",
  },
  {
    number: "BR-2026-028",
    description: "Development milestone",
    date: "Due 28 Dec 2026",
    amount: "R 15,000",
    status: "Awaiting payment",
  },
] as const;

const team = [
  { initials: "PL", role: "Project lead", responsibility: "Planning, delivery and your main point of contact" },
  { initials: "PD", role: "Product designer", responsibility: "User experience, interface design and review" },
  { initials: "EN", role: "Engineering team", responsibility: "Website development, testing and launch" },
] as const;

const fieldClass =
  "block w-full rounded-[3px] border border-line-strong bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-accent";

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div>
      <p className="eyebrow text-muted">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-medium tracking-tight text-ink">{title}</h2>
      {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{description}</p>}
    </div>
  );
}

function ClientPortfolio() {
  const [activeSection, setActiveSection] = useState<Section>("Overview");
  const [suggestion, setSuggestion] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestionSent, setSuggestionSent] = useState(false);
  const reduceMotion = useReducedMotion();

  function submitSuggestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = suggestion.trim();
    if (!message) return;
    setSuggestions((current) => [message, ...current]);
    setSuggestion("");
    setSuggestionSent(true);
  }

  return (
    <div className="min-h-screen bg-white pt-28 pb-24 lg:pt-40 lg:pb-32">
      <div className="container-site">
        <Reveal y={20}>
          <div className="flex flex-col justify-between gap-8 border-b border-line pb-10 sm:flex-row sm:items-end lg:pb-12">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-muted">
                <span className="size-1.5 rounded-full bg-accent" />
                Sample workspace
              </div>
              <p className="eyebrow text-accent">Client workspace</p>
              <h1 className="mt-3 text-headline font-light text-ink">Good morning, Alex.</h1>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Here’s the latest on your project with {site.name}.
              </p>
            </div>
            <TextLink
              href={`mailto:${site.publicEmail}?subject=Project%20support`}
              className="self-start sm:self-auto sm:mb-1"
            >
              <CircleHelp aria-hidden="true" className="size-4" />
              Get support
            </TextLink>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0">
            <div
              className="flex gap-7 overflow-x-auto border-b border-line sm:gap-9"
              role="tablist"
              aria-label="Project workspace"
            >
              {sections.map((section) => (
                <button
                  key={section}
                  id={`tab-${section.toLowerCase()}`}
                  type="button"
                  role="tab"
                  aria-selected={activeSection === section}
                  aria-controls="portfolio-panel"
                  onClick={() => setActiveSection(section)}
                  className={`group relative -mb-px shrink-0 border-b border-transparent px-0.5 py-4 text-sm transition-colors duration-300 ${
                    activeSection === section ? "font-medium text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {section}
                  {section === "Invoices" && (
                    <span className="ml-2 rounded-full bg-accent-wash px-2 py-0.5 text-xs text-accent">1</span>
                  )}
                  {activeSection === section && (
                    <motion.span
                      aria-hidden="true"
                      layoutId="portfolio-tab-indicator"
                      className="absolute inset-x-0 -bottom-px h-px bg-accent"
                      transition={reduceMotion ? { duration: 0.01 } : { type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div id="portfolio-panel" role="tabpanel" aria-labelledby={`tab-${activeSection.toLowerCase()}`}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeSection}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.32, ease }}
                  className="pt-8"
                >
                  {activeSection === "Overview" && (
                    <div className="space-y-8">
                      <section className="group rounded-[4px] border border-line bg-white p-5 transition-[box-shadow,transform,border-color] duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_24px_60px_-36px_rgb(0_20_47/0.28)] sm:p-8">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <p className="eyebrow text-muted">Current project</p>
                            <h2 className="mt-2 text-2xl font-medium tracking-tight text-ink">
                              Corporate website refresh
                            </h2>
                            <p className="mt-2 text-sm text-muted">Website design and development · Project BR-104</p>
                          </div>
                          <span className="inline-flex items-center gap-2 rounded-full bg-[#eef5f0] px-3 py-1.5 text-xs font-medium text-[#316247]">
                            <span className="size-1.5 rounded-full bg-[#4b8a64]" />
                            On track
                          </span>
                        </div>
                        <div className="mt-8 flex items-end justify-between gap-4">
                          <div>
                            <p className="text-sm text-muted">Overall progress</p>
                            <p className="mt-1 text-title font-light text-ink">68%</p>
                          </div>
                          <p className="text-right text-sm text-muted">
                            Target handover
                            <br />
                            <span className="font-medium text-ink">14 December 2026</span>
                          </p>
                        </div>
                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-paper">
                          <motion.div
                            initial={reduceMotion ? false : { scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: reduceMotion ? 0.01 : 1, delay: reduceMotion ? 0 : 0.15, ease }}
                            className="h-full w-[68%] origin-left rounded-full bg-accent"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveSection("Progress")}
                          className="group/link mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent"
                        >
                          <span className="underline decoration-accent/30 underline-offset-4 transition-colors group-hover/link:decoration-accent">
                            View project progress
                          </span>
                          <ArrowRight
                            aria-hidden="true"
                            className="size-4 transition-transform duration-300 group-hover/link:translate-x-1"
                          />
                        </button>
                      </section>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <section className="rounded-[4px] border border-line p-5 transition-[box-shadow,transform,border-color] duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_24px_60px_-36px_rgb(0_20_47/0.22)] sm:p-6">
                          <div className="flex items-center justify-between gap-3">
                            <h2 className="font-medium text-ink">Next milestone</h2>
                            <Clock3 aria-hidden="true" className="size-4 text-muted" />
                          </div>
                          <p className="mt-5 text-lg font-light text-ink">Review and refinements</p>
                          <p className="mt-1 text-sm text-muted">Your feedback helps us shape the final details.</p>
                          <button
                            type="button"
                            onClick={() => setActiveSection("Progress")}
                            className="mt-4 text-sm font-medium text-accent hover:underline"
                          >
                            Share a suggestion
                          </button>
                        </section>
                        <section className="rounded-[4px] border border-line p-5 transition-[box-shadow,transform,border-color] duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_24px_60px_-36px_rgb(0_20_47/0.22)] sm:p-6">
                          <div className="flex items-center justify-between gap-3">
                            <h2 className="font-medium text-ink">Invoice to review</h2>
                            <FileText aria-hidden="true" className="size-4 text-muted" />
                          </div>
                          <p className="mt-5 text-lg font-light text-ink">Development milestone</p>
                          <p className="mt-1 text-sm text-muted">BR-2026-028 · R 15,000</p>
                          <button
                            type="button"
                            onClick={() => setActiveSection("Invoices")}
                            className="mt-4 text-sm font-medium text-accent hover:underline"
                          >
                            View invoices
                          </button>
                        </section>
                      </div>
                    </div>
                  )}

                  {activeSection === "Progress" && (
                    <div className="space-y-9">
                      <SectionTitle
                        eyebrow="Project timeline"
                        title="Progress and feedback"
                        description="Follow each project milestone and share suggestions for the work in progress."
                      />
                      <ol className="space-y-0">
                        {milestones.map((milestone, index) => (
                          <motion.li
                            key={milestone.title}
                            initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: reduceMotion ? 0.01 : 0.3,
                              delay: reduceMotion ? 0 : index * 0.06,
                              ease,
                            }}
                            className="relative flex gap-4 pb-7 last:pb-0"
                          >
                            {index < milestones.length - 1 && (
                              <span
                                aria-hidden="true"
                                className="absolute top-7 left-[11px] h-[calc(100%-12px)] w-px bg-line"
                              />
                            )}
                            <span
                              className={`relative z-10 mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border ${
                                milestone.status === "done"
                                  ? "border-accent bg-accent text-white"
                                  : milestone.status === "current"
                                    ? "border-accent bg-white text-accent"
                                    : "border-line-strong bg-white text-transparent"
                              }`}
                            >
                              {milestone.status === "done" ? (
                                <Check aria-hidden="true" className="size-3.5" />
                              ) : (
                                <span className="size-2 rounded-full bg-current" />
                              )}
                            </span>
                            <div className="flex w-full flex-wrap justify-between gap-2">
                              <p
                                className={`text-sm ${milestone.status === "upcoming" ? "text-muted" : "font-medium text-ink"}`}
                              >
                                {milestone.title}
                              </p>
                              <p className="text-sm text-muted">{milestone.date}</p>
                            </div>
                          </motion.li>
                        ))}
                      </ol>
                      <section className="rounded-[4px] border border-line p-5 transition-shadow duration-500 hover:shadow-[0_24px_60px_-36px_rgb(0_20_47/0.18)] sm:p-7">
                        <div className="flex items-start gap-3">
                          <MessageSquareText aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" />
                          <div>
                            <h3 className="font-medium text-ink">Have a suggestion?</h3>
                            <p className="mt-1 text-sm leading-6 text-muted">
                              Add a note about the current work. Your project team can follow up with you.
                            </p>
                          </div>
                        </div>
                        <form onSubmit={submitSuggestion} className="mt-5">
                          <label htmlFor="project-suggestion" className="mb-2 block text-sm font-medium text-ink">
                            Your suggestion
                          </label>
                          <textarea
                            id="project-suggestion"
                            value={suggestion}
                            onChange={(event) => {
                              setSuggestion(event.target.value);
                              setSuggestionSent(false);
                            }}
                            rows={4}
                            maxLength={1000}
                            placeholder="Tell us what you’d like us to consider…"
                            className={fieldClass}
                          />
                          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                            <p className="text-xs text-muted" aria-live="polite">
                              {suggestionSent ? "Suggestion added to this preview." : "Up to 1,000 characters"}
                            </p>
                            <button
                              type="submit"
                              disabled={!suggestion.trim()}
                              className="inline-flex h-10 items-center gap-2 rounded-[3px] bg-accent px-4 text-sm font-medium text-white transition-colors hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <Plus aria-hidden="true" className="size-4" />
                              Add suggestion
                            </button>
                          </div>
                        </form>
                        {suggestions.length > 0 && (
                          <ul
                            className="mt-5 space-y-3 border-t border-line pt-4"
                            aria-label="Suggestions added in this session"
                          >
                            <AnimatePresence initial={false}>
                              {suggestions.map((item, index) => (
                                <motion.li
                                  key={`${index}-${item}`}
                                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: reduceMotion ? 0.01 : 0.25, ease }}
                                  className="flex gap-3 text-sm leading-6 text-ink-soft"
                                >
                                  <MessageSquareText aria-hidden="true" className="mt-1 size-4 shrink-0 text-muted" />
                                  <span>{item}</span>
                                </motion.li>
                              ))}
                            </AnimatePresence>
                          </ul>
                        )}
                      </section>
                    </div>
                  )}

                  {activeSection === "Team" && (
                    <div className="space-y-7">
                      <SectionTitle
                        eyebrow="Your project team"
                        title="The people on your project"
                        description="Your dedicated team is here to keep the project moving and answer your questions."
                      />
                      <ul className="divide-y divide-line border-y border-line">
                        {team.map((member, index) => (
                          <motion.li
                            key={member.role}
                            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: reduceMotion ? 0.01 : 0.3,
                              delay: reduceMotion ? 0 : index * 0.07,
                              ease,
                            }}
                            className="flex items-center gap-4 py-5"
                          >
                            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent-wash text-sm font-medium text-accent">
                              {member.initials}
                            </span>
                            <div>
                              <h3 className="font-medium text-ink">{member.role}</h3>
                              <p className="mt-1 text-sm text-muted">{member.responsibility}</p>
                            </div>
                          </motion.li>
                        ))}
                      </ul>
                      <Link
                        href={`mailto:${site.publicEmail}?subject=Project%20team`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
                      >
                        Contact the team <ArrowUpRight aria-hidden="true" className="size-4" />
                      </Link>
                    </div>
                  )}

                  {activeSection === "Invoices" && (
                    <div className="space-y-7">
                      <SectionTitle
                        eyebrow="Payments"
                        title="Invoices"
                        description="Review project invoices and payment status. Contact us if you need an invoice copy or payment details."
                      />
                      <ul className="divide-y divide-line border-y border-line">
                        {invoices.map((invoice, index) => (
                          <motion.li
                            key={invoice.number}
                            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: reduceMotion ? 0.01 : 0.3,
                              delay: reduceMotion ? 0 : index * 0.07,
                              ease,
                            }}
                            className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"
                          >
                            <div className="flex items-start gap-3">
                              <FileText aria-hidden="true" className="mt-1 size-5 shrink-0 text-muted" />
                              <div>
                                <h3 className="font-medium text-ink">{invoice.description}</h3>
                                <p className="mt-1 text-sm text-muted">
                                  {invoice.number} <span aria-hidden="true">·</span> {invoice.date}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between gap-5 sm:justify-end">
                              <div className="text-left sm:text-right">
                                <p className="font-medium text-ink">{invoice.amount}</p>
                                <p
                                  className={`mt-1 text-xs ${invoice.status === "Paid" ? "text-[#316247]" : "text-[#8b5a16]"}`}
                                >
                                  {invoice.status}
                                </p>
                              </div>
                              {invoice.status !== "Paid" && (
                                <Link
                                  href={`mailto:${site.publicEmail}?subject=Payment%20details%20for%20${invoice.number}`}
                                  className="inline-flex h-9 items-center gap-1.5 rounded-[3px] border border-line-strong px-3 text-xs font-medium text-ink hover:border-accent hover:text-accent"
                                >
                                  Request details
                                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                                </Link>
                              )}
                              {invoice.status === "Paid" && (
                                <span
                                  aria-label="Paid"
                                  className="flex size-9 items-center justify-center rounded-full bg-[#eef5f0] text-[#316247]"
                                >
                                  <Check aria-hidden="true" className="size-4" />
                                </span>
                              )}
                            </div>
                          </motion.li>
                        ))}
                      </ul>
                      <p className="text-xs leading-5 text-muted">
                        This preview does not process payments or provide downloadable invoices. Contact{" "}
                        <a
                          href={`mailto:${site.publicEmail}`}
                          className="font-medium text-ink underline underline-offset-2"
                        >
                          {site.publicEmail}
                        </a>{" "}
                        for official billing documents.
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <Reveal y={16} delay={0.12}>
            <aside className="space-y-5 lg:pt-[58px]">
              <section className="rounded-[4px] border border-line p-5 sm:p-6">
                <p className="eyebrow text-muted">Project details</p>
                <dl className="mt-5 space-y-4">
                  <div>
                    <dt className="text-xs text-muted">Project</dt>
                    <dd className="mt-1 text-sm font-medium text-ink">Corporate website refresh</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted">Project reference</dt>
                    <dd className="mt-1 text-sm font-medium text-ink">BR-104</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted">Status</dt>
                    <dd className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-ink">
                      <span className="size-1.5 rounded-full bg-[#4b8a64]" />
                      On track
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted">Target handover</dt>
                    <dd className="mt-1 text-sm font-medium text-ink">14 December 2026</dd>
                  </div>
                </dl>
              </section>
              <section className="rounded-[4px] bg-paper p-5 sm:p-6">
                <p className="text-sm font-medium text-ink">Need a hand?</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Reach out to your project team and we’ll get back to you.
                </p>
                <a
                  href={`mailto:${site.publicEmail}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
                >
                  {site.publicEmail}
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </a>
              </section>
              <p className="text-xs leading-5 text-muted">
                This is a sample workspace. Project details, milestones and invoices shown here are for preview only.
              </p>
            </aside>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

export { ClientPortfolio };
