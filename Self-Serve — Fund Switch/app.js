const app = document.querySelector('#app');
const toast = document.querySelector('#toast');
const dialogRoot = document.querySelector('#dialog-root');

const policies = [
  { id: '810000085627', owner: 'Elizabeth Garcia', product: 'FUTURE ASSURE', status: 'Inforce', eligible: true },
  { id: '810000086143', owner: 'Elizabeth Garcia', product: 'DREAM BUILDER', status: 'Inforce', eligible: true },
  { id: '810000087920', owner: 'Elizabeth Garcia', product: 'SURE START', status: 'Lapsed', eligible: false },
  { id: '810000088405', owner: 'Elizabeth Garcia', product: 'FUTURE ASSURE MAX', status: 'Terminated', eligible: false },
];

const funds = [
  { id: 'balanced', name: 'Peso Balanced Fund', allocation: 60, value: 210000, type: 'Balanced', risk: 'Moderate Risk', riskRank: 2 },
  { id: 'bond', name: 'Peso Bond Fund', allocation: 40, value: 140000, type: 'Fixed Income', risk: 'Moderate Risk', riskRank: 2 },
  { id: 'equity', name: 'Peso Equity Fund', allocation: 0, value: 0, type: 'Equity', risk: 'High Risk', riskRank: 3 },
];

const fundDetails = {
  balanced: {
    description: 'The Peso Balanced Fund invests in a diversified mix of peso-denominated fixed income securities and equities for investors seeking both income and long-term growth.',
    objective: 'The fund aims to balance capital growth and regular income through a diversified portfolio of fixed income securities and equities.',
    horizon: '3 - 5 years or more',
    horizonLabel: 'Medium to Long Term',
    launchDate: 'June 18, 2012',
  },
  bond: {
    category: 'Balanced',
    description: 'The Peso Bond Fund invests in a diversified portfolio of peso-dominated fixed income instruments such as government securities, corporate bonds, and other debt securities.',
    objective: 'The fund aims to provide regular income and capital stability by investing in a diversified portfolio of high quality fixed income securities.',
    horizon: '3 - 5 years or more',
    horizonLabel: 'Medium to Long Term',
    launchDate: 'March 15, 2011',
  },
  equity: {
    description: 'The Peso Equity Fund invests primarily in Philippine equities for investors seeking long-term capital growth and who can accept significant market fluctuations.',
    objective: 'The fund aims to achieve long-term capital appreciation through a diversified portfolio of listed Philippine equities.',
    horizon: '5 years or more',
    horizonLabel: 'Long Term',
    launchDate: 'September 3, 2013',
  },
};

const rpqQuestions = [
  { id: 'horizon', question: 'How long do you plan to keep this investment?', options: ['Less than 3 years', '3 to 7 years', 'More than 7 years'] },
  { id: 'objective', question: 'What is your primary investment objective?', options: ['Preserve my capital', 'Balance income and growth', 'Maximize long-term growth'] },
  { id: 'experience', question: 'How familiar are you with investment products?', options: ['Limited experience', 'Some experience', 'Experienced and confident'] },
  { id: 'loss', question: 'How would you respond if your investment fell by 20%?', options: ['Switch to a safer fund', 'Wait and monitor', 'Stay invested or invest more'] },
  { id: 'income', question: 'How stable is your current income?', options: ['Variable or uncertain', 'Generally stable', 'Very stable with sufficient reserves'] },
  { id: 'portion', question: 'How much of your available assets will this investment represent?', options: ['More than half', 'About one-quarter to one-half', 'Less than one-quarter'] },
  { id: 'return', question: 'Which risk-and-return trade-off are you most comfortable with?', options: ['Lower return with minimal fluctuation', 'Moderate return with some fluctuation', 'Higher return with significant fluctuation'] },
];

const initialState = () => ({
  screen: 'services',
  policyId: '',
  sourceId: '',
  targetId: '',
  currentRiskProfile: 'Moderate',
  rpqAnswers: {},
  rpqComplete: false,
  rpqResult: '',
  ipsAcknowledged: false,
  ipsAccepted: false,
  fundCheck: 'idle',
  assessmentStage: '',
  acknowledged: false,
  signatureDrawn: false,
  signatureImage: '',
  signatureCountry: 'Philippines',
  signatureCity: '',
  signatureDistrict: '',
  submitting: false,
  requestNumber: '#23457640001',
  requestStatus: '',
  draftResumeScreen: 'funds',
  draftResumeModal: '',
});

let state = initialState();
let toastTimer;
let fundCheckTimer;
let submissionTimer;
let draftReturnContext = 'page';

function money(value) {
  return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 2 }).format(value || 0);
}

function selectedPolicy() { return policies.find((policy) => policy.id === state.policyId); }
function selectedSource() { return funds.find((fund) => fund.id === state.sourceId); }
function selectedTarget() { return funds.find((fund) => fund.id === state.targetId); }
function requiresRiskAssessment() { return Boolean(selectedTarget() && selectedTarget().riskRank > 2); }
function riskRankForProfile(profile) { return ({ Conservative: 1, Moderate: 2, Aggressive: 3 })[profile] || 0; }
function resultAligned() { return Boolean(selectedTarget() && riskRankForProfile(state.rpqResult) >= selectedTarget().riskRank); }
function riskGateComplete() { return !requiresRiskAssessment() || (state.ipsAccepted && resultAligned()); }
function switchAmount() {
  const source = selectedSource();
  return source?.value || 0;
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function focusPage() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  requestAnimationFrame(() => app.focus({ preventScroll: true }));
}

function icon(name) { return `<span class="material-symbols-rounded" aria-hidden="true">${name}</span>`; }
function sharpIcon(name) { return `<span class="material-symbols-sharp" aria-hidden="true">${name}</span>`; }

function selectField({ id, label, value, placeholder, options, disabled = false }) {
  const selected = options.find((option) => option.value === value);
  return `
    <div class="field ds-select ${disabled ? 'disabled' : ''}" data-select="${id}">
      <span class="ds-field-label" id="${id}-label">${label}</span>
      <button class="ds-select-control" type="button" data-action="toggle-select" data-select-id="${id}" aria-labelledby="${id}-label" aria-haspopup="listbox" aria-expanded="false" ${disabled ? 'disabled' : ''}>
        <span class="${selected ? '' : 'placeholder'}">${selected ? selected.label : placeholder}</span>${icon('keyboard_arrow_down')}
      </button>
      <div class="ds-select-menu" id="${id}-listbox" role="listbox" aria-labelledby="${id}-label" hidden>
        ${options.map((option) => `<button type="button" role="option" aria-selected="${option.value === value}" data-action="select-option" data-select-id="${id}" data-value="${option.value}"><strong>${option.label}</strong>${option.description ? `<small>${option.description}</small>` : ''}</button>`).join('')}
      </div>
    </div>`;
}

