import {
  IMagnoliaContext,
  MgnlContent,
  MgnlTemplateAnnotations,
} from '@magnolia/frontend-helpers-base';

export async function fetchPageContent(
  magnoliaContext: IMagnoliaContext,
  pageBase: string,
): Promise<MgnlContent> {
  const pagesRes = await fetch(
    pageBase + magnoliaContext.nodePath + magnoliaContext.search
  );
  return (await pagesRes.json()) as MgnlContent;
}

export async function fetchPageNav(
  nodeName: string,
  navBase: string
): Promise<MgnlContent> {
  const pageNavRes = await fetch(navBase + nodeName);
  return (await pageNavRes.json()) as MgnlContent;
}

export async function fetchTemplateAnnotations(
  magnoliaContext: IMagnoliaContext,
  templateAnnotationsBase: string
): Promise<MgnlTemplateAnnotations | undefined> {
  if (magnoliaContext.isMagnolia) {
    const templateAnnotationsRes = await fetch(
      templateAnnotationsBase +
        magnoliaContext.nodePath +
        magnoliaContext.search
    );
    return (await templateAnnotationsRes.json()) as MgnlTemplateAnnotations;
  }
}
