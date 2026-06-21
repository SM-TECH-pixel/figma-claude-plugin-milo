# Mothership — Claude Code Context

This file is read automatically by Claude Code at the start of every session. It contains everything needed to continue building the Mothership Figma design system without any briefing from Milo.

---

## What Mothership Is

Mothership is a **B2B SaaS platform** being built by Milo for UK TV and film production companies. It is multi-tenant — each production company is a paying customer with their own scoped workspace. It is not an internal tool for a single company.

**Business model:** £30/month for the first user, £10/month per additional user. Target: ~665 UK entertainment SMBs. Goal: £150K+ ARR. Subscription tiers in the DB: professional / studio / enterprise.

---

## The Market Gap

The entire UK TV/film development workflow currently runs on fragmented tools — Excel, Airtable, Google Drive, shared inboxes. The data generated is not indexable, searchable, or reusable. Coverage notes, submission history, pitch documents — all locked away in unconnected files.

Mothership makes that data usable over time. Every screen that captures data feeds a searchable, filterable corpus. The Archive is not a secondary feature — it is the long-term payoff of using the platform at all. Search, filters, lists, tags, and column selectors are central to the product, not peripheral.

---

## Industry Context

### The Development Pipeline — Who Does What

**Writer** — Originates or is hired to adapt material. Brings spec scripts/treatments to market, or is commissioned by a producer holding rights to underlying material.

**Agent** — Represents the writer commercially. Negotiates deals, option fees, episode fees. Agents are gatekeepers — most companies won't read unsolicited scripts. Tracking agent relationships and submission history is operational intelligence, not just an address book.

**Development Executive (Dev Exec)** — Sits inside the production company. Finds material, options it, commissions writers, shepherds scripts to broadcaster-ready. Their currency is the slate — 20–40 projects at various stages simultaneously. **Primary Mothership power user.**

**Development Assistant / Coordinator** — Junior support. Reads scripts, writes coverage, tracks deadlines, manages the development database. **Daily Mothership user.** Interface must be fast and low-friction for this person.

**Talent Attachment** — Director and sometimes lead cast attached once a script is in shape. A commercial signal as much as a creative one.

**Commissioner** — The buyer: BBC, Channel 4, ITV, Film4, Netflix UK etc. In film, replaced by a financier, then the distributor pipeline.

### Why UK Slates Are Large — Terms of Trade

Communications Act 2003: independent producers retain IP rights rather than ceding ownership to the broadcaster. A UK producer commissioned by the BBC licences a broadcast window and keeps the underlying rights. They can sell formats internationally, build franchises, accumulate a catalogue with balance sheet value.

Because producers keep building owned IP rather than handing it over, they have a commercial incentive to run large slates simultaneously. A regulatory quota (originally 25% of broadcaster commissioning, recalculated under the Media Act 2024) guarantees a structural flow of commissions to independent producers.

**Design implication:** Slates are large by design. The platform must handle volume. The Archive, Lists, and Slate features are tracking owned/optioned IP — the balance sheet in digital form.

---

## Colour Scheme

| Token | Value | Use |
|---|---|---|
| Mint | `#1BC88F` / `r:0.106 g:0.784 b:0.561` | Primary accent — active states, CTAs, selected borders, mint-fill buttons |
| Black | `r:0 g:0 b:0` | Nav bars, headers, search rows, primary surfaces |
| White | `r:1 g:1 b:1` | Main content backgrounds |
| Grey panel | `#F7F7F7` / `r:0.965 g:0.965 b:0.965` | Panel backgrounds |
| Grey XLight | `#EAEAEA` / `r:0.918 g:0.918 b:0.918` | Borders, dividers |
| Grey Light | `#CCCCCC` / `r:0.800 g:0.800 b:0.800` | Muted borders |
| Grey Mid | `r:0.400 g:0.400 b:0.400` | Muted text |
| Grey | `r:0.510 g:0.510 b:0.510` | Secondary text |
| Purple hover | `#FAEFFF` | Hover / interactive entry background |
| Purple selected | `#E7B3FD` / `r:0.906 g:0.702 b:0.992` | Selected component background |
| Purple text | `#9434BE` / `r:0.580 g:0.204 b:0.745` | Text within selected purple states |
| Blue | `r:0.094 g:0.373 b:0.647` | Semantic — "Consider" verdict badge |
| Amber | — | Warnings |