function sectionMessage({ type = 'info', iconName = 'info', title = '', text, className = '' }) {
  return `<div class="section-message section-message-${type} ${className}">${icon(iconName)}<div>${title ? `<strong>${title}</strong>` : ''}<span>${text}</span></div></div>`;
}

function statusTag(label) {
  const className = label.toLowerCase().replace(/\s+/g, '-');
  return `<span class="status-tag status-${className}">${label}</span>`;
}

function steps(active) {
  const labels = ['Select Policy', 'Switch Your Fund', 'Review & Submit'];
  const completed = Math.max(0, active - 1);
  const assessmentActive = active === 2 && (state.screen === 'rpq' || state.assessmentStage);
  const ipsCurrent = state.assessmentStage === 'ips';
  return `
    <aside class="stepper ${assessmentActive ? 'has-substeps' : ''}" aria-label="Fund Switch progress">
      <div class="step-progress">
        <div class="step-progress-label"><span>Steps Completed</span><span>${completed}/3</span></div>
        <div class="progress-track" role="progressbar" aria-label="Steps completed" aria-valuemin="0" aria-valuemax="3" aria-valuenow="${completed}"><span style="width:${completed / 3 * 100}%"></span></div>
      </div>
      <div class="stepper-body">
        <h2>Fund Switch</h2>
        <ol class="step-list">
          ${labels.map((label, index) => {
            const n = index + 1;
            const status = n < active ? 'complete' : n === active ? 'current' : 'upcoming';
            const indicator = status === 'complete'
              ? `<span class="step-dot complete-icon">${icon('check_circle')}</span>`
              : `<span class="step-dot ${status}">${status === 'current' ? `<span class="step-halo">${icon('circle')}</span>` : ''}<span class="step-base">${icon('circle')}</span><span class="step-number">${n}</span></span>`;
            const substeps = n === 2 && assessmentActive ? `<ol class="assessment-substeps" aria-label="Switch Your Fund assessment progress">
              <li class="${ipsCurrent || state.ipsAccepted ? 'complete' : 'current'}"><span>Risk Profile Questionnaire</span></li>
              <li class="${state.ipsAccepted ? 'complete' : ipsCurrent ? 'current' : 'upcoming'}"><span>Investment Policy Statement</span></li>
            </ol>` : '';
            return `<li class="step-item ${status}" ${n === active ? 'aria-current="step"' : ''}>${indicator}<span class="step-label">${label}</span>${substeps}</li>`;
          }).join('')}
        </ol>
      </div>
    </aside>`;
}

function serviceCard({ iconName, title, copy, action, featured = false, label = 'Click to start request' }) {
  return `
    <article class="service-card ${featured ? 'featured' : ''}" role="button" tabindex="0" data-service="${action}" aria-label="${title}: ${label}">
      <div><h2>${icon(iconName)}${title}</h2><p>${copy}</p></div>
      <span class="service-card-action" aria-hidden="true">${label}${icon('keyboard_arrow_right')}</span>
    </article>`;
}

function servicesView() {
  const requestContent = state.requestStatus ? `
    <button class="request-policy-row" type="button" data-action="open-policy-requests" aria-label="View requests for policy 810000085627">
      <span><strong>Policy Number</strong><small>810000085627</small></span>${icon('keyboard_arrow_right')}
    </button>` : `<p class="empty-state">${icon('inventory_2')}<span>No requests yet. To submit a request, choose a service above and complete the required steps.</span></p>`;
  return `
    <section class="services-panel" aria-labelledby="page-title">
      <header class="intro"><h1 id="page-title">Manage your policy online</h1><p>Submit requests, update your details, and track progress in one place.</p></header>
      <div class="service-grid">
        ${serviceCard({ iconName: 'restart_alt', title: 'Reinstatement', copy: 'Restore your lapsed policy by submitting a reinstatement request and completing the required steps online.', action: 'Reinstatement' })}
        ${serviceCard({ iconName: 'person_edit', title: 'Change of Beneficiary', copy: 'Update your policy beneficiary details online by submitting a change in beneficiary request.', action: 'Change of Beneficiary' })}
        ${serviceCard({ iconName: 'swap_horiz', title: 'Fund Switch', copy: 'Move your investment between available funds to better match your financial goals and risk preference.', action: 'Fund Switch', featured: true })}
        ${serviceCard({ iconName: 'list_alt', title: 'Other Services', copy: 'More self-service requests will be available soon. Check back for future updates.', action: 'Other Services', label: 'Click here to view more' })}
      </div>
      <section class="requests" aria-labelledby="requests-title">
        <header><h2 id="requests-title">MY REQUESTS</h2></header>
        ${requestContent}
      </section>
    </section>`;
}

function requestsView() {
  const policy = policies[0];
  return `
    <section class="policy-requests-panel" aria-labelledby="policy-requests-title">
      <header class="policy-requests-header">
        <h1 id="policy-requests-title">Requests for Policy <span>#${policy.id}</span></h1>
        <p>See all service requests linked to this policy. You can check progress, review details, or continue ongoing requests.</p>
      </header>
      <div class="policy-requests-body">
        <button class="request-card" type="button" data-action="resume-request">
          <span class="request-card-copy"><span class="request-card-title">Fund Switch Request ${statusTag(state.requestStatus)}</span><small>${policy.product} #${policy.id}</small></span>
          ${icon(state.requestStatus === 'Draft' ? 'keyboard_arrow_right' : 'expand_more')}
        </button>
      </div>
      <footer class="policy-requests-footer"><button class="btn btn-secondary" type="button" data-action="back-services">Back</button></footer>
    </section>`;
}

function flowLayout({ active, title, description, body, backAction, nextAction, nextLabel = 'Next', nextDisabled = false, extraFooter = '' }) {
  const saveDraft = state.targetId && active >= 2 ? '<button class="btn btn-draft" type="button" data-action="save-draft">Save as Draft</button>' : '';
  return `
    <section class="flow-shell">
      ${steps(active)}
      <section class="flow-panel" aria-labelledby="flow-title">
        <header class="flow-header"><h1 id="flow-title">${title}</h1><p>${description}</p></header>
        <div class="flow-body">${body}</div>
        <footer class="flow-footer">
          <button class="btn btn-secondary" type="button" data-action="${backAction}">Back</button>
          <div class="footer-actions">${extraFooter}${saveDraft}<button class="btn btn-primary" type="button" data-action="${nextAction}" ${nextDisabled ? 'disabled' : ''}>${nextLabel}</button></div>
        </footer>
      </section>
    </section>`;
}

