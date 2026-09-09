const app = document.querySelector('#app');
const toast = document.querySelector('#toast');
const dialogRoot = document.querySelector('#dialog-root');

const productFundMatrix = {
  'future-assure-max-sp-peso': ['bond', 'balanced', 'high-dividend', 'active-equity', 'asian-equity', 'peso-global-esg', 'global-reit'],
  'future-assure-max-sp-usd': ['dollar-esg', 'dollar-income'],
  'future-assure-3-pay-peso': ['bond', 'balanced', 'high-dividend', 'active-equity', 'asian-equity', 'peso-global-esg', 'global-reit', 'global-strategic'],
  'future-assure-5-pay-peso': ['bond', 'balanced', 'high-dividend', 'active-equity', 'asian-equity', 'peso-global-esg'],
  'future-assure-10-pay-peso': ['bond', 'balanced', 'high-dividend', 'active-equity', 'asian-equity', 'peso-global-esg'],
  'future-assure-regular-peso': ['bond', 'balanced', 'high-dividend', 'active-equity', 'asian-equity', 'peso-global-esg'],
};

const policies = [
  { id: '810000085627', owner: 'Elizabeth Garcia', product: 'FUTURE ASSURE (REGULAR PAY PESO)', productKey: 'future-assure-regular-peso', productType: 'VUL', currency: 'PHP', status: 'Inforce', fundSwitchEligible: true, selectable: true },
  { id: '810000086143', owner: 'Elizabeth Garcia', product: 'FUTURE ASSURE MAX (SP US DOLLAR)', productKey: 'future-assure-max-sp-usd', productType: 'VUL', currency: 'USD', status: 'Inforce', fundSwitchEligible: true, selectable: true },
  { id: '810000089312', owner: 'Elizabeth Garcia', product: 'DREAM BUILDER', productType: 'Non-VUL', status: 'Inforce', fundSwitchEligible: false, selectable: true },
  { id: '810000090301', owner: 'Elizabeth Garcia', product: 'FUTURE ASSURE MAX (SP PESO)', productKey: 'future-assure-max-sp-peso', productType: 'VUL', currency: 'PHP', status: 'Inforce', fundSwitchEligible: true, selectable: true },
  { id: '810000090302', owner: 'Elizabeth Garcia', product: 'FUTURE ASSURE (3-PAY PESO)', productKey: 'future-assure-3-pay-peso', productType: 'VUL', currency: 'PHP', status: 'Inforce', fundSwitchEligible: true, selectable: true },
  { id: '810000090303', owner: 'Elizabeth Garcia', product: 'FUTURE ASSURE (5-PAY PESO)', productKey: 'future-assure-5-pay-peso', productType: 'VUL', currency: 'PHP', status: 'Inforce', fundSwitchEligible: true, selectable: true },
  { id: '810000090304', owner: 'Elizabeth Garcia', product: 'FUTURE ASSURE (10-PAY PESO)', productKey: 'future-assure-10-pay-peso', productType: 'VUL', currency: 'PHP', status: 'Inforce', fundSwitchEligible: true, selectable: true },
  { id: '810000090305', owner: 'Elizabeth Garcia', product: 'FUTURE ASSURE MAX (SP US DOLLAR)', productKey: 'future-assure-max-sp-usd', productType: 'VUL', currency: 'USD', status: 'Inforce', fundSwitchEligible: true, selectable: true },
  { id: '810000090306', owner: 'Elizabeth Garcia', product: 'FUTURE ASSURE MAX (SP US DOLLAR)', productKey: 'future-assure-max-sp-usd', productType: 'VUL', currency: 'USD', status: 'Inforce', fundSwitchEligible: true, selectable: true },
  { id: '810000090307', owner: 'Elizabeth Garcia', product: 'FUTURE ASSURE (5-PAY PESO)', productKey: 'future-assure-5-pay-peso', productType: 'VUL', currency: 'PHP', status: 'Inforce', fundSwitchEligible: true, selectable: false, pendingRequest: true },
  { id: '810000087920', owner: 'Elizabeth Garcia', product: 'SURE START', productType: 'Non-VUL', status: 'Lapsed', fundSwitchEligible: false, selectable: false },
  { id: '810000088405', owner: 'Elizabeth Garcia', product: 'FUTURE ASSURE MAX', productType: 'VUL', status: 'Terminated', fundSwitchEligible: false, selectable: false },
];

const funds = [
  { id: 'bond', name: 'Peso Bond Fund', currency: 'PHP', type: 'Fixed Income', risk: 'Moderately Conservative', riskScore: 3 },
  { id: 'balanced', name: 'Peso Balanced Fund', currency: 'PHP', type: 'Balanced', risk: 'Moderate', riskScore: 6 },
  { id: 'equity', name: 'Peso Equity Fund', currency: 'PHP', type: 'Equity', risk: 'Moderately Aggressive', riskScore: 7 },
  { id: 'high-dividend', name: 'Peso High Dividend Equity Fund', currency: 'PHP', type: 'Equity', risk: 'Moderately Aggressive', riskScore: 7 },
  { id: 'active-equity', name: 'Peso Active Equity Fund', currency: 'PHP', type: 'Equity', risk: 'Moderately Aggressive', riskScore: 7 },
  { id: 'asian-equity', name: 'Asian Equity Fund', currency: 'PHP', type: 'Equity', risk: 'Aggressive', riskScore: 9 },
  { id: 'peso-global-esg', name: 'Peso Global ESG Equity Fund', currency: 'PHP', type: 'Equity', risk: 'Aggressive', riskScore: 9 },
  { id: 'global-reit', name: 'Peso Global REIT Payout Fund', currency: 'PHP', type: 'Multi-Asset', risk: 'Aggressive', riskScore: 9 },
  { id: 'global-strategic', name: 'Peso Global Strategic Payout Fund', currency: 'PHP', type: 'Multi-Asset', risk: 'Aggressive', riskScore: 9 },
  { id: 'dollar-esg', name: 'Dollar Global ESG Equity Fund', currency: 'USD', type: 'Equity', risk: 'Aggressive', riskScore: 9 },
  { id: 'dollar-income', name: 'Dollar Income Paying Fund', currency: 'USD', type: 'Multi-Asset', risk: 'Aggressive', riskScore: 9 },
];

