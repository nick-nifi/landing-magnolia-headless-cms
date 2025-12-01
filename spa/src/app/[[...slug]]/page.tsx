export const dynamic = 'force-dynamic'; // Ensures SSR with no cache

import {
  IMagnoliaContext,
  EditorContextService,
  MgnlContent,
  MgnlTemplateAnnotations,
} from '@magnolia/frontend-helpers-base';
import { EditablePage } from '@magnolia/react-editor';
import { config } from '@/magnolia.config';
import {
  fetchPageContent,
  fetchPageNav,
  fetchTemplateAnnotations,
} from '@/app/services/magnolia-service';
import Navigation from '@/app/components/Navigation';
import { environment } from '@/environments/environment';

console.log('[SSR] Page module loaded (not triggered on every request)'); // eslint-disable-line

async function loadPageContent(uri: string, nodeName: string) {
  console.log(
    `[SSR] Loading page content for URI: ${uri} at ${new Date().toISOString()}`
  ); // eslint-disable-line

  const props: {
    nodeName: string;
    page?: MgnlContent;
    pagenav?: MgnlContent;
    templateAnnotations?: MgnlTemplateAnnotations;
    magnoliaContext?: IMagnoliaContext;
  } = {
    nodeName,
  };
  props.nodeName = nodeName;

  const magnoliaContext = EditorContextService.getMagnoliaContext(
    uri,
    nodeName,
    environment.languages
  );
  props.magnoliaContext = magnoliaContext;

  const pageContent = await fetchPageContent(
    magnoliaContext,
    environment.pageBase
  );
  props.page = pageContent as MgnlContent;

  const pageNavContent = await fetchPageNav(nodeName, environment.navBase);
  props.pagenav = pageNavContent as MgnlContent;

  const templateAnnotationsContent = await fetchTemplateAnnotations(
    magnoliaContext,
    environment.templateAnnotationsBase
  );
  props.templateAnnotations =
    templateAnnotationsContent as MgnlTemplateAnnotations;

  return props;
}

type Params = Promise<{
  slug?: string[];
}>;
type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export default async function Page(pageProps: {
  params: Params;
  searchParams: SearchParams;
}) {
  console.log(`[SSR] Rendering Page component at ${new Date().toISOString()}`); // eslint-disable-line

  const toUrlSearchParams = (
    searchParams: Record<string, string | string[] | undefined>
  ) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (!value) {
        return;
      }
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else {
        params.append(key, value);
      }
    });
    return params;
  };
  const buildUri = (
    slug: string | string[],
    searchParams: Record<string, string | string[] | undefined>
  ) => {
    const path = Array.isArray(slug) ? slug.join('/') : slug;
    const params = toUrlSearchParams(searchParams);
    return `/${path}?${params.toString()}`;
  };

  const isAuthor = process.env.MGNL_IS_PREVIEW?.toLocaleLowerCase() === 'true';
  const { slug } = await pageProps.params;
  let searchParams: Record<string, string | string[] | undefined> = {};
  if (isAuthor) {
    searchParams = await pageProps.searchParams;
  }
  const props = await loadPageContent(
    buildUri(slug || [], searchParams),
    environment.appBase
  );

  return (
    <div
      className={
        props.magnoliaContext?.isMagnoliaEdit ? 'disable-a-pointer-events' : ''
      }
    >
      {props.pagenav && (
        <Navigation
          content={props.pagenav}
          nodeName={environment.appBase}
          currentLanguage={props.magnoliaContext?.currentLanguage || 'en'}
          isMagnoliaEdit={props.magnoliaContext?.isMagnoliaEdit || false}
        />
      )}
      {props.page && (
        <EditablePage
          templateAnnotations={props.templateAnnotations || {}}
          content={props.page}
          magnoliaContext={props.magnoliaContext}
          config={config}
        />
      )}
    </div>
  );
}