function policyOption(policy) {
  return `
    <label class="policy-option ${policy.eligible ? '' : 'disabled'}">
      <input type="radio" name="policy" value="${policy.id}" ${state.policyId === policy.id ? 'checked' : ''} ${policy.eligible ? '' : 'disabled'} />
      <span class="policy-card">
        <span class="policy-card-head"><span class="policy-name">${policy.owner}</span>${statusTag(policy.status)}</span>
        <span class="policy-meta">${policy.product} #${policy.id}</span>
      </span>
    </label>`;
}

function policyView() {
  const body = `
    <div class="policy-list">
      ${policies.filter((p) => p.eligible).map(policyOption).join('')}
      <p class="policy-group-title">Other Policies</p>
      ${policies.filter((p) => !p.eligible).map(policyOption).join('')}
    </div>`;
  return flowLayout({ active: 1, title: 'Select Policy', description: 'Choose the policy you want to make fund switch for.', body, backAction: 'back-services', nextAction: 'to-funds', nextDisabled: !state.policyId });
}

function fundOptions(kind) {
  const otherId = kind === 'source' ? state.targetId : state.sourceId;
  return funds
    .filter((fund) => fund.id !== otherId && (kind === 'source' ? fund.value > 0 : true))
    .map((fund) => ({ value: fund.id, label: fund.name, description: `${fund.type} | ${fund.risk}` }));
}

function sourceCard() {
  const source = selectedSource();
  return `
    <section class="fund-card">
      <div class="fund-card-copy"><div class="eyebrow">SWITCH FROM</div><h2>${source ? source.name : 'Select a source fund'}</h2>
      ${source ? `<p>Current allocation: ${source.allocation}%</p><div class="fund-value">${money(source.value)}</div><p>Current fund value</p>` : '<p>Choose where your current fund will be switched from.</p>'}</div>
      ${selectField({ id: 'source-fund', label: 'Source fund', value: state.sourceId, placeholder: 'Choose a fund', options: fundOptions('source') })}
      <div class="fund-card-action" aria-hidden="true"></div>
    </section>`;
}

function targetCard() {
  const target = selectedTarget();
  const disabled = !state.sourceId;
  return `
    <section class="fund-card ${disabled ? 'disabled' : ''}">
      <div class="fund-card-copy"><div class="eyebrow">SWITCH TO</div><h2>${target ? target.name : 'Select a target fund'}</h2>
      ${target ? `<p>${target.type} · <span class="risk-label ${target.riskRank > 2 ? 'aggressive' : ''}">${target.risk}</span></p><div class="fund-value">${money(target.value)}</div><p>Current fund value</p>` : '<p>Choose where your current fund will be switched.</p>'}</div>
      ${selectField({ id: 'target-fund', label: 'Target fund', value: state.targetId, placeholder: 'Choose a fund', options: fundOptions('target'), disabled })}
      <div class="fund-card-action">${state.fundCheck === 'checking' ? `<div class="fund-checking" role="status">${icon('progress_activity')}<span><strong>Checking fund requirements…</strong><small>Reviewing risk and suitability conditions</small></span></div>` : target ? '<button class="link-button" type="button" data-action="fund-details">View fund details</button>' : ''}</div>
    </section>`;
}

function currentPortfolio() {
  const policy = selectedPolicy();
  const currentFunds = funds.filter((fund) => fund.value > 0);
  const total = currentFunds.reduce((sum, fund) => sum + fund.value, 0);
  return `
    <details class="portfolio-card">
      <summary class="portfolio-summary">
        <span>${icon('account_balance_wallet')}<span><strong>Current fund portfolio</strong><small>${currentFunds.length} funds · ${policy.product} · #${policy.id}</small></span></span>
        <span class="portfolio-summary-total"><small>Total fund value</small><strong>${money(total)}</strong>${icon('expand_more')}</span>
      </summary>
      <div class="portfolio-list" role="list" aria-label="Current fund holdings">
        ${currentFunds.map((fund) => `
          <div class="portfolio-row" role="listitem">
            <div><strong>${fund.name}</strong><span>${fund.type} · ${fund.risk}</span></div>
            <div><span>Allocation</span><strong>${fund.allocation}%</strong></div>
            <div><span>Current value</span><strong>${money(fund.value)}</strong></div>
          </div>`).join('')}
      </div>
      <p class="portfolio-note">Values shown are the latest available in this prototype and may change with unit prices.</p>
    </details>`;
}

function riskTriggerBanner() {
  if (!requiresRiskAssessment() || state.fundCheck === 'checking') return '';
  if (state.ipsAccepted) return '';
  if (state.rpqComplete && !resultAligned()) {
    return sectionMessage({ type: 'warning', iconName: 'warning', title: 'Selected fund is not aligned', text: `${selectedTarget().name} has a higher risk level than your ${state.rpqResult} result. Review your answers or choose another fund.`, className: 'flow-message' });
  }
  return sectionMessage({ type: 'warning', iconName: 'warning', title: 'Risk profile update required', text: `${selectedTarget().name} is more aggressive than your current ${state.currentRiskProfile} profile. Complete the RPQ and review your IPS before choosing an allocation.`, className: 'flow-message' });
}

function riskRequirementsPanel() {
  if (!requiresRiskAssessment() || state.fundCheck === 'checking') return '';
  const rpqDone = state.rpqComplete;
  const ipsDone = state.ipsAccepted;
  const allDone = rpqDone && ipsDone;
  if (allDone) {
    return `
      <section class="requirements-card complete compact" aria-labelledby="requirements-title">
        <div class="requirements-header">
          <div>${icon('task_alt')}</div>
          <div><h2 id="requirements-title">Risk assessment completed</h2><p>Your ${state.rpqResult} profile and Investment Policy Statement are ready.</p></div>
        </div>
        <div class="requirements-complete-list">
          <div><span>${icon('check_circle')}<strong>Risk Profile Questionnaire</strong><small>${state.rpqResult}</small></span><button class="link-button" type="button" data-action="to-risk-result">Review result</button></div>
          <div><span>${icon('check_circle')}<strong>Investment Policy Statement</strong><small>Acknowledged</small></span><button class="link-button" type="button" data-action="to-ips">Review IPS</button></div>
        </div>
      </section>`;
  }
  return `
    <section class="requirements-card ${allDone ? 'complete' : ''}" aria-labelledby="requirements-title">
      <div class="requirements-header">
        <div>${icon(allDone ? 'task_alt' : 'assignment_late')}</div>
        <div><h2 id="requirements-title">${allDone ? 'Requirements completed' : 'Additional information required'}</h2><p>${allDone ? 'Both suitability checks are complete. You can continue with this fund switch.' : 'Complete both suitability checks before continuing with this fund switch.'}</p></div>
      </div>
      <div class="requirements-grid">
        <article class="requirement-item ${rpqDone ? 'complete' : ''}">
          <div class="requirement-status">${icon(rpqDone ? 'check_circle' : 'quiz')}<span>${rpqDone ? 'Completed' : 'Required'}</span></div>
          <h3>Risk Profile Questionnaire</h3>
          <p>Assess your current investment profile for the selected target fund.</p>
          <button class="btn btn-secondary" type="button" data-action="${rpqDone ? 'to-risk-result' : 'to-rpq'}">${rpqDone ? 'Review result' : 'Start questionnaire'}</button>
        </article>
        <article class="requirement-item ${ipsDone ? 'complete' : ''} ${rpqDone ? '' : 'locked'}">
          <div class="requirement-status">${icon(ipsDone ? 'check_circle' : rpqDone ? 'description' : 'lock')}<span>${ipsDone ? 'Completed' : rpqDone ? 'Required' : 'Available after RPQ'}</span></div>
          <h3>Investment Policy Statement</h3>
          <p>Review and acknowledge the investment policy information associated with your target fund.</p>
          <button class="btn btn-secondary" type="button" data-action="to-ips" ${rpqDone ? '' : 'disabled'}>${ipsDone ? 'Review completed IPS' : 'Review IPS'}</button>
        </article>
      </div>
    </section>`;
}