**Rule:** Default to mint for interactive/active states. Reach for purple sparingly — category tags, status indicators, section accents. Never use purple for things mint already owns. Overusing purple undermines the hierarchy.

---

## Design System Rules

### Rule 1 — Variant Coverage
Every interactive Figma component must have **Default**, **Hover**, and **Selected** variants. Decorative/structural components (dividers, containers, background frames) are exempt.

### Rule 2 — Component Reuse (Critical — AI's Responsibility Entirely)

Milo does not name screens or components. The AI owns this discipline completely.

**Before building any screen:**
1. Run a component audit via the bridge to get the current registry
2. Cross-reference every UI element the screen needs against what exists
3. Use `inst(setName, variantName)` for every element that has a component — never build a raw frame for something that already exists

**When a component doesn't exist yet:**
Build the element as a raw frame named exactly:
```
[RAW] Component Name
```
Where `Component Name` is the exact name the component will have when built (e.g. `[RAW] People Result Row`). This precision enables automated replacement.

For elements that are permanently raw by architectural necessity (structural overlay frames where you cannot append children to a component instance):
```
[RAW: PERMANENT] description
```

**When a new component is built:**
The build script (or an immediately triggered follow-up) must scan every screen frame on the page for children named `[RAW] <new component name>` and replace each with a proper instance, preserving position and size. Report what was replaced and what remains outstanding.

**At the start of every session:**
Run an audit listing all `[RAW]` (non-permanent) elements across all screens. This is the component build backlog.

---

## The Figma Bridge

### How It Works
1. Write `{ "label": "...", "script": "...full JS body..." }` to `outputs/pending-script.json`
2. `watch.js` on port 3333 detects the change and passes `payload.script` to the Figma plugin
3. Plugin executes and writes result to `outputs/figma-output.json`

**Critical:** The script must be embedded directly in the `"script"` field as a full JS string. Referencing a filename is silently ignored by `watch.js`.

**Script wrapper:**
```javascript
return (async function() {
  // body here
  return 'result string';
})();
```

### Registry Pattern (use in every screen/component script)
```javascript
const REGISTRY = {};
page.findAll(n => n.type === 'COMPONENT_SET').forEach(cs => {
  cs.children.forEach(c => {
    if (c.type === 'COMPONENT')
      REGISTRY[`${cs.name}::${c.name.replace(/^Property 1=/, '')}`] = c;
  });
});
page.findAll(n => n.type === 'COMPONENT').forEach(c => { REGISTRY[c.name] = c; });

function inst(setName, variantName) {
  const comp = REGISTRY[`${setName}::${variantName}`] || REGISTRY[setName];
  if (!comp) { console.warn('Missing:', setName, variantName); return null; }
  return comp.createInstance();
}
```

### `add()` Helper (use for every child of a VERTICAL auto-layout parent)
```javascript
function add(parent, child) {
  child.layoutAlign = 'STRETCH';
  child.layoutGrow = 0;
  parent.appendChild(child);
}
```
Without this, children stack at y=0 and overlap. This is the most common source of layout bugs.

### Variant Separation (after every `combineAsVariants`)
```javascript
const set = figma.combineAsVariants([varA, varB, varC], page);
set.name = 'Component Name';
set.layoutMode = 'VERTICAL';
set.primaryAxisSizingMode = 'AUTO';
set.counterAxisSizingMode = 'AUTO';
set.itemSpacing = 20;
set.paddingTop = 20; set.paddingBottom = 20;
set.paddingLeft = 20; set.paddingRight = 20;
```
Without this, all variants stack on top of each other in the component set.

