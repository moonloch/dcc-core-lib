---
name: pr
description: Create or update a pull request for dcc-core-lib. Handles branch verify, copyright check, regression tests, CHANGELOG, checks, docs, downstream check against the DCC system, simplify, commit, push, create/update PR, review, auto-fix. No version bump — that happens in a release PR (the `/release` skill).
---

# dcc-core-lib PR Workflow

Execute each step below sequentially using your tools directly. Run everything
in the main context except for Step 13 (review).

If arguments are provided, treat them as the base branch (default: `main`).

**This repo is pnpm-only.** Every command below is `pnpm run ...` or `pnpm
exec ...`; never `npm`.

## Step 1: Branch Verification

Run `git branch --show-current` to get the current branch name.

- If on `main`: **STOP** and tell the user to create/checkout a feature branch.
- Otherwise, confirm the branch and proceed.

Tim does his own git work in this checkout, so re-verify `git status` right
before any branch operation and stop if the tree is mid-merge or mid-rebase.

## Step 2: Version Bump — NOT in the PR

Do **NOT** change `version` in `package.json` in a feature PR. Versions are
bumped in a dedicated `chore: release X.Y.Z` PR (the `/release` skill), which
also moves the CHANGELOG notes under the new version heading.

If the diff already touches `package.json`'s `version`, revert that change
before committing and mention it in the final summary. (Dependency changes to
`package.json` are fine.)

## Step 3: Copyright Separation Check

This library contains **logic only — no Goodman Games data or text** (see
CLAUDE.md and CONTRIBUTING.md, "Copyright separation"). Scan the diff
(`git diff main...HEAD` plus uncommitted changes) for the red flags:

- `Record`s keyed by level, `switch` statements on `classId`, or class-named
  constants (`WARRIOR_*`, `THIEF_*`, …) that encode rulebook values.
- Table entries (crit, fumble, corruption, disapproval, occupations, augurs,
  patron taints, spell results, progressions) copied from the rulebook.
- Rulebook text anywhere: code, comments, test names, fixtures, commit
  messages, the PR body. Citing a table number or page (`Table 4-6, p. 98`)
  is fine; quoting or close paraphrase is not.
- Values copied from `../dcc-official-data` or the `dcc-core-book` module.

Tests must use synthetic data (e.g. class ID `"test-fighter"`, inline minimal
tables). Fan-made sample data must be labeled as such.

If anything trips this check: **STOP** and report. Do not "fix" it by
rewording — the value or text has to come out and be read from a registry.

## Step 4: Regression Tests

CONTRIBUTING.md requires every fix to ship a regression test that **fails on
`main`** and passes on the branch.

1. Identify the behavior the diff changes and the test(s) covering it.
2. Prove the new test fails without the fix: temporarily restore the `main`
   version of the changed source file(s), run only the relevant test file,
   confirm the new test fails for the expected reason, then restore the
   branch version.
   ```bash
   git stash push <src files> -q          # or: git show main:<file> > <file>
   pnpm exec vitest run src/path/to/file.test.ts
   git stash pop -q                       # or: git checkout -- <file>
   ```
   Double-check with `git diff` afterwards that the branch version is back.
3. Grep for other tests still asserting the old behavior and update them.

For a feature (not a fix), make sure the new behavior has tests. If you
concluded no test was needed, say so in the summary and why.

## Step 5: CHANGELOG

Every user-visible change gets an entry under `## [Unreleased]` in
`CHANGELOG.md` (Keep a Changelog sections: `Added`, `Changed`, `Fixed`,
`Removed`, …). Match the existing style: a bold one-line summary, then a short
explanation naming the affected functions, citing table/page only.

- Breaking API changes go under `### Changed` with a **`BREAKING:`** prefix
  and describe the migration.
- Pure tooling, CI, or internal refactors with no API or behavior change
  don't need an entry.

## Step 6: Pre-Flight Checks

Run what CI runs:

```bash
pnpm run check        # lint + typecheck + tests
pnpm run build        # tsc + bundled dist/dcc-core-lib.d.ts
pnpm run docs:check   # regenerates docs/api and fails if it changed
```

- If `docs:check` fails only because `docs/api/` is stale, the regenerated
  files are already written: review the diff (it should only reflect the
  doc comments and signatures you changed, plus line-number shifts) and
  include it in the commit. Never hand-edit `docs/api/`.
- If anything else **fails**: **STOP** and report the failures clearly.

## Step 7: Code Simplification

1. Run `git diff --stat` to identify modified files.
2. Review the changed code for:
   - Unnecessary complexity, duplicate logic, poor naming
   - Anything that isn't a pure function (side effects, mutation of inputs,
     hidden state, `Math.random` instead of an injected roller)
   - Classes or objects with behavior — the library is functional only
   - Comments that no longer match the code (doc comments feed `docs/api/`)
   - New public exports missing from the module's `index.ts` / `src/index.ts`
3. Make simplifications that improve clarity without changing behavior.
4. After simplification, re-run Step 6. If checks fail, revert those changes.

## Step 8: Documentation Update

Update the docs the diff actually invalidates:

| Change | Doc |
|---|---|
| Any public signature or doc comment | `docs/api/` (regenerate with `pnpm run docs:api`) |
| Data formats, registries, `register*` functions | `docs/DATA.md` |
| Roll modifiers / `LegacyRollModifier` migration | `docs/MODIFIERS.md` |
| Event callbacks | `docs/EVENTS.md` |
| Module layout, architecture | `docs/ARCHITECTURE.md`, CLAUDE.md "Architecture" |
| New module or doc page | `llms.txt`, `README.md` |
| Contribution or release process | `CONTRIBUTING.md` |
| New rule for how Claude works in this repo | `CLAUDE.md` |

