import { fetchPageContentByName } from '@/app/services/magnolia-service';
import AppFooter from '@/components/app-footer';
import { MgnlContent } from '@magnolia/frontend-helpers-base';
import ContentB1 from './components/contentB1';
import ContentB4 from '../components/content/ContentB4';
import FeatureC2List, { FeatureC2Item } from './components/FeatureC2List';
import FeatureC5List, { FeatureC5Item } from './components/FeatureC5List';
import HeroA1List, { HeroA1Item } from './components/HeroA1List';

interface ImageChooser {
  field?: 'image' | 'externalImage';
  image?: {
    '@link': string;
  };
  imageAlt?: string;
  externalImage?: string;
  externalImageAlt?: string;
}

interface CtaChooser {
  field?: 'noCta' | 'withCta';
  ctaText?: string;
  ctaLink?: {
    field?: 'internalPageLink' | 'externalPageLink';
    internalLink?: string;
    externalLink?: string;
  };
}

interface FeatureC5 extends FeatureC5Item, MgnlContent {}
interface FeatureC2 extends FeatureC2Item, MgnlContent {}
interface HeroA1 extends HeroA1Item, MgnlContent {}

interface ContentB1Data extends MgnlContent {
  title: string;
  description: string;
  image?: {
    '@link': string;
  };
  ctaChooser?: CtaChooser;
}

interface ContentB4Data extends MgnlContent {
  title: string;
  description: string;
  backgroundImageChooser?: ImageChooser;
  overlayImageChooser?: ImageChooser;
  ctaChooser?: CtaChooser;
}

interface ServicesBrokerageServicesRetailOnlineResult extends MgnlContent {
  contentB1?: ContentB1Data;
  contentB4?: ContentB4Data;
  heroList?: {
    title: string;
    heroItems: HeroA1[];
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

interface ServicesBrokerageServicesRetailOnlinePageProps {
  metadata: MgnlContent;
  footer?: MgnlContent;
  title: string;
  home: string;
}

const ServicesBrokerageServicesRetailOnlinePage = async ({
  home,
  footer,
}: ServicesBrokerageServicesRetailOnlinePageProps) => {
  const listResponse = await fetchPageContentByName(
    `http://localhost:8080/magnoliaAuthor/.rest/delivery/services-brokerage-services-retail-online/${home ? `?@jcr:uuid=${home}` : ''}`
  );

  const pageContent = listResponse
    .results[0] as ServicesBrokerageServicesRetailOnlineResult;

  if (!pageContent) {
    return <div>Page not found</div>;
  }

  return (
    <div className='ServicesBrokerageServicesRetailOnlinePage'>
      {pageContent?.heroList && (
        <HeroA1List items={pageContent?.heroList?.heroItems || []} />
      )}

      {pageContent.contentB1 && typeof pageContent?.contentB1 === 'object' && (
        <ContentB1
          title={pageContent.contentB1.title}
          description={pageContent.contentB1.description}
          image={pageContent.contentB1.image}
          ctaChooser={pageContent.contentB1.ctaChooser}
        />
      )}

      {pageContent.contentB4 && typeof pageContent?.contentB4 === 'object' && (
        <ContentB4
          title={pageContent.contentB4.title}
          description={pageContent.contentB4.description}
          backgroundImageChooser={pageContent.contentB4.backgroundImageChooser}
          overlayImageChooser={pageContent.contentB4.overlayImageChooser}
          ctaChooser={pageContent.contentB4.ctaChooser}
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

export default ServicesBrokerageServicesRetailOnlinePage;

