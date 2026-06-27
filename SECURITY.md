# Security Policy

## Supported Versions

Security fixes are prepared for the latest published minor version once the package is publicly released.

## Reporting A Vulnerability

Do not open public issues for suspected vulnerabilities. Email the maintainer or use GitHub private vulnerability reporting if enabled for the repository.

Include:

- Affected package version or commit
- Reproduction steps
- Expected and actual behavior
- Impact assessment

## Dependency Review

Run:

```bash
npm audit
npm audit --omit=dev
```

Dev-tooling advisories should be evaluated separately from runtime package exposure.
