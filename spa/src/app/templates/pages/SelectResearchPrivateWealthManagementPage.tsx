import { fetchPageContentByName } from '@/app/services/magnolia-service';
import AppFooter from '@/components/app-footer';
import { MgnlContent } from '@magnolia/frontend-helpers-base';
import AppBreadcrumb from '../components/app-breadcrumb';
import ContentB1 from './components/contentB1';
import { FeatureC10Item } from './components/FeatureC10List';
import FeatureC2List, { FeatureC2Item } from './components/FeatureC2List';
import FeatureC5List, { FeatureC5Item } from './components/FeatureC5List';
import HeaderA2, { HeaderA2Item } from './components/HeaderA2';
import { HeroA1Item } from './components/HeroA1List';
import ListD3List, { ListD3Item } from './components/ListD3List';
import SelectUobkhResearch, {
  SelectUobkhResearchItem,
} from './components/SelectUobkhResearch';
import TabLinks, { TabLinkItem } from './components/TabLinks';

interface CtaChooser {
  label: string;
  isExternal: boolean;
  href: string;
}

interface FeatureC5 extends FeatureC5Item, MgnlContent {}
interface FeatureC2 extends FeatureC2Item, MgnlContent {}
interface FeatureC10 extends FeatureC10Item, MgnlContent {}
interface HeroA1 extends HeroA1Item, MgnlContent {}
interface HeaderA2 extends HeaderA2Item, MgnlContent {}

interface ContentB1Data extends MgnlContent {
  title: string;
  description: string;
  image?: {
    '@link': string;
  };
  ctaChooser?: CtaChooser;
}

interface ResearchPrivateWealthManagementResult extends MgnlContent {
  headerA2?: HeaderA2;
  tabLinks?: {
    tabLinks: TabLinkItem[];
  }[];
  selectUobkhResearch?: SelectUobkhResearchItem[];
  listD3List?: {
    title: string;
    listD3Items: ListD3Item[];
  };
  contentB1?: ContentB1Data;
  heroList?: {
    title: string;
    heroItems: HeroA1[];
  };
  multiMarkets?: {
    title: string;
    multimarket: FeatureC10[];
  };
  featureC5List?: {
    title: string;
    c5Items: FeatureC5[];
  };
  featureC2List?: {
    title: string;
    c2Items: FeatureC2[];
  };
  title: string;
  description: string;
}

interface SelectResearchPrivateWealthManagementPageProps {
  metadata: MgnlContent;
  footer?: MgnlContent;
  title: string;
  home: string;
}

const SelectResearchPrivateWealthManagementPage = async ({
  home,
  footer,
}: SelectResearchPrivateWealthManagementPageProps) => {
  const listResponse = await fetchPageContentByName(
    `http://localhost:8080/magnoliaAuthor/.rest/delivery/researchPrivateWealthManagement/${home ? `?@jcr:uuid=${home}` : ''}`
  );

  const pageContent = listResponse
    .results[0] as ResearchPrivateWealthManagementResult;

  if (!pageContent) {
    return <div>Page not found</div>;
  }

  return (
    <div className='SelectResearchPrivateWealthManagementPage'>
      <AppBreadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Research' },
          {
            label: pageContent.title,
          },
        ]}
      />

      {pageContent.headerA2 && <HeaderA2 content={pageContent.headerA2} />}

      {pageContent.tabLinks && <TabLinks groups={[]} />}

      {/* {pageContent.heroList && (
        <HeroA1List items={pageContent.heroList.heroItems} />
      )} */}

      {/* {pageContent.multiMarkets && (
        <FeatureC10List
          title={pageContent.multiMarkets.title}
          items={pageContent.multiMarkets.multimarket}
        />
      )} */}

      {pageContent.contentB1 && typeof pageContent.contentB1 === 'object' && (
        <ContentB1
          title={pageContent.contentB1.title}
          description={pageContent.contentB1.description}
          image={pageContent.contentB1.image}
          ctaChooser={pageContent.contentB1.ctaChooser}
        />
      )}

      {pageContent.featureC2List && (
        <FeatureC2List
          title={pageContent.featureC2List.title}
          c2Items={pageContent.featureC2List.c2Items}
          className='bg-ring'
        />
      )}

      {pageContent.selectUobkhResearch && (
        <SelectUobkhResearch items={pageContent.selectUobkhResearch} />
      )}

      {pageContent.listD3List && (
        <ListD3List
          title={pageContent.listD3List.title}
          items={pageContent.listD3List.listD3Items}
        />
      )}

      {pageContent.featureC5List && (
        <FeatureC5List
          title={pageContent.featureC5List.title}
          c5Items={pageContent.featureC5List.c5Items}
        />
      )}

      {footer && <AppFooter />}
    </div>
  );
};

export default SelectResearchPrivateWealthManagementPage;