function allocationControls() {
  if (!state.sourceId || !state.targetId || !riskGateComplete() || state.fundCheck === 'checking') return '';
  const amount = switchAmount();
  return `
    <section class="allocation-card" aria-labelledby="allocation-title">
      <div class="allocation-heading">
        <div><h2 id="allocation-title">Allocation amount</h2><p>Automatically pre-filled from your selected source fund.</p></div>
      </div>
      <div class="read-only-allocation">
        <div><span class="field-label">Source fund</span><strong>${selectedSource().name}</strong></div>
        ${icon('arrow_forward')}
        <div><span class="field-label">Amount to switch</span><strong class="allocation-amount">${money(amount)}</strong><small>Full current value of the source fund</small></div>
      </div>
      <div class="allocation-note">${icon('info')}<span>The allocation is fixed at the full source fund value and cannot be changed in this service request.</span></div>
    </section>`;
}

function fundsView() {
  const body = `${currentPortfolio()}<div class="switch-grid">${sourceCard()}<div class="switch-arrow" aria-hidden="true">${sharpIcon('arrow_forward')}</div>${targetCard()}</div>${riskTriggerBanner()}${riskRequirementsPanel()}${allocationControls()}`;
  const ready = state.sourceId && state.targetId && riskGateComplete() && state.fundCheck !== 'checking';
  return flowLayout({
    active: 2,
    title: 'Switch your fund',
    description: 'Choose the fund you want to switch from and the fund you want to switch to.',
    body,
    backAction: 'back-policy',
    nextAction: 'to-review',
    nextLabel: 'Continue',
    nextDisabled: !ready,
  });
}

function rpqView() {
  const answered = Object.keys(state.rpqAnswers).length;
  const body = `
    <div class="rpq-list">
      ${rpqQuestions.map((item, questionIndex) => `
        <fieldset class="question-card">
          <legend>${item.question}</legend>
          <div class="question-options">
            ${item.options.map((option, optionIndex) => `
              <label class="question-option">
                <input type="radio" name="rpq-${item.id}" value="${optionIndex + 1}" ${state.rpqAnswers[item.id] === String(optionIndex + 1) ? 'checked' : ''}/>
                <strong aria-hidden="true">${String.fromCharCode(65 + optionIndex)}</strong><span>${option}</span>
              </label>`).join('')}
          </div>
        </fieldset>`).join('')}
    </div>`;
  return flowLayout({
    active: 2,
    title: 'Risk Profile Questionnaire',
    description: `Complete the questionnaire before switching to ${selectedTarget().name}.`,
    body,
    backAction: 'back-funds',
    nextAction: 'complete-rpq',
    nextLabel: 'Next',
    nextDisabled: answered !== rpqQuestions.length,
  });
}

function reviewView() {
  const source = selectedSource();
  const target = selectedTarget();
  const policy = selectedPolicy();
  const body = `
    <h2 class="review-title">Switch Fund Request</h2>
    <section class="review-section" aria-labelledby="policy-details-title">
      <div class="review-section-header"><div>${icon('policy')}<span><h3 id="policy-details-title">Policy details</h3><p>Policy associated with this request</p></span></div>${statusTag(policy.status)}</div>
      <dl class="review-detail-grid">
        <div><dt>Policy owner</dt><dd>${policy.owner}</dd></div>
        <div><dt>Product</dt><dd>${policy.product}</dd></div>
        <div><dt>Policy number</dt><dd>#${policy.id}</dd></div>
        <div><dt>Current risk profile</dt><dd>${state.currentRiskProfile}</dd></div>
      </dl>
    </section>
    <section class="review-card">
      <div class="review-card-header"><span class="switch-tag">Switch 1</span><button class="link-button" type="button" data-action="edit-funds">Edit</button></div>
      <div class="review-switch">
        <div><div class="review-label">Switch From</div><p class="review-data">${source.name}</p></div>
        ${icon('arrow_forward')}
        <div><div class="review-label">Switch To</div><p class="review-data">${target.name}</p></div>
        <div><div class="review-label">Amount To Switch</div><p class="review-data">${money(switchAmount())}</p></div>
      </div>
    </section>
    ${requiresRiskAssessment() ? `<div class="risk-review-row">${icon('verified_user')}<span><strong>Risk assessment complete</strong><br />RPQ result: ${state.rpqResult} · IPS acknowledged · ${target.name} aligned</span><button class="link-button" type="button" data-action="preview-ips">View IPS</button></div>` : ''}
    <section class="review-section review-document" aria-labelledby="fsaf-title">
      <div class="review-section-header">
        <div>${icon('description')}<span><h3 id="fsaf-title">Fund Switch Application Form (FSAF)</h3><p>Generated from the details in this request</p></span></div>
        <span class="document-status">Ready to review</span>
      </div>
      <div class="review-document-body"><p>Preview the application form before proceeding to your electronic signature.</p><button class="btn btn-secondary" type="button" data-action="preview-document">Preview FSAF</button></div>
    </section>
    ${sectionMessage({ type: 'warning', iconName: 'warning', text: 'Fund values may go up or down depending on market performance. Past performance is not indicative of future results.', className: 'review-message' })}
    <label class="ack-row"><input id="review-ack" type="checkbox" ${state.acknowledged ? 'checked' : ''}/><span>I confirm that I have reviewed the details above and understood that fund values may fluctuate.</span></label>`;
  return flowLayout({ active: 3, title: 'Review your fund switch', description: 'Before we proceed, please review the details below before signing your request.', body, backAction: 'back-funds', nextAction: 'to-sign', nextLabel: 'Proceed to Sign', nextDisabled: !state.acknowledged });
}

