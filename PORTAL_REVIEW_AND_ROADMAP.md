# Nexus Family Office Portal — Review & Roadmap

## 1. Current State Review

### AJ’s Nexus portal status
- MVP Next.js app built with React and Tailwind.
- App routes present for core family office views: `dashboard`, `cashflow`, `children`, `retirement`, `insights`, `spending`, and `import`.
- Reusable UI components organized under `app/components/` for cards, charts, tables, and sidebar navigation.
- Current data is static/mock via `lib/mockData.ts` and a simple transaction/ledger model in `lib/transactionEngine.ts` and `lib/transactionModel.ts`.

### What is available now
- Family financial snapshot with spending, merchant, trend, retirement, and children fund views.
- Clean UI scaffolding ready for UAE-specific cashflow flows and family office planning.
- A base to build AJ’s paid-income hub, wealth engine, and lifestyle spending controls.

### Primary constraints
- No authentication, family security, or private access model today.
- No persistent Supabase/PostgreSQL backing store yet.
- No formal budget engine, recurring fund planning, or lifecycle alerts.
- No secure transaction ingestion or import workflow in production.
- No UAE-specific financial constructs or Shariah compliance guardrails.

## 2. Target Vision

AJ’s Nexus Family Office portal is the UAE family CFO cockpit for household wealth, recurring commitments, and future capital planning.

### Vision statements
- Make the family’s financial picture visible and actionable for wealth planning, cashflow, and school/retirement commitments.
- Manage UAE priorities: rent sinking fund, school fee sinking fund, lifestyle account, income hub, emergency reserve, credit card payoff tracking, and a wealth engine.
- Enforce security-first access, authenticated data storage, and governance before any real statement upload.
- Support Shariah-compliant investment governance across the family portfolio.

### Target outcomes
- One trusted view of liquidity, spending, budget health, and goal funding progress.
- Clear tracking of Lifestyle Burn Rate, cash runway, and spare daily spend.
- Practical insights for UAE family spending patterns and capital funding.
- No real bank statements uploaded until Supabase auth, RLS, and private storage are implemented.

## 3. Core Modules

### 3.1 Dashboard
- Family summary cards: net worth, Lifestyle Burn Rate, cash runway, budget variance, goal health.
- Snapshot of rent sinking fund, school fee sinking fund, lifestyle account, emergency reserve, credit card payoff progress, and income hub status.
- Action panel for manual entry, secure import, and reconciliation.
- Budget Within Month metrics: days elapsed, daily allowed spend, actual daily burn, projected month-end overspend, and remaining safe-to-spend.

### 3.2 Budget Engine
- Monthly budget management with UAE-specific lifestyle and sinking fund categories.
- Budget Within Month capability for daily allowed spend and projected month-end outcomes.
- Support rent sinking fund, school fee sinking fund, lifestyle account, income hub, emergency reserve, and credit card payoff tracking.
- Monthly, quarterly, and annual cycles with rollovers and spend caps.

### 3.3 Transaction Engine
- Manual transaction entry first, with secure CSV import later.
- Transaction categorization, tagging, matching, and reconciliation.
- Duplicate detection and a review queue for ambiguous items.

### 3.4 Manual Entry
- Manual entry is a Sprint 1 priority.
- Record income, expense, transfer, contribution, and adjustment entries.
- Support family member attribution, account pairing, categories, and fund assignment.
- Ensure entries feed directly into budget and goal tracking.

### 3.5 CSV Import
- CSV upload is deferred until authentication, Supabase security, and private storage are in place.
- Later support bank CSVs, investment exports, and ledger uploads with mapping, validation, and duplicate resolution.
- No real bank statements uploaded until authentication, Supabase RLS, and private storage are implemented.

### 3.6 Retirement Portfolio
- Track retirement account balances, contribution schedules, and portfolio allocation.
- Present funding progress against retirement goals and projected gaps.
- Apply Shariah governance for permitted retirement investments.

### 3.7 Children Capital Fund
- One combined children capital fund separate from retirement.
- Notionally split equally across 3 children for planning and reporting.
- Track contributions, projected funding, and combined fund health.
- Support multi-child planning without siloed individual child accounts.

### 3.8 Insights & AI CFO
- Rules-based alerts for overspend, low runway, and fund shortfalls.
- Forecasting, scenario planning, and daily burn insights.
- Future AI CFO capabilities for proactive recommendations and natural-language guidance.

## 4. Security Layer

### Required capabilities
- Authentication: secure login with Supabase auth or SSO.
- Authorization: family roles for admin, advisor, viewer, and read-only family members.
- Session management, MFA, and audit logging.
- Data encryption in transit and at rest.

