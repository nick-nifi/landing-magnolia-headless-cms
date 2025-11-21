# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Magnolia CMS headless project with a Next.js 15 SPA frontend. It demonstrates how to integrate Magnolia CMS with React using the `@magnolia/react-editor` library.

## Development Commands

### Root Level (Magnolia CLI)
```bash
npm run mgnl -- start          # Start Magnolia CMS
```

### SPA (Next.js frontend in /spa)
```bash
cd spa
npm install                    # Install dependencies
npm run dev                    # Start dev server on port 8181
npm run build                  # Build for production (runs lint first)
npm run start                  # Start production server on port 8181
npm run lint                   # Run ESLint
npm run format                 # Run Prettier on src/**
```

## Architecture

### Directory Structure
- `/spa` - Next.js 15 frontend application (React 19, TypeScript, Tailwind CSS)
- `/light-modules/spa-lm` - Magnolia light module containing CMS templates, dialogs, and REST endpoints

### Component Mapping System
The `spa/src/magnolia.config.ts` file maps Magnolia template IDs to React components:
- `spa-lm:pages/basic` → Basic page template
- `spa-lm:components/*` → Various component templates (Text, TextImage, List, Container, FlexibleC1)

### React-Editor Components
- `EditablePage` - Renders pages with areas and components
- `EditableArea` - Renders areas containing other areas/components
- `EditableComponent` - Renders individual components

### Key Files
- `spa/src/app/[[...slug]]/page.tsx` - Main entry point using catch-all routing
- `spa/src/app/services/magnolia-service.ts` - API calls for page content and template annotations
- `spa/src/environments/` - Environment configuration

## Requirements

- Java 17 or 21 (for Magnolia CMS)
- Node.js >= 18.18.0
- Yarn 4.4.0 (root) / npm (spa)

## Notes

- The SPA runs on port 8181
- Magnolia Author runs on http://localhost:8080/magnoliaAuthor
- ISR is configured with 60-second revalidation
- The project uses Husky for git hooks and lint-staged for pre-commit linting
