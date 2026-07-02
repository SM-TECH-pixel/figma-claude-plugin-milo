# SafetyMode "How It Works" & "Why It Works" — Claims Fact-Check & Replacement Pack

## Context

The live SafetyMode site (www.safetymode.com) presents statistics and research claims across two navigation
sections, **How It Works** (7 sub-pages) and **Why It Works** (8 sub-pages). Many of these claims cite sources
that are **fabricated, misattributed, or imprecise** (e.g. "Nametag.io", "Twidd", "Tech Tots Report",
"Victoria Perinne-Johns MSc", "EU/China Cybersecurity Administration Hauts Regulations", "Education Conference UK",
"Jeff Bonnie et al"). Publishing unverifiable statistics on a child-safety product is a credibility and
regulatory risk (ASA/CAP rules require ad claims to be substantiated).

This document is an **exhaustive audit**: every sourced claim on both sections, a verdict on each, and a
**verified replacement** (claim + statistic + authoritative source URL) for every claim that is inaccurate.
Self-reported product metrics and hardware specs are flagged separately (per decision, not replaced — you cannot
cite an external source for a first-party metric). A ready-to-use handover prompt for the web-builder agent is at
the end.

**Scope:** All 15 pages were surveyed. 10 carry sourced claims (below). 5 carry no research statistics and need no
change: `how-it-works-top-of-the-range-hardware` (manufacturer specs — see flagged section), `hiw-every-element`,
`safety-features`, `why-it-works-aids-supervision-over-impossible-surveillance`,
`why-it-works-makes-parenting-a-bit-easier`.

Base URL for all pages: `https://www.safetymode.com/pages/<handle>`

---

## Section A — Full claim inventory with verdicts

Verdict key: ✅ accurate (keep, source tidy-up only) · ⚠️ imprecise/overstated · ❌ source fabricated or misattributed

### HOW IT WORKS

**1. Live Content Blocking** (`how-it-works-live-content-blocking`)
| # | Claim (verbatim) | Cited source | Verdict |
|---|---|---|---|
| 1 | "1 in 3 children have seen content online that upset or worried them" | Internet Matters, 2024 | ✅ figure accurate — tie to Ofcom (33% of 8-17s) |
| 2 | "56% of 11-16 year olds have encountered explicit material online" | NSPCC | ❌ 56% is **boys only** in the 2016 NSPCC/Middlesex study, not all 11-16s |
| 3 | "59% of children who encounter pornography online do so by accident..." | Children's Commissioner | ✅ accurate — keep |
| 4 | "SafetyMode are the only parental controls... On-device Live Content Blocking in any app" | none | ▶ first-party — flag, do not replace |

**2. App Scheduling** (`how-it-works-app-scheduling`)
| # | Claim | Cited source | Verdict |
|---|---|---|---|
| 5 | "Children with higher screen time exposure have 30-60 minutes less sleep per night" | British Academy · AAP | ⚠️/❌ number unsourced; British Academy misattributed |
| 6 | "Overuse of social media is linked to lower academic performance and disruptive behaviour" | Education Conference UK | ❌ "Education Conference UK" is not a real citable source |
| 7 | "Irregular sleep patterns are consistently associated with higher screen exposure in children" | British Academy | ❌ misattributed |

**3. Location Tracking** (`how-it-works-location-tracking`)
| # | Claim | Cited source | Verdict |
|---|---|---|---|
| 8 | "1 in 2 parents in the UK and US already use location tracking" | British Academy, 2024 | ❌ misattributed (British Academy is a humanities body) |
| 9 | "Constant tracking erodes teen trust; periodic check-ins give reassurance without helicopter effect" | Chase et al., Journal of Adolescence, 2024 | ❌ citation appears fabricated |
| 10 | "Tracking improves parent wellbeing as much as child safety" | British Academy, 2024 | ❌ misattributed |

**4. Remote Safety Portal** (`how-it-works-remote-safety-portal`)
| # | Claim | Cited source | Verdict |
|---|---|---|---|
| 11 | "Over 70% of parents and children prefer shared control over one-sided monitoring" | NSPCC | ❌ no such NSPCC figure found |
| 12 | "3 in 4 children have had a tantrum when a device was taken away" | Tech Tots Report | ❌ "Tech Tots Report" appears fabricated |
| 13 | "9 in 10 parents say they argue with their child about technology every week" | Talker Research | ⚠️ source real, but overstated — 9 in 10 argue, only ~half **weekly** |

