import { EditableArea } from '@magnolia/react-editor';
import { MgnlContent } from '@magnolia/frontend-helpers-base';
import { cn } from '@/lib/utils';

interface GridProps {
  cols?: { field: string } | string;
  rows?: { field: string } | string;
  gutter?: string;
  customCss?: string;
  row1?: MgnlContent;
  row2?: MgnlContent;
  row3?: MgnlContent;
  row4?: MgnlContent;
  row5?: MgnlContent;
  row6?: MgnlContent;
  row7?: MgnlContent;
  row8?: MgnlContent;
  row9?: MgnlContent;
  row10?: MgnlContent;
  row11?: MgnlContent;
  row12?: MgnlContent;
}

const Grid = ({
  cols = '12',
  rows = '1',
  gutter = '4',
  customCss = '',
  row1,
  row2,
  row3,
  row4,
  row5,
  row6,
  row7,
  row8,
  row9,
  row10,
  row11,
  row12,
}: GridProps) => {
  // Extract values from switchableField structure
  const colsValue = (
    typeof cols === 'object' && cols?.field ? cols.field : cols
  ) as string;
  const rowsValue = (
    typeof rows === 'object' && rows?.field ? rows.field : rows
  ) as string;

  // Map cols to Tailwind grid-cols classes
  const colsClass =
    {
      '1': 'grid-cols-1',
      '2': 'grid-cols-2',
      '3': 'grid-cols-3',
      '4': 'grid-cols-4',
      '5': 'grid-cols-5',
      '6': 'grid-cols-6',
      '7': 'grid-cols-7',
      '8': 'grid-cols-8',
      '9': 'grid-cols-9',
      '10': 'grid-cols-10',
      '11': 'grid-cols-11',
      '12': 'grid-cols-12',
    }[colsValue] || 'grid-cols-12';

  // Map rows to Tailwind grid-rows classes
  const rowsClass =
    {
      '1': 'grid-rows-1',
      '2': 'grid-rows-2',
      '3': 'grid-rows-3',
      '4': 'grid-rows-4',
      '5': 'grid-rows-5',
      '6': 'grid-rows-6',
      '7': 'grid-rows-7',
      '8': 'grid-rows-8',
      '9': 'grid-rows-9',
      '10': 'grid-rows-10',
      '11': 'grid-rows-11',
      '12': 'grid-rows-12',
    }[rowsValue] || 'grid-rows-1';

  // Map gutter to Tailwind gap classes
  const gapClass = gutter ? `gap-${gutter}` : 'gap-4';

  // Get all row areas
  const rowAreas = [
    row1,
    row2,
    row3,
    row4,
    row5,
    row6,
    row7,
    row8,
    row9,
    row10,
    row11,
    row12,
  ];

  // Get the number of rows to render
  const rowCount = parseInt(rowsValue, 10) || 1;

  return (
    <div className={cn('grid', colsClass, rowsClass, gapClass, customCss)}>
      {Array.from({ length: rowCount }).map((_, index) => {
        const currentRow = rowAreas[index];
        return currentRow ? (
          <EditableArea key={`row-${index}`} content={currentRow} />
        ) : null;
      })}
    </div>
  );
};

export default Grid;