const policyHoldings = {
  '810000085627': [
    { id: 'balanced', allocation: 60, value: 210000, navpu: 'PHP 1.1023', units: '190,526.379', accent: 'balanced' },
    { id: 'bond', allocation: 40, value: 140000, navpu: 'PHP 1.1102', units: '126,103.016', accent: 'bond' },
  ],
  '810000086143': [
    { id: 'dollar-esg', allocation: 60, value: 6300, navpu: 'USD 1.0749', units: '5,860.080', accent: 'balanced' },
    { id: 'dollar-income', allocation: 40, value: 4200, navpu: 'USD 1.0000', units: '4,200.000', accent: 'bond' },
  ],
  '810000090301': [
    { id: 'bond', allocation: 50, value: 50000, navpu: 'PHP 1.1102', units: '45,036.930', accent: 'bond' },
    { id: 'global-reit', allocation: 50, value: 50000, navpu: 'PHP 1.0575', units: '47,281.324', accent: 'balanced' },
  ],
  '810000090302': [
    { id: 'bond', allocation: 67, value: 50000, navpu: 'PHP 1.1102', units: '45,036.930', accent: 'bond' },
    { id: 'global-strategic', allocation: 33, value: 25000, navpu: 'PHP 1.0290', units: '24,295.432', accent: 'balanced' },
  ],
  '810000090303': [
    { id: 'bond', allocation: 33, value: 9999.99, navpu: 'PHP 1.1102', units: '9,007.197', accent: 'bond' },
    { id: 'balanced', allocation: 67, value: 20000, navpu: 'PHP 1.1023', units: '18,143.881', accent: 'balanced' },
  ],
  '810000090304': [
    { id: 'bond', allocation: 100, value: 10000, navpu: 'PHP 1.1102', units: '9,007.206', accent: 'bond' },
  ],
  '810000090305': [
    { id: 'dollar-income', allocation: 100, value: 500, navpu: 'USD 1.0000', units: '500.000', accent: 'bond' },
  ],
  '810000090306': [
    { id: 'dollar-income', allocation: 100, value: 499.99, navpu: 'USD 1.0000', units: '499.990', accent: 'bond' },
  ],
};

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
  'dollar-esg': {
    description: 'The Dollar Global ESG Equity Fund provides exposure to global companies while considering environmental, social, and governance factors.',
    objective: 'The fund aims for long-term capital growth through a diversified portfolio of global equities.',
    horizon: '5 years or more',
    horizonLabel: 'Long Term',
    launchDate: 'February 1, 2022',
  },
  'dollar-income': {
    description: 'The Dollar Income Paying Fund invests in a diversified US-dollar portfolio designed to provide regular income.',
    objective: 'The fund aims to provide income and capital stability from US-dollar-denominated investments.',
    horizon: '3 - 5 years or more',
    horizonLabel: 'Medium to Long Term',
    launchDate: 'February 1, 2022',
  },
};

const investmentFunds = [
  { name: 'Dollar Income Paying Fund', value: 'USD 0.0001', change: '99.99%', tone: 'down', chart: 'income' },
  { name: 'Asian Equity Fund', value: 'PHP 1.1131', change: '11.31%', tone: 'up', chart: 'asian' },
  { name: 'Bond Fund', value: 'PHP 1.1102', change: '11.02%', tone: 'up', chart: 'bond' },
  { name: 'Balanced Fund', value: 'PHP 1.1023', change: '10.23%', tone: 'up', chart: 'balanced' },
  { name: 'Peso Active Equity Fund', value: 'PHP 1.1115', change: '11.15%', tone: 'up', chart: 'active' },
  { name: 'Peso High Dividend Equity Fund', value: 'PHP 1.1108', change: '11.08%', tone: 'up', chart: 'dividend' },
  { name: 'Peso Global ESG Equity Fund', value: 'PHP 1.0579', change: '5.79%', tone: 'up', chart: 'esg' },
  { name: 'Dollar Global ESG Equity Fund', value: 'USD 1.0749', change: '7.49%', tone: 'up', chart: 'global' },
  { name: 'Peso Global REIT Payout Fund', value: 'PHP 1.0575', change: '5.75%', tone: 'up', chart: 'reit' },
  { name: 'Peso Global Strategic Payout Fund', value: 'PHP 1.0290', change: '2.90%', tone: 'up', chart: 'strategic' },
];

const investmentPolicies = [
  {
    id: '810000085627', title: "Elizabeth's Policy", product: 'FUTURE ASSURE', payout: 'Cash Payout', asOf: 'Sep 03, 2026', value: 350000,
    funds: [
      { id: 'balanced', name: 'Peso Balanced Fund', navpu: 'PHP 1.1023', units: '190,526.379', allocation: '60%', value: 210000, accent: 'balanced' },
      { id: 'bond', name: 'Peso Bond Fund', navpu: 'PHP 1.1102', units: '126,103.016', allocation: '40%', value: 140000, accent: 'bond' },
    ],
  },
  {
    id: '810000086143', title: "Elizabeth's Policy", product: 'FUTURE ASSURE MAX (US DOLLAR)', currency: 'USD', payout: 'Reinvestment', asOf: 'Sep 03, 2026', value: 10500,
    funds: [
      { id: 'dollar-esg', name: 'Dollar Global ESG Equity Fund', navpu: 'USD 1.0749', units: '5,860.080', allocation: '60%', value: 6300, accent: 'balanced' },
      { id: 'dollar-income', name: 'Dollar Income Paying Fund', navpu: 'USD 1.0000', units: '4,200.000', allocation: '40%', value: 4200, accent: 'bond' },
    ],
  },
];

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
  activeNav: 'Services',
  investmentPeriod: '1 Year',
  investmentExpandedPolicyId: '',
  requestExpanded: false,
  policyId: '',
  sourceId: '',
  targetId: '',
  currentRiskProfile: 'Moderate',
  rpqAnswers: {},
  rpqSubmitting: false,
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
  requestPolicyId: '',
  draftResumeScreen: 'funds',
  draftResumeModal: '',
  vulConsultationRequested: false,
});

let state = initialState();
let toastTimer;
let fundCheckTimer;
let submissionTimer;
let rpqTimer;
let draftReturnContext = 'page';

function money(value, currency = selectedPolicy()?.currency || 'PHP') {
  return new Intl.NumberFormat('en-PH', { style: 'currency', currency, currencyDisplay: currency === 'USD' ? 'code' : 'symbol', maximumFractionDigits: 2 }).format(value || 0);
}

