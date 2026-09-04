# Design QA — Fund Switch draft and responsive pass

final result: passed

## Review summary controls — September 4 follow-up

### Source visual truth

- Browser annotations on the Review & Submit screen: retain the Edit action in the switch-summary card and remove the FSAF “Ready to review” tag.

### Rendered implementation evidence

- Browser-rendered local implementation: `http://fund-switch.localhost:4173/`, in-app browser desktop capture at 1280 × 720 CSS px and 1× density. The browser-managed capture has no persisted local file path.
- The annotated reference and the current Review & Submit capture were reviewed together, with browser chrome excluded from comparison.

### Findings

- No actionable P0/P1/P2 differences remain.
- Fonts and typography: Edit uses the existing action-link style; FSAF heading/subtext remain unchanged.
- Spacing and layout rhythm: the restored top-right Edit action has a dedicated compact header; removal of the status tag preserves the header’s clean content hierarchy.
- Colors and visual tokens: no new tokens or visual assets were added.
- Image quality and copy: unchanged; the removed status text is absent from the rendered DOM.

### Interaction coverage

- Verified Edit is visible in the review switch summary and still returns to Switch Your Fund.
- Verified “Ready to review” is absent from the FSAF section.
- Verified `app.js` syntax with the bundled Node runtime.

### Comparison history

- The first post-change capture confirms the requested Edit action is restored without reintroducing the Switch 1 tag, and the FSAF status tag is removed.

final result: passed

## Fund Switch review simplification — September 4

### Source visual truth

- Browser annotations 1–6 on `http://fund-switch.localhost:4173/`: Fund selection allocation card, Review & Submit policy details, switch summary, market-performance warning, and signature modal.
- Reference state: a compact three-part Switch From / Switch To / Amount To Switch summary, with the Switch 1 chip and Edit control intentionally excluded.

### Rendered implementation evidence

- Browser-rendered local implementation: `http://fund-switch.localhost:4173/`, in-app browser, 1280 × 720 CSS px at 1× density. Captures were reviewed in Switch Your Fund, Review & Submit, and signature-modal states; browser-managed captures have no persisted local file path.
- The annotated references and the corresponding implementation states were reviewed together in the current QA pass. Browser chrome and crop differences were excluded from the app-content comparison.

### Findings

- No remaining P0/P1/P2 mismatch for the annotated review refinements.
- Fonts and typography: the simplified policy heading and title-case labels retain the established hierarchy; source, target, and amount stay equally scannable in the compact summary.
- Spacing and layout rhythm: the removed allocation card is replaced by a single 4-track summary that aligns with the review version and uses the existing panel radius and border rhythm.
- Colors and visual tokens: the warning surface is removed as requested. Remaining cards use the existing neutral surfaces and purple action treatment.
- Image quality and asset fidelity: no visual image assets were added, changed, or approximated.
- Copy and content: Policy Owner, Policy Number, and Current Risk Profile are shown in order; product, policy-header subtext/icon, and status tag are omitted as requested.
- Accessibility and behavior: source/target selectors still gate Continue; the review acknowledgment still gates Proceed to Sign. The signature dialog now exposes only Cancel and Next.

### Interaction coverage

- Verified source and target selection renders the compact Switch From / Switch To / Amount To Switch summary and removes Allocation amount.
- Verified the Review & Submit card has no policy icon, policy subtext, Inforce tag, Switch 1 chip, Edit control, or market-performance warning.
- Verified the review acknowledgment opens the signature modal, where Save as Draft is absent.
- Verified `app.js` syntax with the bundled Node runtime.

### Comparison history

- First paired comparison found the allocation card duplicated information already established by the selected source/target controls. It was replaced with the compact switch summary matching the supplied structure.
- Post-fix browser comparison found no actionable P0/P1/P2 issues in the revised information hierarchy, compact summary, review layout, or signature actions.

### Follow-up polish

- P3: if multi-switch requests are added later, repeat the compact summary per switch and introduce a visible sequence label only when more than one switch exists.

final result: passed

## Investments policy detail and risk-profile update — September 3

### Source visual truth

- Expanded policy-table reference and multiple-policy reference supplied in the browser annotations for the Investments screen. Supporting desktop references: `/var/folders/hp/wh1h9svx3fq865znvwgyv4240000gp/T/codex-clipboard-59b28f74-bef2-4b0c-b094-4eb41fd5fb44.png`, `/var/folders/hp/wh1h9svx3fq865znvwgyv4240000gp/T/codex-clipboard-400bfeea-bf72-4515-a97d-7571a63949d5.png`, and `/var/folders/hp/wh1h9svx3fq865znvwgyv4240000gp/T/codex-clipboard-a3b43afe-4479-482c-b341-946f05f38915.png`.
- Source state: desktop Investments tab with the first policy expanded, table-level fund details visible, a second policy collapsed, and a Moderate risk profile preceding the fund-performance area.

### Rendered implementation evidence

