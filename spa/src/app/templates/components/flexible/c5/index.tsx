import C5Card from "./c5-card";

interface CtaChooser {
  field?: 'noCta' | 'withCta';
  ctaText?: string;
  ctaLink?: {
    field?: 'internalPageLink' | 'externalPageLink';
    internalLink?: string;
    externalLink?: string;
  };
}

interface FlexibleC5Props {
  title?: string;
  description?: string;
  schedule?: string;
  ctaChooser?: CtaChooser;
  marginTop?: number | string;
}

export default function FlexibleC5({
  title = "",
  description = "",
  schedule = "",
  ctaChooser,
  marginTop = 0,
}: FlexibleC5Props) {
  const marginTopValue = typeof marginTop === 'string' ? parseInt(marginTop, 10) : marginTop;
  
  let buttonHref = '';
  if (ctaChooser && ctaChooser.field === 'withCta' && ctaChooser.ctaLink) {
    if (ctaChooser.ctaLink.field === 'externalPageLink') {
      buttonHref = ctaChooser.ctaLink.externalLink || '';
    } else if (ctaChooser.ctaLink.field === 'internalPageLink') {
      buttonHref = ctaChooser.ctaLink.internalLink || '';
    }
  }

  return (
    <div className="h-full" style={{ marginTop: marginTopValue ? `${marginTopValue}px` : undefined }}>
      <C5Card
        title={title}
        description={description}
        subtitle={schedule}
        button={ctaChooser?.field === 'withCta' ? {
          label: ctaChooser.ctaText || '',
          href: buttonHref,
        } : undefined}
      />
    </div>
  );
}

