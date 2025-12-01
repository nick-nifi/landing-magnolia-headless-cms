import { environment } from '@/environments/environment';
import { cn } from '@/lib/utils';
import {
  EditorContextService,
  MgnlContent,
} from '@magnolia/frontend-helpers-base';
import { EditableArea, EditableComponent } from '@magnolia/react-editor';
import React from 'react';

export type Screen = 'mobile' | 'tablet' | 'desktop';

export interface GridNode {
  '@id': string;
  '@nodes'?: string[];
  // You can extend this with content for each grid item
  title?: string;
  content?: string;
}

export interface MultiFieldNode {
  screen: Screen;
  value: string;
}

export interface MultiField {
  '@nodes': string[];
  [key: string]: MultiFieldNode | string[];
}

export interface GridProps {
  x_gap: MultiField;
  y_gap: MultiField;
  cols: MultiField;
  items: string; // number of items selected
  [key: string]: GridNode | MultiField | string | undefined; // for item1, item2, ...
}

interface IGridProps {
  x_gap: MultiField;
  y_gap: MultiField;
  cols: MultiField;
  items: string; // number of items selected
  item1?: MgnlContent;
  item2?: MgnlContent;
  item3?: MgnlContent;
  item4?: MgnlContent;
  item5?: MgnlContent;
  item6?: MgnlContent;
  item7?: MgnlContent;
  item8?: MgnlContent;
  item9?: MgnlContent;
  item10?: MgnlContent;
  item11?: MgnlContent;
  item12?: MgnlContent;
  customClass?: string;
}

const Grid: React.FC<IGridProps> = ({
  cols,
  item1,
  item10,
  item11,
  item12,
  item2,
  item3,
  item4,
  item5,
  item6,
  item7,
  item8,
  item9,
  x_gap,
  y_gap,
  items: noOfItems,
  customClass,
}) => {
  const _noOfItems = parseInt(noOfItems, 10);

  const getComponents = (content: MgnlContent | undefined) => {
    return content?.['@nodes']?.map((nodeName) => content[nodeName]) || [];
  };

  const classGridCols = buildGridCols(cols);
  const classGridX = buildXGap(x_gap);
  const classGridY = buildYGap(y_gap);

  const items = [
    item1,
    item2,
    item3,
    item4,
    item5,
    item6,
    item7,
    item8,
    item9,
    item10,
    item11,
    item12,
  ];

  const magnoliaContext = EditorContextService.getMagnoliaContext(
    '',
    '',
    environment.languages
  );

  return (
    <div
      className={cn('grid', classGridX, classGridY, classGridCols, customClass)}
    >
      {Array.from({ length: _noOfItems }).map((_, index) => {
        const currentItem = items[index];
        return (
          <div key={`grid-item-${index}`} className='h-full'>
            <EditableArea
              key={`grid-item-${index}`}
              content={currentItem}
              className={cn({
                'h-full': !magnoliaContext.isMagnoliaEdit,
              })}
            >
              {getComponents(currentItem).map((component) => (
                <EditableComponent
                  key={(component as MgnlContent)['@name'] as string}
                  content={component as MgnlContent}
                />
              ))}
            </EditableArea>
          </div>
        );
      })}
    </div>
  );
};

function buildXGap(xGap: MultiField) {
  const nodeKeys = xGap['@nodes'] || [];

  const defaultValues = nodeKeys.map((key) => {
    const node = xGap[key] as MultiFieldNode;
    return [node.screen, node.value];
  });

  return defaultValues
    .map(([screen, value]) => {
      switch (screen) {
        case 'mobile':
          return `gap-x-${value}`;
        case 'tablet':
          return `md:gap-x-${value}`;
        case 'desktop':
          return `lg:gap-x-${value}`;

        default:
          return '';
      }
    })
    .join(' ');
}

function buildYGap(yGap: MultiField) {
  const nodeKeys = yGap['@nodes'] || [];

  const defaultValues = nodeKeys.map((key) => {
    const node = yGap[key] as MultiFieldNode;
    return [node.screen, node.value];
  });

  return defaultValues.map(([screen, value]) => {
    switch (screen) {
      case 'mobile':
        return `gap-y-${value}`;
      case 'tablet':
        return `md:gap-y-${value}`;
      case 'desktop':
        return `lg:gap-y-${value}`;

      default:
        return '';
    }
  });
}

function buildGridCols(cols: MultiField) {
  const nodeKeys = cols['@nodes'] || [];

  const defaultValues = nodeKeys.map((key) => {
    const node = cols[key] as MultiFieldNode;
    return [node.screen, node.value];
  });

  return defaultValues
    .map(([screen, value]) => {
      switch (screen) {
        case 'mobile':
          return `sm:grid-cols-${value}`;
        case 'tablet':
          return `md:grid-cols-${value}`;
        case 'desktop':
          return `lg:grid-cols-${value}`;

        default:
          return '';
      }
    })
    .join(' ');
}

export default Grid;
