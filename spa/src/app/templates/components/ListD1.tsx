import { decodeIfEscaped } from '@/app/services/content-service';
import { Typography } from '@/components/typography';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

type ListD1Variant = 'primary' | 'secondary';

interface ListD1Variants {
  field: ListD1Variant;
}

interface ListD1Props {
  title: string;
  description?: string;
  variants?: ListD1Variants;
}

const listD1Variants = cva('border shadow-lg grid grid-cols-1 md:grid-cols-3', {
  variants: {
    variant: {
      primary: 'border-secondary',
      secondary: '',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

const listD1TitleVariants = cva(
  'border-l border-l-8 flex justify-center py-5',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white',
        secondary: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

const listD1DescriptionVariants = cva(
  'p-5 lg:px-16 col-span-2 flex items-center',
  {
    variants: {
      variant: {
        primary: '',
        secondary: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

const ListD1 = ({
  title,
  description = '',
  variants = { field: 'primary' },
}: ListD1Props) => {
  const { field } = variants;

  return (
    <div className={cn(listD1Variants({ variant: field }))}>
      <div className={cn(listD1TitleVariants({ variant: field }))}>
        <Typography variant={'h4'} weight={'semibold'}>
          {title}
        </Typography>
      </div>
      <div className={cn(listD1DescriptionVariants({ variant: field }))}>
        <Typography
          variant={'body-small'}
          weight={'light'}
          dangerouslySetInnerHTML={{ __html: decodeIfEscaped(description) }}
        />
      </div>
    </div>
  );
};

export default ListD1;