function selectedPolicy() { return policies.find((policy) => policy.id === state.policyId); }
function policyFunds(policyId = state.policyId) {
  return (policyHoldings[policyId] || []).map((holding) => ({ ...funds.find((fund) => fund.id === holding.id), ...holding }));
}
function availablePolicyFunds() {
  const policy = selectedPolicy();
  const currency = policy?.currency;
  const allowedFundIds = productFundMatrix[policy?.productKey] || [];
  const holdings = policyFunds();
  return funds
    .filter((fund) => fund.currency === currency && allowedFundIds.includes(fund.id))
    .map((fund) => ({ ...fund, ...(holdings.find((holding) => holding.id === fund.id) || { allocation: 0, value: 0 }) }));
}
function selectedSource() { return policyFunds().find((fund) => fund.id === state.sourceId); }
function selectedTarget() { return availablePolicyFunds().find((fund) => fund.id === state.targetId); }
function requiresRiskAssessment() {
  const source = selectedSource();
  const target = selectedTarget();
  return Boolean(source && target && target.riskScore > source.riskScore);
}
function riskScoreForProfile(profile) {
  return ({ 'Moderately Conservative': 3, Moderate: 6, 'Moderately Aggressive': 7, Aggressive: 9 })[profile] || 0;
}
function resultAligned() { return Boolean(selectedTarget() && riskScoreForProfile(state.rpqResult) >= selectedTarget().riskScore); }
function riskGateComplete() { return !requiresRiskAssessment() || (state.ipsAccepted && resultAligned()); }
function switchAmount() {
  const source = selectedSource();
  return source?.value || 0;
}
function minimumSwitchAmount(currency = selectedPolicy()?.currency) { return currency === 'USD' ? 500 : 10000; }
function meetsMinimumSwitch() { return Boolean(selectedSource() && switchAmount() >= minimumSwitchAmount()); }
function hasPendingRequest(policy) {
  return Boolean(policy.pendingRequest || (state.requestPolicyId === policy.id && ['Draft', 'Submitted', 'In Progress', 'Additional Documents Required'].includes(state.requestStatus)));
}
function resetSuitability() {
  clearTimeout(fundCheckTimer);
  state.rpqAnswers = {};
  state.rpqComplete = false;
  state.rpqResult = '';
  state.ipsAcknowledged = false;
  state.ipsAccepted = false;
  state.assessmentStage = '';
  state.fundCheck = 'idle';
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
  const requestPolicy = policies.find((policy) => policy.id === state.requestPolicyId);
  const requestContent = state.requestStatus ? `
    <button class="request-policy-row" type="button" data-action="open-policy-requests" aria-label="View requests for policy ${requestPolicy?.id || ''}">
      <span><strong>Policy Number</strong><small>${requestPolicy?.id || ''}</small></span>${icon('keyboard_arrow_right')}
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

function investmentView() {
  const periods = ['6 Months', '1 Year', '3 Years', '5 Years', 'Date Range'];
  const profileDescription = 'You would like to make your investment earn more than the deposit products and would be open to some medium-term market fluctuations to achieve this. You do not have an immediate need for your invested money. You are not ready to commit a large percentage of your money to heavy market value fluctuations as with equities or shares of stocks of public companies.';
  const policyCard = (policy) => {
    const expanded = state.investmentExpandedPolicyId === policy.id;
    return `<article class="investment-policy-card ${expanded ? 'expanded' : ''}">
      <header><div><h2>${policy.title}</h2><p>${policy.product} <span>#${policy.id}</span></p></div><div class="investment-policy-actions"><button class="text-action" type="button" data-action="toggle-policy-breakdown" data-policy-id="${policy.id}" aria-expanded="${expanded}">${expanded ? 'Hide' : 'Show'} Fund Breakdown ${icon(expanded ? 'expand_less' : 'expand_more')}</button></div></header>
      <div class="policy-overview"><div><span>Income Payout Option ${icon('help')}</span><strong>${policy.payout}</strong><small>AS OF ${policy.asOf.toUpperCase()}</small></div><div><span>Fund Value ${icon('help')}</span><strong>${money(policy.value, policy.currency || 'PHP')}</strong></div></div>
      ${expanded ? `<div class="investment-breakdown" role="table" aria-label="${policy.title} fund breakdown"><div class="investment-fund-table-head" role="row"><span role="columnheader">Fund Name ${icon('help')} ${icon('north')}</span><span role="columnheader">NAVPU ${icon('help')}</span><span role="columnheader">Units ${icon('help')}</span><span role="columnheader">Allocation ${icon('help')}</span><span role="columnheader">Fund Value ${icon('help')}</span><span role="columnheader" class="visually-hidden">Action</span></div>${policy.funds.map((fund) => `<div class="investment-fund-table-row ${fund.accent}" role="row"><span role="cell" class="investment-held-fund">${fund.name}</span><span role="cell">${fund.navpu}</span><span role="cell">${fund.units}</span><span role="cell">${fund.allocation}</span><span role="cell" class="investment-fund-value"><strong>${money(fund.value, policy.currency || 'PHP')}</strong></span><span role="cell" class="investment-fund-action"><button class="fund-switch-action" type="button" data-action="start-policy-fund-switch" data-policy-id="${policy.id}" data-source-id="${fund.id}">Switch fund</button></span></div>`).join('')}</div>` : ''}
    </article>`;
  };
  return `
    <section class="investments-layout" aria-labelledby="investments-title">
      <aside class="investments-sidebar">
        <section class="investor-card">
          <div class="investor-avatar" aria-hidden="true">E</div>
          <h2>Welcome Elizabeth!</h2>
          <p>${icon('call')} +63 908 655 5256</p>
          <p>${icon('mail')} elizabeth.garcia@email.com</p>
        </section>
        <section class="investment-toolkit" aria-labelledby="toolkit-title">
          <h2 id="toolkit-title">Toolkit</h2>
          ${['Policy Change and Payment Forms', 'Policy Fund Value Management', 'Policy Cancellation and Reinstatement', 'Policy Claim Forms'].map((item) => `<button type="button" data-action="toolkit-info">${item}${icon('keyboard_arrow_right')}</button>`).join('')}
        </section>
        <section class="sidebar-risk-profile" aria-labelledby="sidebar-risk-title"><h2 id="sidebar-risk-title">Risk Profile</h2><p><span class="risk-dot" aria-hidden="true"></span><strong>Moderate</strong><button type="button" data-action="risk-profile-info">Learn more</button></p></section>
        <section class="care-card" aria-labelledby="care-title"><h2 id="care-title">Customer Care</h2><p>Need help? Feel free to contact us:</p><span>${icon('call')} +63 2 8939 3924</span><span>${icon('mail')} AskMe@ewageas.com.ph</span></section>
      </aside>
      <div class="investments-content">
        <section class="investment-policy-section" aria-labelledby="investments-title">
          <h1 id="investments-title">My Investment Policies</h1>
          <div class="investment-policy-list">${investmentPolicies.map(policyCard).join('')}</div>
        </section>
        <section class="investment-risk-profile" aria-labelledby="investment-risk-title"><h2 id="investment-risk-title">Risk Profile</h2><p class="risk-level"><span class="risk-dot" aria-hidden="true"></span><strong>Moderate</strong></p><p class="risk-description">${profileDescription}</p></section>
        <section class="available-funds-section" aria-labelledby="available-funds-title">
          <header class="available-funds-header"><h2 id="available-funds-title">Available Funds</h2><div class="period-tabs" role="tablist" aria-label="Fund performance period">${periods.map((period) => `<button type="button" data-period="${period}" class="${state.investmentPeriod === period ? 'active' : ''}" role="tab" aria-selected="${state.investmentPeriod === period}">${period}</button>`).join('')}</div></header>
          <div class="investment-fund-grid">${investmentFunds.map((fund) => `<article class="investment-fund-card"><h3>${fund.name}</h3><p><strong>${fund.value}</strong><span class="fund-change ${fund.tone}">${fund.change} ${icon(fund.tone === 'down' ? 'south' : 'north')}</span></p><canvas class="fund-performance-chart" data-chart="${fund.chart}" aria-label="${fund.name} performance chart"></canvas></article>`).join('')}</div>
        </section>
      </div>
    </section>`;
}

function requestsView() {
  const policy = policies.find((item) => item.id === state.requestPolicyId) || policies[0];
  const isDraft = state.requestStatus === 'Draft';
  const expanded = !isDraft && state.requestExpanded;
  return `
    <section class="policy-requests-panel" aria-labelledby="policy-requests-title">
      <header class="policy-requests-header">
        <h1 id="policy-requests-title">Requests for Policy <span>#${policy.id}</span></h1>
        <p>See all service requests linked to this policy. You can check progress, review details, or continue ongoing requests.</p>
      </header>
      <div class="policy-requests-body">
        ${expanded ? '<div class="request-date">As of September 3, 2026</div>' : ''}
        <article class="request-card ${expanded ? 'expanded' : ''}">
          <button class="request-card-toggle" type="button" data-action="${isDraft ? 'resume-request' : 'toggle-request-details'}" ${isDraft ? '' : `aria-expanded="${expanded}"`}>
            <span class="request-card-copy"><span class="request-card-title">Fund Switch Request ${statusTag(state.requestStatus)}</span><small>${policy.product} #${policy.id}</small></span>
            ${icon(isDraft ? 'keyboard_arrow_right' : expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down')}
          </button>
          ${expanded ? `<div class="request-progress" aria-label="Fund switch request progress">
            <div class="request-progress-step complete"><span class="request-progress-indicator">${icon('check_circle')}</span><span><strong>Submitted</strong><small>Your fund switch request is under review. We’ll notify you if any additional information is required.</small></span></div>
            <div class="request-progress-step upcoming"><span class="request-progress-indicator">${icon('circle')}</span><span><strong>In Progress</strong></span></div>
            <div class="request-progress-step upcoming"><span class="request-progress-indicator">${icon('circle')}</span><span><strong>Completed</strong></span></div>
          </div>` : ''}
        </article>
      </div>
      <footer class="policy-requests-footer"><button class="btn btn-secondary" type="button" data-action="back-services">Back</button></footer>
    </section>`;
}

function flowLayout({ active, title, description, body, backAction, nextAction, nextLabel = 'Next', nextDisabled = false, extraFooter = '', focusMode = false, headerExtra = '' }) {
  const saveDraft = state.policyId && active >= 1 ? '<button class="btn btn-draft" type="button" data-action="save-draft">Save as Draft</button>' : '';
  return `
    <section class="flow-shell ${focusMode ? 'focus-mode' : ''}">
      ${focusMode ? '' : steps(active)}
      <section class="flow-panel" aria-labelledby="flow-title">
        <header class="flow-header">${headerExtra}<h1 id="flow-title">${title}</h1><p>${description}</p></header>
        <div class="flow-body">${body}</div>
        <footer class="flow-footer">
          <button class="btn btn-secondary" type="button" data-action="${backAction}">Back</button>
          <div class="footer-actions">${extraFooter}${saveDraft}<button class="btn btn-primary" type="button" data-action="${nextAction}" ${nextDisabled ? 'disabled' : ''}>${nextLabel}</button></div>
        </footer>
      </section>
    </section>`;
}

function policyOption(policy) {
  const pending = hasPendingRequest(policy);
  if (pending) {
    return `
      <button class="policy-option pending-policy" type="button" data-action="pending-policy-info" data-policy-id="${policy.id}" aria-label="${policy.owner}, ${policy.status}, ${policy.product}, policy ${policy.id}. Fund switch request pending">
        <span class="policy-card">
          <span class="policy-card-head"><span class="policy-name">${policy.owner}</span><span class="policy-badges">${statusTag(policy.status)}</span></span>
          <span class="policy-meta">${policy.product} #${policy.id}</span>
        </span>
      </button>`;
  }
  const selectable = policy.selectable !== false && !pending;
  const notEligible = !policy.fundSwitchEligible;
  return `
    <label class="policy-option ${notEligible ? 'ineligible' : ''} ${selectable ? '' : 'disabled'}">
      <input type="radio" name="policy" value="${policy.id}" ${state.policyId === policy.id ? 'checked' : ''} ${selectable ? '' : 'disabled'} />
      <span class="policy-card">
        <span class="policy-card-head"><span class="policy-name">${policy.owner}</span><span class="policy-badges">${statusTag(policy.status)}${pending ? statusTag('Request pending') : ''}</span></span>
        <span class="policy-meta">${policy.product} #${policy.id}</span>
      </span>
    </label>`;
}

function policyView() {
  const body = `
    <div class="policy-list">
      ${policies.filter((p) => p.selectable !== false || p.pendingRequest).map(policyOption).join('')}
      <p class="policy-group-title">Other Policies</p>
      ${policies.filter((p) => p.selectable === false && !p.pendingRequest).map(policyOption).join('')}
    </div>`;
  return flowLayout({ active: 1, title: 'Select Policy', description: 'Choose the policy you want to make fund switch for.', body, backAction: 'back-services', nextAction: 'to-funds', nextDisabled: !state.policyId });
}

function vulExploreView() {
  const requested = state.vulConsultationRequested;
  return `
    <section class="services-panel vul-explore" aria-labelledby="vul-title">
      <header class="vul-explore-hero">
        <span class="vul-explore-icon">${icon('trending_up')}</span>
        <div><p class="eyebrow">Investment-linked policies</p><h1 id="vul-title">Explore investment-linked policies</h1><p>Investment-linked policies can combine life protection with access to professionally managed investment funds.</p></div>
      </header>
      <div class="vul-explore-grid">
        <article><h2>Understand the option</h2><p>Learn how investment-linked policies work, including investment risk, policy charges, and the difference from a traditional protection-only policy.</p></article>
        <article><h2>Get tailored guidance</h2><p>A financial advisor can discuss whether an investment-linked policy may suit your goals, needs, and risk appetite.</p></article>
      </div>
      <div class="section-message ${requested ? 'section-message-success' : ''}">${icon(requested ? 'check_circle' : 'info')}<div><strong>${requested ? 'Consultation request recorded in this prototype' : 'No application has been started'}</strong><span>${requested ? 'A production journey would confirm the preferred contact details and obtain consent before an advisor follows up.' : 'Exploring this option does not change your policy or begin an application.'}</span></div></div>
      <footer class="vul-explore-actions"><button class="btn btn-secondary" type="button" data-action="back-to-policy-selection">Choose another policy</button><button class="btn btn-primary" type="button" data-action="request-vul-consultation" ${requested ? 'disabled' : ''}>${requested ? 'Consultation requested' : 'Talk to a financial advisor'}</button></footer>
    </section>`;
}

function fundOptions(kind) {
  const otherId = kind === 'source' ? state.targetId : state.sourceId;
  const eligibleFunds = kind === 'source' ? policyFunds() : availablePolicyFunds();
  return eligibleFunds
    .filter((fund) => fund.id !== otherId && (kind === 'source' ? fund.value > 0 : true))
    .map((fund) => ({ value: fund.id, label: fund.name, description: `${fund.type} | ${fund.risk}` }));
}

function sourceCard() {
  const source = selectedSource();
  const belowMinimum = source && !meetsMinimumSwitch();
  const minimum = minimumSwitchAmount();
  return `
    <section class="fund-card">
      <div class="fund-card-copy"><div class="eyebrow">SWITCH FROM</div><h2>${source ? source.name : 'Select a source fund'}</h2>
      ${source ? `<p>Current allocation: ${source.allocation}%</p><div class="fund-value">${money(source.value)}</div><p>Current fund value</p>` : '<p>Choose where your current fund will be switched from.</p>'}</div>
      ${selectField({ id: 'source-fund', label: 'Source fund', value: state.sourceId, placeholder: 'Choose a fund', options: fundOptions('source') })}
      <div class="fund-card-action">${belowMinimum ? `<div class="field-error" role="alert">${icon('error')}<span>This fund is below the ${money(minimum)} minimum switch amount.</span></div>` : ''}</div>
    </section>`;
}

function targetCard() {
  const target = selectedTarget();
  const disabled = !state.sourceId || !meetsMinimumSwitch();
  return `
    <section class="fund-card ${disabled ? 'disabled' : ''}">
      <div class="fund-card-copy"><div class="eyebrow">SWITCH TO</div><h2>${target ? target.name : 'Select a target fund'}</h2>
      ${target ? `<p>${target.type} · <span class="risk-label ${target.riskScore >= 7 ? 'aggressive' : ''}">${target.risk}</span></p><div class="fund-value">${money(target.value)}</div><p>Current fund value</p>` : '<p>Choose where your current fund will be switched.</p>'}</div>
      ${selectField({ id: 'target-fund', label: 'Target fund', value: state.targetId, placeholder: 'Choose a fund', options: fundOptions('target'), disabled })}
      <div class="fund-card-action">${state.fundCheck === 'checking' ? `<div class="fund-checking" role="status">${icon('progress_activity')}<span><strong>Checking fund requirements…</strong><small>Reviewing risk and suitability conditions</small></span></div>` : target ? '<button class="link-button" type="button" data-action="fund-details">View fund details</button>' : ''}</div>
    </section>`;
}

function currentPortfolio() {
  const policy = selectedPolicy();
  const currentFunds = policyFunds();
  const total = currentFunds.reduce((sum, fund) => sum + fund.value, 0);
  const investmentPolicy = investmentPolicies.find((item) => item.id === policy.id);
  return `
    <details class="investment-policy-card flow-portfolio-card">
      <summary class="flow-portfolio-summary">
        <span><strong>Elizabeth's Policy</strong><small>${policy.product} <span>#${policy.id}</span></small></span>
        <span class="portfolio-toggle"><span class="show-label">Show Fund Breakdown</span><span class="hide-label">Hide Fund Breakdown</span>${icon('expand_more')}</span>
      </summary>
      <div class="policy-overview"><div><span>Income Payout Option ${icon('help')}</span><strong>${investmentPolicy?.payout || 'Reinvestment'}</strong><small>AS OF ${(investmentPolicy?.asOf || 'Sep 03, 2026').toUpperCase()}</small></div><div><span>Fund Value ${icon('help')}</span><strong>${money(total, policy.currency)}</strong></div></div>
      <div class="investment-breakdown flow-investment-breakdown" role="table" aria-label="Current fund holdings">
        <div class="investment-fund-table-head" role="row"><span role="columnheader">Fund Name ${icon('help')} ${icon('north')}</span><span role="columnheader">NAVPU ${icon('help')}</span><span role="columnheader">Units ${icon('help')}</span><span role="columnheader">Allocation ${icon('help')}</span><span role="columnheader">Fund Value ${icon('help')}</span></div>
        ${currentFunds.map((fund) => `<div class="investment-fund-table-row ${fund.accent}" role="row"><span role="cell" class="investment-held-fund">${fund.name}</span><span role="cell" data-label="NAVPU">${fund.navpu}</span><span role="cell" data-label="Units">${fund.units}</span><span role="cell" data-label="Allocation">${fund.allocation}%</span><span role="cell" data-label="Fund Value" class="investment-fund-value"><strong>${money(fund.value, policy.currency)}</strong></span></div>`).join('')}
      </div>
    </details>`;
}

function riskTriggerBanner() {
  if (!requiresRiskAssessment() || state.fundCheck === 'checking') return '';
  if (state.ipsAccepted) return '';
  if (state.rpqComplete && !resultAligned()) {
    return sectionMessage({ type: 'warning', iconName: 'warning', title: 'Selected fund is not aligned', text: `${selectedTarget().name} has a higher risk level than your ${state.rpqResult} result. Review your answers or choose another fund.`, className: 'flow-message' });
  }
  return sectionMessage({ type: 'warning', iconName: 'warning', title: 'Risk profile update required', text: `${selectedTarget().name} (${selectedTarget().risk}) is more aggressive than ${selectedSource().name} (${selectedSource().risk}). Complete the RPQ and review your IPS before continuing.`, className: 'flow-message' });
}

function riskRequirementsPanel() {
  if (!requiresRiskAssessment() || state.fundCheck === 'checking') return '';
  const rpqDone = state.rpqComplete;
  const ipsDone = state.ipsAccepted;
  const allDone = rpqDone && ipsDone;
  if (allDone) {
    return `
      <section class="requirements-card requirements-picker complete-picker" aria-label="Completed suitability checks">
        <div class="requirements-grid">
          <article class="requirement-item complete">
            <div class="requirement-status"><span>Completed</span></div>
            <h3>Risk Profile Questionnaire</h3>
            <p>Assess your current investment profile for the selected target fund.</p>
            <button class="btn btn-secondary" type="button" data-action="to-risk-result">View Result</button>
          </article>
          <article class="requirement-item complete">
            <div class="requirement-status"><span>Completed</span></div>
            <h3>Investment Policy Statement</h3>
            <p>Review and acknowledge the investment policy information associated with your target fund.</p>
            <button class="btn btn-secondary" type="button" data-action="to-ips">Review IPS</button>
          </article>
        </div>
      </section>`;
  }
  return `
    <section class="requirements-card requirements-picker" aria-label="Required suitability checks">
      <div class="requirements-grid">
        <article class="requirement-item ${rpqDone ? 'complete' : ''}">
          <div class="requirement-status"><span>${rpqDone ? 'Completed' : 'Required'}</span></div>
          <h3>Risk Profile Questionnaire</h3>
          <p>Assess your current investment profile for the selected target fund.</p>
          <button class="btn btn-secondary" type="button" data-action="${rpqDone ? 'to-risk-result' : 'to-rpq'}">${rpqDone ? 'Review result' : 'Start Questionnaire'}</button>
        </article>
        <article class="requirement-item ${ipsDone ? 'complete' : ''} ${rpqDone ? '' : 'locked'}">
          <div class="requirement-status"><span>${ipsDone ? 'Completed' : 'Required'}</span></div>
          <h3>Investment Policy Statement</h3>
          <p>Review and acknowledge the investment policy information associated with your target fund.</p>
          <button class="btn btn-secondary" type="button" data-action="to-ips" ${rpqDone ? '' : 'disabled'}>${ipsDone ? 'Review completed IPS' : 'Review IPS'}</button>
        </article>
      </div>
    </section>`;
}

function switchSummary() {
  if (!state.sourceId || !state.targetId || !meetsMinimumSwitch() || !riskGateComplete() || state.fundCheck === 'checking') return '';
  return `
    <section class="switch-summary" aria-label="Fund switch summary">
      <div><span class="review-label">Switch From</span><strong>${selectedSource().name}</strong></div>
      ${icon('arrow_forward')}
      <div><span class="review-label">Switch To</span><strong>${selectedTarget().name}</strong></div>
      <div><span class="review-label">Amount To Switch</span><strong>${money(switchAmount())}</strong></div>
    </section>`;
}

function fundsView() {
  const body = `${currentPortfolio()}<p class="fund-rules-helper">${icon('info')}<span><strong>Fund switch requirements:</strong> ₱10,000 minimum for Peso funds or US$500 for Dollar funds. Target funds must use the same currency and be available for this product.</span></p><div class="switch-grid">${sourceCard()}<div class="switch-arrow" aria-hidden="true">${sharpIcon('arrow_forward')}</div>${targetCard()}</div>${riskTriggerBanner()}${riskRequirementsPanel()}${switchSummary()}`;
  const ready = state.sourceId && state.targetId && meetsMinimumSwitch() && riskGateComplete() && state.fundCheck !== 'checking';
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
      ${rpqQuestions.map((item) => `
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
    nextLabel: state.rpqSubmitting ? `${icon('progress_activity')} Submitting…` : 'Submit',
    nextDisabled: answered !== rpqQuestions.length || state.rpqSubmitting,
    focusMode: true,
    headerExtra: '<nav class="flow-breadcrumb" aria-label="Breadcrumb"><span>Fund Switch</span><span aria-hidden="true">/</span><span>Suitability check</span><span aria-hidden="true">/</span><strong aria-current="page">Questionnaire</strong></nav>',
  });
}