- Browser-rendered implementation: `http://fund-switch.localhost:4173/`, in-app browser desktop capture, 1280 × 720 CSS px at 1× density; first policy expanded. The browser-managed current-turn capture has no persisted local path.
- The supplied annotated reference and current browser capture were reviewed together at the same desktop interaction state. Comparison is normalized to app content; the source references include differing browser chrome and wider crops.
- Focused comparison covered the policy header/summary/table and the contextual Fund Switch action, because these controls carry the revised behavior.

### Findings

- No remaining P0/P1/P2 mismatch for the annotated revision.
- Fonts and typography: policy names, product/ID metadata, summary labels, values, and compact table headings preserve the existing Lato/Montserrat hierarchy. The new small inline action remains legible without competing with the policy identity.
- Spacing and layout rhythm: stacked policy cards use a consistent 10 px rhythm; the expanded table follows the supplied header, row, and value alignment pattern while preserving the existing panel framing.
- Colors and visual tokens: navigation hover uses the supplied pale-lavender pill; Moderate uses the supplied warm orange dot and peach information surface with an orange lower rule. Existing purple remains reserved for active navigation and actions.
- Image quality and asset fidelity: the existing EastWest Ageas logo is retained. No new imagery or non-standard brand assets were introduced.
- Copy and content: two active Elizabeth policies demonstrate the multiple-policy state. The risk-profile description uses the supplied Moderate-profile content.
- Accessibility and behavior: each Show/Hide control exposes expanded state; the fund breakdown has table roles and labelled columns; each Switch fund action carries its policy and source fund into the existing Fund Switch flow.

### Interaction coverage

- Verified Investments shows two independent policy cards in collapsed state.
- Verified expanding the first policy reveals Fund Name, NAVPU, Units, Allocation, and Fund Value, plus a contextual Switch fund action for each held fund.
- Verified the first contextual action opens Fund Switch with FUTURE ASSURE #810000085627 and Peso Balanced Fund preselected.
- Verified Services → Fund Switch still opens Select Policy as the alternate entry point.
- Verified `app.js` syntax with the bundled Node runtime.

### Comparison history

- First paired comparison found the original header-level Switch fund CTA would be ambiguous for a multi-fund policy. It was replaced with row-level actions that make both the policy and source fund explicit.
- Post-fix browser comparison found no actionable P0/P1/P2 differences in the requested table hierarchy, multiple-policy layout, risk-profile placement, navigation hover treatment, or Fund Switch handoff.

### Follow-up polish

- P3: if a live API is added later, replace the deterministic policy units/NAVPU values with as-of-date data.

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

## Investments entry point — September 3 update

### Source visual truth

- Supplied Investments reference: `/var/folders/hp/wh1h9svx3fq865znvwgyv4240000gp/T/codex-clipboard-59b28f74-bef2-4b0c-b094-4eb41fd5fb44.png`, 3024 × 1660 px.
- Source state: desktop Investments tab, policy summary, available-fund performance grid, 1 Year selected.

### Rendered implementation evidence

- Browser-rendered local implementation: `http://fund-switch.localhost:4173/`, captured in the in-app browser at the active desktop viewport, 1× density, Investments tab / 1 Year selected state.
- The source reference and the browser-rendered implementation were opened in the same QA pass and visually compared at the equivalent desktop state. The reference has wider available viewport chrome; comparison was normalized to app content rather than browser chrome.

### Findings

- No remaining P0/P1/P2 mismatch for the requested entry-point change.
- Fonts and typography: existing Lato/Montserrat hierarchy remains consistent with the Fund Switch prototype; Investments uses the same bold headings, muted fund metadata, and compact navigation treatment shown in the source.
- Spacing and layout rhythm: the desktop composition preserves the source’s left utility column, policy summary above the fund grid, three-column performance cards, and generous white-panel spacing. On small screens the utility column is intentionally removed to prioritize the policy and fund-switch action.
- Colors and visual tokens: Investments uses the existing EastWest purple active tab and CTA, neutral panel surfaces, semantic green/red performance changes, and the existing outline/border tokens.
- Image quality and asset fidelity: the established EastWest Ageas logo remains the supplied vector asset. Performance visuals are rendered with accessible canvas charts from deterministic mock fund data; no new external brand or decorative image was needed.
- Copy and content: the page intentionally uses Elizabeth Garcia and FUTURE ASSURE so the Investment and Services routes share the same prototype policy data.
- Accessibility and behavior: the period selector exposes tab semantics, the breakdown control is a button, and Switch fund opens the existing Fund Switch step with FUTURE ASSURE already selected. Services retains its independent Fund Switch card and policy selection step.

### Interaction coverage

- Verified Investments navigation opens the new investment overview.
- Verified Show/Hide Fund Breakdown and all performance-period tabs change their visible selected state.
- Verified Investments → Switch fund opens Fund Switch with FUTURE ASSURE #810000085627 already in context.
- Verified Services → Fund Switch still opens Select Policy as before.
- Verified browser console has no errors or warnings and `app.js` passes syntax validation with the bundled Node runtime.

### Comparison history

- First paired desktop comparison found no actionable P0/P1/P2 differences in hierarchy, card/grid composition, active navigation, CTA visibility, or available-fund performance treatment.

final result: passed