function successView() {
  const policy = selectedPolicy();
  const submitted = new Intl.DateTimeFormat('en-PH', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date());
  return `
    <section class="success-card" aria-labelledby="success-title">
      <div class="success-main">
        <div class="success-heading"><img class="success-animation" src="${window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'assets/figma-request-sent-static.png' : 'assets/figma-request-sent.gif'}" alt="" /><h1 id="success-title">Fund Switch Request Submitted</h1></div>
        <p class="success-copy">Your request has been successfully submitted.<br />Our team will review it and let you know if anything else is needed.</p>
        <section class="request-summary"><h2>Request Summary</h2><dl class="summary-table">
          <dt>Request Number</dt><dd>${state.requestNumber}</dd>
          <dt>Policy Details</dt><dd>${policy.product} #${policy.id}</dd>
          <dt>Request Type</dt><dd>Fund Switch</dd>
          <dt>Submitted</dt><dd>${submitted}</dd>
          <dt>Status</dt><dd>${statusTag('Submitted')}</dd>
        </dl></section>
        ${sectionMessage({ type: 'info', iconName: 'info', title: 'What happens next?', text: 'We’ll review your request and update its status once processing begins. You can track your request under My Requests.', className: 'success-message' })}
      </div>
      <footer class="success-actions"><button class="btn btn-primary" type="button" data-action="my-requests">View My Requests</button><button class="btn btn-secondary" type="button" data-action="restart">Back to Services</button></footer>
    </section>`;
}

function render({ focus = true } = {}) {
  const views = { services: servicesView, requests: requestsView, policy: policyView, funds: fundsView, rpq: rpqView, review: reviewView, success: successView };
  app.innerHTML = views[state.screen]();
  document.title = `${state.screen === 'services' ? 'Services' : state.screen === 'requests' ? 'My Requests' : state.screen === 'success' ? 'Request Submitted' : 'Fund Switch'} — EastWest Ageas`;
  if (focus) focusPage();
}

function calculateRiskResult() {
  const values = Object.values(state.rpqAnswers).map(Number);
  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  if (average <= 1.5) return 'Conservative';
  if (average <= 2.5) return 'Moderate';
  return 'Aggressive';
}

function riskResultCopy(profile) {
  if (profile === 'Conservative') return 'Your answers indicate a preference for capital stability and limited market fluctuation.';
  if (profile === 'Moderate') return 'Your answers indicate comfort with some market fluctuation while balancing stability and growth.';
  return 'Your answers indicate comfort with significant market fluctuations in pursuit of long-term growth.';
}

function riskResultContent() {
  const aligned = resultAligned();
  const result = state.rpqResult;
  return `
    <section class="result-hero ${aligned ? '' : 'not-aligned'}">
      <span class="result-icon">${icon(aligned ? 'verified' : 'error')}</span>
      <div><span class="result-tag">YOUR RESULT</span><h2>Your risk profile is ${result}</h2><p>${riskResultCopy(result)}</p></div>
    </section>
    <section class="risk-comparison" aria-labelledby="modal-comparison-title">
      <h2 id="modal-comparison-title">Suitability check</h2>
      <div class="comparison-grid">
        <div class="comparison-stage"><span class="review-label">Previous profile</span><strong>${state.currentRiskProfile}</strong><small>Before this review</small></div>
        ${icon('arrow_forward')}
        <div class="comparison-stage"><span class="review-label">RPQ result</span><strong>${result}</strong><small>Your latest profile</small></div>
        ${icon('arrow_forward')}
        <div class="comparison-stage comparison-target"><span class="review-label">Selected target fund</span><strong>${selectedTarget().name}</strong><small>${selectedTarget().risk}</small><span class="alignment-status ${aligned ? '' : 'not-aligned'}">${aligned ? 'Aligned' : 'Not aligned'}</span></div>
      </div>
    </section>
    ${aligned
      ? sectionMessage({ type: 'info', iconName: 'description', title: 'Next: Review your Investment Policy Statement', text: 'The IPS records your risk profile, investment objective, and selected fund before you continue.', className: 'modal-message' })
      : sectionMessage({ type: 'warning', iconName: 'warning', title: 'Choose a fund that matches your result', text: `${selectedTarget().name} is above the ${result} risk level. You can review your answers or return to the fund list.`, className: 'modal-message' })}`;
}

function openRiskResultModal() {
  const aligned = resultAligned();
  state.assessmentStage = 'result';
  if (state.screen !== 'rpq') { state.screen = 'rpq'; render({ focus: false }); }
  else render({ focus: false });
  dialogRoot.innerHTML = `
    <div class="modal-backdrop assessment-backdrop">
      <section class="modal assessment-modal" role="dialog" aria-modal="true" aria-labelledby="risk-result-title">
        <div class="modal-header"><div><h2 id="risk-result-title">Your risk profile result</h2><p>Review how your result compares with your selected fund.</p></div><button class="icon-button" type="button" data-action="back-to-rpq" aria-label="Close result">${icon('close')}</button></div>
        ${riskResultContent()}
        <footer class="modal-actions"><button class="btn btn-secondary" type="button" data-action="back-to-rpq">${aligned ? 'Back to answers' : 'Review answers'}</button><div class="modal-action-group"><button class="btn btn-draft" type="button" data-action="save-draft">Save as Draft</button><button class="btn btn-primary" type="button" data-action="${aligned ? 'to-ips-modal' : 'choose-another-fund'}">${aligned ? 'Review IPS' : 'Choose another fund'}</button></div></footer>
      </section>
    </div>`;
  dialogRoot.querySelector('.assessment-modal').focus?.();
}

function openIpsModal() {
  state.assessmentStage = 'ips';
  if (state.screen !== 'rpq') state.screen = 'rpq';
  render({ focus: false });
  dialogRoot.innerHTML = `
    <div class="modal-backdrop assessment-backdrop">
      <section class="modal assessment-modal ips-modal" role="dialog" aria-modal="true" aria-labelledby="ips-modal-title">
        <div class="modal-header"><div><h2 id="ips-modal-title">Investment Policy Statement</h2><p>Confirm that this summary reflects your investment intention.</p></div><button class="icon-button" type="button" data-action="back-to-result" aria-label="Close IPS">${icon('close')}</button></div>
        <section class="ips-document-card">
          <div class="ips-document-header"><div>${icon('description')}<span><strong>Prepared for Elizabeth Garcia</strong><small>${selectedPolicy().product} · #${selectedPolicy().id}</small></span></div><button class="link-button" type="button" data-action="preview-ips">View full IPS</button></div>
          <dl class="ips-summary">
            <dt>Risk Profile</dt><dd><span class="profile-chip">${state.rpqResult}</span></dd>
            <dt>Investment Objective</dt><dd>Long-term Capital Growth</dd>
            <dt>Target Fund</dt><dd>${selectedTarget().name} · ${selectedTarget().risk}</dd>
            <dt>Suitability</dt><dd><span class="alignment-status">Aligned</span></dd>
          </dl>
        </section>
        ${sectionMessage({ type: 'warning', iconName: 'warning', text: `A ${state.rpqResult} profile may experience significant fluctuations and possible capital loss.`, className: 'modal-message' })}
        <label class="ack-row ips-ack"><input id="ips-modal-ack" type="checkbox" ${state.ipsAcknowledged ? 'checked' : ''}/><span>I have reviewed and understood my Investment Policy Statement, including the risk associated with the selected target fund.</span></label>
        <footer class="modal-actions"><button class="btn btn-secondary" type="button" data-action="back-to-result">Back</button><div class="modal-action-group"><button class="btn btn-draft" type="button" data-action="save-draft">Save as Draft</button><button class="btn btn-primary" type="button" data-action="accept-ips-modal" ${state.ipsAcknowledged ? '' : 'disabled'}>Accept & Continue</button></div></footer>
      </section>
    </div>`;
}

