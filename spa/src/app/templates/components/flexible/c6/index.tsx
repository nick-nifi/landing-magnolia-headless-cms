import C6Card from "./c6-card";

interface CtaChooser {
  field?: 'noCta' | 'withCta';
  ctaText?: string;
  ctaLink?: {
    field?: 'internalPageLink' | 'externalPageLink';
    internalLink?: string;
    externalLink?: string;
  };
}

interface FlexibleC6Props {
  title?: string;
  description?: string;
  ctaChooser?: CtaChooser;
  marginTop?: number | string;
}

export default function FlexibleC6({
  title = "",
  description = "",
  ctaChooser,
  marginTop = 0,
}: FlexibleC6Props) {
  const marginTopValue = typeof marginTop === 'string' ? parseInt(marginTop, 10) : marginTop;
  
  let href = '';
  if (ctaChooser && ctaChooser.field === 'withCta' && ctaChooser.ctaLink) {
    if (ctaChooser.ctaLink.field === 'externalPageLink') {
      href = ctaChooser.ctaLink.externalLink || '';
    } else if (ctaChooser.ctaLink.field === 'internalPageLink') {
      href = ctaChooser.ctaLink.internalLink || '';
    }
  }

  return (
    <div className="h-full" style={{ marginTop: marginTopValue ? `${marginTopValue}px` : undefined }}>
      <C6Card
        title={title}
        description={description}
        href={href}
      />
    </div>
  );
}