### Practical controls
- Supabase Row-Level Security (RLS) for per-family tenant isolation.
- Private storage for uploaded files and import artifacts.
- No real bank statements uploaded until auth, RLS, and private storage are built.
- Secure API layer for connectors and external sources.

## 5. Data Architecture

### Logical domains
- `family`: household entity, members, roles, and shared UAE settings.
- `account`: bank, credit card, investment, cash, liability, lifestyle account, income hub.
- `transaction`: raw record, normalized entry, category, status, source.
- `budget`: plan, allocation, cycle, actuals, variance, Budget Within Month metrics.
- `goal`: retirement, children capital fund, rent fund, school fund, emergency reserve, credit card payoff.
- `portfolio`: holdings, asset class, performance, Shariah compliance flags.
- `import_job`: CSV imports, status, errors, reconciliation.

### Data flow
1. Ingestion: manual entry first, CSV import later, connector feeds after secure auth.
2. Normalization: category assignment, account linking, fund attribution.
3. Processing: budget application, goal attribution, burn-rate and runway refresh.
4. Presentation: dashboard, spending intelligence, and insight summaries.

### Persistence strategy
- Target Supabase/PostgreSQL as the core database.
- Model transactions as append-only events with editable metadata and status.
- Keep budgets, goals, and fund snapshots as structured monthly records.
- Maintain an audit store for manual edits, imports, and security events.

## 6. Budget Engine Requirements

### Core functions
- Define budgets by category, family member, account, and sinking fund.
- Support monthly Budget Within Month monitoring with days elapsed, allowed spend, actual burn, projected overspend, and remaining safe-to-spend.
- Track rent sinking fund, school fee sinking fund, lifestyle account, income hub, emergency reserve, and credit card payoff progress.
- Track actual spend in real time and compute variance.
- Allow budget rollovers, spend caps, and sink fund top-ups.

### UI requirements
- Budget planner with category tree, fund buckets, targets, actuals, and progress bars.
- Daily and monthly spend forecast for UAE household cashflows.
- Alerts for budget overshoot, category depletion, and credit card drift.
- Editable templates for recurring UAE family commitments.

### Integration points
- Transaction engine to assign actuals and reconciliation matches.
- Manual entry to record planned and unplanned transactions.
- Dashboard to show Lifestyle Burn Rate and Budget Within Month health.

## 7. Transaction Engine Requirements

### Ingestion
- Accept manual entries in Sprint 1, secure CSV uploads only after auth/security.
- Normalize payee names, dates, amounts, account links, and fund attributes.
- Support credits, debits, transfers, fees, and investment contributions.

### Enrichment
- Apply category rules, tags, and Shariah compliance flags.
- Support rule editing and future AI-assisted classification.
- Detect duplicates, splits, and suspicious import anomalies.

### Reconciliation
- Mark transactions as reconciled, pending, or flagged.
- Match imported entries to existing ledger transactions.
- Provide a review queue for ambiguous or unmatched items.

### Data quality
- Preserve raw source values and normalized records.
- Maintain import metadata and provenance.
- Enable audit/revert for imported or auto-classified updates.

## 8. Manual Entry Requirements

### Entry types
- Income
- Expense
- Transfer
- Contribution
- Adjustment
- Allocation journal entry

### Form requirements
- Category and payee selection.
- Account pairing for transfers and fund allocations.
- Date, amount, recurrence, and UAE context fields.
- Notes, tags, family member attribution, and fund assignment.

### Validation and workflow
- Prevent invalid account or fund combinations.
- Provide confirm/reconcile step before saving.
- Support editing and soft-delete of manual entries.
- Feed entries directly into budgets, cashflow, and goal engines.

## 9. CSV Import Requirements

### Supported workflows
- Bank transaction CSVs from UAE and international providers.
- Investment/export CSVs for holdings and contributions.
- Budget or ledger export CSVs for manual upload.

### Import experience
- Field mapping UI with preview and validation.
- Duplicate detection and conflict resolution.
- Validation of dates, amounts, and required fields.
- Save import settings as templates for repeat workflows.

### Post-import handling
- Show import summary, errors, and review status.
- Add imported transactions to reconciliation queue.
- Allow bulk category assignment and matching.
- Retain source metadata for audit.

## 10. Retirement Portfolio Requirements

### Portfolio tracking
- Track retirement account balances, contributions, and performance.
- Support multiple retirement accounts and permitted investment vehicles.
- Show asset allocation, returns, and Shariah compliance status.