### WHY IT WORKS

**5. Designed Against Addiction** (`why-it-works-designed-against-smartphone-addiction`)
| # | Claim | Cited source | Verdict |
|---|---|---|---|
| 14 | "1 in 3 adolescents show high addictive social media use by age 14, doubling the risk of anxiety and depression" | Columbia University, 2025 | ⚠️ real study — but the ~2x risk is for **suicidal behaviour**; wording needs tightening |
| 15 | "192 per day notifications... one every five minutes" | Nametag.io, 2024 | ❌ fabricated source & number |
| 16 | "75% reduction in screentime by SafetyMode users within the first month" | none | ▶ first-party — flag, do not replace |

**6. Better Screen Time** (`why-it-works-better-screen-time`)
| # | Claim | Cited source | Verdict |
|---|---|---|---|
| 17 | "Research shows type of screen activity matters far more than total time" | PubMed/NIH | ⚠️ vague attribution; point is sound |
| 18 | "Educational and social screen time have very different effects on child development" | PubMed/NIH | ⚠️ vague attribution |
| 19 | "When introduced with guidance, technology builds creativity, learning, and connection" | IntechOpen | ⚠️ weak source |

**7. Gives Kids Independence** (`why-it-works-gives-kids-independence-but-keeps-them-safe`)
| # | Claim | Cited source | Verdict |
|---|---|---|---|
| 20 | "2 in 3 children are exposed to harmful content online" | Twidd, 2024 | ❌ "Twidd" not real — figure matches Internet Matters (67%) |
| 21 | "98% of children over 5 went online in 2024" | Ofcom, 2024 | ⚠️ Ofcom figure is 96% of 3-17s; 98% is 12-15s only |
| 22 | "WhatsApp reaches the vast majority of 8 to 14 year olds" | Ofcom, 2024 | ⚠️ overstated for 8-11s (54%) |
| 23 | "70% of teenagers actively want parents to set filters to protect them online" | APA / Internet Matters, 2023 | ✅ figure accurate — source is Internet Matters (not APA) |
| 24 | "Children given age-appropriate independence develop stronger confidence, wellbeing and a healthier sense of self" | Tianjin University, 2023 | ❌ attribution unverifiable |
| 25 | "A single fixed approach will not work across a childhood" | JMIR Pediatrics, 2022 | ⚠️ point valid — strengthen source |

**8. The Perfect First Phone** (`why-it-works-the-perfect-first-phone`)
| # | Claim | Cited source | Verdict |
|---|---|---|---|
| 26 | "53% of parents hand over a first phone without any safety features" | Pew Research Center, 2022 | ❌ not in Pew; real 53% is smartphone ownership by age 11 |
| 27 | "Age 9-11: the age range where peer pressure for a first phone begins" | Common Sense Media | ⚠️ vague — replace with hard ownership stat |
| 28 | "40 mins recommended daily screen time for children under 13" | EU Cybersecurity Administration, Hauts Regulations 2024 | ❌ fabricated body/regulation |
| 29 | "Children who receive their first phone with clear rules and active parental involvement are significantly more likely to develop healthy digital habits" | China Cybersafety Administration, Hauts Regulations 2024 | ❌ fabricated body/regulation |

**9. Improves Parent-Child Relationships** (`why-it-works-improves-parent-child-relationships`)
| # | Claim | Cited source | Verdict |
|---|---|---|---|
| 30 | "3 in 4 parents say their child has had a meltdown when a device was taken away" | Tech Tots Report | ❌ fabricated source |
| 31 | "1 in 5 of all parent-child arguments are specifically about smartphone use" | Victoria Perinne-Johns MSc | ❌ fabricated source |

**10. Responsive to Each Child** (`why-it-works-responsive-to-each-childs-unique-circumstances`)
| # | Claim | Cited source | Verdict |
|---|---|---|---|
| 32 | "Adolescents differ vastly in their capacity to manage online experiences. No single digital diet works for every child." | APA, 2021 | ⚠️ attribution vague |
| 33 | "Tailoring controls to the specific child is a proven protective factor for their wellbeing." | University of Bath, 2022 | ❌ unverified |
| 34 | "Adjusting controls as children develop fosters autonomy and better digital citizenship." | Jeff Bonnie et al, 2021 | ❌ citation appears fabricated |
| 35 | "Children respond to the same content differently based on temperament and maturity, not age alone." | Journal of Adolescence, 2019 | ⚠️ unverified specific cite |

