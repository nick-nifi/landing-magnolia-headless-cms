import React from 'react';
import { Typography as TypographyComponent } from '@/components/typography';
import { environment } from '../../../environments/environment';

interface ITypographyProps {
  children?: React.ReactNode;
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
  children,
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
      className={customCss}
      {...(variant === 'link' ? { href } : {})}
    >
      {children}
    </TypographyComponent>
  );
};

export default Typography;
