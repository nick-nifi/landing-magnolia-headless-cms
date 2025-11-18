/* eslint-disable @next/next/no-img-element */
import { EditableComponent } from '@magnolia/react-editor';
import { MgnlContent } from '@magnolia/frontend-helpers-base';

const Footer = ({ content }: { content: MgnlContent }) => {
  return (
    <>
      <div className='grid grid-cols-3 gap-12'>
        <a
          href='https://www.magnolia-cms.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            className='py-6 max-w-64'
            src='/Magnolia_icon_white.svg'
            alt='Magnolia Logo'
          />
        </a>
        <div className='col-span-2'>
          {content['@nodes']?.map((node: string) => {
            const componentContent = content[node] as MgnlContent;
            return (
              <EditableComponent
                key={componentContent['@id']}
                content={componentContent}
              />
            );
          })}
        </div>
      </div>
      <div className='text-center text-light-green py-6'>
        <p>2024 Magnolia International Ltd. Some rights reserved.</p>
      </div>
    </>
  );
};

export default Footer;