function reviewView() {
  const source = selectedSource();
  const target = selectedTarget();
  const policy = selectedPolicy();
  const body = `
    <section class="review-section" aria-labelledby="policy-details-title">
      <div class="review-section-header review-policy-header"><h3 id="policy-details-title">Policy details</h3></div>
      <dl class="review-detail-grid">
        <div><dt>Policy Owner</dt><dd>${policy.owner}</dd></div>
        <div><dt>Policy Number</dt><dd>#${policy.id}</dd></div>
      </dl>
    </section>
    <section class="review-card" aria-labelledby="switch-request-title">
      <div class="review-card-header review-card-edit-header"><h2 id="switch-request-title">Switch Fund Request</h2><button class="link-button" type="button" data-action="edit-funds">Edit</button></div>
      <div class="review-switch">
        <div><div class="review-label">Switch From</div><p class="review-data">${source.name}</p></div>
        ${icon('arrow_forward')}
        <div><div class="review-label">Switch To</div><p class="review-data">${target.name}</p></div>
        <div><div class="review-label">Amount To Switch</div><p class="review-data">${money(switchAmount())}</p></div>
      </div>
    </section>
    ${requiresRiskAssessment() ? `<div class="risk-review-row">${icon('verified_user')}<span><strong>Risk assessment complete</strong><br />RPQ result: ${state.rpqResult} · IPS acknowledged · ${target.name} aligned</span><button class="link-button" type="button" data-action="preview-ips">View IPS</button></div>` : ''}
    <section class="review-section review-document" aria-labelledby="fsaf-title">
      <div class="review-section-header review-document-label">
        <h3 id="fsaf-title">ATTACHED DOCUMENTS</h3>
      </div>
      <div class="review-document-body"><div class="review-document-file">${icon('check_circle')}<span><strong>Fund Switch Application Form (FSAF)</strong><small>fund_switch_application_form.pdf</small></span></div><button class="btn btn-secondary" type="button" data-action="preview-document">Preview FSAF</button></div>
    </section>
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
  const views = { services: servicesView, investments: investmentView, requests: requestsView, policy: policyView, funds: fundsView, rpq: rpqView, review: reviewView, success: successView, 'vul-explore': vulExploreView };
  app.innerHTML = views[state.screen]();
  document.querySelectorAll('.main-nav [data-nav]').forEach((button) => {
    const current = button.dataset.nav === state.activeNav;
    button.classList.toggle('active', current);
    button.toggleAttribute('aria-current', current);
  });
  document.title = `${state.screen === 'investments' ? 'Investments' : state.screen === 'services' ? 'Services' : state.screen === 'requests' ? 'My Requests' : state.screen === 'success' ? 'Request Submitted' : state.screen === 'vul-explore' ? 'Investment-linked policies' : 'Fund Switch'} — EastWest Ageas`;
  if (state.screen === 'investments') drawInvestmentCharts();
  if (focus) focusPage();
}

function drawInvestmentCharts() {
  const palette = { income: '#b31972', asian: '#0b9677', bond: '#21cbe1', balanced: '#ff9900', active: '#ff5c24', dividend: '#23458f', esg: '#7740a4', global: '#3f4852', reit: '#fa2b55', strategic: '#6683ff' };
  document.querySelectorAll('.fund-performance-chart').forEach((canvas, index) => {
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.floor(rect.width * ratio));
    canvas.height = Math.max(1, Math.floor(rect.height * ratio));
    ctx.scale(ratio, ratio);
    const width = rect.width;
    const height = rect.height;
    const seed = (index + 1) * 1.83;
    ctx.strokeStyle = palette[canvas.dataset.chart] || '#3a1971';
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    for (let step = 0; step <= 56; step += 1) {
      const x = (step / 56) * width;
      const movement = Math.sin(step * (.19 + (index % 3) * .02) + seed) * 13 + Math.sin(step * .61 + seed) * 5;
      const trend = (index % 4 === 0 ? step * .10 : -step * .23) + (index % 3 === 1 ? step * .38 : 0);
      const y = Math.min(height - 3, Math.max(3, height * .62 + movement - trend));
      if (step === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
  });
}

function calculateRiskResult() {
  const values = Object.values(state.rpqAnswers).map(Number);
  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  if (average <= 1.35) return 'Moderately Conservative';
  if (average <= 2.05) return 'Moderate';
  if (average <= 2.65) return 'Moderately Aggressive';
  return 'Aggressive';
}

function riskResultCopy(profile) {
  if (profile === 'Moderately Conservative') return 'Your answers indicate a preference for capital stability and limited market fluctuation.';
  if (profile === 'Moderate') return 'Your answers indicate comfort with some market fluctuation while balancing stability and growth.';
  if (profile === 'Moderately Aggressive') return 'Your answers indicate comfort with meaningful market fluctuation in pursuit of long-term growth.';
  return 'Your answers indicate comfort with significant market fluctuations in pursuit of long-term growth.';
}

function riskResultContent() {
  const aligned = resultAligned();
  const result = state.rpqResult;
  return `
    <section class="result-hero ${aligned ? '' : 'not-aligned'}">
      <span class="result-icon">${icon(aligned ? 'verified' : 'error')}</span>
      <div><h2>Your risk profile is ${result}</h2><p>${riskResultCopy(result)}</p></div>
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
    ${aligned ? '' : sectionMessage({ type: 'warning', iconName: 'warning', title: 'Choose a fund that matches your result', text: `${selectedTarget().name} is above the ${result} risk level. You can review your answers or return to the fund list.`, className: 'modal-message' })}`;
}

function openRiskResultModal() {
  const aligned = resultAligned();
  state.assessmentStage = 'result';
  if (state.screen !== 'rpq') { state.screen = 'rpq'; render({ focus: false }); }
  else render({ focus: false });
  dialogRoot.innerHTML = `
    <div class="modal-backdrop assessment-backdrop">
      <section class="modal assessment-modal" role="dialog" aria-modal="true" aria-labelledby="risk-result-title">
        <div class="modal-header"><div><h2 id="risk-result-title">Your risk profile result</h2><p>${aligned ? 'Review your updated profile below. Next, review and acknowledge your Investment Policy Statement.' : 'Review your updated profile and how it compares with your selected fund.'}</p></div><button class="icon-button" type="button" data-action="back-to-rpq" aria-label="Close result">${icon('close')}</button></div>
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
        <footer class="signature-actions"><button class="btn btn-secondary" type="button" data-action="cancel-signature">Cancel</button><button class="btn btn-primary" type="button" data-action="signature-next" ${signatureReady() && !state.submitting ? '' : 'disabled'}>${state.submitting ? `${icon('progress_activity')} Processing…` : 'Next'}</button></footer>
      </section>
    </div>`;
  setupSignaturePad();
}

function openSaveDraftModal() {
  if (!state.policyId) return;
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
  state.requestPolicyId = state.policyId;
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
    state.requestPolicyId = state.policyId;
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
  const details = fundDetails[fund.id] || {
    objective: `${fund.name} is an available ${fund.currency} fund for this policy product, subject to its stated risk classification.`,
    horizon: fund.riskScore >= 9 ? '5 years or more' : '3 - 5 years or more',
  };
  const category = details.category || fund.type;
  dialogRoot.innerHTML = `
    <div class="drawer-backdrop">
      <aside class="fund-drawer" role="dialog" aria-modal="true" aria-labelledby="fund-drawer-title" tabindex="-1">
        <header class="drawer-header">
          <button class="icon-button drawer-close" type="button" data-action="close-drawer" aria-label="Close fund details">${icon('close')}</button>
          <h2 id="fund-drawer-title">${fund.name}</h2>
          <div class="drawer-tags"><span>${fund.risk}</span><span>${category}</span></div>
          <p class="drawer-summary">${details.objective}</p>
        </header>
        <div class="drawer-content">
          <section class="fund-key-facts" aria-labelledby="fund-key-facts-title">
            <h3 id="fund-key-facts-title">At a glance</h3>
            <div class="fund-key-fact"><span>Risk level</span><strong>${fund.risk.replace(' Risk', '')}</strong></div>
            <div class="fund-key-fact"><span>Asset type</span><strong>${fund.type}</strong></div>
            <div class="fund-key-fact"><span>Recommended horizon</span><strong>${details.horizon}</strong></div>
          </section>
          <p class="drawer-disclaimer">Fund values may rise or fall. Past performance does not guarantee future results.</p>
          <a class="drawer-all-funds" href="investments.html" target="_blank" rel="noopener noreferrer">Explore all investment funds ${icon('open_in_new')}</a>
        </div>
        <footer class="drawer-footer"><button class="btn btn-primary" type="button" data-action="fund-factsheet">View fund factsheet</button></footer>
      </aside>
    </div>`;
  document.body.classList.add('drawer-open');
  dialogRoot.querySelector('.fund-drawer').focus({ preventScroll: true });
}

function factsheetFile(fund) {
  return {
    balanced: 'output/pdf/peso-balanced-fund-factsheet.pdf',
    bond: 'output/pdf/peso-bond-fund-factsheet.pdf',
    equity: 'output/pdf/peso-equity-fund-factsheet.pdf',
  }[fund.id];
}

function openFundFactsheet() {
  const fund = selectedTarget();
  const source = factsheetFile(fund);
  if (!source) return showToast('A factsheet is not available for this fund yet.');
  dialogRoot.insertAdjacentHTML('beforeend', `
    <div class="factsheet-backdrop" role="presentation">
      <section class="factsheet-modal" role="dialog" aria-modal="true" aria-labelledby="factsheet-title" tabindex="-1">
        <header class="factsheet-toolbar">
          <h2 id="factsheet-title">${fund.name} fact sheet</h2>
          <div class="factsheet-toolbar-actions">
            <span class="factsheet-page-count" aria-label="Page 1 of 1">Page <strong>1</strong> / 1</span>
            <a class="icon-button" href="${source}" target="_blank" rel="noopener noreferrer" aria-label="Open ${fund.name} fact sheet in a new tab">${icon('open_in_new')}</a>
            <button class="icon-button factsheet-close" type="button" data-action="close-factsheet" aria-label="Close fact sheet">${icon('close')}</button>
          </div>
        </header>
        <div class="factsheet-document"><iframe src="${source}#toolbar=0&navpanes=0" title="${fund.name} Fund Fact Sheet"></iframe></div>
      </section>
    </div>`);
  document.body.classList.add('factsheet-open');
  dialogRoot.querySelector('.factsheet-modal').focus({ preventScroll: true });
}

function closeFundFactsheet() {
  dialogRoot.querySelector('.factsheet-backdrop')?.remove();
  document.body.classList.remove('factsheet-open');
  dialogRoot.querySelector('.fund-drawer')?.focus({ preventScroll: true });
}

function closeModal() {
  dialogRoot.innerHTML = '';
  document.body.classList.remove('drawer-open', 'factsheet-open');
}

function openNonVulPolicyModal() {
  const policy = selectedPolicy();
  if (!policy || policy.fundSwitchEligible) return;
  dialogRoot.innerHTML = `
    <div class="modal-backdrop">
      <section class="modal eligibility-modal" role="dialog" aria-modal="true" aria-labelledby="eligibility-title" tabindex="-1">
        <div class="modal-header"><div class="eligibility-title"><span class="eligibility-icon">${icon('policy')}</span><h2 id="eligibility-title">Fund Switch isn’t available for this policy</h2></div><button class="icon-button" type="button" data-action="choose-another-policy" aria-label="Close and choose another policy">${icon('close')}</button></div>
        <p><strong>Dream Builder</strong> is a traditional life policy, so it doesn’t have investment funds to switch.</p>
        <div class="section-message eligibility-guidance"><span>${icon('lightbulb')}</span><div><span>You can explore VUL products without changing your current policy or starting an application.</span></div></div>
        <footer class="modal-actions"><button class="btn btn-secondary" type="button" data-action="close-non-vul-modal">Cancel</button><button class="btn btn-primary" type="button" data-action="explore-vul-policies">Explore VUL products</button></footer>
      </section>
    </div>`;
  dialogRoot.querySelector('.eligibility-modal').focus({ preventScroll: true });
}

function openPendingRequestModal(policyId) {
  const policy = policies.find((item) => item.id === policyId && item.pendingRequest);
  if (!policy) return;
  dialogRoot.innerHTML = `
    <div class="modal-backdrop">
      <section class="modal eligibility-modal" role="dialog" aria-modal="true" aria-labelledby="pending-request-title" tabindex="-1">
        <div class="modal-header"><div class="eligibility-title"><span class="eligibility-icon pending-request-icon">${icon('hourglass_bottom')}</span><h2 id="pending-request-title">Existing Fund Switch Request in Progress</h2></div><button class="icon-button" type="button" data-action="close-pending-request" aria-label="Close pending request notice">${icon('close')}</button></div>
        <p>A Fund Switch request for <strong>${policy.product} #${policy.id}</strong> is currently in progress. You can track its status in My Requests and submit a new request once processing is complete.</p>
        <footer class="modal-actions"><button class="btn btn-primary" type="button" data-action="close-pending-request">Got it</button></footer>
      </section>
    </div>`;
  dialogRoot.querySelector('.eligibility-modal').focus({ preventScroll: true });
}

function closeFundDrawer() {
  const backdrop = dialogRoot.querySelector('.drawer-backdrop');
  if (!backdrop) return closeModal();
  backdrop.classList.add('closing');
  window.setTimeout(closeModal, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 300);
}

function setSourceFund(value) {
  const changed = state.sourceId !== value;
  state.sourceId = value;
  if (changed) {
    state.targetId = '';
    resetSuitability();
  }
  render({ focus: false });
}

function setTargetFund(value) {
  clearTimeout(fundCheckTimer);
  const changed = state.targetId !== value;
  state.targetId = value;
  if (changed) {
    resetSuitability();
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
  if (target.name === 'policy') {
    state.policyId = target.value;
    state.sourceId = '';
    state.targetId = '';
    render({ focus: false });
  }
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
  if (nav) {
    state.activeNav = nav.dataset.nav;
    if (nav.dataset.nav === 'Investments') { state.screen = 'investments'; render(); return; }
    if (nav.dataset.nav === 'Services') { state.screen = 'services'; render(); return; }
    render({ focus: false });
    showToast(`${nav.dataset.nav} is outside this prototype.`);
    return;
  }

  const period = event.target.closest('[data-period]');
  if (period) { state.investmentPeriod = period.dataset.period; render({ focus: false }); return; }

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
  if (action === 'restart') { clearTimeout(submissionTimer); clearTimeout(rpqTimer); state.screen = 'services'; state.activeNav = 'Services'; closeModal(); render(); }
  if (action === 'start-policy-fund-switch') {
    state.policyId = control.dataset.policyId;
    state.sourceId = control.dataset.sourceId;
    state.targetId = '';
    resetSuitability();
    state.screen = 'funds';
    render();
  }
  if (action === 'toggle-policy-breakdown') { state.investmentExpandedPolicyId = state.investmentExpandedPolicyId === control.dataset.policyId ? '' : control.dataset.policyId; render({ focus: false }); }
  if (action === 'toolkit-info') showToast('This toolkit item is outside this Fund Switch demo.');
  if (action === 'risk-profile-info') showToast('Your current risk profile is Moderate.');
  if (action === 'back-services') { state.screen = 'services'; state.activeNav = 'Services'; render(); }
  if (action === 'open-policy-requests') { state.screen = 'requests'; render(); }
  if (action === 'toggle-request-details') { state.requestExpanded = !state.requestExpanded; render({ focus: false }); }
  if (action === 'resume-request') resumeSavedRequest();
  if (action === 'pending-policy-info') openPendingRequestModal(control.dataset.policyId);
  if (action === 'to-funds') {
    if (!selectedPolicy()?.fundSwitchEligible) return openNonVulPolicyModal();
    state.screen = 'funds';
    render();
  }
  if (action === 'close-pending-request') closeModal();
  if (action === 'choose-another-policy' || action === 'back-to-policy-selection') { state.policyId = ''; closeModal(); state.screen = 'policy'; state.activeNav = 'Services'; render(); }
  if (action === 'close-non-vul-modal') { closeModal(); }
  if (action === 'explore-vul-policies') { closeModal(); showToast('Destination to be confirmed.'); }
  if (action === 'request-vul-consultation') { state.vulConsultationRequested = true; render(); }
  if (action === 'back-policy') { state.screen = 'policy'; render(); }
  if (action === 'to-rpq') { state.screen = 'rpq'; state.assessmentStage = ''; render(); }
  if (action === 'to-risk-result') openRiskResultModal();
  if (action === 'complete-rpq') {
    state.rpqSubmitting = true;
    render({ focus: false });
    clearTimeout(rpqTimer);
    rpqTimer = window.setTimeout(() => {
      state.rpqSubmitting = false;
      state.rpqComplete = true;
      state.rpqResult = calculateRiskResult();
      state.ipsAccepted = false;
      openRiskResultModal();
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 250 : 900);
  }
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
  if (action === 'fund-factsheet') openFundFactsheet();
  if (action === 'close-factsheet') closeFundFactsheet();
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
  else if (event.key === 'Escape' && dialogRoot.querySelector('.factsheet-backdrop')) closeFundFactsheet();
  else if (event.key === 'Escape' && dialogRoot.querySelector('.drawer-backdrop')) closeFundDrawer();
  else if (event.key === 'Escape' && dialogRoot.innerHTML) closeModal();
});

render();
