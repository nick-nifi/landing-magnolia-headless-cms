import { decodeIfEscaped } from '@/app/services/content-service';
import { cn } from '@/lib/utils';

interface GridColProps {
  span?: { field: string } | string;
  text: string;
}

const GridCol = ({ span = '1', text }: GridColProps) => {
  // Extract value from switchableField structure
  const spanValue = (
    typeof span === 'object' && span?.field ? span.field : span
  ) as string;

  // Map span to Tailwind col-span classes
  const spanClass =
    {
      '1': 'col-span-1',
      '2': 'col-span-2',
      '3': 'col-span-3',
      '4': 'col-span-4',
      '5': 'col-span-5',
      '6': 'col-span-6',
    }[spanValue] || 'col-span-1';

  return (
    <div
      className={cn(spanClass)}
      dangerouslySetInnerHTML={{ __html: decodeIfEscaped(text) }}
    />
  );
};

export default GridCol;