### Local Variant Lookup
When a new ComponentSet is created and immediately needed in the same script (not yet in the registry), build a local map from its children:
```javascript
const myVariants = {};
mySet.children.forEach(c => {
  myVariants[c.name.replace(/^Property 1=/, '')] = c;
});
```

### Other Critical Patterns
- **Pre-build:** Fully populate a frame before appending it to an auto-layout parent
- **Title cell:** `counterAxisSizingMode='FIXED'` + `layoutGrow=1` to fill remaining horizontal space
- **Font loading:** Always `await figma.loadFontAsync(...)` before setting `.characters`
- **No overlap rule:** All colours use `p(C.colorName)` helper: `const p = c => [{ type:'SOLID', color:c }]`

---

## Component Library — Current State (51 Component Sets)

### Navigation & Shell
| Component | Variants |
|---|---|
| Mothership Logo | On Dark, On Light |
| Top Nav Bar | Default, Default (Updated) |
| Top Nav Bar Item | Default, Hover, Selected |
| Nav Item | Default, Hover, Selected |
| Sub-nav Bar | Default, With Action |
| Sub-nav Action Button | Default, Hover, Selected |
| Sub-nav Breadcrumb | Default, Hover, Selected |
| Screen Container | Default |

### Buttons & Actions
| Component | Variants |
|---|---|
| Button Primary | Default, Hover, Selected |
| Button Secondary | Default, Hover, Selected |
| Verdict Button | Default, Hover, Selected |
| Filing Nav Button | Disregard/Undo/Prev/Next/Done × Default/Hover/Selected |
| Type Toggle Button | Default, Selected, SmallDefault |

### Forms
| Component | Variants |
|---|---|
| Form Field | Default, Hover, Focused, Prefilled |
| Form Input | Default, Focused, Filled |
| Form Date Field | Default, Focused, Filled |
| Form Textarea | Default, Focused, Filled |
| Form Label | Default |
| Form Divider | Default, Section |
| Form Container | Default, Scrolled |
| Form Actions Bar | Default, Primary Only |
| Dropdown Selector | Default, Hover, Focused, Filled, Open |
| Checkbox | Default, Hover, Checked, Checked Hover |
| Enter Date | Open, Variant3 |
| Record Header | Default |

### Submission & Queue
| Component | Variants |
|---|---|
| Queue Item | Default, Hover, Selected, Record Default, Record Hover, Record Selected |
| Submission Record Card | Default, Hover, Selected |
| Attachment Row | Unchecked, Checked, Disregarded |
| Email Attachment Badge | Default, Active |
| Filing Bar | Default, Last |
| Filter Bar | All, To Read, To Approve |
| Work Item Row | Default, Hover, Selected |
| Info Note | Default, Warning |

### Tags, Pills & Badges
| Component | Variants |
|---|---|
| Tag Pill | Default, Selected, Add, Input |
| Format Pill | Default, Selected |
| Status Badge | Not Started, In Progress, Complete |
| Verdict Badge | Pass, Consider, Recommend |
| Section Label | WHO, WHAT, LOGLINE, ATTACHMENTS, NOTES, TERMS & DEADLINES |
| Archive Filter Tag | Default, Selected |

### Coverage
| Component | Variants |
|---|---|
| Coverage Entry Form | Coverage, Notes |
| Add Talent Popup | Default, Filled |

### Archive (built June 2026)
| Component | Variants |
|---|---|
| Archive Result Row | Default, Hover, Selected |
| Archive Filter Option | Default, Selected |
| Archive Column Header | Default, Sorted Asc, Sorted Desc |

### Lists & Columns (built June 2026)
| Component | Variants |
|---|---|
| List Entry Row | Default, Selected |
| List Panel Item | Collapsed, Expanded |
| Column Toggle Row | On, Off, Locked |

### Directory (built June 2026)
| Component | Variants |
|---|---|
| Directory Category Tab | Default, Hover, Selected |
| Directory Result Row | Default, Hover, Selected |
| Project Row | Default, Hover, Selected |

