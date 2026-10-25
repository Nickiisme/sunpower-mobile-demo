# SunPower Partner Mobile App

Based on the original [mobile demo](https://nickiisme.github.io/sunpower-mobile-demo/) and the signed-in [Partner Portal](https://portal.partners.sunpowerglobal.com/#/dashboard/home), inspected 25 October 2026.

This is a local interactive frontend with persistent sample data. It does **not** authenticate against the portal or call production business APIs. No portal passwords, session tokens or copied customer records are stored in the source. Official documents and production transactions use explicit portal links in a new tab.

## Run

```sh
pnpm install --frozen-lockfile
pnpm dev --host 0.0.0.0 --port 4173
pnpm build
```

The original iPhone / Pixel 10 device frame, simulated keyboard, scrolling, status bar and safe-area runtime remain protected by `pnpm check:runtime`.

## Feature coverage

| Portal area | Local app flow | Live service boundary |
| --- | --- | --- |
| Home | Tier card, tier journey, partner benefits, resources hub, news, event calendar, support | Live tier numbers, benefits and official certification remain in portal |
| Warranty | Counts, search, status / country / installation date filters, create/edit, duplicate checks, draft/delete confirmation, consent validation, local submission, reminders, CSV import/export, details | Serial verification, Excel bulk import, homeowner email, completion and certificate delivery require portal APIs |
| Leads | Search, ownership / stage / type / source / date filters, CSV export, accept/reject/qualify, reassignment, follow-up notes, audit history, admin/sales permission preview, assignment policy and manual local recycling check | Sample leads; policy is local and no scheduled server recycling is installed |
| Products | Six observed catalog models, category / stock filters, product details, pack-size quantity conversion, cart, dated local price requests, history and export | Stock is a snapshot; official product files and live requests link to portal. Some images reuse the original demo's product-family references, not exact SKU photography |
| Marketing | Partner resource list/grid, search, type filter, selection, details; Digital Assets / Marketing Shop entrances | Original document previews, downloads, bulk selection and shops open the portal; local selections are not transferred to it |
| Live training | Event list, calendar month picker, highlighted event dates, upcoming / on-demand / past filters, event details, ICS download | Registration and attendance remain in portal. Listed dates are captured examples |
| Academy | Home / Study / Exam / Class navigation with academy entry | Courses, classes, exams, progress and certificates remain on the external authenticated academy |
| Monitoring / Field Ops | Demo overview, system / alert filters, details, installation create/stage changes | Energy storage opens the real installer platform; Reserve / Drive are reached through portal. Permissions and notification configuration remain there |
| Account | Profile edit, preference, user search, role filter, local invitations, permission and enabled-status edit, notifications, local preview reset | Real profile, invitation emails, credentials, cookies and account sessions remain in portal |

`localStorage` key: `sunpower-partner-app-v2`. Profile → Reset local preview restores all samples. The local role switch demonstrates UI rules and is not a security boundary.

## Implementation

App UI lives in `src/Prototype.tsx` and `src/prototype.css`. The original protected runtime was not changed. The predev/prebuild integrity hooks invoke Node directly so they work with either npm or pnpm.

A production migration still needs the portal frontend repository or documented API contracts for identity, roles, warranties, leads, inventory, resources, notifications and SSO. Browser login alone does not supply a supported integration contract.
