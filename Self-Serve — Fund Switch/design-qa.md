# Design QA — Fund Switch draft and responsive pass

final result: passed

## Source visual truth

- Self-Serve Figma save-draft confirmation `5741:80510`: 640 × 264 px.
- Self-Serve Figma populated My Requests component `8564:88579`: 952 × 126 px.
- Self-Serve Figma policy request history `7687:154842`: 1000 × 885 px.
- Self-Serve Figma mobile navigation `3121:94832`: 440 × 67 px.
- Self-Serve Figma compact mobile progress `3121:94825`: 408 × 32 px.
- The supplied browser annotations define the background-free IPS acknowledgement, 820 px desktop-style stepper behavior, and the point at which Save as Draft becomes available.

## Rendered implementation evidence

- Browser-rendered desktop comparisons were captured at 1159 × 859 CSS px, device density 1×, from `http://127.0.0.1:4173/` in the populated Services, policy-requests, save-confirmation, and IPS states.
- Browser-rendered phone comparison was captured at 393 × 852 CSS px, device density 1×, with the mobile nav and progress-only stepper visible.
- Browser-rendered tablet comparison was captured at 820 × 1180 CSS px, device density 1×, with the 197 px vertical desktop stepper retained.
- Persisted baseline screenshots for unchanged surrounding surfaces remain `qa/implementation-services-latest.jpg`, `qa/implementation-policy-latest.jpg`, and `qa/implementation-policy-mobile-latest.jpg`.
- Existing focused component comparisons remain in `qa/comparison-status-chip.jpg` and `qa/comparison-checkbox.jpg`.
- Source and current implementation renders were placed together in the same comparison inputs during this QA run. The screenshots were compared at 1× CSS density; no density resampling was used.

## State and interaction coverage

- Verified Save as Draft is absent before a target fund is selected and appears immediately after selection.
- Verified Save as Draft remains available on the RPQ, result modal, IPS modal, Review, and signature dialog.
- Verified Cancel restores the prior screen/modal, Confirm returns to Services, and the new policy entry opens the request list.
- Verified the Draft chip, Fund Switch request row, and resumption to the exact saved page/modal state.
- Verified the IPS acknowledgement has transparent background, zero border, and zero container padding while preserving the native checkbox interaction.
- Verified the phone header exposes only the logo and Menu pill; the phone stepper exposes only label, count, and progress bar.
- Verified the 820 px tablet viewport retains the desktop vertical stepper.
- Verified desktop, phone, and tablet layouts visually; browser console returned no warnings or errors. JavaScript syntax passed with the bundled Node runtime.

## Findings

- No remaining P0/P1/P2 mismatch.
- Fonts and typography: Lato and Montserrat retain the product hierarchy. The draft modal uses the Figma 20/32 title and 16/28 body treatment; request rows use the referenced 16/28 title and metadata scale.
- Spacing and layout rhythm: the confirmation modal follows the 24 px inset/gap system; My Requests uses the 8 px header inset and 16/20 px entry inset; the request screen uses the referenced 24 px frame padding and 16 px body gap. The implementation intentionally shows only the newly created Fund Switch draft because no historical requests exist in the prototype state.
- Colors and visual tokens: Draft uses the warm yellow semantic pill; purple outline/fill buttons map to `#3A1971`; the mobile progress uses `#529219` over `#E6EAF0`; the IPS acknowledgement surface is now transparent.
- Image quality and asset fidelity: the existing EastWest Ageas logo asset is reused at 163 × 24 CSS px. Material Symbols remain the established icon family; no custom SVG, CSS art, or placeholder imagery was introduced.
- Copy and content: confirmation and policy-request copy match the supplied Self-Serve components, with “Fund Switch Request” replacing the unrelated reinstatement example.
- Accessibility and behavior: request entries and service cards are semantic buttons; the confirmation is a labeled dialog; Save as Draft is keyboard reachable; checkbox, focus, disabled, progress, and status semantics remain exposed.

## Comparison history

- First current-pass comparison: no actionable P0/P1/P2 drift. The Figma confirmation and implementation share title/body hierarchy, 24 px modal spacing, close affordance, and right-aligned Cancel/Confirm actions.
- First current-pass My Requests comparison: no actionable drift in header, row hierarchy, semantic color, padding, or chevron placement.
- First current-pass request-list comparison: the implementation intentionally omits the Figma sample’s unrelated historical reinstatement/beneficiary entries; the saved Fund Switch draft matches the specified row pattern and chip.
- First current-pass responsive comparison: the mobile logo/Menu and compact progress structures match the source. The numeric count and green fill differ only because the reference depicts step 4/5 while Fund Switch contains 3 steps and was captured at step 1/3.
- No P0/P1/P2 fixes were required after the paired comparisons.

## Favicon update — Figma node 2841:93096

- Source visual truth: Figma node `2841:93096`, natural size 19.1362 × 14 px, rendered from the supplied design file.
- Implementation asset: `assets/favicon.svg`, served at `http://fund-switch.localhost:4173/assets/favicon.svg?v=2841-93096` and referenced by `index.html`.
- Focused evidence: the Figma render and local browser render were placed together in the same comparison input. The local SVG matches the downloaded Figma export byte-for-byte; no density normalization or authored approximation was used.
- Fonts and typography: not applicable; the favicon contains no text.
- Spacing and layout rhythm: the SVG retains the original 19.1362 × 14 view box and transparent canvas.
- Colors and tokens: the three supplied fills are unchanged (`#AE2072`, `#552D82`, and `#D4DF4D`).
- Image quality and asset fidelity: exact vector paths are preserved from the Figma export, so the icon remains sharp at browser-tab density.
- Copy and content: not applicable; the node is purely graphical.
- Browser verification: the cache-busted favicon link loaded at the clean local URL with no console warnings or errors.
- Final favicon result: passed; no P0/P1/P2 differences remain.

## Follow-up polish

- P3: persist drafts across browser reloads once a backend or local persistence strategy is in scope; this prototype intentionally keeps drafts in the current browser session only.
