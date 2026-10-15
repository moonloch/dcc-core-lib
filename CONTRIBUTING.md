# Contributing to @moonloch/dcc-core-lib

Thanks for helping. This library holds the rules logic for Dungeon Crawl Classics that the [DCC system for FoundryVTT](https://github.com/foundryvtt-dcc/dcc) (and other apps) build on. When a bug in the system turns out to be a rules bug, the fix belongs here, with a regression test — not as a workaround in the system's adapter layer.

## Ground rules

### Pure functions, no platform dependencies

- All game logic is implemented as **pure functions**: no classes, no module-level mutable state beyond the explicit registries, no side effects.
- **No platform dependencies.** Nothing in `src/` may reference FoundryVTT globals (`game`, `CONFIG`, `Roll`, `Hooks`, `foundry.*`), the DOM, or Node-only APIs. Platform behavior is injected by the caller: dice rollers (`DiceRoller` / `AsyncDiceRoller`), event callbacks, random sources, and registered data.
- Randomness goes through an injected roller or `RandomSource` so tests can be deterministic.
- The library is ESM (`"type": "module"`); use `.js` extensions in relative imports.

### `npm run check` must pass

```bash
npm ci
npm run check   # eslint + tsc --noEmit + vitest
```

CI runs the same command on every PR, and the husky pre-push hook runs it locally. The TypeScript config is strict (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noPropertyAccessFromIndexSignature`) and ESLint uses `typescript-eslint`'s `strictTypeChecked` + `stylisticTypeChecked`. Prefix intentionally unused variables with `_`.

### Every bug fix ships a regression test

A fix PR must include a test that fails before the fix and passes after it. Put it next to the code (`src/<module>/<file>.test.ts`). If the fix is a rules-as-written correction, say in the test or PR description which rule it implements (cite the table/page number — do **not** paste rulebook text).

Tests must not depend on official game data. Use synthetic class IDs (e.g. `"test-fighter"`) with inline minimal progressions, or the fan-made sample data in `src/data/sample-data.ts`.

### Conventional commits

Commit messages and PR titles follow [Conventional Commits](https://www.conventionalcommits.org/), with the module as the scope, matching the existing history:

```
fix(combat): bleed-out window is the drop round plus (level) full rounds
feat(spells): expand special mercurial-magic entries (roll again twice)
fix(spells)!: allow spellburn to reduce abilities to 0 per DCC RAW
docs(readme): ...
chore: ...
```

Common scopes: `adventure`, `character`, `checks`, `cleric`, `combat`, `dice`, `data`, `occupation`, `parsers`, `patron`, `skills`, `spells`, `tables`, `types` (plus `docs`, `readme`, `changelog` for documentation). Mark breaking API changes with `!` and explain the migration in the PR body. Add a line to `CHANGELOG.md` under the unreleased section for user-visible changes.

## Copyright separation

DCC RPG is © Goodman Games. **This repository contains logic only — no official Goodman Games data or text.**

Belongs here:

- Algorithms and mechanic shapes ("spell check = d20 + level + ability mod", "a natural 1 on a cleric cast triggers disapproval").
- Type definitions and registries (`registerClassProgression(s)`, table registries) that apps populate at startup.
- Fan-made sample data, clearly labeled as such (see `src/data/sample-data.ts`).
- Tests using synthetic data.

Does **not** belong here:

- Per-class progressions, spell lists or spell result tables, crit/fumble/corruption/disapproval table entries, occupations, birth augurs, patron taints, or any other rulebook table values.
- `Record`s keyed by level, `switch` statements on `classId`, or class-named constants (`WARRIOR_*`, `THIEF_*`, …) that encode rulebook values.
- Rulebook text, including in comments, test names, or fixtures.

If a function needs class- or table-specific rulebook data, read it from a registry. If nothing is registered, return a minimal neutral default — don't inline "reasonable" values taken from the rulebook. Official data is supplied by the consuming app (the DCC system loads it from its own content) or by a separately maintained data package; [docs/DATA.md](docs/DATA.md) describes the formats such a package uses.

The fan-made fixtures in `test_data/` (thief and warrior class-level documents and a d30 birth-augur table) exist only to exercise the FoundryVTT-format loaders in `src/data/loaders/integration.test.ts`. They reuse table and augur names with altered values and contain no rulebook text. Do not add official data there.

## How a fix reaches the DCC system

The DCC system does not install this package from a registry; it **vendors** the compiled `dist/` at `module/vendor/dcc-core-lib/` (FoundryVTT has no bundler). A lib fix flows like this:

1. **Open a PR here** against `main` with the fix and its regression test. Link the system issue it addresses (e.g. `foundryvtt-dcc/dcc#123`).
2. **Review and merge.** On merge to `main`, the `Create Release` workflow runs `npm run check`, builds, and creates a draft GitHub release for the `package.json` version. If a release for that version already exists, the workflow does not push to `main`; it opens a `release/bump-vX.Y.Z` pull request that bumps the patch version, and merging that PR creates the draft release for the new version. (Bumping `package.json` in your own PR avoids the extra round trip.) The maintainer publishes the draft release, which triggers `Publish to GitHub Packages`.
3. **Sync the vendored copy in the system repo.** In a checkout of [foundryvtt-dcc/dcc](https://github.com/foundryvtt-dcc/dcc), with this repo checked out at the merged commit:

   ```bash
   DCC_CORE_LIB_SRC=/path/to/your/dcc-core-lib pnpm run sync-core-lib
   ```

   `scripts/sync-core-lib.mjs` runs `npm run build` in the lib checkout, copies `dist/` into `module/vendor/dcc-core-lib/`, and writes `VERSION.json` with the source commit SHA. Commit the vendor diff (e.g. `vendor: sync dcc-core-lib to 0.14.4 (abc1234)`) in a system PR, and remove any temporary adapter workaround that the lib fix makes unnecessary. The system repo's `.claude/skills/sync-core-lib/SKILL.md` describes the same procedure.

If you need a system-side workaround while the lib PR is in review, keep it small, mark it as temporary, and reference the lib PR so it can be removed after the sync.

## AI and LLM-assisted contributions

You may use AI coding assistants and large language models (LLMs) to help write code, tests and docs for this project. The maintainers use them too. The rules below keep that help from costing reviewers time or putting rulebook text into the repository.

### You are the author

- **Review everything before you submit it.** You must understand every line of the PR and be able to explain and defend it in review. "The model wrote it" is not an answer to a review question.
- **Run the checks yourself.** `npm run check` must pass on your machine before you open the PR. Do not submit code you have not run.
- **Check that tests test something.** Generated tests often assert whatever the code currently does. A regression test must fail without your fix; confirm that by reverting the fix locally.
- **Keep the change focused.** Remove unrelated refactors, renames, reformatting and comment churn that an assistant adds along the way.

### Disclose substantial AI use

If an AI tool wrote a substantial part of a PR, say so in the PR description and name the tool. A `Co-Authored-By:` trailer naming the tool also works. Autocomplete of a line or two does not need disclosure. Disclosure does not count against a PR; it tells the reviewer where to look harder.

### No rulebook text, from you or from a model

LLMs have read the DCC RPG rulebook and its tables, and they will reproduce them when asked. That makes them a copyright risk for this repository specifically.

- **Do not ask a model for rules values.** Never ask an assistant to "fill in", "recall" or "complete" a table, progression, spell result, stat block or rule. Take values from your own reading of the rules and cite the table and page number.
- **Do not paste rulebook pages into a prompt** to generate code, tests, comments or fixtures from them.
- **Check generated prose.** Doc comments, test names and fixtures written by a model can contain rulebook wording. Rewrite anything that reads like it came from the book.

The [copyright separation](#copyright-separation) rules apply to AI-generated content exactly as they apply to anything else.

### Issues and PR descriptions

Write them yourself, or edit generated text until it is short and accurate. Every claim in an issue, such as a root cause, a reproduction or an affected function, must be one you have verified. Do not paste unverified model analysis. Security reports must include a working reproduction, not a model's speculation; see [SECURITY.md](SECURITY.md).

### Automated and bulk contributions

Do not open PRs generated by bots or agents running without a human in the loop. This includes automated "hardening", dependency, typo or lint sweeps across the codebase. Open an issue first if you think a sweeping change is worthwhile. Dependabot is already configured for dependency updates.

Maintainers may close, without detailed review, a PR that looks unreviewed, untested or bulk-generated.

## Reporting bugs

Open an issue here for rules-logic bugs, with the inputs, the expected result (and the rule it comes from — table/page reference, no copied text), and the actual result. Issues about Foundry UI, sheets, or chat cards belong in the [system repo](https://github.com/foundryvtt-dcc/dcc/issues).

## License

By contributing you agree that your contributions are licensed under the [MIT License](LICENSE).

## API docs

`docs/api/` is generated from the TSDoc comments by TypeDoc (`npm run docs:api`). Do not edit it by hand: fix the doc comment in `src/` and regenerate. CI fails if the committed docs are stale (`npm run docs:check`). `npm run build` also emits `dist/dcc-core-lib.d.ts`, the whole public surface as one declaration file, which is the best single input for tooling and LLM-assisted callers.