---

## Section B — FINAL REPLACEMENT TABLE (verified sources)

Every replacement below was checked against the primary/authoritative source and its statistic re-confirmed.
Claims marked ✅ in Section A that are already correct are included with a source tidy-up only. Claims #4 and #16
(first-party) are handled in Section C, not here.

| Page | Page URL | Erroneous / weak claim | Replacement claim (verified) | Replacement source + URL |
|---|---|---|---|---|
| Live Content Blocking | /pages/how-it-works-live-content-blocking | "1 in 3 children have seen content online that upset or worried them" (Internet Matters) | "A third (33%) of children aged 8-17 have seen something worrying or nasty online in the past year." | Ofcom, Children & Parents Media Use 2024 — https://www.ofcom.org.uk/media-use-and-attitudes/media-habits-children/children-and-parents-media-use-and-attitudes-report-2024 |
| Live Content Blocking | /pages/how-it-works-live-content-blocking | "56% of 11-16 year olds have encountered explicit material online" (NSPCC) | "By age 15-16, 65% of children have seen online pornography (28% of 11-12 year olds)." | NSPCC / Children's Commissioner / Middlesex University, 2016 — https://assets.childrenscommissioner.gov.uk/wpuploads/2017/06/MDX-NSPCC-OCC-Online-Pornography-Report.pdf |
| Live Content Blocking | /pages/how-it-works-live-content-blocking | "59% ... do so by accident" (Children's Commissioner) | KEEP — accurate. "59% of children who have seen online pornography stumbled across it accidentally." | Children's Commissioner for England, 2023 — https://www.childrenscommissioner.gov.uk/resource/a-lot-of-it-is-actually-just-abuse/ |
| App Scheduling | /pages/how-it-works-app-scheduling | "30-60 minutes less sleep per night" (British Academy · AAP) | "Children who use a screen-based device at bedtime are more than twice as likely to get an inadequate amount of sleep." | Carter et al., JAMA Pediatrics, 2016 (125,198 children) — https://jamanetwork.com/journals/jamapediatrics/fullarticle/2571467 |
| App Scheduling | /pages/how-it-works-app-scheduling | "Overuse of social media is linked to lower academic performance..." (Education Conference UK) | "A meta-analysis of 101,441 young people found a small but significant negative link between social-media use and academic performance." | Marker et al., Computers in Human Behavior, 2017 — https://www.sciencedirect.com/science/article/abs/pii/S0747563217305071 |
| App Scheduling | /pages/how-it-works-app-scheduling | "Irregular sleep patterns ... higher screen exposure" (British Academy) | "Bedtime access to and use of screen media is consistently associated with poorer sleep quality and duration." | Carter et al., JAMA Pediatrics, 2016 — https://jamanetwork.com/journals/jamapediatrics/fullarticle/2571467 |
| Location Tracking | /pages/how-it-works-location-tracking | "1 in 2 parents in the UK and US already use location tracking" (British Academy) | "About half (52%) of parents track their child's location using a phone or similar device." | C.S. Mott Children's Hospital National Poll on Children's Health (Univ. of Michigan), 2026 — https://mottpoll.org/reports/safety-or-surveillance-tracking-young-adults |
| Location Tracking | /pages/how-it-works-location-tracking | "Constant tracking erodes teen trust; periodic check-ins..." (Chase et al.) | "1 in 4 parents who track their child's location say it sometimes makes them more anxious rather than reassured, evidence that lighter-touch check-ins can work better than constant tracking." | Mott Poll, 2026 — https://mottpoll.org/reports/safety-or-surveillance-tracking-young-adults |
| Location Tracking | /pages/how-it-works-location-tracking | "Tracking improves parent wellbeing as much as child safety" (British Academy) | "68% of parents who track their child's location do so for their own peace of mind." | Mott Poll, 2026 — https://mottpoll.org/reports/safety-or-surveillance-tracking-young-adults |
| Remote Safety Portal | /pages/how-it-works-remote-safety-portal | "Over 70% of parents and children prefer shared control over one-sided monitoring" (NSPCC) | "7 in 10 teenagers want their parents to set filters to help protect them online." | Internet Matters, 2018 — https://www.internetmatters.org/hub/esafety-news/revealed-7-10-teens-want-parents-set-filters-protect-online/ |
| Remote Safety Portal | /pages/how-it-works-remote-safety-portal | "3 in 4 children have had a tantrum when a device was taken away" (Tech Tots Report) | "44% of teens feel anxious when they don't have their smartphone." | Pew Research Center, 2024 — https://www.pewresearch.org/internet/2024/03/11/how-teens-and-parents-approach-screen-time/ |
| Remote Safety Portal | /pages/how-it-works-remote-safety-portal | "9 in 10 parents say they argue ... every week" (Talker Research) | "9 in 10 parents argue with their child about technology use, with half saying it happens at least weekly." | Talker Research (2,000 US parents), 2024 — https://studyfinds.org/screen-time-tops-chores-americas-biggest-family-fight/ |
| Designed Against Addiction | /pages/why-it-works-designed-against-smartphone-addiction | "1 in 3 adolescents show high addictive social media use by age 14, doubling the risk of anxiety and depression" (Columbia) | "Nearly 1 in 3 young people show increasingly addictive social-media use between ages 11 and 14, and those with high addictive use have roughly double the risk of suicidal behaviour and worse mental health." | Xiao et al., JAMA, 2025 (Weill Cornell/Columbia/UC Berkeley) — https://jamanetwork.com/journals/jama/fullarticle/2835481 |
| Designed Against Addiction | /pages/why-it-works-designed-against-smartphone-addiction | "192 per day notifications ... one every five minutes" (Nametag.io) | "Young people receive a median of 237 notifications a day, about a quarter of them during school hours." | Common Sense Media, "Constant Companion," 2023 — https://www.commonsensemedia.org/press-releases/teens-are-bombarded-with-hundreds-of-notifications-a-day |
| Better Screen Time | /pages/why-it-works-better-screen-time | "type of screen activity matters far more than total time" (PubMed/NIH) | "Across 350,000+ adolescents, total screen time explained less than 0.5% of differences in wellbeing, what children do on screens matters far more than how long." | Orben & Przybylski, Psychological Science, 2019 — https://journals.sagepub.com/doi/10.1177/0956797619830329 |
| Better Screen Time | /pages/why-it-works-better-screen-time | "Educational and social screen time have very different effects" (PubMed/NIH) | "Active, creative and social screen use has very different effects from passive scrolling; context matters more than total hours." | Orben & Przybylski, Psychological Science, 2019 — https://journals.sagepub.com/doi/10.1177/0956797619830329 |
| Better Screen Time | /pages/why-it-works-better-screen-time | "technology builds creativity, learning, and connection" (IntechOpen) | "Children report that being online increases their confidence, creativity and sense of empowerment when supported well." | Internet Matters, Children's Wellbeing in a Digital World Index 2024 — https://www.internetmatters.org/hub/research/childrens-wellbeing-in-a-digital-world-index-report-2024/ |
| Gives Kids Independence | /pages/why-it-works-gives-kids-independence-but-keeps-them-safe | "2 in 3 children are exposed to harmful content online" (Twidd) | "2 in 3 children (67%) have been exposed to a harmful online experience." | Internet Matters, Digital World Index 2024 — https://www.internetmatters.org/hub/research/childrens-wellbeing-in-a-digital-world-index-report-2024/ |
| Gives Kids Independence | /pages/why-it-works-gives-kids-independence-but-keeps-them-safe | "98% of children over 5 went online in 2024" (Ofcom) | "96% of children aged 3-17 in the UK go online, rising to almost all children by their teens." | Ofcom, Children & Parents Media Use 2024 — https://www.ofcom.org.uk/media-use-and-attitudes/media-habits-children/children-and-parents-media-use-and-attitudes-report-2024 |
| Gives Kids Independence | /pages/why-it-works-gives-kids-independence-but-keeps-them-safe | "WhatsApp reaches the vast majority of 8 to 14 year olds" (Ofcom) | "WhatsApp is used by 54% of 8-11 year olds and 80% of 12-17 year olds in the UK." | Ofcom, Children & Parents Media Use 2024 — https://www.ofcom.org.uk/media-use-and-attitudes/media-habits-children/children-and-parents-media-use-and-attitudes-report-2024 |
| Gives Kids Independence | /pages/why-it-works-gives-kids-independence-but-keeps-them-safe | "70% of teenagers actively want parents to set filters" (APA / Internet Matters) | KEEP figure, fix source: "7 in 10 teenagers want their parents to set filters to help protect them online." | Internet Matters, 2018 — https://www.internetmatters.org/hub/esafety-news/revealed-7-10-teens-want-parents-set-filters-protect-online/ |
| Gives Kids Independence | /pages/why-it-works-gives-kids-independence-but-keeps-them-safe | "Children given age-appropriate independence develop stronger confidence, wellbeing..." (Tianjin University) | "Parental warmth and autonomy support promote adolescent wellbeing, with positive effects found in 91-98% of families studied." | "Universal ingredients to parenting teens," 2022 (peer-reviewed) — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9546835/ |
| Gives Kids Independence | /pages/why-it-works-gives-kids-independence-but-keeps-them-safe | "A single fixed approach will not work across a childhood" (JMIR Pediatrics) | "Children's needs online change substantially as they move through developmental stages, so a single fixed approach cannot fit a whole childhood." | Ofcom, Child development: ages, stages and online behaviour, 2024 — https://www.ofcom.org.uk/siteassets/resources/documents/research-and-data/online-research/keeping-children-safe-online/child-development-stages-review/child-development-and-online-behaviour.pdf |
| The Perfect First Phone | /pages/why-it-works-the-perfect-first-phone | "53% of parents hand over a first phone without any safety features" (Pew 2022) | "53% of children have their own smartphone by age 11, rising to about 7 in 10 by age 12." | Common Sense Media, 2019 — https://www.commonsensemedia.org/kids-action/articles/tweens-teens-and-phones-what-our-2019-research-reveals |
| The Perfect First Phone | /pages/why-it-works-the-perfect-first-phone | "Age 9-11: peer pressure for a first phone begins" (Common Sense Media) | "A majority of children (53%) own a smartphone by age 11." | Common Sense Media, 2019 — https://www.commonsensemedia.org/kids-action/articles/tweens-teens-and-phones-what-our-2019-research-reveals |
| The Perfect First Phone | /pages/why-it-works-the-perfect-first-phone | "40 mins recommended daily screen time for children under 13" (EU Cybersecurity Administration) | "Experts recommend no more than 2 hours of recreational (non-educational) screen time per day for school-age children." | American Academy of Child & Adolescent Psychiatry, Facts for Families No. 54 — https://www.aacap.org/AACAP/Families_and_Youth/Facts_for_Families/FFF-Guide/Children-And-Watching-TV-054.aspx |
| The Perfect First Phone | /pages/why-it-works-the-perfect-first-phone | "Children who receive their first phone with clear rules and active parental involvement..." (China Cybersafety Administration) | "Children whose parents take an active, autonomy-supportive role with technology develop healthier habits than those left to self-regulate." | "Universal ingredients to parenting teens," 2022 — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9546835/ |
| Improves Parent-Child Relationships | /pages/why-it-works-improves-parent-child-relationships | "3 in 4 parents say their child has had a meltdown when a device was taken away" (Tech Tots Report) | "44% of teens feel anxious when they don't have their smartphone." | Pew Research Center, 2024 — https://www.pewresearch.org/internet/2024/03/11/how-teens-and-parents-approach-screen-time/ |
| Improves Parent-Child Relationships | /pages/why-it-works-improves-parent-child-relationships | "1 in 5 of all parent-child arguments are specifically about smartphone use" (Victoria Perinne-Johns MSc) | "Technology is the single biggest source of parent-child conflict, cited by 28% of parents as their number-one flashpoint, ahead of chores (25%) and homework (21%)." | Talker Research, 2024 — https://studyfinds.org/screen-time-tops-chores-americas-biggest-family-fight/ |
| Responsive to Each Child | /pages/why-it-works-responsive-to-each-childs-unique-circumstances | "Adolescents differ vastly ... No single digital diet works for every child." (APA 2021) | "Children's needs online differ by developmental stage, there is no one-size-fits-all approach." | Ofcom, Child development: ages, stages and online behaviour, 2024 — https://www.ofcom.org.uk/siteassets/resources/documents/research-and-data/online-research/keeping-children-safe-online/child-development-stages-review/child-development-and-online-behaviour.pdf |
| Responsive to Each Child | /pages/why-it-works-responsive-to-each-childs-unique-circumstances | "Tailoring controls to the specific child is a proven protective factor" (University of Bath) | "Parental warmth and autonomy support promote adolescent wellbeing, with positive effects in 91-98% of families, supporting controls tailored to the individual child." | "Universal ingredients to parenting teens," 2022 — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9546835/ |
| Responsive to Each Child | /pages/why-it-works-responsive-to-each-childs-unique-circumstances | "Adjusting controls as children develop fosters autonomy..." (Jeff Bonnie et al) | "Online safety controls should evolve as a child moves through developmental stages, supporting growing autonomy." | Ofcom, Child development: ages, stages and online behaviour, 2024 — https://www.ofcom.org.uk/siteassets/resources/documents/research-and-data/online-research/keeping-children-safe-online/child-development-stages-review/child-development-and-online-behaviour.pdf |
| Responsive to Each Child | /pages/why-it-works-responsive-to-each-childs-unique-circumstances | "Children respond to the same content differently based on temperament and maturity, not age alone." (Journal of Adolescence 2019) | "How a child is affected by online content depends on the individual child and context, not age alone." | Orben & Przybylski, Psychological Science, 2019 — https://journals.sagepub.com/doi/10.1177/0956797619830329 |

---

## Section C — First-party / non-research claims (flagged, NOT replaced)

These cannot be backed by an external source. Recommendation: substantiate internally, soften, or remove.

| Page | Claim | Issue / recommendation |
|---|---|---|
| Live Content Blocking | "SafetyMode are the only parental controls available that offer On-device Live Content Blocking in any app..." | Absolute "only" superiority claim. Under ASA/CAP rules this needs documentary evidence. Keep only if you can substantiate the "only" claim; otherwise soften to "one of the only" / describe the capability without the superlative. |
| Designed Against Addiction | "75% reported reduction in screentime by SafetyMode users within the first month" | Self-reported internal metric with no methodology shown. Either cite your own dataset (sample size, method, date) on the page, or remove. Do not present as third-party research. |
| Top-of-the-range Hardware | 6.77" AMOLED, 3,000 nits, 120Hz, 4nm/16GB, 5,000mAh, 22h YouTube, IP54, drop/bend/button durability tests, etc. | Manufacturer specifications, not research claims. Verify each against the official Nothing / CMF Phone 2 Pro spec sheet before relying on them; they are out of scope for external fact-checking. |

---

## Section D — Handover prompt for the web-builder agent

> **Task: Replace unverified statistics on the SafetyMode "How It Works" and "Why It Works" pages.**
>
> You are updating live Shopify pages for the SafetyMode store. Each page's copy lives in a `custom-liquid`
> section (the `custom_liquid` HTML string) — either edited directly in Shopify Admin > Online Store > Pages, or
> via a `build_<handle>.py` script following the conventions in `CLAUDE.md` (use `json.dump()`, never hand-build
> JSON; **no em dashes or `--`**; `!important` on colour/font rules).
>
> Work through the table below page by page. On each page:
> 1. Find the old statistic/claim text and its source label (usually a small caption or footnote under the stat).
> 2. Replace the claim wording with the **new claim** exactly as given.
> 3. Replace the source label with the **new source** (organisation + year). Where the page links the source,
>    point it at the **replacement source URL**.
> 4. Do not change layout, CSS classes, or surrounding copy — only the claim text and its citation.
> 5. Keep plain apostrophes/quotes (they get JSON-escaped automatically).
>
> [Insert the full Section B table here — Page / old claim / new claim / new source URL.]
>
> **Also action separately (do not invent external sources for these):**
> - Live Content Blocking: the "only parental controls..." superiority claim — flag to marketing/legal to
>   substantiate or soften (ASA/CAP compliance).
> - Designed Against Addiction: the "75% reduction in screentime" internal stat — replace with a properly
>   described first-party data point (sample, method, date) or remove.
> - Top-of-the-range Hardware specs — verify against the official Nothing/CMF Phone 2 Pro spec sheet.
>
> **After editing:** re-read each page and confirm (a) every remaining statistic has a real, named,
> verifiable source, (b) no em dashes or `--` were introduced, and (c) numbers match the source exactly.
> List every page you changed and the before/after of each claim.

---

## Verification / next step (post-approval)

There is no application code to run — the deliverable is this audit. On approval I will:
1. Save this document as a standalone markdown file in the repo (e.g. `claims-audit-how-why-it-works.md`) so it can
   be handed to the web-builder agent.
2. (Optional) Re-pull any specific page you want re-checked live, or expand the audit to other site sections.

Every replacement source in Section B was located and its statistic confirmed via web search against the primary
publisher (Ofcom, JAMA / JAMA Pediatrics, Pew, Common Sense Media, Internet Matters, C.S. Mott Poll, AACAP,
Children's Commissioner, Orben & Przybylski, and peer-reviewed journals). Spot-check any row by opening its URL.
