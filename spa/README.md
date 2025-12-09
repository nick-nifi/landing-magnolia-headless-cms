# Next.js SSR Starter Project

This starter project is built on top of the Next.js framework to show how Magnolia integrates with the framework using the [react-editor](https://www.npmjs.com/package/@magnolia/react-editor) library.

## Installation

### Requirements

- Java: version `17` or `21`. See [Magnolia Certified Stack](https://docs.magnolia-cms.com/product-docs/6.3/administration/certified-stack/#_java).
- [Node.js](https://nodejs.org/en): `>= 18.18.0`. See [Next-15 Changes](https://nextjs.org/blog/next-15).

### Installation Steps

This project can be cloned using [Magnolia CLI v5](https://mgnl.io/cli).

1. Open a terminal.
2. Create a new folder, for example `mgnl`, and switch to it.
3. Run `npx @magnolia/cli jumpstart`.
4. Choose `3) headless`.
5. Choose `6) nextjs-ssr-starter`.
6. Choose `1) dx-core` (or `2) ce`).
7. Execute `npm run mgnl -- start` to start Magnolia.
8. Open another terminal window in the same place (in `mgnl`).
9. Enter `cd ./spa`.
10. Run `npm i`.
11. Run `npm run dev` to start the dev server.
12. Open the browser at the URL `http://localhost:8080/magnoliaAuthor`.
13. Edit the `Home` page on Magnolia.

**Note:** In step 6, [personalization](https://docs.magnolia-cms.com/product-docs/6.3/developing/headless/spa-development/personalization-of-headless-spa-projects/) isn't available for the option `2) ce`.

## File Structure

| Name                     | Description                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `public`                 | Contains static resources such as logos, icons, and so on.                                                         |
| `.env`                   | Holds the environment variables.                                                                                   |
| `eslint.config.mjs`      | Defines the rules and settings that govern how ESLint analyzes and enforces code quality and style in the project. |
| `lint-staged.config.mjs` | Used by the lint-staged tool, which helps run linters (ESLint, Prettier) only on staged files in Git.              |
| `postcss.config.js`      | Used by PostCSS, a tool that transforms CSS with JavaScript plugins.                                               |
| `prettier.config.mjs`    | For customizing Prettier settings to meet the specific formatting needs.                                           |
| `tailwind.config.mjs`    | Used by Tailwind CSS, which provides a set of predefined utility classes for styling HTML elements.                |

In the `src` folder:

| Name                 | Description                                                                                                                                                                              |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app`                | Contains core functionality of the application.                                                                                                                                           |
| `environments`       | Stores environment variables for the application.                                                                                                                                        |
| `magnolia.config.js` | Maps the [Magnolia components to the React components](https://docs.magnolia-cms.com/product-docs/6.3/developing/headless/spa-development/mapping-between-magnolia-and-spa-components/). |
| `styles.css`         | Holds the global CSS styles for the project.                                                                                                                                             |

In the `src/app` folder:

| Name                    | Description                                                                                                |
| ----------------------- | ---------------------------------------------------------------------------------------------------------- |
| `[[...slug]]/pages.tsx` | The main entry point. Uses the `EditablePage` to render the Magnolia content.                              |
| `components`            | Includes reusable React components that are used in multiple places within the application.                |
| `services`              | Contains `magnolia-service.ts` that helps handle API calls to get page content, template annotations, etc. |
| `templates`             | Holds React components for mapping to Magnolia. See the `magnolia.config.ts` file.                         |
| `layout.tsx`            | The layout component used across multiple pages.                                                           |

In the `src/app/templates` folder:

| Name         | Description                                                                                  |
| ------------ | -------------------------------------------------------------------------------------------- |
| `components` | Contains React components (templates) to render page elements such as text, text image, etc. |
| `pages`      | Contains React components (templates) to render application pages.                           |
| `fragments`  | Includes React components used in component or page templates.                               |

## Technical Details

### The `react-editor` Library

In the project, the `EditablePage`, `EditableArea` and `EditableComponent` components from the `react-editor` are used.

| Component           | Used in                 | Function                                               |
| ------------------- | ----------------------- | ------------------------------------------------------ |
| `EditablePage`      | `page.tsx`              | Renders pages that contain areas and components.       |
| `EditableArea`      | `List.tsx`, `Basic.tsx` | Renders areas that contain other areas and components. |
| `EditableComponent` | `List.tsx`, `Basic.tsx` | Renders components.                                    |

`EditablePage` input:

- `content`: Contains data to render the page content.
- `templateAnnotations`: Includes information to render the green bars.
- `magnoliaContext`: Holds properties that support page rendering, such `nodePath`, `searchParams`, and others.
- `config`: The mapping between the React components and Magnolia, and the configuration for the `fallbackComponent`.

  **Note:** If child elements are passed, they are rendered instead of the content object (and `templateAnnotations`).

`EditableArea` input:

- `content`: Contains data to render the area content.
- `className`: CSS classes used in the outermost wrapper tag.
- `elementType`: An HTML tag name string, such as `div` or `span`, used to create the outermost wrapper tag.
- `customView`: A React component used to render a custom area, replacing the default rendering behavior.

  **Note:** The area can render using one of its child elements, the `customView`, or the default method. If both child elements and the `customView` are provided, `customView` takes priority and will be rendered. If neither is provided, the default rendering method is used.

`EditableComponent` input:

- `content`: Contains data to render the component content.
- `index`: The index of the component.

### Other Tools and Libraries

The following tools and libraries are used for this project.

#### The Framework

- The [Next.js](https://nextjs.org/) framework is a React-based tool for building web applications, offering built-in features, optimizations, and tools. This project uses Next.js version `15.x`.

#### The Stylesheet

- For styling, [Tailwind CSS](https://tailwindcss.com/) is used. It's a utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90, which can be composed to build any design, directly in your markup.

#### Coding Standard

- [Eslint](https://eslint.org/), to avoid bugs. It's a tool for identifying and reporting on patterns found in the ECMAScript/JavaScript code, with the goal of making code more consistent and to avoid bugs.
- [Prettier](https://prettier.io/), to format the code. Prettier is an opinionated code formatter that supports multiple languages.

#### Other Libraries

- [Lint-staged](https://www.npmjs.com/package/lint-staged), to run linters against the staged git files.
- [Husky](https://typicode.github.io/husky/), a git hooks library.

#### The Build Tool

The project is created using the `create-next-app` tool, which sets up a Next.js application with all the necessary configurations.

### Incremental Static Regeneration (ISR)

In the `/src/app/[[...slug]]/page.tsx` file, the `generateStaticParams` function generates paths up to two levels deep from the `pagenav` endpoint. This allows the app to render static pages during build time. Beyond the second level, pages are server-rendered, as indicated by `export const dynamicParams = true` in the page component.

**Note**:

- ISR won't work if you use the `searchParams`, and it won't be SSG on the `author` instance within this demo.
- In the page component, the revalidate setting is set to 60 seconds for the demo purpose. Once the 60 seconds has passed, it still shows the cached page. The cache will update in the background. For more information, see [incremental-static-regeneration](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration).

### Rendering `EditableArea` in a Client Component

There are two ways to render the `EditableArea` in a client component:

1. Let the server render the `EditableArea` and then render it in the client component.

For example, create the ExpanderRCC as a client component.

```tsx
'use client';
import { useState } from 'react';

export default function ExpanderRCC({
  children,
}: {
  children: React.ReactNode;
}) {
  // useState is only available in the client
  const [someState, setSomeState] = useState(0);
  return (
    <div>
      <div>[some stuff only available in the client]: {someState}</div>
      {children}
    </div>
  );
}
```

Then, create the Expander component.

```tsx
import { ExpanderRCC } from './ExpanderRCC';
import { EditableArea } from '@magnolia/react-editor';

export default function Expander({
  children,
  areaContent,
}: {
  children: React.ReactNode;
  areaContent: MgnlContent;
}) {
  return (
    <ExpanderRCC>
      <EditableArea content='areaContent' />
    </ExpanderRCC>
  );
}
```

With this approach, the server will render the `EditableArea` and `Expander` components on the server side. Then, it passes the `EditableArea` as children to the `ExpanderRCC` in the client component.

2. Render the `EditableArea` in the client component.

To render the `EditableArea` in the client component, set the `MagnoliaConfig` one more time in the client component. Let's create a client component called `ClientConfigRCC` to set the `MagnoliaConfig` in the client component.

```tsx
'use client';
import { config } from '/path/to/magnolia.config';
import { ComponentHelper } from '@magnolia/react-editor';

export default function ClientConfigRCC() {
  if (!ComponentHelper.getConfigRef()) {
    ComponentHelper.setConfigRef(config);
  }

  return null;
}
```

Then, add the `ClientConfigRCC` to the `page.tsx` component.

```tsx
import { ClientConfigRCC } from './ClientConfigRCC';

export default function Page() {
  ...
  return (
    <>
      <ClientConfigRCC />
      ...
    </>
  )
}
```

**Note**: The `MagnoliaConfig` can't be serialized and passed to the client component. That's why you need to set the `MagnoliaConfig` one more time in the client component.

Now, create the Expander component.

```tsx
'use client';
import { EditableArea } from '@magnolia/react-editor';

export default function Expander({
  areaContent,
}: {
  areaContent: MgnlContent;
}) {
  const [someState, setSomeState] = useState(0);
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, []);

  return (
    <div>
      <div>[some stuff only available in the client]: {someState}</div>
      {render && <EditableArea content='areaContent' />}
    </div>
  );
}
```

Although the `Expander` component is a client component, it's still executed on the server side. The `EditableArea` will try to render the components but it can't access the `componentMappings` object. So, NextJS will show an error on the server side. On the client side, the `EditableArea` will work fine. To eliminate this, add the `render` flag to avoid rendering the `EditableArea` on the server side.

## Notes

### Duplicates of Static Files in a Build

The Single-Page Application (SPA) supports both short and full paths. This leads to duplicates of those files for the two paths. Such a behavior is expected.

- **Page Editor Behavior**: The Page Editor always sets full paths when editing content.
- **User Experience (UX)**: The SPA supports short paths for user convenience when rendering content.
- **Example**: A node with the `/home` path on the JCR content repository.
  - **SPA Access**: Accessing the SPA URL <http://localhost:3000> should render the `/home` node.
  - **Page Editor Editing**: When editing `/home` in the Page Editor, the iframe will be set to <http://localhost:3000/home>.

**Static Site Generation (SSG)**: To avoid duplicating files on the public instance, you can choose to support either short paths or full paths exclusively for SSG purposes.

### Using Language Tags with Country Codes

To use language tags with country codes (for example `en-US`), follow these steps:

1. Configure i18n for the target site.
   First, add the desired languages to the i18n configuration of the target site.  
   For example, in the site configuration file `home.yaml` for the `/home` path, you should include the configuration for `en-US`:

    ```yaml
    i18n:
      enabled: true
      class: info.magnolia.cms.i18n.IetfI18nContentSupport
      fallbackLocale: en
      locales:
        en:
          languageTag: en
          enabled: true
        en-US:
          languageTag: en-US
          enabled: true
    ```

2. Add the languages to the i18n configuration of the fallback site. This applies to DX Core only, since the Community Edition only supports a single site.  
   Then, add the languages to the i18n configuration of the fallback site. This ensures that the REST endpoints correctly handle content retrieval based on the language settings.  
   For example, in the `fallback.yaml`, you would configure it as follows:

    ```yaml
    i18n:
      enabled: true
      class: info.magnolia.cms.i18n.IetfI18nContentSupport
      fallbackLocale: en
      locales:
        en:
          languageTag: en
          enabled: true
        en-US:
          languageTag: en-US
          enabled: true
    ```

3. Update the language config of the SPA.  
   Finally, specify the languages for the SPA. In the `.env` file, set the `MGNL_LANGUAGES` variable to include all desired language tags (for example `MGNL_LANGUAGES="en en-US"`). The default language should be the first tag there (`en` being default in `MGNL_LANGUAGES="en en-US"`).
