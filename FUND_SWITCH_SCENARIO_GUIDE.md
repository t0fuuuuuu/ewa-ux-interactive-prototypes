# Fund Switch Prototype — Scenario & Edge-Case Guide

Prototype: http://fund-switch.localhost:4173/?v=4

Use this guide from **Services → Fund Switch**. The sample policies below are intentionally configured to demonstrate the business rules and boundary cases in the prototype.

## Fund Switch walkthrough

1. Open the prototype and choose **Services → Fund Switch**.
2. On **Select Policy**, choose the policy number listed in the scenario you want to review. Use the policy number, not only the product name, because several fixtures share the same product.
3. Click **Next**. The fund-selection page opens directly; the portfolio accordion is collapsed on first entry.
4. Expand **Show Fund Breakdown** only when you need to verify the current holdings, currency, allocation, and fund value.
5. Under **Switch From**, select the source fund. The source amount determines whether the minimum switch rule passes.
6. Under **Switch To**, inspect the target-fund list. Confirm that it contains only funds allowed for that product and currency.
7. If the target is higher risk than the source, select **Start Questionnaire**, complete the RPQ, then review and acknowledge the IPS.
8. Use **Continue** only after the source, target, minimum amount, and any required suitability checks are complete.
9. Use **Save as Draft** at any point to verify draft creation and resume behavior from **My Requests**.
10. Return to **Services → Fund Switch** between scenarios so the next test starts from policy selection.

## Investments walkthrough

Use this path when reviewing how Fund Switch can be discovered from **Investments**:

1. Open the prototype and choose **Investments** from the main navigation.
2. Under **My Investment Policies**, choose **Show Fund Breakdown** for the policy you want to review. Policy cards are collapsed when the page first opens.
3. Review the policy's payout option, total fund value, current funds, NAVPU, units, allocation, and individual fund values.
4. Choose **Switch fund** beside a current holding. The Fund Switch journey opens with that policy and source fund already selected.
5. Select an eligible target fund. Confirm that the available targets follow the selected policy's product and currency rules.
6. Complete the minimum-amount and suitability paths described in the scenarios below, then continue to review and submit.
7. To explore funds without starting or changing a request, review **Available Funds** on the Investments page and switch between the performance periods.
8. From a target fund's details drawer in Fund Switch, choose **Explore all investment funds** to open the public investment-funds page in a new tab. This route is exploratory and does not submit or modify the Fund Switch request.

### Recommended review order

For a quick end-to-end review, use this order:

1. `810000085627` — standard eligible Peso policy.
2. `810000086143` — same-risk Dollar switch with no RPQ/IPS.
3. `810000090302` — higher-risk Peso switch requiring RPQ/IPS.
4. `810000090303` — below-PHP-minimum validation.
5. `810000090304` and `810000090305` — exact PHP and USD minimum boundaries.
6. `810000090307` — pending-request modal.
7. `810000089312`, `810000087920`, and `810000088405` — Non-VUL, lapsed, and terminated policy handling.

When documenting results, record the policy number, source fund, target fund, whether RPQ/IPS appeared, and whether Continue was enabled. This makes each observation traceable to one business rule.

## Quick navigation

| Scenario | Sample policy | Where to see it | Expected result |
| --- | --- | --- | --- |
| Standard eligible policy | `810000085627` Future Assure Regular Pay Peso | Select Policy → choose policy → Next | Opens fund selection. Portfolio is collapsed by default. |
| Dollar policy | `810000086143` Future Assure Max SP US Dollar | Select Policy → choose policy → Next | Only Dollar target funds are available. |
| Traditional / Non-VUL | `810000089312` Dream Builder | Select Policy → choose policy → Next | Opens the Non-VUL explanation modal; no fund switch can start. |
| Product-specific Peso matrix | `810000090301` Future Assure Max SP Peso | Select Policy → choose policy → Next → Source fund → Target fund | Only the funds configured for this product and PHP currency are listed. |
| Product-specific 3-Pay matrix | `810000090302` Future Assure 3-Pay Peso | Select Policy → choose policy → Next → Source fund → Target fund | Includes the Global Strategic Payout Fund; unavailable product funds are not listed. |
| Below PHP minimum | `810000090303` Future Assure 5-Pay Peso | Select Policy → choose policy → Next → Source fund → choose Peso Bond Fund | Shows the PHP 10,000 minimum error; target and Continue remain unavailable for that source. |
| Exact PHP minimum | `810000090304` Future Assure 10-Pay Peso | Select Policy → choose policy → Next → Source fund | A PHP 10,000 source passes the minimum validation. |
| Exact USD minimum | `810000090305` Future Assure Max SP US Dollar | Select Policy → choose policy → Next → Source fund | A USD 500 source passes the minimum validation. |
| Below USD minimum | `810000090306` Future Assure Max SP US Dollar | Select Policy → choose policy → Next → Source fund | Shows the USD 500 minimum error; target and Continue remain unavailable. |
| Pending request | `810000090307` Future Assure 5-Pay Peso | Select Policy → click the pending policy card | Opens the pending-request modal. The policy cannot be selected or submitted. |
| Lapsed policy | `810000087920` Sure Start | Select Policy → Other Policies | Card is disabled and cannot be selected. |
| Terminated policy | `810000088405` Future Assure Max | Select Policy → Other Policies | Card is disabled and cannot be selected. |

