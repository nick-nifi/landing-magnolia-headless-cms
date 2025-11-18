/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { MgnlContent } from '@magnolia/frontend-helpers-base';
import NavItem from './NavItem';

const Navigation = ({
  nodeName,
  content,
  currentLanguage,
  isMagnoliaEdit,
}: {
  nodeName: string;
  content: MgnlContent;
  currentLanguage: string;
  isMagnoliaEdit: boolean;
}) => {
  return (
    <>
      <header className='sticky top-0 h-20 px-8 z-50 flex justify-between items-center bg-white border-b border-[#a9a9a9]'>
        <a href='/'>
          <img src='/Magnolia_logo.png' className='w-52' alt='Magnolia Logo' />
        </a>
        <nav>
          <ul className='flex space-x-6'>
            <NavItem
              content={content}
              nodeName={nodeName}
              currentLanguage={currentLanguage}
              isMagnoliaEdit={isMagnoliaEdit}
            />
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navigation;
