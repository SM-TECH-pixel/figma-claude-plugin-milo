# Mothership — Prototype Flow Spec

This file defines all screen-to-screen connections for the Figma prototype.
Applied to Figma via plugin script once approved. Also maintained as a reference for future sessions.

---

## Nav Bar (global — applies to every screen)

The top nav bar has 5 items. Same connections on every screen.

| Nav Item | Links To |
|---|---|
| Dashboard | [SCREEN] Home Dashboard |
| Slate | [SCREEN] Slate View |
| New Drafts, Submissions & Samples | [SCREEN] Incoming Queue |
| Coverage & Reading | [SCREEN] Reading List |
| People/Talent/Pitching | [SCREEN] Directory |

---

## Section 1 — Home Dashboard

| Hotspot | Links To | Notes |
|---|---|---|
| Activity feed item "submitted coverage" | [SCREEN] Coverage Queue | |
| Activity feed item "updated pitch status" | [SCREEN] Pitching | |
| Activity feed item "created deal" | [SCREEN] Deals | |
| Activity feed item "added contact" | [SCREEN] Directory | |
| Activity feed item "updated project" | [SCREEN] Project Page | |
| Today's Tasks — "Review Draft 3 – The Undercurrent" | [SCREEN] Reading List | |
| Today's Tasks — "Send Salt Road pitch to BFI" | [SCREEN] Pitching | |
| Today's Tasks — "Chase C. Levy re: Dead Letters fee" | [SCREEN] Rights Status | |
| Quick Actions — "New Submission" | [SCREEN] Check-in Desk | |
| Quick Actions — "Write Coverage" | [SCREEN] Coverage Beam Up | |
| Quick Actions — "Log Pitch" | [SCREEN] Pitching | |
| Quick Actions — "Add Contact" | [SCREEN] Directory | |
| Quick Actions — "New Project" | [SCREEN] Slate View | |
| Quick Actions — "Create Deal" | [SCREEN] Deals | |
| Deadlines "Writer fee — Dead Letters" | [SCREEN] Rights Status | |
| Deadlines "BBC meeting — Undercurrent" | [SCREEN] Deadline Tracking | |
| SLATE badge (top right) | [SCREEN] Slate View | |
| INBOX badge (top right) | [SCREEN] Incoming Queue | |
| OVERDUE badge (top right) | [SCREEN] Deadline Tracking | |

---

## Section 2 — Submissions & Samples

### [SCREEN] Incoming Queue
| Hotspot | Links To | Notes |
|---|---|---|
| Any queue item (left panel) | [SCREEN] Incoming Queue | Self — highlights selection in left panel |
| "Beam Up →" button (bottom) | [SCREEN] Check-in Desk | Primary CTA |
| Sub-nav breadcrumb "Submissions & Samples" | [SCREEN] Incoming Queue | |

### [SCREEN] Incoming Queue — Empty State
| Hotspot | Links To | Notes |
|---|---|---|
| "Connect Email Inbox" button | [SCREEN] Settings — Org Profile | Settings > Integrations in production, Org Profile for prototype |

### [SCREEN] Check-in Desk
| Hotspot | Links To | Notes |
|---|---|---|
| "Beam Up →" button | [SCREEN] Coverage Queue | After check-in, submission enters coverage queue |
| "Cancel" button | [SCREEN] Incoming Queue | Back to queue |
| Sub-nav breadcrumb "Submissions & Samples" | [SCREEN] Incoming Queue | |

---

## Section 3 — Coverage, Notes & Reading

### [SCREEN] Coverage Queue
| Hotspot | Links To | Notes |
|---|---|---|
| Any queue item (left panel) | [SCREEN] Coverage Queue | Self — highlights selection |
| "Write Coverage / Notes →" button | [SCREEN] Coverage Beam Up | Primary CTA |
| "Send back to Submissions Queue" | [SCREEN] Incoming Queue | |
| Sub-nav breadcrumb "Coverage & Reading" | [SCREEN] Reading List | |

### [SCREEN] Coverage Beam Up
| Hotspot | Links To | Notes |
|---|---|---|
| "Save Entry →" button | [SCREEN] Reading List | Coverage saved, goes to reading list |
| "Cancel" button | [SCREEN] Coverage Queue | |
| Sub-nav breadcrumb "Coverage & Reading" | [SCREEN] Reading List | |

### [SCREEN] Reading List
| Hotspot | Links To | Notes |
|---|---|---|
| Any list item — "Coverage" type | [SCREEN] Reading List | Self — loads coverage form on right |
| "Save & Continue →" button | [SCREEN] Reading List | Self — saves and moves to next item |
| "To Approve" filter tab | [SCREEN] Executive Approvals | |
| "Cancel" button | [SCREEN] Reading List | Self — deselects |
| Sub-nav breadcrumb "Coverage & Reading" | [SCREEN] Reading List | |

