# ReactPortfolioWebApp

## Build status

[![CI](https://github.com/Dingola/ReactPortfolioWebApp/actions/workflows/ci.yml/badge.svg)](https://github.com/Dingola/ReactPortfolioWebApp/actions/workflows/ci.yml)

## Table of contents

- [Description](#description)
- [Technology](#technology)
- [Supported platforms](#supported-platforms)
- [Prerequisites](#prerequisites)
- [Development](#development)
- [Commands](#commands)
- [Project structure](#project-structure)
- [React and TypeScript guide](#react-and-typescript-guide)
- [API documentation](#api-documentation)
- [Add a route](#add-a-route)
- [Configuration and API access](#configuration-and-api-access)
- [Styling and accessibility](#styling-and-accessibility)
- [Testing and code quality](#testing-and-code-quality)
- [Continuous integration](#continuous-integration)
- [Vercel deployment](#vercel-deployment)
- [Copier updates](#copier-updates)
- [Visual Studio Code and Visual Studio](#visual-studio-code-and-visual-studio)

## Description

A modern developer portfolio built with React und TypeScript.

This project was generated from
[Dingola/ReactWebTemplate](https://github.com/Dingola/ReactWebTemplate). It provides a
neutral, production-oriented React and TypeScript foundation without application-specific
example features.

The generated source tree contains only a neutral application shell and infrastructure.
Add pages and features that represent the actual product instead of retaining demo
business logic.

## Technology

- React and React Router
- strict TypeScript
- Vite development server and production build
- CSS Modules and global design tokens
- Zod environment validation
- ESLint, Stylelint, and Prettier
- Vitest and React Testing Library
- Playwright browser tests
- TypeDoc-generated API documentation


## Supported platforms

- current evergreen browsers; Chromium is exercised automatically in continuous
  integration, while Firefox and Safari/WebKit require project-specific testing
- Windows, Linux, and macOS development environments supported by Node.js 24
- responsive layouts down to a minimum viewport width of 320 pixels

## Prerequisites

- Node.js 24 LTS or newer
- npm

Verify the installed runtime:

```powershell
node --version
```


Install the project:

```powershell
npm install
```


Commit the generated `package-lock.json`.
Continuous integration use this file
for reproducible installations.

Copy `.env.example` to `.env.local` when local values must differ from the defaults.

## Development

Start the development server:

```powershell
npm run dev
```

Open `http://localhost:5173`. Vite updates the browser as source files change.


Create an optimized production build:

```powershell
npm run build
```

Preview the client build locally:

```powershell
npm run preview
```


## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start development with hot reload |
| `npm run build` | Type-check and create a production build |
| `npm run typecheck` | Run TypeScript without emitting files |
| `npm run lint` | Check TypeScript and React rules |
| `npm run lint:styles` | Check CSS rules |
| `npm run format` | Format supported files |
| `npm test` | Run unit and component tests once |
| `npm run test:watch` | Run tests while developing |
| `npm run test:e2e` | Run Playwright browser tests |
| `npm run docs:api` | Generate HTML API documentation from source comments |
| `npm run check` | Run the complete local quality gate |

Install the Playwright browser once before the first local browser test:

```powershell
npx playwright install chromium
```

## Project structure

```text
.
|-- .github/workflows/   # continuous integration and deployment
|-- .vscode/             # recommended editor settings and tasks
|-- docs/                # architecture documentation
|-- public/              # assets copied without transformation
|-- src/
|   |-- app/             # composition, routing, shell, errors, and providers
|   |   |-- errors/      # application-level error handling
|   |   |-- layout/      # concrete application shell components
|   |   `-- providers/   # application-wide React contexts
|   |-- components/
|   |   |-- layout/      # generic layout primitives
|   |   `-- ui/          # generic presentational components
|   |-- features/        # documented extension point for product capabilities
|   |-- hooks/           # generic React hooks
|   |-- lib/             # framework-independent infrastructure
|   |   `-- api/         # HTTP boundary and API errors
|   |-- pages/           # route-level components
|   |-- styles/          # reset, design tokens, and global utilities
|   |-- test/            # shared component-test setup
|   `-- main.tsx         # browser entry point
|-- tests/e2e/            # Playwright browser tests
|-- package.json         # dependencies and project commands
|-- tsconfig.json        # TypeScript project references
|-- typedoc.json         # API documentation configuration
`-- vite.config.ts       # development and production build
```


See [docs/architecture.md](docs/architecture.md) for dependency boundaries, extension
points, and examples.

## React and TypeScript guide

See [docs/react-guide.md](docs/react-guide.md) for an introduction to components, JSX,
props, hooks, routing, CSS Modules, tests, source comments, and the responsibility of
each source directory.

## API documentation

Exported components, hooks, types, and infrastructure use English TSDoc-compatible
comments. Generate navigable HTML documentation with:

```powershell
npm run docs:api
```

TypeDoc writes the generated site to `docs/api`. That directory is intentionally ignored
because generated output should be reproducible from the source. Documentation
generation is part of the complete `check` command and continuous integration.

## Add a route

Create a route-level component under `src/pages`, then add it to `src/app/router.tsx`.
Prefer lazy imports for routes that are not required for the first render:

```tsx
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
```

Keep route components focused on composition. Reusable application behavior belongs in
`src/features`; generic visual elements belong in `src/components/ui`.

## Configuration and API access

Browser-exposed variables must start with `VITE_`. Add their runtime schema to
`src/lib/env.ts` as well as a documented placeholder to `.env.example`. Values prefixed
with `VITE_` are public and must never contain secrets.

Use `apiRequest` from `src/lib/api/apiClient.ts` at the network boundary. Validate
untrusted responses with Zod before application code relies on them.

## Styling and accessibility

Global design values live in `src/styles/tokens.css`; component styles remain next to
their components as CSS Modules. The initial shell includes keyboard skip navigation,
visible focus indicators, semantic landmarks, responsive sizing, and reduced-motion
handling. ESLint statically checks JSX accessibility rules, while the Playwright smoke
test runs Axe against the rendered page. These checks complement rather than replace
keyboard, screen-reader, zoom, contrast, and browser testing.

## Testing and code quality

Vitest runs unit and component tests in a browser-like JSDOM environment. React Testing
Library encourages tests through accessible user-facing queries. Playwright validates
the built application and its automated Axe scan in a real Chromium browser.


ESLint checks TypeScript and React rules, Stylelint checks CSS, Prettier provides a
single formatting convention, and TypeDoc validates source documentation. Run the
complete gate before pushing:

```powershell
npm run check
```

## Continuous integration

`.github/workflows/ci.yml` checks formatting, linting, types, unit tests, generated API
documentation, the production build, and a Chromium smoke test on pushes and pull
requests targeting `main`.
The workflow requires the generated lock file and uses a frozen installation. Dependabot
checks npm and GitHub Actions dependencies weekly.

The workflows intentionally retain `actions/checkout@v4` and `actions/setup-node@v4`.
Major version 5 and newer require Actions Runner 2.327.1 or newer; version 4 keeps older
self-hosted and GitHub Enterprise Server runners compatible.


## Vercel deployment

`vercel.json` rewrites application routes to `index.html` and assigns long-lived cache
headers to hashed assets. Import the repository into Vercel and keep the default Vite
build command and `dist` output directory.


## Copier updates

`.copier-answers.yml` records the template source and selected answers. Keep it under
version control and do not edit it manually. Start updates with a clean Git working
tree:

```powershell
copier update
```

Review and test all changes before committing them. Template updates can conflict with
intentional application changes; Copier exposes those conflicts instead of silently
discarding either side.

## Visual Studio Code and Visual Studio

The repository includes recommended VS Code extensions, formatting settings, tasks,
and browser launch configurations. Visual Studio can open the folder and work with the
npm scripts, but VS Code is the primary configured environment. No solution file is
required unless a later backend technology benefits from one.
