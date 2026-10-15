# @moonloch/dcc-core-lib

[![CI](https://github.com/moonloch/dcc-core-lib/actions/workflows/ci.yml/badge.svg)](https://github.com/moonloch/dcc-core-lib/actions/workflows/ci.yml)

Game logic for the Dungeon Crawl Classics (DCC) RPG as a TypeScript library: dice chain, checks and saves, combat, spellcasting, character creation and advancement. It is built from pure functions with no platform dependencies, so it runs in Node.js, browsers, FoundryVTT, or anywhere else JavaScript does.

> **This repository contains no DCC RPG book text.** There is no rules prose, table text, spell description or flavor text from any Goodman Games publication anywhere in the code, tests or docs. Official tables and results are referred to by name only, and test fixtures use placeholder or altered values.

The library is **logic only**. It ships no official rulebook data either: class progressions, spell results, crit and fumble tables and the like are registered at runtime by the app that uses the library, from a data source built from the app's own licensed copy. [docs/DATA.md](docs/DATA.md) explains how.

The main consumer is the [DCC system for FoundryVTT](https://github.com/foundryvtt-dcc/dcc), which vendors this library's build. Game-logic fixes for that system belong here, with a regression test; see [CONTRIBUTING.md](CONTRIBUTING.md).

## Status

- **Stage:** pre-1.0 and actively maintained. Minor versions can change the API; breaking changes are called out in [CHANGELOG.md](CHANGELOG.md).
- **In production:** the DCC system for FoundryVTT runs its rolls, checks, saves, combat and spellcasting through this library.
- **Rules accuracy:** behavior is checked against the rules as written and covered by unit tests, and every bug fix lands with a regression test. Known gaps are tracked as [open issues](https://github.com/moonloch/dcc-core-lib/issues).
- **Releases:** listed on the [releases page](https://github.com/moonloch/dcc-core-lib/releases) and published to GitHub Packages.
- **Variants:** a `SystemConfig` type for DCC variants such as MCC and XCrawl exists, with the DCC config shipped as `DCC_SYSTEM`, but no function takes it yet. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md#system-variants-mcc-xcrawl-etc).

## Installation

The package is **not** on the public npm registry, and the unscoped name `dcc-core-lib` is not this package. There are three ways to consume it:

### 1. Vendored by the DCC FoundryVTT system (primary consumer)

FoundryVTT has no bundler, so the [DCC system](https://github.com/foundryvtt-dcc/dcc) commits this library's built `dist/` into `module/vendor/dcc-core-lib/` and imports it directly. The system repo's `scripts/sync-core-lib.mjs` builds a local checkout of this repo and copies `dist/` across (writing `VERSION.json` with the source commit). See [CONTRIBUTING.md](CONTRIBUTING.md#how-a-fix-reaches-the-dcc-system).

### 2. GitHub Packages

Each GitHub release publishes `@moonloch/dcc-core-lib` to GitHub Packages. GitHub Packages' npm registry requires authentication even for public packages, so you need a personal access token (classic) with the `read:packages` scope.

```ini
# .npmrc (project or ~/.npmrc) — do not commit the token
@moonloch:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

```bash
pnpm add @moonloch/dcc-core-lib
# or
npm install @moonloch/dcc-core-lib
```

### 3. From source

```bash
git clone https://github.com/moonloch/dcc-core-lib.git
cd dcc-core-lib
pnpm install --frozen-lockfile
pnpm run build   # emits dist/
```

## Quick start

```typescript
import {
  evaluateRoll,
  bumpDie,
  getAbilityModifier,
  createZeroLevelCharacter,
  DEFAULT_CHARACTER_CREATION_DATA,
  defaultRandomSource,
  rollAbilityCheck,
  rollSavingThrow,
} from '@moonloch/dcc-core-lib';

// Dice and the dice chain
evaluateRoll('1d20+3', { mode: 'evaluate' }).total; // e.g. 17
bumpDie('1d20', 1);    // '1d24'
bumpDie('1d20', -2);   // '1d14'
getAbilityModifier(16); // 2

// A random 0-level character, built from the library's placeholder creation data
const { character } = createZeroLevelCharacter(
  DEFAULT_CHARACTER_CREATION_DATA,
  { name: { generateName: true } },
  defaultRandomSource
);

// High-level checks read abilities, level, class and Luck from the character
const strength = rollAbilityCheck('str', character, { mode: 'evaluate' });
const reflex = rollSavingThrow('reflex', character, { mode: 'evaluate' });
console.log(strength.natural, strength.total, reflex.total);
```

The dice, check, save and skill rolls have async twins (`evaluateRollAsync`, `rollAbilityCheckAsync`, `rollSavingThrowAsync`, `resolveSkillCheckAsync` and so on) that take an async `roller`, so an app can plug in its own dice engine, such as FoundryVTT's `Roll`. Results report the natural roll, modifiers and total; the app decides how to show them.

## Modules

Everything is exported from the package root. Each module has a generated API page with every signature and doc comment.

| Module | What it covers | API |
|---|---|---|
| `dice` | Dice chain, formula parsing and evaluation, sync and async rollers, crit range scaling | [dice.md](docs/api/dice.md) |
| `checks` | High-level ability checks, saving throws and Luck checks for a character | [checks.md](docs/api/checks.md) |
| `skills` | Low-level unified skill resolution that every check and class ability goes through | [skills.md](docs/api/skills.md) |
| `character` | 0-level creation, level-up, saves, AC, hit points, versioned JSON export and import | [character.md](docs/api/character.md) |
| `combat` | Attacks, damage, crits, fumbles, initiative, action dice, two-weapon fighting, morale, mounted combat, grappling, death and dying | [combat.md](docs/api/combat.md) |
| `spells` | Spell checks, spellbooks, spellburn, corruption, disapproval, mercurial magic, spell duels | [spells.md](docs/api/spells.md) |
| `cleric` | Turn unholy, lay on hands, divine aid | [cleric.md](docs/api/cleric.md) |
| `patron` | Patron bond, invoke patron, patron taint | [patron.md](docs/api/patron.md) |
| `occupation` | Occupation-based skill checks | [occupation.md](docs/api/occupation.md) |
| `tables` | Table registry and lookup for simple, multi-column and tiered result tables | [tables.md](docs/api/tables.md) |
| `data` | Loaders for FoundryVTT-format data, the class-progression registry, ability modifiers and other static values | [data.md](docs/api/data.md) |
| `parsers` | Stat-block and Purple Sorcerer character parsers | [parsers.md](docs/api/parsers.md) |
| `adventure` | Encounter and narrative helpers for running adventures | [adventure.md](docs/api/adventure.md) |
| `types` | Shared types, including `RollModifier`, `Character` and `SystemConfig` | [types.md](docs/api/types.md) |

`dist/dcc-core-lib.d.ts`, produced by `pnpm run build`, holds the whole public surface in one declaration file. It is the best single input for editors, tooling and LLM-assisted callers; [llms.txt](llms.txt) indexes the docs for the same purpose.

## Copyright separation

DCC RPG is © Goodman Games. This repository contains logic, types, loaders, and clearly labeled fan-made sample data only. Official table values (class progressions, spell lists and results, crit/fumble/corruption tables, occupations, birth augurs, patron taints, ...) are registered at runtime by the consuming app — e.g. via `registerClassProgressions()` — from a separate data source that you build from your own licensed copy. [docs/DATA.md](docs/DATA.md) documents the formats and functions. Contributions must not add official rulebook data or text; see [CONTRIBUTING.md](CONTRIBUTING.md#copyright-separation).

## Documentation

- [docs/DATA.md](docs/DATA.md): building and loading a game-data directory from your own licensed copy
- [docs/api/index.md](docs/api/index.md): generated API reference, one page per module
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): design goals, module layout, data-loading policy
- [docs/MODIFIERS.md](docs/MODIFIERS.md): the `RollModifier` type and the order modifiers apply in
- [docs/EVENTS.md](docs/EVENTS.md): event callbacks the roll functions accept
- [examples/character-export-v1.0.json](examples/character-export-v1.0.json): a complete character export in the older 1.0 format, which `importCharacter` migrates
- [CHANGELOG.md](CHANGELOG.md): release history

## Development

```bash
pnpm run check        # Lint + typecheck + tests (what CI and the pre-push hook run)
pnpm run build        # Compile TypeScript to dist/
pnpm run lint         # Run ESLint
pnpm run lint:fix     # Run ESLint with auto-fix
pnpm run test         # Run tests once
pnpm run test:watch   # Run tests in watch mode
pnpm run typecheck    # Type-check without emitting
pnpm run clean        # Remove dist/
```

Run a single test file:

```bash
pnpm exec vitest run src/path/to/file.test.ts
```

## Contributing

Bug reports and pull requests are welcome. [CONTRIBUTING.md](CONTRIBUTING.md) is the full guide. The short version:

- **Pick the right repo.** Rules-logic bugs belong here. Foundry sheets, chat cards and other UI belong in the [system repo](https://github.com/foundryvtt-dcc/dcc/issues).
- **Open an issue first** for anything bigger than a bug fix, so the approach is agreed before you write code.
- **Ship a regression test** with every bug fix. It must fail before the fix and pass after it.
- **Keep book text and data out.** Cite a rule by table and page number; never paste it.
- **Run `pnpm run check`** before you push. CI runs the same command.
- **Use conventional commits**, with the module as the scope, such as `fix(combat): ...`.
- **AI-assisted contributions are welcome** under the [LLM contribution policy](CONTRIBUTING.md#ai-and-llm-assisted-contributions). You must review and understand every line, disclose substantial AI use, and never let a model supply rulebook text or values.

Report security issues privately as described in [SECURITY.md](SECURITY.md), not in a public issue.

## License

[MIT](LICENSE) © 2025-2026 Tim L. White. Dungeon Crawl Classics and DCC RPG are trademarks of Goodman Games; this project is not affiliated with or endorsed by Goodman Games.
