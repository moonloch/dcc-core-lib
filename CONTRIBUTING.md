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

Common scopes: `character`, `checks`, `cleric`, `combat`, `dice`, `data`, `patron`, `skills`, `spells`, `tables`, `types`. Mark breaking API changes with `!` and explain the migration in the PR body. Add a line to `CHANGELOG.md` under the unreleased section for user-visible changes.

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

If a function needs class- or table-specific rulebook data, read it from a registry. If nothing is registered, return a minimal neutral default — don't inline "reasonable" values taken from the rulebook. Official data is supplied by the consuming app (the DCC system loads it from its own content) or by a separately maintained data package.

## How a fix reaches the DCC system

The DCC system does not install this package from a registry; it **vendors** the compiled `dist/` at `module/vendor/dcc-core-lib/` (FoundryVTT has no bundler). A lib fix flows like this:

1. **Open a PR here** against `main` with the fix and its regression test. Link the system issue it addresses (e.g. `foundryvtt-dcc/dcc#123`).
2. **Review and merge.** On merge to `main`, the `Create Release` workflow runs `npm run check`, builds, and creates a draft GitHub release for the `package.json` version (bumping the patch version if that release already exists). The maintainer publishes the release, which triggers `Publish to GitHub Packages`.
3. **Sync the vendored copy in the system repo.** In a checkout of [foundryvtt-dcc/dcc](https://github.com/foundryvtt-dcc/dcc), with this repo checked out at the merged commit:

   ```bash
   DCC_CORE_LIB_SRC=/path/to/your/dcc-core-lib pnpm run sync-core-lib
   ```

   `scripts/sync-core-lib.mjs` runs `npm run build` in the lib checkout, copies `dist/` into `module/vendor/dcc-core-lib/`, and writes `VERSION.json` with the source commit SHA. Commit the vendor diff (e.g. `vendor: sync dcc-core-lib to 0.14.4 (abc1234)`) in a system PR, and remove any temporary adapter workaround that the lib fix makes unnecessary. The system repo's `.claude/skills/sync-core-lib/SKILL.md` describes the same procedure.

If you need a system-side workaround while the lib PR is in review, keep it small, mark it as temporary, and reference the lib PR so it can be removed after the sync.

## Reporting bugs

Open an issue here for rules-logic bugs, with the inputs, the expected result (and the rule it comes from — table/page reference, no copied text), and the actual result. Issues about Foundry UI, sheets, or chat cards belong in the [system repo](https://github.com/foundryvtt-dcc/dcc/issues).

## License

By contributing you agree that your contributions are licensed under the [MIT License](LICENSE).
