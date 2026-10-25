# SunPower portal mobile restoration QA

final result: passed

Scope: visual fidelity to the supplied mobile demo and usability of the local preview flows. This result does not certify production API integration or full live portal parity. See README.md for each service boundary.

Full desktop captures stay local. Only cropped app-screen images and combined comparisons are included in the repository.

## Source and implementation evidence

- Visual source: https://nickiisme.github.io/sunpower-mobile-demo/
- Functional source: signed-in Partner Portal, inspected on 25 October 2026 (Home, Warranty and registration, Lead, Marketing/resource catalog, Live training, Academy, Monitoring and Products/detail; user management).
- Source screenshot: `evidence/source-home.png`.
- Implementation screenshot: `evidence/implementation-home.png`.
- Combined full-view evidence: `evidence/home-comparison.png`.
- Combined focused evidence: `evidence/home-focus-comparison.png`.
- Additional rendered states: `evidence/implementation-android.png`, `evidence/implementation-marketing.png`, `evidence/implementation-training.png`.
- Desktop native screenshots: 2786 × 1618 physical pixels. Browser/native UI and surrounding phone stage are excluded from comparisons. Identical iPhone screen crops (1119,303 to 1667,1490), 548 × 1187 pixels, are normalized to the original runtime's 393 × 852 app-screen coordinate space. Native window captures are scaled device previews; no claim of a DOM-measured unscaled element screenshot is made. Source and app were viewed in the same Chrome window and device preset. Pixel 10 retains the protected 427 × 952 coordinate space and Android navigation area.
- Compared state: home, closed keyboard, first scroll position, light appearance. Current device time and the additional message button differ intentionally. The app's new benefits/certification controls and resource hub intentionally change content below the existing tier card. The final pending-lead count is computed from the local data rather than hardcoded to 3.

## Required fidelity surfaces

- Typography: existing Roboto assets/weights retained. Combined focused image confirms equivalent greeting size/wrapping, brand proportions, tier title, progress label and metric hierarchy. Sheet typography explicitly uses the same app font.
- Layout: header and hero match the source's placement, padding, rounded card, progress spacing and three-column metric rhythm. Quick actions use the original component styling. New resource rows reuse the same borders, icon badges and card spacing. Fixed titles remain visible while lists scroll.
- Tokens: original blue gradient, white surfaces, pale background, muted labels, borders, shadows and semantic status colors retained. Emergency status has a distinct red treatment. Footer safe area is opaque and clears the home indicator.
- Assets: original repository fonts, device/status/keyboard assets, Radix icons and product-reference PNGs retained locally. No source asset hotlinks added. Product-family reference images are samples; exact SKU photography for the expanded catalog remains a follow-up.
- Content: observed portal labels, product models, pack sizes, resource titles, news and event names are mapped into the mobile app. Counts follow local records. Local actions explain that they do not send real emails or production requests. External learning, monitoring and official documentation preserve authenticated live entrances.

## Comparison and repair history

1. [P1, fixed] A fixed header covered the beginning of the hero because MobileScroll's default absolute positioning placed its viewport under the header. App-owned `.app-screen` is now a relative flex child below the fixed header; protected runtime files were untouched. The recaptured focused and full comparisons show the complete tier card in the correct position.
2. [P2, fixed] The footer initially counted the iOS bottom inset twice and could cover the home-indicator region. The nav now has its own 60px content area, follows runtime bottomInset, fills the closed-keyboard safe area, and stays below protected device chrome. iPhone and Pixel were recaptured and checked.
3. [P2, fixed] Saving a sheet form could leave the simulated keyboard open. AppSheet dismisses the keyboard on close, including controlled programmatic closes. Navigation also dismisses it. No runtime component was modified.
4. [P3, fixed] Browser console reported only a missing favicon. Added a favicon derived from the local source product asset. Reloaded and checked the Console again: React development information and browser-extension information, no application exception or missing asset error.
5. Final normalized source/app focused comparison: matching greeting, brand, tier card, metrics, colors and spacing. Full-view differences below the tier card are the requested added portal capabilities. No remaining actionable P0/P1/P2 visual issue in the inspected states.

## Browser verification

Verified with native Chrome through the computer-use API after the in-app browser DOM API repeatedly timed out. No Playwright or injected browser scripts were used.

- Home and five main navigation tabs render, header/account routes and back navigation work.
- Warranty counts and Draft filter update; details open; Edit registration loads the original draft; Save as draft returns to the filtered list with confirmation.
- Lead details show contact/owner/status/audit fields; Accept changes Pending Claim to Claimed, updates its date, and adds an activity entry. State survived reload.
- Product Add updates the cart badge; 1 pallet of SPR-P7-515-BLK-P becomes 36 pcs. The cart's dated local submission creates a Submitted request and clears the cart.
- Account → User Management → Invite: name/email entry, Warranty permission selection and local invitation save create a third user with Invited status. No external invitation was sent.
- Marketing resource list/grid toggle and descriptions render in the Pixel preset with readable wrapping.
- Training calendar displays October correctly with event dates 23/28 highlighted; event list and filters render.
- Device picker switches between iPhone and Pixel 10, with status bar, camera cutout, device bezel and platform navigation preserved.
- Local reset confirmation restores the original sample counts and returns Home. Test records were reset before handoff.
- Console read using Chrome DevTools UI; no application errors after favicon repair.

## Build and automated checks

- `pnpm run build`: passed (TypeScript, Vite, protected runtime integrity, Sites-compatible packaging).
- Protected runtime integrity: passed, all 28 files unchanged.
- `node --test tests/sites-worker.test.mjs`: 4 passed.
- Vite reports a non-blocking chunk size advisory (~546 kB minified, ~170 kB gzip), largely including the retained mobile runtime.

## Limits and follow-up polish

- Native scaled captures were normalized; an automated DOM-measured 1:1 screenshot and exhaustive keyboard/browser matrix were not available through the timed-out browser-tab API.
- CSV bulk import/export, every validation branch, all role combinations, and the manual recycling policy are implemented but not exhaustively browser-tested in this pass.
- Full official file preview/download, cross-platform SSO, live stock, homeowner messaging and real account mutations need the supported backend contracts. Local resource selections do not carry into the live portal.
- Exact SKU imagery and code splitting are remaining polish/production tasks.

## Implementation checklist

- [x] Retain original app visual language and protected runtime.
- [x] Add observed portal module navigation and local core flows.
- [x] Distinguish local sample actions from live services.
- [x] Repair header clipping, footer safe area and keyboard dismissal.
- [x] Inspect combined source/app comparison and both device presets.
- [x] Build and run relevant available checks.
- [x] Keep local preview running.
