# METRICS.md

## North Star Metric

The primary North Star metric for this product is:

**Completed audits resulting in qualified leads**

This metric best represents whether the tool is successfully helping users discover AI spending optimization opportunities while also generating meaningful business opportunities for Credex. Since the product is designed primarily as a lead-generation and conversion tool, completed audits are more valuable than simple page visits or signups.

---

## Supporting Metrics

### 1. Audit Completion Rate
Measures how many users who land on the site successfully complete the audit process.

Reason:
A low completion rate may indicate that the form is confusing, too long, or not providing enough trust to continue.

---

### 2. Lead Capture Conversion Rate
Measures how many users submit their email after viewing the audit results.

Reason:
This indicates whether users find the audit valuable enough to continue engaging with the platform.

---

### 3. Shareable Report Visits
Tracks how many visits come from shared audit result URLs.

Reason:
This measures the viral or referral potential of the product and whether users consider the results worth sharing.

---

## Initial Instrumentation

The first analytics events I would instrument are:
- Audit started
- Audit completed
- Email submitted
- Share link copied
- Consultation CTA clicked

These events would help identify where users drop off in the funnel.

---

## Pivot Trigger

If fewer than 10% of users complete the audit after landing on the page, I would revisit the onboarding flow and simplify the form experience.

If fewer than 5% of completed audits result in lead capture, I would reconsider whether the audit results provide enough perceived value.