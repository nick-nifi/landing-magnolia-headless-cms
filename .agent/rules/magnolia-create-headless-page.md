# Magnolia Headless Page Workflow

Follow these steps to create a new "Headless Page" (Content Type-based Page). This approach uses a dedicated Content Type to model the page data, an App to manage it, and a REST endpoint to serve it. Optionally, a "Selection Page" can be used to route/select this content.

## 1. Content Type Definition (Light Module)

**Location:** `light-modules/<module>/contentTypes/<name>.yaml`

Define the data model for the page.

- **Datasource:** Use `jcrContentTypeDatasource` with `autoCreate: true`.
- **Workspace:** Define a dedicated workspace (plural name usually, e.g., `homes`).
- **Properties:** Define the fields (title, description, references to components).
- **References:** Use `type: reference:<componentContentType>` for lists of components (e.g., hero list).
- **SubModels:** Use submodels for repeating items if necessary.

```yaml
datasource:
  $type: jcrContentTypeDatasource
  workspace: <workspaceName>s # e.g. homes
  autoCreate: true

model:
  nodeType: mt:<typeName>
  properties:
    - name: title
    - name: description
      type: richText
    - name: heroList
      type: heroListItem
    - name: featureList
      type: reference:<featureContentType> # Direct reference
      multiple: true

  subModels:
    - name: heroListItem
      properties:
        - name: title
        - name: items
          type: reference:<heroContentType>
          multiple: true
```

## 2. App Definition (Light Module)

**Location:** `light-modules/<module>/apps/<name>s-app.yaml`

Create the content management app for authors.

- **Content Type:** Reference the content type defined in Step 1.

```yaml
!content-type:<typeName>
name: <typeName>s-app
icon: icon-content-app # or icon-home, icon-pages
```

## 3. REST Endpoint Configuration

**Location:** `light-modules/<module>/restEndpoints/delivery/<endpointName>.yaml`

Expose the content via the Delivery API V2.

- **Class:** `info.magnolia.rest.delivery.jcr.v2.JcrDeliveryEndpointDefinition`
- **Workspace:** Target the workspace defined in Step 1.
- **References:** Configure `referenceResolver` to expand links to other content types (components).

```yaml
class: info.magnolia.rest.delivery.jcr.v2.JcrDeliveryEndpointDefinition
workspace: <workspaceName>s
depth: 10
bypassWorkspaceAcls: true
includeSystemProperties: false
references:
  - propertyName: featureList
    referenceResolver:
      $type: jcrReferenceResolver
      targetWorkspace: <featureWorkspace>
  - propertyName: image
    referenceResolver:
      $type: assetReferenceResolver
```

## 4. (Optional) Selection Page Pattern

**Location:**

- Template: `light-modules/<module>/templates/pages/select-<name>.yaml`
- Dialog: `light-modules/<module>/dialogs/pages/select-<name>.yaml`

If you need a standard Magnolia Page (in `website` workspace) to point to this headless content:

**Dialog (`dialogs/pages/select-<name>.yaml`):**
Use a `linkField` to select the content item.

```yaml
label: Select <PageName>
form:
  properties:
    <name>:
      $type: linkField
      label: <PageName>
      required: true
      datasource:
        $type: jcrDatasource
        workspace: <workspaceName>s
      appName: <typeName>s-app
```

**Template (`templates/pages/select-<name>.yaml`):**
Standard page definition pointing to the dialog.

```yaml
title: Select <PageName>
renderType: spa
class: info.magnolia.rendering.spa.renderer.SpaRenderableDefinition
dialog: <module>:pages/select-<name>
# ... config ...
```
