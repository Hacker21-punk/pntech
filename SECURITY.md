# Security Policy

We take the security of PN Technologies' products and services seriously. This document outlines our security policies, how to report vulnerabilities, and guidelines for maintaining repository hygiene.

## 1. Reporting a Vulnerability

If you find a security bug or vulnerability in our website or serverless APIs, please **do not** open a public issue on GitHub. Instead, report it privately to our team.

- **Primary Contact:** [business@pntech.in](mailto:business@pntech.in)
- **Preferred Language:** English
- **Response Window:** We will acknowledge your report within 24 hours and provide a remediation plan within 3 business days.

## 2. Secure Development Guidelines for Collaborators

To keep this codebase extremely secure and maintain a 100% clean security audit record, all developers must adhere to the following rules:

### A. Secret Prevention (No Hardcoded Credentials)

- **NEVER** commit API keys, database credentials, SMTP passwords, or tokens to the repository.
- Always use local environment variable files (`env` or `.env`) which are explicitly ignored by `.gitignore`.
- In production, configure all environment variables directly in the Vercel Project Dashboard.
- If you accidentally commit a secret:
  1.  Immediately revoke and rotate the credential from the provider (e.g. Supabase, Resend, SMTP host).
  2.  Use `git-filter-repo` or `BFG Repo-Cleaner` to purge the secret from the repository's git history.

### B. HTTP & Link Security

- Always load external libraries via CDN using **Subresource Integrity (SRI)** with `integrity` and `crossorigin="anonymous"` attributes.
- Ensure all links targeted with `target="_blank"` include `rel="noopener noreferrer"` to prevent reverse-tabnabbing attacks.
- Always load iframe content (like YouTube videos) with a secure `sandbox` attribute (e.g., `sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"`).

### C. Input Sanitization

- Sanitize all user inputs before displaying them in the browser or sending them in email templates.
- Use the `escapeHtml` helper in both frontend and backend to block Cross-Site Scripting (XSS) and server-side HTML Injection.
- Always validate the `Origin` and `Referer` headers for sensitive API endpoints.

## 3. GitHub Repository Hardening Recommendations

To secure the repository on GitHub, administrators should manually enable the following settings in the repository dashboard:

1.  **Branch Protection Rules:**
    - Go to **Settings** → **Branches** → **Add rule**.
    - Protect the `main` branch.
    - Enable **Require a pull request before merging** and require at least 1 approval.
    - Enable **Require status checks to pass before merging** (once CI workflows are configured).
    - Enable **Block force pushes** and **Require signed commits**.
2.  **Secret Scanning & Dependabot:**
    - Go to **Settings** → **Code security and analysis**.
    - Enable **Dependabot alerts** and **Dependabot security updates**.
    - Enable **Secret scanning** and **Push protection** to automatically block commits containing exposed keys.
