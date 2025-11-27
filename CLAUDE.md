# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `dcc-core-lib`, a TypeScript library providing core game logic for Dungeon Crawl Classics (DCC) RPG. The library follows a **pure functional approach** - no classes or objects, only pure functions.

## Commands

```bash
npm run build        # Compile TypeScript to dist/
npm run lint         # Run ESLint on src/
npm run lint:fix     # Run ESLint with auto-fix
npm run test         # Run tests once
npm run test:watch   # Run tests in watch mode
npm run typecheck    # Type-check without emitting
npm run clean        # Remove dist/
```

Run a single test file:
```bash
npx vitest run src/path/to/file.test.ts
```

## Architecture

- **Pure Functions**: All game logic must be implemented as pure functions with no side effects
- **ESM Module**: Uses ES modules (`"type": "module"`)
- **Modules**: `dice`, `skills`, `data`, `character`, `types`

## Key Modules

- `src/character/create.ts` - 0-level character generation
- `src/character/serialize.ts` - Versioned JSON export/import (CHARACTER_FORMAT_VERSION = "1.0")
- `src/types/character.ts` - Character, Inventory, InventoryItem types
- `src/dice/` - Dice chain, roll evaluation
- `src/skills/` - Skill resolution system
- `src/data/` - Static data (occupations, birth augurs, names, ability modifiers)

## TypeScript Configuration

Strict mode is enabled with maximum strictness settings including:
- `noUncheckedIndexedAccess`: Array/object index access returns `T | undefined`
- `exactOptionalPropertyTypes`: Optional properties must use explicit `undefined`
- `noPropertyAccessFromIndexSignature`: Must use bracket notation for index signatures

## ESLint Configuration

Uses `typescript-eslint` with `strictTypeChecked` and `stylisticTypeChecked` configs.

Unused variables pattern: prefix with `_` (e.g., `_unusedParam`)

## Documentation

- `docs/ARCHITECTURE.md` - Goal architecture, event system design, data loading strategy
- `docs/TASKS.md` - Extraction task checklist
- `docs/STATUS.md` - Current project status and next steps

## Source Repository

Game logic is being extracted from the FoundryVTT DCC system at:
`<local path>`