### [SCREEN] Executive Approvals
| Hotspot | Links To | Notes |
|---|---|---|
| "Approve ✓" button | [SCREEN] Reading List | Returns to reading list |
| "Request Revision" button | [SCREEN] Reading List | Returns to reading list |
| "To Read" filter tab | [SCREEN] Reading List | |
| "All" filter tab | [SCREEN] Reading List | |
| Sub-nav breadcrumb "Coverage & Reading" | [SCREEN] Reading List | |

### [SCREEN] Coverage Templates
| Hotspot | Links To | Notes |
|---|---|---|
| Sub-nav breadcrumb "Coverage & Reading" | [SCREEN] Reading List | |

---

## Section 4 — Slate

### [SCREEN] Slate View
| Hotspot | Links To | Notes |
|---|---|---|
| Any project row | [SCREEN] Project Page | Opens project detail |
| "+ New Project" button | [SCREEN] Project Page | Opens blank project page |
| "Status Tracker" sub-nav (if present) | [SCREEN] Status Tracker | |
| "Coverage Links" sub-nav (if present) | [SCREEN] Coverage Links | |
| Filter tabs (All / In Dev / Packaging etc.) | [SCREEN] Slate View | Self — filtered view |
| Sub-nav breadcrumb "Slate" | [SCREEN] Slate View | |

### [SCREEN] Slate View — Empty State
| Hotspot | Links To | Notes |
|---|---|---|
| "+ New Project" button | [SCREEN] Project Page | |

### [SCREEN] Project Page
| Hotspot | Links To | Notes |
|---|---|---|
| "Edit Project" button | [SCREEN] Project Page | Self — edit mode (no separate edit screen in prototype) |
| Coverage entry row | [SCREEN] Reading List | Opens the coverage |
| Pitching broadcaster row | [SCREEN] Pitching | Opens pitching tracker filtered to this project |
| Breadcrumb "Slate" | [SCREEN] Slate View | |
| Breadcrumb "Projects" | [SCREEN] Slate View | |

### [SCREEN] Status Tracker
| Hotspot | Links To | Notes |
|---|---|---|
| Any project card | [SCREEN] Project Page | |
| Breadcrumb "Slate" | [SCREEN] Slate View | |

### [SCREEN] Coverage Links
| Hotspot | Links To | Notes |
|---|---|---|
| Any coverage row | [SCREEN] Reading List | |
| Project name in row | [SCREEN] Project Page | |
| Breadcrumb "Slate" | [SCREEN] Slate View | |

---

## Section 5 — Pitching & Contracts

### [SCREEN] Pitching
| Hotspot | Links To | Notes |
|---|---|---|
| Any pitch row | [SCREEN] Pitching | Self — loads detail drawer |
| "+ New Pitch" button | [SCREEN] Pitching | Self |
| "Update Status" button (detail drawer) | [SCREEN] Pitching | Self |
| Sub-nav "Deals" (if present) | [SCREEN] Deals | |
| Sub-nav "Rights" (if present) | [SCREEN] Rights Status | |
| Sub-nav "Deadlines" (if present) | [SCREEN] Deadline Tracking | |

### [SCREEN] Deals
| Hotspot | Links To | Notes |
|---|---|---|
| Any deal row | [SCREEN] Deals | Self — loads detail drawer |
| "+ New Deal" button | [SCREEN] Deals | Self |

### [SCREEN] Rights Status
| Hotspot | Links To | Notes |
|---|---|---|
| Any rights row | [SCREEN] Rights Status | Self |
| Breadcrumb "Pitching & Contracts" | [SCREEN] Pitching | |

### [SCREEN] Deadline Tracking
| Hotspot | Links To | Notes |
|---|---|---|
| "View overdue →" link | [SCREEN] Deadline Tracking | Self — filter to overdue |
| Any deadline row | [SCREEN] Deadline Tracking | Self |
| Breadcrumb "Pitching & Contracts" | [SCREEN] Pitching | |

---

## Section 6 — People / Partners (Directory)

### [SCREEN] Directory
| Hotspot | Links To | Notes |
|---|---|---|
| Any contact row | [SCREEN] Directory | Self — loads detail drawer |
| "+ Add Contact" button | [SCREEN] Directory | Self |
| "LISTS" button (top right) | [SCREEN] Directory — Lists Panel | |
| "Agents ↗" category tab | [SCREEN] Directory — Agents | |
| Sub-nav "People" tab | [SCREEN] Directory | |
| Sub-nav "Companies" tab | [SCREEN] Directory | Self |
| Sub-nav "Agents" tab | [SCREEN] Directory — Agents | |

