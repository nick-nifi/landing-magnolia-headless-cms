import React from 'react';
import { Typography as TypographyComponent } from '@/components/typography';
import { environment } from '../../../environments/environment';
import { cn } from '@/lib/utils';

interface ITypographyProps {
  text: string;
  variant:
    | 'hero-heading'
    | 'hero-small-heading'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'body-large'
    | 'body-small'
    | 'link';
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
  as?: any;
  link?: {
    '@link': string;
  };
  customCss?: string;
}

const Typography: React.FC<ITypographyProps> = ({
  text,
  variant,
  weight = 'light',
  as,
  link,
  customCss,
}) => {
  let href = '#';
  if (variant === 'link' && link && link['@link']) {
    href = link['@link'];
    if (href.startsWith(environment.appBase)) {
      href = href.slice(environment.appBase.length);
      if (!href.startsWith('/')) {
        href = '/' + href;
      }
    }
  }

  return (
    <TypographyComponent
      variant={variant}
      weight={weight}
      as={as}
      className={cn(customCss)}
      {...(variant === 'link' ? { href } : {})}
    >
      {text}
    </TypographyComponent>
  );
};

export default Typography;
