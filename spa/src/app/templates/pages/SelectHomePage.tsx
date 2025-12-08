import { fetchPageContentByName } from '@/app/services/magnolia-service';
import { MgnlContent } from '@magnolia/frontend-helpers-base';

interface FeatureC10 extends MgnlContent {
  title: string;
  image: string;
  downloadLists: MgnlContent;
}

interface HomeResult extends MgnlContent {
  multiMarkets: FeatureC10[];
  title: string;
  description: string;
}

interface SelectHomePageProps {
  metadata: MgnlContent;
  title: string;
  home: string;
}

const SelectHomePage = async ({ home }: SelectHomePageProps) => {
  const listResponse = await fetchPageContentByName(
    `http://localhost:8080/magnoliaAuthor/.rest/delivery/home/?@jcr:uuid=${home}`
  );

  const pageContent = listResponse.results[0] as HomeResult;
  console.log('🚀 ~ SelectHomePage ~ pageContent:', pageContent);

  return (
    <div className='SelectHomePage'>
      <h1>Select Home Page</h1>
      <div>
        {/* <strong>Selected Home ID:</strong> {home ? home : 'No home selected'} */}
      </div>
    </div>
  );
};

export default SelectHomePage;