Include the doc updates in the same PR.

## Step 9: Downstream Check (DCC system)

The FoundryVTT DCC system vendors this library's `dist/` at
`module/vendor/dcc-core-lib/`. The local checkout is at
`/Users/timlwhite/FoundryVTT-Next/Data/systems/dcc`.

For every export renamed, removed, or changed in signature or meaning by the
diff, grep the system's own code (not the vendored copy):

```bash
grep -rn "<name>" /Users/timlwhite/FoundryVTT-Next/Data/systems/dcc/module \
  --include='*.js' --include='*.mjs' | grep -v vendor/dcc-core-lib
```

- **Breaking change with system usages**: the PR title gets `!`
  (e.g. `fix(spells)!: ...`) and the PR body lists the call sites and the
  migration. Do not edit the system repo from this skill.
- **Fix the system is waiting on**: link the system issue or PR
  (`foundryvtt-dcc/dcc#123`) and note any temporary adapter workaround the
  vendor sync should remove.

Never stop the PR over a downstream breakage — report it. The system picks up
the change only when someone runs its `/sync-core-lib`.

## Step 10: Atomic Commit Creation

1. Run `git status` and `git diff` to see all changes. Make sure no scratch
   files are in the repo (use the session scratchpad for those).
2. Group changes into logical, atomic commits following Conventional Commits
   with the module as scope (`fix(spells): ...`, `feat(combat): ...`,
   `docs(readme): ...`, `chore: ...`; see CONTRIBUTING.md). Mark breaking API
   changes with `!`.
3. Stage with `git add <specific files>` — avoid `git add -A`.
4. End each commit message with **the attribution lines supplied for the
   current session** (the `Co-Authored-By:` / `Claude-Session:` lines from
   the session's attribution system-reminder). Do not hardcode a model
   version here — it goes stale every release.

## Step 11: Push Changes

```bash
git push -u origin $(git branch --show-current)
```

The pre-push hook runs `pnpm run check`; a hook failure means Step 6 was
skipped or something changed since — fix it, don't bypass with `--no-verify`.

If push is rejected due to conflicts, **STOP** and report to user.

## Step 12: PR Creation or Update

1. Check if a PR already exists: `gh pr view --json number,title,url 2>/dev/null`
2. **If NO existing PR**: Create one with `gh pr create --base <base>`:
   - Conventional-commit title (under 70 chars), same style as the commits
   - Body sections:
     - `## Summary` — what was wrong / what's new, and why. Cite table/page
       only. `Fixes #N` for a lib issue.
     - `## Tests` — the regression test, and that it fails on `main`;
       `pnpm run check` result (test count)
     - `## Follow-up` (if any) — vendor sync needed in foundryvtt-dcc/dcc,
       system issue/PR links, workarounds to drop, breaking-change migration
   - End the body with the session's PR attribution lines
   - Do not prompt the user to accept the PR description
3. **If PR EXISTS**: Update it with `gh pr edit --title "..." --body "..."`:
   - Always regenerate title and description from the current diff
   - Never preserve stale descriptions
4. Use `git diff <base>...HEAD` to understand the full scope of changes for
   the PR description.

## Step 13: Automated PR Review

Run the `code-review` skill against the PR number (Skill tool,
`skill: "code-review"`, `args: "<PR number>"`). It runs in the background;
wait for its completion notification — don't poll or start Step 14 early.

Verify each finding against the source yourself before acting on it, and
categorize as: Critical, High, Medium, Low. A finding that is pre-existing
(present on `main` too) is at most Medium unless the PR makes it worse.

## Step 14: Auto-Fix High-Priority Issues

Fix the findings categorized **Critical** or **High** in Step 13. For each:

1. Implement the fix directly (read the file, edit it).
2. Re-run Step 6 (and regenerate `docs/api/` if doc comments changed).
3. If the fix breaks checks, revert it and report instead.
4. Create a new atomic commit for the fixes, push it, and update the PR body
   if it no longer matches.

**Escalation**: If more than 3 issues need fixing, confirm with the user
before proceeding.

If a fix is complex or risky, **report it** instead of implementing it. Leave
Medium/Low findings for the summary.

## Step 15: Final Summary

Output a structured summary:

```
[PR SUMMARY]
PR URL: <url>
Version: unchanged (bump happens in the release PR)
Copyright check: clean / <issues>
Regression test: <name> — fails on main: yes/no
CHANGELOG: <entry added under Unreleased / not needed (why)>
Checks: check ✓ build ✓ docs:check ✓ (<n> tests)
Commits: <count> (<original> original + <fix> fixes)
Issues fixed: <count>
Remaining: <count> (manual review suggested)
DCC system: <no usages affected / call sites listed / vendor sync needed>
Status: Ready for review / Needs attention
```

## Escalation Criteria

**STOP and report** (do not proceed automatically) when:
- On `main`, or the tree is mid-merge/mid-rebase
- The copyright separation check finds rulebook data or text
- Pre-flight checks fail
- A fix has no regression test that fails on `main` and one can't be written
- Push is rejected due to conflicts
- PR creation fails
- Critical issues found that are too complex to auto-fix
- More than 3 high-priority issues need fixing

## Edge Cases

- **No changes to commit**: Report this and ask if user wants to proceed.
- **Branch behind `main`**: Offer to rebase first.
- **PR already exists**: Update title AND description to match current changes.
- **Review finds no issues**: Report clean PR.
- **Auto-fixes fail checks**: Revert them and report the issue.
- **Merging**: this skill never merges. Merging is the user's call (or the
  `/release` skill's).