### Standalone Components
- `Email Display Card/Default` — no Highlighted variant yet (needs manual addition)
- `Archive Active Filter Pill`
- `Archive Search Bar`
- Two orphaned components named `Property 1=Default` and `Property 1=Focused` — stray, should be cleaned up

---

## Screens Built

Canvas is organised in 9 columns. Pitching and Contracts & Rights are split into two separate columns. All screens start at y=0, stacked vertically with 150px gaps.

| Screen | Section | Canvas X | Size |
|---|---|---|---|
| [SCREEN] Home Dashboard | Home | 0 | 953×829 |
| [SCREEN] Incoming Queue | Submissions | 1200 | 953×829 |
| [SCREEN] Check-in Desk | Submissions | 1200 | 953×829 |
| [SCREEN] Incoming Queue — Empty State | Submissions | 1200 | 953×829 |
| [SCREEN] Coverage Queue | Coverage | 2400 | 953×829 |
| [SCREEN] Coverage Beam Up | Coverage | 2400 | 953×829 |
| [SCREEN] Executive Approvals | Coverage | 2400 | 953×829 |
| [SCREEN] Reading List | Coverage | 2400 | 953×1079 |
| [SCREEN] Coverage Templates | Coverage | 2400 | 953×829 |
| [SCREEN] Slate View | Slate | 3750 | 953×829 |
| [SCREEN] Status Tracker | Slate | 3750 | 1200×829 |
| [SCREEN] Project Page | Slate | 3750 | 953×829 |
| [SCREEN] Coverage Links | Slate | 3750 | 953×829 |
| [SCREEN] Slate View — Empty State | Slate | 3750 | 953×829 |
| [SCREEN] Pitching | Pitching | ~5087 | 1200×1521 |
| [SCREEN] Deal Entry | Contracts & Rights | 6550 | 1200×1043 |
| [SCREEN] Deals | Contracts & Rights | 6550 | 1200×1521 |
| [SCREEN] Rights Status | Contracts & Rights | 6550 | 953×829 |
| [SCREEN] Deadline Tracking | Contracts & Rights | 6550 | 953×829 |
| [SCREEN] Directory | People / Partners | 8100 | 1200×1521 |
| [SCREEN] Directory — Agents | People / Partners | 8100 | 1200×1521 |
| [SCREEN] Directory — Lists Panel | People / Partners | 8100 | 1200×1521 |
| [SCREEN] Directory — Empty State | People / Partners | 8100 | 953×829 |
| [SCREEN] Archive Search V3 (default state) | Archive | 9600 | 1200×1521 |
| [SCREEN] Archive Search - Lists Panel | Archive | 9600 | 1200×1521 |
| [SCREEN] Settings — Org Profile | Settings | 11100 | 953×829 |
| [SCREEN] Settings — Team Management | Settings | 11100 | 953×829 |
| [SCREEN] Settings — Billing | Settings | 11100 | 953×829 |
| [SCREEN] Settings — Notifications | Settings | 11100 | 953×829 |

**Utility frames** (parked at y=8000): Edit Columns Panel, [CHECKLIST] Auto Layout, build reports, col headers.
**Sitemap** at y=−1200 (above main canvas).
**Section labels** (grey text) sit at y=−60 above each column.
**[PROTOTYPE FLOW]** frame at y=−2800 — full connection map, up to date as of June 2026 session. Contains: Global Nav Bar, Primary Demo Flow (15 steps), Home Dashboard, Submissions & Samples, Slate, Pitching & Contracts (includes Deal Entry connections), People/Partners, Archive + Settings.

---

## Information Architecture — Screens Still to Build

### Home
- Activity Feed (placeholder only — Home Dashboard built but not fully populated)
- Today's Tasks
- Quick Actions

### Submissions & Samples
- Submissions Archive (search/filter view of all past submissions)