function signatureReady() {
  return state.signatureDrawn && state.signatureCountry && state.signatureCity && state.signatureDistrict;
}

function setupSignaturePad() {
  const canvas = dialogRoot.querySelector('#signature-pad');
  if (!canvas) return;
  const context = canvas.getContext('2d');
  context.lineWidth = 4;
  context.lineCap = 'round';
  context.lineJoin = 'round';
  context.strokeStyle = '#536173';
  if (state.signatureImage) {
    const image = new Image();
    image.onload = () => context.drawImage(image, 0, 0, canvas.width, canvas.height);
    image.src = state.signatureImage;
  }
  let drawing = false;
  const point = (event) => {
    const rect = canvas.getBoundingClientRect();
    return { x: (event.clientX - rect.left) * canvas.width / rect.width, y: (event.clientY - rect.top) * canvas.height / rect.height };
  };
  canvas.addEventListener('pointerdown', (event) => {
    drawing = true;
    canvas.setPointerCapture(event.pointerId);
    const p = point(event);
    context.beginPath();
    context.moveTo(p.x, p.y);
    context.lineTo(p.x + .5, p.y + .5);
    context.stroke();
    state.signatureDrawn = true;
  });
  canvas.addEventListener('pointermove', (event) => {
    if (!drawing) return;
    const p = point(event);
    context.lineTo(p.x, p.y);
    context.stroke();
  });
  const finish = () => {
    if (!drawing) return;
    drawing = false;
    state.signatureImage = canvas.toDataURL('image/png');
    const next = dialogRoot.querySelector('[data-action="signature-next"]');
    if (next) next.disabled = !signatureReady();
  };
  canvas.addEventListener('pointerup', finish);
  canvas.addEventListener('pointercancel', finish);
}

function openSignatureModal() {
  const countryOptions = [{ value: 'Philippines', label: 'Philippines' }];
  const cityOptions = ['Taguig', 'Makati City', 'Manila'].map((value) => ({ value, label: value }));
  const districtOptions = ['Bicutan', 'Poblacion', 'Bel-Air'].map((value) => ({ value, label: value }));
  dialogRoot.innerHTML = `
    <div class="modal-backdrop signature-backdrop">
      <section class="modal signature-modal" role="dialog" aria-modal="true" aria-labelledby="signature-modal-title">
        <div class="signature-modal-heading"><h2 id="signature-modal-title">Policy Insured’s Signature</h2><p>This signature will appear on the reviewed documents</p></div>
        <div class="signature-area"><span>Place your signature here</span><canvas id="signature-pad" width="700" height="600" aria-label="Draw your signature" tabindex="0"></canvas></div>
        <button class="redo-signature" type="button" data-action="redo-signature">Redo Signature ${icon('undo')}</button>
        <div class="signature-selects">
          ${selectField({ id: 'signature-country', label: 'Country of Signature', value: state.signatureCountry, placeholder: 'Select Country of signature', options: countryOptions })}
          ${selectField({ id: 'signature-city', label: 'City of Signature', value: state.signatureCity, placeholder: 'Select City of signature', options: cityOptions })}
          ${selectField({ id: 'signature-district', label: 'District / Municipality', value: state.signatureDistrict, placeholder: 'Select District / Municipality', options: districtOptions })}
        </div>
        <footer class="signature-actions"><button class="btn btn-secondary" type="button" data-action="cancel-signature">Cancel</button><div class="modal-action-group"><button class="btn btn-draft" type="button" data-action="save-draft">Save as Draft</button><button class="btn btn-primary" type="button" data-action="signature-next" ${signatureReady() && !state.submitting ? '' : 'disabled'}>${state.submitting ? `${icon('progress_activity')} Processing…` : 'Next'}</button></div></footer>
      </section>
    </div>`;
  setupSignaturePad();
}

function openSaveDraftModal() {
  if (!state.targetId) return;
  if (dialogRoot.querySelector('.signature-modal')) draftReturnContext = 'signature';
  else if (dialogRoot.querySelector('.ips-modal')) draftReturnContext = 'ips';
  else if (dialogRoot.querySelector('.assessment-modal')) draftReturnContext = 'result';
  else draftReturnContext = 'page';
  dialogRoot.innerHTML = `
    <div class="modal-backdrop draft-backdrop">
      <section class="modal draft-modal" role="dialog" aria-modal="true" aria-labelledby="draft-modal-title">
        <div class="draft-modal-header"><h2 id="draft-modal-title">Save your request as draft?</h2><button class="icon-button" type="button" data-action="cancel-save-draft" aria-label="Close save draft confirmation">${icon('close')}</button></div>
        <p>Your progress will be saved so you can continue your request later. You can access your draft anytime from the Services section.</p>
        <footer class="draft-modal-actions"><button class="btn btn-secondary" type="button" data-action="cancel-save-draft">Cancel</button><button class="btn btn-primary" type="button" data-action="confirm-save-draft">Confirm</button></footer>
      </section>
    </div>`;
  dialogRoot.querySelector('.draft-modal').focus?.();
}

function restoreDraftReturnContext() {
  if (draftReturnContext === 'signature') return openSignatureModal();
  if (draftReturnContext === 'ips') return openIpsModal();
  if (draftReturnContext === 'result') return openRiskResultModal();
  closeModal();
}

function confirmSaveDraft() {
  state.requestStatus = 'Draft';
  state.draftResumeScreen = state.screen;
  state.draftResumeModal = draftReturnContext === 'page' ? '' : draftReturnContext;
  state.screen = 'services';
  closeModal();
  render();
  showToast('Your Fund Switch request was saved as a draft.');
}