### Goal tracking
- Retirement target definition with assumptions and gap analysis.
- Progress against savings target and projected funding trajectory.
- Scenario view for contribution changes and horizon shifts.

### Reporting
- Show contribution pacing vs required run rate.
- Highlight Shariah-compliant allocations and permissible instruments.
- Provide advice on rebalancing within AJ’s family office ethical rules.

## 11. Children Capital Fund Requirements

### Fund management
- One combined children capital fund separate from retirement.
- Notionally split equally across 3 children for planning and reporting.
- Track contributions, projected funding, and combined fund health.
- Support multi-child planning without siloed individual child accounts.

### Progress & planning
- Show percent funded, monthly required contribution, and gap.
- Project fund value based on contribution schedule and assumptions.
- Flag underfunded or delayed savings plans.

### Family controls
- Attribute contributions to payer and beneficiary.
- Allow parent/advisor review and approval of child fund plans.
- Include notes and milestone tracking for upcoming children costs.

## 12. Shariah-Compliant Governance

### Investment rules
- No interest-bearing bonds.
- No margin or leverage.
- Only Shariah-compliant ETFs and stocks allowed.
- Track allowable gold and crypto allocation explicitly.

### Governance controls
- Enforce investment filters in portfolio tracking.
- Flag non-compliant instruments and provide alternatives.
- Document permitted and restricted asset classes for AJ’s family office.

## 13. AI CFO Future Capabilities

### Strategic value
- Turn the portal from reporting to proactive advisory.
- Use AI to identify spending risks, opportunity allocations, and goal actions.

### Candidate features
- Transaction classification suggestions and category rule generation.
- Automated budget recommendations and reforecasting.
- Natural-language insights summarizing cash runway and Lifestyle Burn Rate.
- Scenario analysis: “What if we increase the rent sinking fund by 10%?”
- Alert synthesis for low runway, overspending, and fund drift.

### Execution guidelines
- Build deterministic, rules-based insights before adding AI.
- Keep AI-generated recommendations reviewable and auditable.
- Include source data and conservative caveats in every AI insight.

## 14. Technical Debt / Housekeeping Items

### Immediate cleanup
- Consolidate shared layout and navigation styles.
- Standardize component naming and folder conventions.
- Replace static mock model with a clear data contract.

### Architecture debt
- Add a formal data model for family, account, transaction, budget, goal, and portfolio entities.
- Remove duplicated chart/table logic and centralize shared helper utilities.
- Add test coverage for budget and transaction engines.

### Operational debt
- Enforce development governance: no Copilot package installs without approval, commit before major changes, local build before push, architecture review before each sprint.
- Add linting and formatting enforcement.
- Add structured issue tracking for import/validation errors.
- Add documentation for the data model and module boundaries.

## 15. Sprint Roadmap

### Sprint 1: Housekeeping and manual-first foundation
- Consolidate UI layout, component conventions, and data contract.
- Define Supabase/PostgreSQL data model and local mock persistence.
- Build manual transaction entry and assignment to budgets, funds, and accounts.
- Implement Budget Within Month metrics and local state/mock persistence.
- Add Lifestyle Burn Rate as a core KPI.

### Sprint 2: Supabase auth and database
- Add Supabase authentication, family roles, and session security.
- Migrate mock data to Supabase/PostgreSQL schema.
- Enable simple authenticated family access and secure data isolation.
- Harden rules so no real statement upload occurs before private storage and RLS are in place.

### Sprint 3: Secure transaction storage and CSV import
- Store transactions securely in Supabase with audit metadata.
- Add CSV import pipeline after auth and secure storage are validated.
- Implement import mapping, validation, duplicate detection, and reconciliation queue.
- Ensure upload artifacts are held in private storage and tied to authenticated families.

### Sprint 4: Spending intelligence and alerts
- Add Budget Within Month alerts, overspend forecasting, and safe-to-spend indicators.
- Build Lifestyle Burn Rate reporting, credit card payoff tracking, and spending intelligence dashboards.
- Add alert rules for rent fund, school fund, emergency reserve, and credit card trends.

### Sprint 5: Retirement and children fund engines
- Launch retirement portfolio tracking with Shariah compliance controls.
- Launch combined children capital fund with equal notional split for 3 children.
- Connect retirement and children fund flows to budgets and transaction engine.
- Add progress cards and funding gap analytics on the dashboard.

### Sprint 6: AI CFO insights
- Deliver rule-based intelligence and insight summaries.
- Add AI-assisted transaction classification and budget suggestion drafts.
- Build scenario planning for rent, lifestyle, and children fund outcomes.
- Prepare the product for future AI CFO advisory capabilities.