### Coverage, Notes & Reading
- Coverage Templates (placeholder frame exists, needs content)

### People / Partners (largely unbuilt — Directory is the foundation)
- Talent view (filter of Directory by talent roles)
- Commissioners view (filter of Directory by commissioner roles)
- Production Cos view (company-focused directory view)
- List Creator (people version)

---

## Pending Tasks

- **Start of every session:** Run `[RAW]` audit across all screens and report outstanding items
- **Prototype connections** — IN PROGRESS. Connection spec is complete in [PROTOTYPE FLOW] frame. Next: add Figma `reactions` to the actual screen nodes via the bridge so the prototype is clickable in Figma present mode.
- **Edit Columns Panel** — parked at y=8000; needs to be re-placed inside Archive Lists Panel screen before prototyping
- **Form Actions Bar** — Cancel and Beam Up buttons are raw frames inside the component; replace with Button Secondary / Button Primary instances
- **Email Display Card Highlighted variant** — missing, Milo adding manually
- **Orphaned components** — `Property 1=Default` and `Property 1=Focused` exist as standalones; clean up
- **Coverage Templates screen** — placeholder only, needs actual content
- **Sitemap frame** — needs updating to reflect the Pitching / Contracts & Rights split into separate columns
- **React implementation** — next phase after prototype; stack: Next.js + Tailwind CSS + Supabase + Vercel

## Prototype Connection Spec

All connections defined in the [PROTOTYPE FLOW] frame (y=−2800). Trigger: On Click. Transition: Push (unless noted). To wire them via plugin, set `node.reactions` on each hotspot element.

### Global Nav Bar (all screens)
| Hotspot | Target screen |
|---|---|
| Dashboard | Home Dashboard |
| Slate | Slate View |
| New Drafts, Submissions & Samples | Incoming Queue |
| Coverage & Reading | Reading List |
| People/Talent/Pitching | Directory |

### Primary Demo Flow (15-step walkthrough)
1. Today task "Review Draft 3" → Reading List
2. "To Approve" tab → Executive Approvals
3. "Approve ✓" → Reading List
4. Nav → New Drafts → Incoming Queue
5. "Beam Up →" → Check-in Desk
6. "Beam Up →" → Coverage Queue
7. "Write Coverage / Notes →" → Coverage Beam Up
8. "Save Entry →" → Reading List
9. Nav → Slate → Slate View
10. Click project row → Project Page
11. Click broadcaster in Pitching → Pitching
12. Nav → People/Talent/Pitching → Directory
13. Click LISTS → Directory — Lists Panel
14. ✕ Close → Directory
15. Nav → Dashboard → Home Dashboard

### Home Dashboard
| Hotspot | Target |
|---|---|
| Activity: submitted coverage | Coverage Queue |
| Activity: updated pitch status | Pitching |
| Activity: created deal | Deals |
| Today task — Review Draft 3 | Reading List |
| Today task — Send Salt Road pitch | Pitching |
| Quick Action — New Submission | Check-in Desk |
| Quick Action — Write Coverage | Coverage Beam Up |
| Quick Action — Log Pitch | Pitching |
| Quick Action — Add Contact | Directory |
| Quick Action — New Project | Slate View |
| Quick Action — Create Deal | Deal Entry |
| SLATE badge | Slate View |
| INBOX badge | Incoming Queue |
| OVERDUE badge | Deadline Tracking |

### Submissions & Samples
| Hotspot | Target |
|---|---|
| Incoming Queue — "Beam Up →" | Check-in Desk |
| Incoming Queue — Empty State CTA | Settings — Org Profile |
| Check-in Desk — "Beam Up →" | Coverage Queue |
| Check-in Desk — Cancel | Incoming Queue |
| Coverage Queue — "Write Coverage →" | Coverage Beam Up |
| Coverage Queue — Send back | Incoming Queue |
| Coverage Beam Up — "Save Entry →" | Reading List |
| Coverage Beam Up — Cancel | Coverage Queue |
| Reading List — "To Approve" tab | Executive Approvals |
| Reading List — "Save & Continue →" | Reading List (self) |
| Executive Approvals — "Approve ✓" | Reading List |
| Executive Approvals — "Request Revision" | Reading List |

