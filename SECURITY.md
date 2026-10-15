# Security policy

## Supported versions

Only the latest GitHub release of `@moonloch/dcc-core-lib` receives fixes.

## Reporting a vulnerability

Report privately through GitHub's security advisories:
[Report a vulnerability](https://github.com/moonloch/dcc-core-lib/security/advisories/new).
Do not open a public issue. You should hear back within two weeks.

## Scope

This is a pure-function game-logic library with no runtime dependencies, no
I/O, no network access and no privileged operations. In scope:

- Untrusted input to a parser or loader (`parsePurpleSorcerer`,
  `parseStatBlock`, `loadTableFromJson`, the `load*` / `parse*` functions in
  `src/data/loaders/`) causing unbounded CPU or memory use, prototype
  pollution, or similar.
- Supply-chain problems in the published package or its build
  (`dist/` contents, GitHub Actions workflows).

Out of scope: rules disagreements (file a normal issue), and issues in the
consuming application (for the DCC FoundryVTT system, use
<https://github.com/foundryvtt-dcc/dcc>).
