import { fetchPageContentByName } from '@/app/services/magnolia-service';
import { MgnlContent } from '@magnolia/frontend-helpers-base';
import FeatureC2List, { FeatureC2Item } from './components/FeatureC2List';
import ContentB1 from './components/contentB1';
import FeatureC5List, { FeatureC5Item } from './components/FeatureC5List';
import FeatureC10List, { FeatureC10Item } from './components/FeatureC10List';
import HeroA1List, { HeroA1Item } from './components/HeroA1List';
import AppFooter from '@/components/app-footer';

interface CtaChooser {
  label: string;
  isExternal: boolean;
  href: string;
}

interface FeatureC5 extends FeatureC5Item, MgnlContent {}
interface FeatureC2 extends FeatureC2Item, MgnlContent {}
interface FeatureC10 extends FeatureC10Item, MgnlContent {}
interface HeroA1 extends HeroA1Item, MgnlContent {}

interface ContentB1Data extends MgnlContent {
  title: string;
  description: string;
  image?: {
    '@link': string;
  };
  ctaChooser?: CtaChooser;
}

interface HomeResult extends MgnlContent {
  contentB1?: ContentB1Data;
  heroList?: {
    title: string; // List title, usually unused for Hero
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

interface SelectHomePageProps {
  metadata: MgnlContent;
  footer?: MgnlContent;
  title: string;
  home: string;
}

const SelectHomePage = async ({ home, footer }: SelectHomePageProps) => {
  if (!home) {
    return <div className='SelectHomePage'>No home selected</div>;
  }

  const listResponse = await fetchPageContentByName(
    `http://localhost:8080/magnoliaAuthor/.rest/delivery/home/?@jcr:uuid=${home}`
  );

  const pageContent = listResponse?.results?.[0] as HomeResult | undefined;

  if (!pageContent) {
    return <div className='SelectHomePage'>No content found</div>;
  }

  return (
    <div className='SelectHomePage'>
      {pageContent.heroList && (
        <HeroA1List items={pageContent.heroList.heroItems} />
      )}

      {pageContent.multiMarkets && (
        <FeatureC10List
          title={pageContent.multiMarkets.title}
          items={pageContent.multiMarkets.multimarket}
        />
      )}

      {pageContent.contentB1 && typeof pageContent.contentB1 === 'object' && (
        <ContentB1
          title={pageContent.contentB1.title}
          description={pageContent.contentB1.description}
          image={pageContent.contentB1.image}
          ctaChooser={pageContent.contentB1.ctaChooser}
        />
      )}

      {pageContent.featureC5List && (
        <FeatureC5List
          title={pageContent.featureC5List.title}
          c5Items={pageContent.featureC5List.c5Items}
        />
      )}

      {pageContent.featureC2List && (
        <FeatureC2List
          title={pageContent.featureC2List.title}
          c2Items={pageContent.featureC2List.c2Items}
        />
      )}

      {footer && <AppFooter />}
    </div>
  );
};

export default SelectHomePage;
