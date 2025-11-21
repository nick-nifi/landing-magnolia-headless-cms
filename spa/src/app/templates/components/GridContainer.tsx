import React from 'react';
import { EditableArea, EditableComponent } from '@magnolia/react-editor';
import { MgnlContent } from '@magnolia/frontend-helpers-base';
import { Typography } from '@/components/typography';
import { cn } from '@/lib/utils';

interface ContainerConfig {
  field: 'rows' | 'columns';
  count: number;
}

interface GapItem {
  screen: 'mobile' | 'tablet' | 'desktop' | 'widescreen';
  size: number;
}

interface GapConfig {
  '@nodes': string[];
  [key: string]: GapItem | string[];
}

interface ItemsItem {
  screen: 'mobile' | 'tablet' | 'desktop' | 'widescreen';
  count: number | string;
}

interface ItemsConfig {
  '@nodes': string[];
  [key: string]: ItemsItem | string[];
}

interface IGridContainerProps {
  title: string;
  subtitle?: string;
  container: ContainerConfig;
  item1?: MgnlContent;
  item2?: MgnlContent;
  item3?: MgnlContent;
  item4?: MgnlContent;
  item5?: MgnlContent;
  gap: GapConfig;
  items: ItemsConfig;
}

const GridContainer: React.FC<IGridContainerProps> = ({
  title,
  subtitle,
  container,
  item1,
  item2,
  item3,
  item4,
  item5,
  gap,
  items: itemsConfig,
}) => {
  const getComponents = (content: MgnlContent | undefined) => {
    return content?.['@nodes']?.map((nodeName) => content[nodeName]) || [];
  };

  // const isColumns = container.field === 'columns';
  const count = +container.count;
  const _items = [item1, item2, item3, item4, item5];

  return (
    <section data-name='flexible-c1' className='py-12 md:py-16 lg:py-28'>
      <div className='mb-12 md:mb-16 lg:mb-20 text-center'>
        <Typography
          variant={'h2'}
          className={cn('text-center', { 'mb-2': !!subtitle })}
          weight={'light'}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant={'body-small'}
            className='text-center'
            weight={'light'}
          >
            {subtitle}
          </Typography>
        )}
      </div>

      <div className='container mx-auto px-1 lg:px-0'>
        <div
          className={`grid ${getItemsClass(itemsConfig)} ${getGapTailwindPixels(gap)} gap-6`}
        >
          {Array.from({ length: count }).map((_, index) => {
            const currentItem = _items[index];
            return (
              <div
                key={`item-${index}`}
                className={`items-center justify-center`}
              >
                {currentItem && (
                  <EditableArea content={currentItem}>
                    {getComponents(currentItem).map((component) => (
                      <EditableComponent
                        key={(component as MgnlContent)['@name'] as string}
                        content={component as MgnlContent}
                      />
                    ))}
                  </EditableArea>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export function getGapTailwindPixels(gapConfig: GapConfig): string {
  if (!gapConfig || !gapConfig['@nodes'] || gapConfig['@nodes'].length === 0)
    return '';

  const screenPrefixMap: Record<GapItem['screen'], string> = {
    mobile: '', // default
    tablet: 'md',
    desktop: 'lg',
    widescreen: 'xl',
  };

  const classes: string[] = [];

  for (const nodeName of gapConfig['@nodes']) {
    const node: GapItem = gapConfig[nodeName] as GapItem;
    if (!node || node.size == null || !node.screen) continue;

    const prefix = screenPrefixMap[node.screen];
    const className = prefix
      ? `${prefix}:gap-[${node.size}px]`
      : `gap-[${node.size}px]`;
    classes.push(className);
  }

  return classes.join(' ');
}

export function getItemsClass(itemsConfig: ItemsConfig): string {
  if (
    !itemsConfig ||
    !itemsConfig['@nodes'] ||
    itemsConfig['@nodes'].length === 0
  )
    return '';

  const screenPrefixMap: Record<ItemsItem['screen'], string> = {
    mobile: '', // default
    tablet: 'md',
    desktop: 'lg',
    widescreen: 'xl',
  };

  const classes: string[] = [];

  for (const nodeName of itemsConfig['@nodes']) {
    const node: ItemsItem = itemsConfig[nodeName] as ItemsItem;
    if (!node || !node.count || !node.screen) continue;

    const prefix = screenPrefixMap[node.screen];
    const className = prefix
      ? `${prefix}:grid-cols-${node.count}`
      : `grid-cols-${node.count}`;
    classes.push(className);
  }

  return classes.join(' ');
}

export default GridContainer;