### [SCREEN] Directory — Agents
| Hotspot | Links To | Notes |
|---|---|---|
| Any agent row | [SCREEN] Directory — Agents | Self — loads detail drawer |
| "+ Add Contact" button | [SCREEN] Directory | |
| "LISTS" button | [SCREEN] Directory — Lists Panel | |
| Sub-nav "People" tab | [SCREEN] Directory | |

### [SCREEN] Directory — Lists Panel
| Hotspot | Links To | Notes |
|---|---|---|
| "✕ Close" button | [SCREEN] Directory | Closes lists panel |
| "+ New list" button | [SCREEN] Directory — Lists Panel | Self |
| Any list item | [SCREEN] Directory — Lists Panel | Self — loads list filter |

### [SCREEN] Directory — Empty State
| Hotspot | Links To | Notes |
|---|---|---|
| "+ Add Contact" button | [SCREEN] Directory | Goes to populated directory |

---

## Section 7 — Archive

### [SCREEN] Archive Search V3 (default state)
| Hotspot | Links To | Notes |
|---|---|---|
| Any result row | [SCREEN] Archive Search V3 (default state) | Self — loads detail drawer |
| "LISTS" button | [SCREEN] Archive Search - Lists Panel | |
| Filter tags (active) | [SCREEN] Archive Search V3 (default state) | Self |

### [SCREEN] Archive Search - Lists Panel
| Hotspot | Links To | Notes |
|---|---|---|
| "✕ Close" | [SCREEN] Archive Search V3 (default state) | |
| "+ New list" | [SCREEN] Archive Search - Lists Panel | Self |

---

## Section 8 — Settings

### Settings sidebar (global within Settings)
All settings screens share a left sidebar. Each sidebar item links to its target screen.

| Sidebar Item | Links To |
|---|---|
| Org Profile | [SCREEN] Settings — Org Profile |
| Billing & Plan | [SCREEN] Settings — Billing |
| Integrations | [SCREEN] Settings — Org Profile |
| Team Management | [SCREEN] Settings — Team Management |
| Roles & Permissions | [SCREEN] Settings — Team Management |
| Notifications | [SCREEN] Settings — Notifications |
| Coverage Templates | [SCREEN] Coverage Templates |
| Data & Export | [SCREEN] Settings — Org Profile |

### [SCREEN] Settings — Org Profile
| Hotspot | Links To |
|---|---|
| "Save Changes" button | [SCREEN] Settings — Org Profile |
| "Cancel" button | [SCREEN] Settings — Org Profile |
| "Manage Plan" button | [SCREEN] Settings — Billing |

### [SCREEN] Settings — Team Management
| Hotspot | Links To |
|---|---|
| "Send Invite" button | [SCREEN] Settings — Team Management |

### [SCREEN] Settings — Billing
| Hotspot | Links To |
|---|---|
| "+ Add Seat" button | [SCREEN] Settings — Billing |
| "Upgrade to Enterprise" button | [SCREEN] Settings — Billing |
| "Update" (payment method) | [SCREEN] Settings — Billing |
| "Download PDF" links | [SCREEN] Settings — Billing |

---

## Primary Demo Flow (the narrative path for showing to users/investors)

Start: **Home Dashboard**
1. Click "Review Draft 3 – The Undercurrent" (Today's Tasks) → **Reading List**
2. Click "To Approve" tab → **Executive Approvals**
3. Click "Approve ✓" → **Reading List**
4. Click Dashboard in nav → **Home Dashboard**
5. Click "New Drafts, Submissions & Samples" in nav → **Incoming Queue**
6. Click "Beam Up →" → **Check-in Desk**
7. Click "Beam Up →" → **Coverage Queue**
8. Click "Write Coverage / Notes →" → **Coverage Beam Up**
9. Click "Save Entry →" → **Reading List**
10. Click "Slate" in nav → **Slate View**
11. Click project row "The Undercurrent" → **Project Page**
12. Click "BBC Drama" in Pitching section → **Pitching**
13. Click "People/Talent/Pitching" in nav → **Directory**
14. Click "LISTS" → **Directory — Lists Panel**
15. Click "✕ Close" → **Directory**
16. Click "Dashboard" in nav → **Home Dashboard**

---

## Implementation Notes

- **Transition:** Use "Push" (left-to-right) for forward navigation, "Push" (right-to-left) for back. Use "Instant" for tab switches and panel toggles.
- **Trigger:** All connections are "On Click" (tap)
- **Preserve scroll position:** ON for self-referential connections (list item selection)
- **Starting frame:** [SCREEN] Home Dashboard