## Fund-selection scenarios

### 1. Same-currency restriction

Choose a Peso policy or a Dollar policy, then open Target fund. The list must contain only funds in the policy currency. A Peso source must never expose a Dollar target, and a Dollar source must never expose a Peso target.

### 2. Product-specific availability

Target funds are filtered by both product and currency. For example, the 3-Pay Peso policy (`810000090302`) includes the Peso Global Strategic Payout Fund, while the Regular Pay Peso policy (`810000085627`) does not.

### 3. One source to one target

The flow supports one selected source fund and one selected target fund. Selecting a different source clears the existing target and suitability checks so stale selections cannot be submitted.

### 4. Minimum amount validation

The minimum is PHP 10,000 or USD 500. The boundary is inclusive: exactly PHP 10,000 or USD 500 passes; any amount below it blocks target selection and Continue. The requirement is shown contextually on the fund-selection page.

## Suitability scenarios

### 5. Same-risk switch — no RPQ or IPS

Use policy `810000086143`:

1. Choose Dollar Income Paying Fund as the source (Aggressive).
2. Choose Dollar Global ESG Equity Fund as the target (Aggressive).

Because the target risk is not higher than the source risk, no RPQ or IPS panel appears and Continue becomes available after the fund pair is valid.

### 6. Higher-risk switch — RPQ and IPS required

Use policy `810000090302`:

1. Choose Peso Bond Fund (Moderately Conservative) as the source.
2. Choose Peso Balanced Fund (Moderate) or a higher-risk eligible target.

The page shows the risk-profile update message, then requires the Risk Profile Questionnaire followed by the Investment Policy Statement.

### 7. RPQ aligned with target

Complete the RPQ with answers that produce a profile at or above the selected target’s risk level. Review and acknowledge the IPS. The suitability section becomes completed and Continue is enabled.

### 8. RPQ below target risk

Complete the RPQ with a result below the selected target’s risk level. The result modal marks the selection as not aligned and offers Review answers / Choose another fund. Submission stays blocked until the customer chooses a suitable target and completes the required checks.

## Eligibility and request-state scenarios

### 9. Non-VUL policy

Dream Builder is intentionally visible so the user understands why it cannot be used. Selecting Next opens an explanation that the policy has no investment-linked funds. It does not redirect the customer into a VUL application.

### 10. Pending request

The pending policy appears with the available policies, without a status chip. Clicking it opens the Figma-aligned “Existing Fund Switch Request in Progress” modal. The user can track the request in My Requests and start another request only after processing is complete.

### 11. Lapsed or terminated policy

Lapsed and terminated cards remain visible under Other Policies for transparency, but are disabled and cannot open the fund-switch flow.

## Draft and submitted-request scenarios

### 12. Save a draft at policy selection

Select any eligible policy, then choose Save as Draft. Confirm the modal. The draft is linked to that policy and appears under My Requests.

### 13. Save a draft during fund selection or suitability checks

Choose a source/target, or enter the RPQ/IPS flow, then choose Save as Draft. Resume from My Requests. The current policy and saved progress should be retained.

### 14. Submitted request tracking

Complete a valid path through review and submit. My Requests shows the request under the selected policy, with submitted/in-progress tracking. A submitted or in-progress request prevents starting another switch for the same policy.

### 15. Draft/request policy association

Verify that My Requests shows the policy actually used for the request. This is especially important when testing multiple policies in one browser session.

## QA checklist

- [ ] Eligible Inforce VUL policies can be selected.
- [ ] Non-VUL, lapsed, terminated, and pending policies cannot be submitted.
- [ ] Pending policy opens an explanation modal without changing the selected policy.
- [ ] Target funds respect product and currency rules.
- [ ] PHP 10,000 and USD 500 boundaries are inclusive.
- [ ] Below-minimum sources block target selection and Continue.
- [ ] One source and one target are enforced.
- [ ] Changing the source clears target and suitability state.
- [ ] Same-risk switches skip RPQ and IPS.
- [ ] Higher-risk switches require RPQ and IPS.
- [ ] A below-target RPQ result blocks submission and offers a suitable recovery path.
- [ ] Drafts resume against the correct policy.
- [ ] Submitted/pending requests prevent duplicate requests for the same policy.
