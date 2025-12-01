import React from 'react';
import { decodeIfEscaped } from '../../services/content-service';
import { Typography } from '@/components/typography';
import { environment } from '@/environments/environment';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CtaLink {
  field?: 'internalPageLink' | 'externalPageLink';
  internalLink?: string;
  externalLink?: string;
}

interface CtaChooser {
  field?: 'noCta' | 'withCta';
  ctaText?: string;
  ctaLink?: CtaLink;
}

interface ContentNode {
  '@id': string;
  text?: string;
  field?: string;
}

interface ContentData {
  '@nodes'?: string[];
  [key: string]: ContentNode | string[] | undefined;
}

interface IListD5Props {
  content: ContentData;
  ctaChooser?: CtaChooser;
}

const ListD5: React.FC<IListD5Props> = ({ content, ctaChooser }) => {
  const nodeKeys = content['@nodes'] || [];

  // cta chooser
  let ctaText = '';
  let linkHref = '';
  let isExternal = false;

  if (ctaChooser && ctaChooser.field === 'withCta') {
    ctaText = ctaChooser.ctaText || '';

    const ctaLink = ctaChooser.ctaLink;

    if (ctaLink) {
      if (ctaLink.field === 'internalPageLink' && ctaLink.internalLink) {
        const origin =
          typeof window !== 'undefined' ? window.location.origin : '';
        let link = ctaLink.internalLink;
        if (link.startsWith(environment.appBase)) {
          link = link.slice(environment.appBase.length);
          if (!link.startsWith('/')) {
            link = '/' + link;
          }
        }
        linkHref = `${origin}${link}`;
      } else if (ctaLink.field === 'externalPageLink' && ctaLink.externalLink) {
        linkHref = ctaLink.externalLink;
        isExternal = true;
      }
    }
  }

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-5 lg:gap-x-16'>
        {nodeKeys.map((key) => {
          const node = content[key] as ContentNode;

          return (
            <div key={node['@id']} className='py-5 border-b'>
              <Typography
                variant='body-large'
                weight='light'
                dangerouslySetInnerHTML={{
                  __html: decodeIfEscaped(node.field || ''),
                }}
              />
            </div>
          );
        })}
      </div>
      {ctaChooser && ctaChooser.field === 'withCta' && ctaText && linkHref && (
        <div className='flex justify-center md:justify-end mt-8 mx-auto'>
          <Button asChild variant={'outline'}>
            <Link
              href={linkHref}
              {...(isExternal
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              {ctaText}
              <ArrowRight />
            </Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default ListD5;