### Slate
| Hotspot | Target |
|---|---|
| Slate View — project row | Project Page |
| Slate View — "+ New Project" | Project Page |
| Slate View Empty — "+ New Project" | Project Page |
| Project Page — coverage row | Reading List |
| Project Page — pitcher row | Pitching |
| Project Page breadcrumb | Slate View |
| Status Tracker — project card | Project Page |
| Coverage Links — coverage row | Reading List |
| Coverage Links — project name | Project Page |

### Pitching & Contracts
| Hotspot | Target |
|---|---|
| Pitching — any row | Pitching (self — detail drawer) |
| Pitching — "+ New Pitch" | Pitching (self) |
| Deals — any row | Deals (self — detail drawer) |
| Deals — "+New Deal" | Deal Entry |
| Rights Status breadcrumb | Deals |
| Deadline Tracking — "View overdue →" | Deadline Tracking (self) |
| Deadline Tracking breadcrumb | Deals |
| Deal Entry — "Save Deal →" | Deals |
| Deal Entry — Cancel | Deals |
| Deal Entry breadcrumb | Deals |
| Deals — "Update Deal" | Deal Entry |
| Deals — "View Terms" | Rights Status |

### People / Partners
| Hotspot | Target |
|---|---|
| Directory — any contact row | Directory (self — drawer) |
| Directory — "+ Add Contact" | Directory (self) |
| Directory — LISTS button | Directory — Lists Panel |
| Directory — Agents tab | Directory — Agents |
| Directory — Agents — LISTS button | Directory — Lists Panel |
| Directory — Lists Panel — ✕ Close | Directory |
| Directory Empty — "+ Add Contact" | Directory |

### Archive + Settings
| Hotspot | Target |
|---|---|
| Archive — any result row | Archive (self — drawer) |
| Archive — LISTS button | Archive — Lists Panel |
| Archive Lists — ✕ Close | Archive V3 (default) |
| Org Profile item | Settings — Org Profile |
| Billing & Plan item | Settings — Billing |
| Team Management item | Settings — Team Management |
| Notifications item | Settings — Notifications |
| Coverage Templates item | Coverage Templates |
| Org Profile — Manage Plan | Settings — Billing |
| Org Profile — Save Changes | Settings — Org Profile (self) |

---

## Database — Supabase (mothership-dev)

Project ID: `kkiseeyfvinccpaiidbk` | Region: eu-west-2 | Postgres 17

RLS currently disabled on 8 tables — intentional, no live data yet, to be fixed before launch.

### All 19 Tables

**`organizations`** — tenant accounts. Tiers: professional/studio/enterprise. Default timezone Europe/London, currency GBP.

**`organization_members`** — team roles: owner/admin/member/viewer. Includes display name, job_title, department, last_active_at.

