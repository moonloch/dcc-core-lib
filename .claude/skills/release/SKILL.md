---
name: release
description: Release a new version of dcc-core-lib — release PR (version bump + CHANGELOG), merge, wait for the draft GitHub release, edit its notes, hand the draft to the maintainer
---

# Release Process for dcc-core-lib

How releases work here (see `.github/workflows/release.yml` and
CONTRIBUTING.md, "How a fix reaches the DCC system"):

- On every push to `main`, the `Create Release` workflow runs checks, builds,
  and creates a **draft** GitHub release `v<package.json version>` if none
  exists for that version.
- If that release already exists, the workflow opens an automatic
  `release/bump-vX.Y.Z` PR that bumps the **patch** version instead.
- **Publishing** the draft triggers `Publish to GitHub Packages`. That is the
  maintainer's call, never this skill's.

So a release is: a `chore: release X.Y.Z` PR that bumps `package.json` and
moves the CHANGELOG notes, merged to `main`, which creates the draft.

If arguments are provided, treat them as the version to release (e.g.
`0.16.0`) or a bump level (`patch`, `minor`, `major`).

## 1. Merge the feature PR (if one is given)

If the user named a feature PR to ship (or the current branch has one), merge
it first:

- Verify it is `OPEN` and `MERGEABLE` and CI passed
  (`gh pr view <N> --json state,mergeable`, `gh pr checks <N> --watch`).
- **Squash-merge** — the history is one squashed commit per PR:
  ```bash
  gh pr merge <N> --squash --delete-branch
  ```

If there's no feature PR (releasing what's already on `main`), skip this.

## 2. Gather what's unreleased

```bash
git checkout main && git pull
gh release list -L 3                      # latest tag, and whether it's a draft
git log <latest tag>..HEAD --oneline
```

- If the latest release is still a **draft**, stop and ask — the maintainer
  may not have published it yet, and a new release would stack on top.
- Read `## [Unreleased]` in `CHANGELOG.md`. Every user-visible change in the
  log should have an entry. For a merged PR that's missing one, write it now
  (same style as the existing entries: bold summary, short explanation,
  table/page citations only — no rulebook text). Skip tooling, CI, deps,
  docs-only and `chore:` commits.

## 3. Pick the version

The library is pre-1.0 semver:

- Any **`BREAKING:`** entry, or a `!` commit since the last tag → bump
  **minor** (`0.15.0` → `0.16.0`).
- Otherwise → bump **patch** (`0.15.0` → `0.15.1`).

Use the version the user gave if they gave one. State the choice and the
reason (e.g. "minor: #27 changes `rollCounterspellPower`'s third parameter").

## 4. Release PR

```bash
git checkout -b release/v<version>
pnpm pkg set version=<version>
```

In `CHANGELOG.md`, insert `## [<version>] - <YYYY-MM-DD>` (today's date) right
below `## [Unreleased]`, leaving `## [Unreleased]` empty above it.

Run `pnpm run check` and `pnpm run build`, then commit only `package.json`
and `CHANGELOG.md`:

```
chore: release <version>
```

ending with the session's attribution lines. Push and open the PR with
`gh pr create --base main --title "chore: release <version>"`. Body, in the
style of #22:

- One line: what the PR does (bumps `package.json`, moves the Unreleased
  notes under `[<version>] - <date>`)
- Why minor vs. patch, listing the breaking changes if minor
- `Included:` — one bullet per PR (`#N short description`), grouping tooling
- If an automatic `release/bump-v*` PR is open, say this release supersedes it
- That merging creates the draft release `v<version>`, and publishing that
  draft publishes the package
- The session's PR attribution lines

## 5. Merge the release PR

Wait for CI (`gh pr checks <N> --watch`), then squash-merge it:

```bash
gh pr merge <N> --squash --delete-branch
git checkout main && git pull
```

Then close any open automatic bump PR it supersedes (the `release/bump-v*`
PR from Step 4), with a comment:

```bash
gh pr list --state open --search "head:release/bump-v"
gh pr close <M> --delete-branch --comment "Superseded by #<N> (release <version>)."
```

## 6. Wait for the draft release

```bash
gh run list --workflow "Create Release" --limit 3
gh run watch <run id> --exit-status
gh release view v<version> --json isDraft,body
```

The workflow creates the draft `v<version>` with GitHub's generated notes. If
it fails, check `gh run view <run id> --log-failed` and report.

## 7. Edit the release notes

Keep GitHub's generated `## What's Changed` list (it credits contributors and
links each PR), and put a short header above it — as in v0.15.0:

```
**Breaking:** `rollCounterspellPower`'s third parameter is now a signed momentum modifier. See CHANGELOG.md.

Fixes spell duel momentum on a Phlogiston Disturbance (#30), ...

## What's Changed
* ...
```

- Lead with a **`Breaking:`** line naming each breaking API change and
  pointing to `CHANGELOG.md`, if there are any.
- Then one terse line of plain-English highlights, if useful.
- No rulebook text.

```bash
gh release edit v<version> --notes-file <file in the session scratchpad>
```

## 8. Hand off the draft — do NOT publish

The release stays a **draft**. Tell the maintainer that draft `v<version>` is
ready, with a link (`gh release view v<version> --json url -q .url`).

Publishing fires `Publish to GitHub Packages`, which pushes the version to the
registry — that's the maintainer's call. Only publish if the maintainer
**explicitly tells you to in this session**:

```bash
# ONLY when explicitly instructed by the maintainer:
gh release edit v<version> --draft=false --latest
```

## 9. Remind about the vendor sync

The DCC system doesn't install the package; it vendors `dist/`. Remind the
maintainer that foundryvtt-dcc/dcc picks up this release only when someone
runs its `/sync-core-lib` skill (commit message
`vendor: sync dcc-core-lib to <version> (<sha>)`), and list any system issues
or temporary adapter workarounds the released fixes resolve. Don't run the
sync from this repo.

## Important

- Never publish/promote a release unless the maintainer explicitly says to.
- Never push directly to `main`; the version bump always goes through the
  release PR.
- Never bump the version in a feature PR (the `/pr` skill doesn't).
- If a workflow fails, check its logs with `gh run view --log-failed`.