function resumeSavedRequest() {
  if (state.requestStatus !== 'Draft') {
    showToast('This request has already been submitted.');
    return;
  }
  state.screen = state.draftResumeScreen || 'funds';
  render();
  if (state.draftResumeModal === 'signature') openSignatureModal();
  if (state.draftResumeModal === 'ips') openIpsModal();
  if (state.draftResumeModal === 'result') openRiskResultModal();
}

function submitSignature() {
  if (!signatureReady() || state.submitting) return;
  state.submitting = true;
  openSignatureModal();
  clearTimeout(submissionTimer);
  submissionTimer = window.setTimeout(() => {
    state.submitting = false;
    state.requestStatus = 'Submitted';
    closeModal();
    state.screen = 'success';
    render();
  }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 100 : 900);
}

function openDocumentPreview() {
  dialogRoot.innerHTML = `
    <div class="modal-backdrop" data-action="close-modal">
      <section class="modal" role="dialog" aria-modal="true" aria-labelledby="document-title">
        <div class="modal-header"><div><h2 id="document-title">Fund Switch Application Form</h2><p>Prototype document preview</p></div><button class="icon-button" type="button" data-action="close-modal" aria-label="Close preview">${icon('close')}</button></div>
        <div class="mock-document"><h3>FUND SWITCH APPLICATION FORM</h3><p><strong>Policy owner:</strong> Elizabeth Garcia<br /><strong>Policy:</strong> ${selectedPolicy().product} #${selectedPolicy().id}</p><p><strong>Instruction:</strong> Switch ${money(switchAmount())} from ${selectedSource().name} to ${selectedTarget().name}.</p><p>I acknowledge that fund values may fluctuate and that this request will be processed subject to policy provisions and the applicable cut-off time.</p><p><strong>Electronic signature:</strong> ${state.signatureDrawn ? 'Captured electronically' : 'To be completed'}</p></div>
        <button class="btn btn-primary" type="button" data-action="close-modal">Done</button>
      </section>
    </div>`;
  dialogRoot.querySelector('.icon-button').focus();
}

function openIpsPreview() {
  const returnAction = state.assessmentStage === 'ips' ? 'return-to-ips-modal' : 'close-modal';
  dialogRoot.innerHTML = `
    <div class="modal-backdrop">
      <section class="modal" role="dialog" aria-modal="true" aria-labelledby="ips-document-title">
        <div class="modal-header"><div><h2 id="ips-document-title">Investment Policy Statement</h2><p>Document preview</p></div><button class="icon-button" type="button" data-action="${returnAction}" aria-label="Close preview">${icon('close')}</button></div>
        <div class="mock-document"><h3>INVESTMENT POLICY STATEMENT</h3><p><strong>Policy owner:</strong> Elizabeth Garcia<br /><strong>Policy:</strong> ${selectedPolicy().product} #${selectedPolicy().id}</p><p><strong>Risk profile:</strong> ${state.rpqResult}<br /><strong>Investment objective:</strong> Long-term Capital Growth<br /><strong>Selected fund:</strong> ${selectedTarget().name} (${selectedTarget().risk})</p><p>I understand that a ${state.rpqResult} investment profile may involve market fluctuations and possible loss of capital. I acknowledge that my selected fund is aligned with the result shown above.</p><p class="document-disclaimer"><strong>Prototype only:</strong> Replace this content with the approved IPS wording, validity rule, and score-band result.</p></div>
        <button class="btn btn-primary" type="button" data-action="${returnAction}">Done</button>
      </section>
    </div>`;
  dialogRoot.querySelector('.icon-button').focus();
}

function openFundDetails() {
  const fund = selectedTarget();
  const details = fundDetails[fund.id];
  const category = details.category || fund.type;
  dialogRoot.innerHTML = `
    <div class="drawer-backdrop">
      <aside class="fund-drawer" role="dialog" aria-modal="true" aria-labelledby="fund-drawer-title" tabindex="-1">
        <header class="drawer-header">
          <button class="icon-button drawer-close" type="button" data-action="close-drawer" aria-label="Close fund details">${icon('close')}</button>
          <h2 id="fund-drawer-title">${fund.name}</h2>
          <p class="drawer-subtitle">${fund.risk} <span aria-hidden="true">|</span> ${category}</p>
          <p>${details.description}</p>
        </header>
        <div class="drawer-content">
          <section class="fund-highlights" aria-label="Fund characteristics">
            <div class="fund-highlight">${icon('signal_cellular_3_bar')}<div><strong>Risk Level (${fund.risk.replace(' Risk', '')})</strong><span>This fund is suitable for investors with a ${fund.risk.replace(' Risk', '').toLowerCase()} risk tolerance.</span></div></div>
            <div class="fund-highlight">${icon('strategy')}<div><strong>Investment Objective</strong><span>${details.objective}</span></div></div>
            <div class="fund-highlight">${icon('pie_chart')}<div><strong>Asset Type</strong><span>${fund.type}</span></div></div>
            <div class="fund-highlight">${icon('calendar_month')}<div><strong>Recommendation Investment Horizon (${details.horizonLabel})</strong><span>${details.horizon}</span></div></div>
          </section>
          <section class="fund-detail-table" aria-labelledby="fund-detail-table-title">
            <h3 id="fund-detail-table-title">Fund Details</h3>
            <dl>
              <div><dt>Fund launch date</dt><dd>${details.launchDate}</dd></div>
              <div><dt>Fund currency</dt><dd>Philippines Peso (PHP)</dd></div>
              <div><dt>Minimum initial investment</dt><dd>PHP 5,000.00</dd></div>
              <div><dt>Minimum additional investment</dt><dd>PHP 1,000.00</dd></div>
              <div><dt>Minimum maintaining balance</dt><dd>PHP 5,000.00</dd></div>
              <div><dt>Early redemption charge</dt><dd>1.00% if redeemed within 30 days</dd></div>
            </dl>
          </section>
          ${sectionMessage({ type: 'info', iconName: 'info', text: 'Fund values may go up or down depending on market performance. Past performance is not indicative of future results.', className: 'drawer-info' })}
        </div>
        <footer class="drawer-footer"><button class="btn btn-primary" type="button" data-action="close-drawer">Close</button><button class="btn btn-secondary" type="button" data-action="fund-factsheet">View fund factsheet</button></footer>
      </aside>
    </div>`;
  document.body.classList.add('drawer-open');
  dialogRoot.querySelector('.fund-drawer').focus({ preventScroll: true });
}

function closeModal() {
  dialogRoot.innerHTML = '';
  document.body.classList.remove('drawer-open');
}

function closeFundDrawer() {
  const backdrop = dialogRoot.querySelector('.drawer-backdrop');
  if (!backdrop) return closeModal();
  backdrop.classList.add('closing');
  window.setTimeout(closeModal, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 300);
}

function setSourceFund(value) {
  state.sourceId = value;
  if (state.targetId === state.sourceId) { state.targetId = ''; state.fundCheck = 'idle'; }
  render({ focus: false });
}

