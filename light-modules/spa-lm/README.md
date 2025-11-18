# spa-minimal-shared

<!--
Provide a one sentence description of what your light module
provides.
-->


## Features

<!--
Provide a list of the key features this module provides for content
authors, or whoever the primary user is. For a component template,
consider providing screenshots of the rendered component and the
component dialog.
-->


## Usage

<!--
Provide details about how a developer can make the component template,
or other features provided by the light module, available to content
authors.

This can include any special instructions about webresources or
availability. This could include instructions on 3rd party dependencies
such as jquery.

Describe how a template can be configured with parameters if
applicable.
-->

## Security

In this light module, `bypassWorkspaceAcls` configuration items are used to simplify the code. However, they should be removed in production and replaced by adding a user with permissions to execute REST endpoints as well as acess the required workspaces. For starter projects, the website, the dam workspaces are used.

In the starter projects, the fetch commands also need to be updated to add Basic Auth
```javascript
export async function fetchPageNav(nodeName, navBase, config) {
  const pageNavRes = await fetch(navBase + nodeName, config);
  return await pageNavRes.json();
}

const credentials = btoa("USER:PASSWORD");
const auth = { "Authorization" : `Basic ${credentials}` };
const headers = { headers : auth });

fetchPageNav(nodeName, environment.navBase, headers);
```

## Information on Magnolia CMS

This directory is a Magnolia 'light module'.
https://docs.magnolia-cms.com


## License


## Contributors
