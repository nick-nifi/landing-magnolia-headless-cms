import React from 'react';
import { decodeIfEscaped } from '../../services/content-service';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import IconWrapper from '@/components/icon-wrapper';
import { Typography } from '@/components/typography';

interface TimelineNode {
  '@id': string;
  '@nodes'?: string[];
  expanded?: boolean;
  title?: string;
  description?: string;
  content?: string;
}

interface TimelineData {
  '@nodes'?: string[];
  [key: string]: TimelineNode | string[] | undefined;
}

interface ITimelineL1Props {
  timelineItems: TimelineData;
}

const TimelineL1: React.FC<ITimelineL1Props> = ({ timelineItems }) => {
  const nodeKeys = timelineItems['@nodes'] || [];

  return (
    <>
      <ScrollArea className='w-full whitespace-nowrap'>
        <div className='flex w-max space-x-8 p-4 pt-0 border-t border-t-primary border-t-8'>
          {nodeKeys.map((key) => {
            const node = timelineItems[key] as TimelineNode;
            return (
              <div
                key={node['@id']}
                className='shrink-0 p-6 pt-0 rounded-lg w-[350px] space-y-2 text-left'
              >
                <div className='flex-shrink-0 mb-8'>
                  <IconWrapper name='line8' className='w-[6px] h-[71px]' />
                </div>
                <Typography
                  variant='h4'
                  weight='regular'
                  className='whitespace-normal'
                >
                  {node.title}
                </Typography>

                {node.description && (
                  <Typography
                    variant='body-large'
                    weight='light'
                    className='whitespace-normal'
                    dangerouslySetInnerHTML={{
                      __html: decodeIfEscaped(node.description),
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>

      <div className='flex items-center justify-center'>
        <div className='flex items-center justify-center bg-white rounded-full lg:w-[70px] lg:h-[70px] w-[50px] h-[50px]'>
          <IconWrapper name='handScrool' width={30} height={30} />
        </div>
      </div>
    </>
  );
};

export default TimelineL1;