function setTargetFund(value) {
  clearTimeout(fundCheckTimer);
  const changed = state.targetId !== value;
  state.targetId = value;
  if (changed) {
    state.rpqAnswers = {};
    state.rpqComplete = false;
    state.rpqResult = '';
    state.ipsAcknowledged = false;
    state.ipsAccepted = false;
    state.assessmentStage = '';
  }
  state.fundCheck = requiresRiskAssessment() ? 'checking' : 'complete';
  render({ focus: false });
  if (state.fundCheck === 'checking') {
    fundCheckTimer = window.setTimeout(() => {
      state.fundCheck = 'complete';
      render({ focus: false });
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 50 : 700);
  }
}

document.addEventListener('change', (event) => {
  const target = event.target;
  if (target.name === 'policy') { state.policyId = target.value; render({ focus: false }); }
  if (target.name && target.name.startsWith('rpq-')) {
    state.rpqAnswers[target.name.replace('rpq-', '')] = target.value;
    render({ focus: false });
  }
  if (target.id === 'ips-ack') { state.ipsAcknowledged = target.checked; render({ focus: false }); }
  if (target.id === 'ips-modal-ack') {
    state.ipsAcknowledged = target.checked;
    const accept = dialogRoot.querySelector('[data-action="accept-ips-modal"]');
    if (accept) accept.disabled = !target.checked;
  }
  if (target.id === 'review-ack') { state.acknowledged = target.checked; render({ focus: false }); }
});

document.addEventListener('click', (event) => {
  const service = event.target.closest('[data-service]');
  if (service) {
    if (service.dataset.service === 'Fund Switch') { state.screen = 'policy'; render(); }
    else showToast(`${service.dataset.service} is outside this Fund Switch demo.`);
    return;
  }

  const nav = event.target.closest('[data-nav]');
  if (nav) { showToast(`${nav.dataset.nav} is outside this prototype.`); return; }

  const control = event.target.closest('[data-action]');
  if (!control) {
    document.querySelectorAll('.ds-select-menu:not([hidden])').forEach((menu) => { menu.hidden = true; });
    document.querySelectorAll('.ds-select-control[aria-expanded="true"]').forEach((button) => button.setAttribute('aria-expanded', 'false'));
    return;
  }
  if (control.disabled) return;
  const action = control.dataset.action;
  if (action === 'toggle-select') {
    const menu = document.querySelector(`#${control.dataset.selectId}-listbox`);
    const willOpen = menu.hidden;
    document.querySelectorAll('.ds-select-menu:not([hidden])').forEach((item) => { item.hidden = true; });
    document.querySelectorAll('.ds-select-control[aria-expanded="true"]').forEach((button) => button.setAttribute('aria-expanded', 'false'));
    menu.hidden = !willOpen;
    control.setAttribute('aria-expanded', String(willOpen));
    if (willOpen) menu.querySelector('[aria-selected="true"]')?.focus();
    return;
  }
  if (action === 'select-option') {
    const id = control.dataset.selectId;
    const value = control.dataset.value;
    if (id === 'source-fund') return setSourceFund(value);
    if (id === 'target-fund') return setTargetFund(value);
    if (id === 'signature-country') state.signatureCountry = value;
    if (id === 'signature-city') state.signatureCity = value;
    if (id === 'signature-district') state.signatureDistrict = value;
    openSignatureModal();
    return;
  }
  if (action === 'restart') { clearTimeout(submissionTimer); state.screen = 'services'; closeModal(); render(); }
  if (action === 'back-services') { state.screen = 'services'; render(); }
  if (action === 'open-policy-requests') { state.screen = 'requests'; render(); }
  if (action === 'resume-request') resumeSavedRequest();
  if (action === 'to-funds') { state.screen = 'funds'; render(); }
  if (action === 'back-policy') { state.screen = 'policy'; render(); }
  if (action === 'to-rpq') { state.screen = 'rpq'; state.assessmentStage = ''; render(); }
  if (action === 'to-risk-result') openRiskResultModal();
  if (action === 'complete-rpq') { state.rpqComplete = true; state.rpqResult = calculateRiskResult(); state.ipsAccepted = false; openRiskResultModal(); }
  if (action === 'back-rpq') { state.screen = 'rpq'; render(); }
  if (action === 'to-ips') openIpsModal();
  if (action === 'to-ips-modal') openIpsModal();
  if (action === 'choose-another-fund') { state.assessmentStage = ''; state.screen = 'funds'; closeModal(); render(); }
  if (action === 'back-to-rpq') { state.assessmentStage = ''; closeModal(); render({ focus: false }); }
  if (action === 'back-to-result') openRiskResultModal();
  if (action === 'accept-ips-modal') { state.ipsAccepted = true; state.assessmentStage = ''; state.screen = 'funds'; closeModal(); render(); }
  if (action === 'back-risk-result') { state.screen = 'riskResult'; render(); }
  if (action === 'accept-ips') { state.ipsAccepted = true; state.screen = 'funds'; render(); }
  if (action === 'to-review') { state.screen = 'review'; render(); }
  if (action === 'edit-funds' || action === 'back-funds') { state.screen = 'funds'; render(); }
  if (action === 'to-sign') openSignatureModal();
  if (action === 'back-review') { state.screen = 'review'; render(); }
  if (action === 'preview-document') openDocumentPreview();
  if (action === 'preview-ips') openIpsPreview();
  if (action === 'return-to-ips-modal') openIpsModal();
  if (action === 'save-draft') openSaveDraftModal();
  if (action === 'cancel-save-draft') restoreDraftReturnContext();
  if (action === 'confirm-save-draft') confirmSaveDraft();
  if (action === 'close-modal') closeModal();
  if (action === 'cancel-signature') closeModal();
  if (action === 'redo-signature') { state.signatureDrawn = false; state.signatureImage = ''; openSignatureModal(); }
  if (action === 'signature-next') submitSignature();
  if (action === 'fund-details') openFundDetails();
  if (action === 'close-drawer') closeFundDrawer();
  if (action === 'fund-factsheet') showToast(`${selectedTarget().name} factsheet would open in a new tab in production.`);
  if (action === 'my-requests') { state.screen = 'requests'; render(); }
});

document.addEventListener('keydown', (event) => {
  const serviceCard = event.target.closest?.('.service-card[data-service]');
  if (serviceCard && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    serviceCard.click();
    return;
  }
  if (event.key === 'Escape' && dialogRoot.querySelector('.draft-modal')) restoreDraftReturnContext();
  else if (event.key === 'Escape' && dialogRoot.querySelector('.drawer-backdrop')) closeFundDrawer();
  else if (event.key === 'Escape' && dialogRoot.innerHTML) closeModal();
});

render();
