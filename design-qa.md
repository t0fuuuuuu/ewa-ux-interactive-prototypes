# Design QA — Fund Switch journey expansion

## Evidence reviewed

- Login, filled login, Dashboard, and onboarding reference screenshots supplied by the user.
- Earlier Policy Details screenshots supplied in this conversation.
- Live local prototype at desktop viewport 919 × 859.
- Responsive rules reviewed at the 760 px and 620 px breakpoints for the 430 px mobile target used by the existing prototype.

## Screens and states verified

- Login page: public navigation, photographic hero, username/password inputs, visibility control, validation, and Continue.
- Dashboard: account navigation, profile/toolkit sidebar, self-service announcement, policy cards, and Fund Switch onboarding modal.
- Services handoff: onboarding CTA routes to Services and exposes the existing Fund Switch flow.
- Standard Peso Fund Switch: source/target summary and Next remain enabled.
- Income Paying Fund special case: 60% initial source blocks Next; adding the 40% source reaches 100%, updates the progress indicator and combined amount, and enables Next.
- Submission: review acknowledgement, Submit, success page, and Back to Dashboard.
- Post-submission Dashboard: submitted-state notification and request tracking CTA.
- Completed-request scenario: success notification on Dashboard and updated 100% allocation on Policy Details.

## Functional and accessibility checks

- No browser console or page errors found.
- Dialogs expose accessible names and remain keyboard reachable.
- Form controls have accessible labels; error messaging uses an alert role.
- Progress indicators expose numeric values.
- Active navigation and disabled actions expose their states.
- Reduced-motion behavior remains supported by the existing stylesheet.

## Visual QA result

- Layout, hierarchy, brand colors, spacing, and component treatment match the supplied references while reusing the current prototype system.
- New status messaging is persistent and non-blocking, with both Dashboard and Policy Details paths available.
- The Income Paying Fund behavior is explicit rather than silently changing the original source dropdown into a multiselect.

final result: passed
