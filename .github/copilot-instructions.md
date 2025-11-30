# AI Coding Agent Instructions for `landing-magnolia-headless-cms`

This document provides essential guidance for AI coding agents working on the `landing-magnolia-headless-cms` project. Follow these instructions to ensure productivity and alignment with the project's architecture and conventions.

## Project Overview

This project is a headless CMS implementation using Magnolia and Next.js. It demonstrates integration with Magnolia's `react-editor` library to enable dynamic content rendering. The project is structured to support both server-side rendering (SSR) and incremental static regeneration (ISR).

### Key Components

- **Magnolia Integration**: The `react-editor` library is used for rendering Magnolia content. Key components include:
  - `EditablePage`: Renders pages with areas and components.
  - `EditableArea`: Renders nested areas and components.
  - `EditableComponent`: Renders individual components.
- **Next.js Framework**: Provides SSR, ISR, and dynamic routing capabilities.
- **Tailwind CSS**: Used for utility-first styling.

## File Structure Highlights

- `light-modules/`: Contains Magnolia-specific configurations, templates, and dialogs.
- `spa/`: The Next.js application, including:
  - `src/app/[[...slug]]/page.tsx`: Main entry point for rendering Magnolia pages.
  - `src/app/templates/`: React components mapped to Magnolia templates.
  - `src/magnolia.config.ts`: Maps Magnolia components to React components.
  - `src/services/content-service.ts`: Handles API calls to fetch Magnolia content.

## Developer Workflows

### Installation

1. Ensure Java 17 or 21 and Node.js >= 18.18.0 are installed.
2. Clone the project and navigate to the `spa` directory.
3. Run `npm install` to install dependencies.
4. Start Magnolia with `npm run mgnl -- start`.
5. Start the Next.js development server with `npm run dev`.

### Building and Testing

- **Build**: Run `npm run build` in the `spa` directory.
- **Linting**: Use `npm run lint` to check code quality.
- **Formatting**: Use `npm run format` to apply Prettier formatting.

### Debugging

- Use the Magnolia Author instance at `http://localhost:8080/magnoliaAuthor` to edit and preview content.
- For Next.js debugging, leverage the built-in development server at `http://localhost:3000`.

## Project-Specific Conventions

- **Component Mapping**: Ensure all Magnolia components are mapped in `src/magnolia.config.ts`.
- **Dynamic Routing**: Use the `[[...slug]]` pattern for dynamic page rendering.
- **Styling**: Follow Tailwind CSS conventions for consistent styling.
- **Client Components**: Use the `'use client'` directive for components requiring client-side state or interactivity.

## External Dependencies

- **Magnolia CMS**: Provides the backend for content management.
- **react-editor**: Enables integration between Magnolia and React.
- **Tailwind CSS**: Utility-first CSS framework.
- **ESLint and Prettier**: Enforce code quality and formatting standards.

## Examples

### Rendering a Magnolia Page

```tsx
import { EditablePage } from "@magnolia/react-editor";
import magnoliaConfig from "../magnolia.config";

export default function Page({ content, templateAnnotations }) {
  return (
    <EditablePage
      content={content}
      templateAnnotations={templateAnnotations}
      config={magnoliaConfig}
    />
  );
}
```

### Fetching Content

```ts
import axios from "axios";

export async function fetchPageContent(path) {
  const response = await axios.get(`/api/magnolia/pages?path=${path}`);
  return response.data;
}
```

## Notes

- Always validate Magnolia component mappings when adding new templates.
- Ensure ISR settings align with the project's caching strategy.
- Refer to the `spa/README.md` for additional technical details.
