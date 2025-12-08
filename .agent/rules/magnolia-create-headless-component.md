---
trigger: always_on
---

Magnolia Headless Component Workflow
Follow these steps to create a new component or content type feature.

1. Content Type Definition (Light Module)
   Location: light-modules/<module>/contentTypes/<name>.yaml

Define the data model. Use subModels for complex nested structures or grouping.

Datasource: Use jcrContentTypeDatasource with autoCreate: true.
Workspace: Define a specific workspace if the data is a distinct entity (e.g., featureC10).
References: Use type: reference:<contentType> for linking to other content.
SubModels: Use for lists of objects (e.g., multiMarkets -> multiMarketItem).
datasource:
$type: jcrContentTypeDatasource
workspace: <workspaceName>
autoCreate: true
model:
nodeType: mt:<typeName>
properties: - name: title - name: image
type: asset - name: relatedItems
type: mySubModel
multiple: true
subModels: - name: mySubModel
properties: - name: itemTitle - name: itemReference
type: reference:<otherContentType> 2. App Definition (Light Module)
Location: light-modules/<module>/apps/<name>s-app.yaml

Create the content management app for authors.

!content-type:<typeName>
name: <typeName>s-app
icon: icon-content-app 3. I18n Configuration
Location: light-modules/<module>/i18n/<module>\_backend-messages_en.properties

Add labels for the app and properties. Follow the naming convention: <appName>.<propertyName>.label or <appName>.<subModelName>.<propertyName>.label.

<typeName>s-app=<App Name>
<typeName>s-app.detail.label=<Detail Label>
<typeName>s-app.title.label=Title
<typeName>s-app.mySubModel.itemTitle.label=Item Title 4. REST Endpoint Configuration
Location: light-modules/<module>/restEndpoints/delivery/<endpointName>.yaml

Expose the content via the Delivery API V2.

Class: info.magnolia.rest.delivery.jcr.v2.JcrDeliveryEndpointDefinition
References: Configure referenceResolver to expand links.
Important: If using a SubModel, target the property inside the SubModel (e.g., multimarket) not the list container.
Assets: Use assetReferenceResolver.
Recursive: Use nodeType restriction if you need to resolve properties only on specific expanded node types (e.g., images inside referenced items).
class: info.magnolia.rest.delivery.jcr.v2.JcrDeliveryEndpointDefinition
workspace: <workspaceName>
depth: 10
bypassWorkspaceAcls: true
references:

- propertyName: itemReference # Property inside the SubModel
  referenceResolver:
  $type: jcrReferenceResolver
  targetWorkspace: <referencedWorkspace>
- propertyName: image
  referenceResolver:
  $type: assetReferenceResolver

5. SPA Implementation (React)
   Location: spa/src/app/templates/components/<Component>.tsx or pages/<Page>.tsx

Component: Create the React component. Use MgnlContent type.
Interfaces: Define TypeScript interfaces that match the JSON response structure (including expanded references).
Fetching:
Use
fetchPageContentByName
(or similar service).
By UUID: Use ?@jcr:uuid=<uuid> and take results[0] from the response.
Direct Path: Use v1/<path>.
Mapping: Register in
spa/src/magnolia.config.ts
.
// Component
interface MyResult extends MgnlContent {
relatedItems: SubItem[];
}
// Fetching by UUID
const listResponse = await fetchPageContentByName(
`http://localhost:8080/magnoliaAuthor/.rest/delivery/<endpoint>/?@jcr:uuid=${uuid}`
);
const detail = listResponse.results[0];
Rules Summary
One Workspace per Content Type (usually): keeps data clean.
Resolve References Server-Side: Configure the REST endpoint to expand data (depth, references) rather than chaining requests on the client.
Strict I18n: Always add labels to avoid fallback keys in the UI.
Target Exact Properties: In REST config, propertyName must match the actual property holding the reference (UUID), even if nested in a SubModel.
