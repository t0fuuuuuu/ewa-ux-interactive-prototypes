# Fund Switch prototype notes

## Scope

This is a frontend-only, responsive prototype for stakeholder walkthroughs. It starts on Services and covers policy selection, a compact current-fund portfolio, source and target fund selection, fund-details drawers, a conditional RPQ/IPS journey for a more aggressive target fund, save-as-draft and resume, fixed allocation, review, FSAF preview, acknowledgement, electronic signature, submission, and success.

## Assumptions

- The customer is already authenticated as the fictional prototype user Elizabeth Garcia.
- Only in-force VUL policies are selectable. Lapsed and terminated policies are shown but disabled.
- The demo uses PHP-denominated funds only. The full current value of the selected source fund is automatically pre-filled as the allocation amount and cannot be edited.
- The current portfolio is illustrative: PHP 210,000 in Peso Balanced Fund and PHP 140,000 in Peso Bond Fund, for a PHP 350,000 total fund value. It is collapsed by default so policies with many funds do not push the primary fund selectors below the fold.
- Fund details use the supplied Figma drawer. It moves in from the right over a 50% black backdrop for 300 ms with ease-in-out timing. Clicking outside does not close it; Close or Escape does.
- Selecting Peso Bond Fund keeps the direct Moderate Risk happy path.
- Selecting Peso Equity Fund first shows a brief 700 ms requirements check, then triggers the prototype RPQ and IPS branch because its High Risk classification is above the customer’s current Moderate profile.
- RPQ remains the working page while its result and the IPS are presented in focused modals. Continue stays disabled until the result is aligned and the IPS is acknowledged.
- RPQ validity, official question wording, answer weights, score bands, and mismatch/override rules are still pending BA/Compliance confirmation.
- Until those rules are supplied, the demo uses a simple unweighted average to show three stakeholder-review scenarios: Conservative, Moderate, and Aggressive. Conservative and Moderate results are blocked from the High Risk Peso Equity Fund and can return to the questionnaire or choose another fund; Aggressive can continue to IPS. This is interaction logic only and is not an approved suitability model.
- The prototype IPS uses the calculated profile and a Long-term Capital Growth objective. Its wording must be replaced with approved IPS content before production use.
- FSAF generation, document preview, draw-to-sign electronic signature, request number, submission time, and request status are simulated in the browser. The empty and filled signature states stay in the same dialog; Next shows a short processing state before submission. No data is transmitted or saved to a backend.
- Review includes policy details and a dedicated in-content Fund Switch Application Form (FSAF) section. FSAF is not placed beside the main footer CTA.
- The processing cut-off banner has been removed from Review to keep the signing checkpoint focused on the request details, risk notice, and acknowledgement.
- Source and target fund cards use equal-height comparison rows with a reserved action/status area. Selecting a fund opens the design-system menu with a secondary fund description.
- Completed RPQ and IPS requirements collapse into one compact green checkpoint with review links for each completed assessment.
- Policy status chips follow the Self-Serve semantic treatment: Inforce uses the warm yellow status pill, while Lapsed and Terminated use red status pills. Submitted uses the green success treatment on the confirmation page.
- The Switch Your Fund assessment substeps use simple indented text labels instead of radio controls. The active substep is magenta and the upcoming substep is muted.
- The complete Fund Switch service card is clickable and keyboard-operable with Enter or Space.
- Save as Draft becomes available only after a target fund is selected, remains available through assessment, review, and signature, and uses the supplied confirmation dialog. Confirmed drafts appear under My Requests by policy number and resume at the saved page or modal state.
- Draft and submitted-request state is simulated in memory for the current browser session. A browser reload clears it because this prototype has no storage or backend.
- At phone widths up to 620 px, the primary navigation collapses to the logo and Menu pill and the stepper collapses to progress label/count/bar only. Tablet widths, including 820 px, retain the desktop vertical stepper.
- Navigation items and the other service cards are presentation stubs. Fund Switch is the only complete journey.
- Back navigation preserves choices. The logo, Services navigation, and success-page Back to Services button return to Services without discarding the current in-session request. A browser refresh restarts the demo with clean state.

## Running locally

Open `index.html` directly in a browser, or serve this folder with any local static-file server. No install, build command, repository, API, or database is required.
