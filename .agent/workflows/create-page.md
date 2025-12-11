---
description: Create a new page module (ContentType, App, Dialog, Template, RestEndpoint)
---

This workflow guides you through creating a new page module in `light-modules/pages`, following the pattern of the `home` page.

**Prerequisites:**

- Decide on a `PAGE_NAME` (e.g., `contact`, `product`).
- Decide on a `PAGE_NAME_PLURAL` (e.g., `contacts`, `products`).
- Decide on a workspace name (usually `PAGE_NAME_PLURAL`).

In the steps below, replace:

- `[PAGE_NAME]` with your page name (camelCase or kebab-case as appropriate, usually camelCase for files/properties).
- `[PAGE_NAME_PLURAL]` with the plural form.
- `[WORKSPACE_NAME]` with the workspace name.

## 1. Create ContentType

Create file: `light-modules/pages/contentTypes/[PAGE_NAME].yaml`

```yaml
datasource:
  $type: jcrContentTypeDatasource
  workspace: [WORKSPACE_NAME]
  namespaces:
    mt: https://www.magnolia-travel.com/jcr/1.0/mt
  autoCreate: true

model:
  nodeType: mt:[PAGE_NAME]
  properties:
    - name: title
    - name: description
    # Add other properties as needed
    # Example:
    # - name: heroList
    #   type: heroListItem
```

## 2. Create App

Create file: `light-modules/pages/apps/[PAGE_NAME_PLURAL]-app.yaml`

```yaml
!content-type:[PAGE_NAME]
name: [PAGE_NAME_PLURAL]-app
icon: icon-templating-app
```

## 3. Create Dialog (for selection)

Create file: `light-modules/pages/dialogs/pages/select-[PAGE_NAME].yaml`

```yaml
label: Select [PAGE_NAME]
form:
  properties:
    [PAGE_NAME]:
      $type: linkField
      label: [PAGE_NAME]
      required: true
      datasource:
        $type: jcrDatasource
        workspace: [WORKSPACE_NAME]
      appName: [PAGE_NAME_PLURAL]-app
```

## 4. Create Page Template

Create file: `light-modules/pages/templates/pages/select-[PAGE_NAME].yaml`

```yaml
title: Select [PAGE_NAME]
renderType: spa
class: info.magnolia.rendering.spa.renderer.SpaRenderableDefinition
dialog: pages:pages/select-[PAGE_NAME]

baseUrl: http://localhost:8181
routeTemplate: "/{language}{{@path}}"

areas:
  footer:
    title: Footer Area
    inheritance:
      enabled: true
      components: all
```

## 5. Create Delivery Endpoint

Create file: `light-modules/pages/restEndpoints/delivery/[PAGE_NAME].yaml`

```yaml
class: info.magnolia.rest.delivery.jcr.v2.JcrDeliveryEndpointDefinition
workspace: [WORKSPACE_NAME]
depth: 10
bypassWorkspaceAcls: true
includeSystemProperties: false
references:
  # Add reference resolvers as needed
  # Example:
  # - propertyName: image
  #   referenceResolver:
  #     $type: assetReferenceResolver
```