**`people_manual`** — industry contacts. 28 role types including: Agent, Agent Assistant, Associate Agent, Commissioner, Commissioning Executive, Development Coordinator, Development Executive, Head of Development, Script Editor, Script Reader, Writer, and others. Self-referencing `agent_id` FK (a person's agent is also a contact). GDPR soft-delete fields.

**`companies_manual`** — private business intelligence per org. Types: Production Company, Agency, Studio, Broadcaster/Streamer, Financier, Distributor, Sales, Management, Casting Director. Links to `companies_directory` via `directory_company_id`.

**`companies_directory`** — shared read-only reference of 300+ UK entertainment companies. RLS enabled.

**`tags_manual`** — flat tag list (500+ content tags). Shared vocabulary, no org scoping.

**`contact_interested_tags`** — junction: person ↔ interested tags. Org-scoped. RLS enabled.

**`contact_avoiding_tags`** — junction: person ↔ avoiding tags. Org-scoped. RLS enabled.

**`company_interested_tags`** — junction: company ↔ interested tags. Org-scoped. RLS enabled.

**`company_avoiding_tags`** — junction: company ↔ avoiding tags. Org-scoped. RLS enabled.

**`projects_ip_manual`** — scripts, IP, development pipeline. Key enums:
- Status (11): Concept → In Dev Treatment → In Dev Scripting → Packaging → Financing → Pre-Production → Production → Post-Production → Completed → Distribution → Shelved
- Medium (14): Feature Film, TV Series, Limited Series, Miniseries, TV Pilot, Short Film, Documentary Feature/Series, Animation Feature/Series, Web Series, Podcast Series, Stage Play, Musical
- Materials (15): Script, Treatment, Pitch Deck, Bible, Outline, Synopsis, Sizzle Reel, Proof of Concept, Pilot Script, Character Breakdowns, Mood Board, Lookbook, Budget, Schedule, Casting Suggestions
- Based on (23): Original Idea through Public Domain
- pitch_ready: Developing / Ready to Pitch

**`project_creators`** — junction: project ↔ creator with role (Writer/Producer/Director/Creator/Developer). RLS enabled.

**`submissions_samples_drafts_manual`** — incoming material tracking. Types: Submission/Sample/New Draft. Format is an array. `responded` is a generated boolean (auto-true when response_date filled). Internal status: Pass/Consider/Recommend. Links to writer, sender, assigned reviewer, linked project, coverage notes separately. RLS enabled.

**`coverage_notes_manual`** — formal coverage and informal notes. Types: Coverage/Notes. Recommendation: Pass/Consider/Recommend. Soft delete. RLS enabled.

**`pitching_manual`** — outbound pitch tracking. Status: Received/Read/Passed/Considering/Meeting/Success. Links to project, company, recipient contact, sent_by (org member). date_pitched cannot be future (DB constraint). RLS enabled.

**`deals_manual`** — multi-party agreements. Status: Pending Internal Review/Action → Pending Counterparty Response → Awaiting Client Signature → Awaiting Counterparty Signature → Fully Executed → Terminated/Unsuccessful. Multi-party via UUID arrays (talent_ids, agent_ids, company_ids, lawyer_ids). `waiting_on` field tracks current holder.

**`deal_types_directory`** — shared reference: professional agreement types. RLS enabled.

**`rights_terms_manual`** — individual deal components. Status: Pending/Overdue/Delivered/Paid/Expired/Cancelled. Owner can be a company or a person. RLS enabled.

**`attachments_manual`** — central file repository. Links to any entity via nullable FKs: project, deal, person, coverage, submission, pitching. Soft delete.

### Key Architectural Patterns
- Every `_manual` table has `organization_id` for multi-tenant isolation
- Soft delete (`is_deleted`) on submissions, coverage, pitching, attachments; GDPR fields on people and companies
- Interest/avoiding tag system on both people and companies enables queries like "find commissioners interested in crime drama not avoiding returning formats"
- `responded` generated column on submissions auto-calculates from `response_date`
- Self-referencing FK on `people_manual`: `agent_id` points back to itself (a person's agent is also a contact)
- `companies_directory` and `deal_types_directory` are shared reference data — not per-tenant

---

## Future Feature (Deferred — Phase 5)

**Meeting Notes Recorder** — attached to Person records, for generals (writer meetings) and commissioner calls. Quick-capture mode, note type (General/Commissioner/Agent/Development call), date + attendees, free text, tags. Surface in Home dashboard as "recent meeting notes." Currently no DB table — to be designed when People section is built.

---

## How to Start a Session

1. Run component + `[RAW]` audit via bridge first — always
2. Report outstanding `[RAW]` elements and propose what to build next
3. Before writing any screen script, confirm which components exist and which need building
4. Follow the component reuse discipline: audit → use existing → label `[RAW]` if missing → build component → sweep replacements
5. Milo does not name anything — all naming is the AI's responsibility and must be precise and consistent
