'use client';
import React from 'react';
import { decodeIfEscaped } from '@/app/services/content-service';
import {
  Accordion as AccordionRoot,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Typography } from '@/components/typography';

interface AccordionNode {
  '@id': string;
  '@nodes'?: string[];
  expanded?: boolean;
  title?: string;
  description?: string;
  content?: string;
}

interface AccordionData {
  '@nodes'?: string[];
  [key: string]: AccordionNode | string[] | undefined;
}

interface IAccordionProps {
  accordion: AccordionData;
}

const Accordion: React.FC<IAccordionProps> = ({ accordion }) => {
  const nodeKeys = accordion['@nodes'] || [];

  // Get default expanded items
  const defaultValue = nodeKeys
    .filter((key) => {
      const node = accordion[key] as AccordionNode;
      return node?.expanded;
    })
    .map((key) => {
      const node = accordion[key] as AccordionNode;
      return node['@id'];
    });

  return (
    <AccordionRoot
      type='multiple'
      defaultValue={defaultValue}
      className='w-full'
    >
      {nodeKeys.map((key) => {
        const node = accordion[key] as AccordionNode;

        return (
          <AccordionItem key={node['@id']} value={node['@id']}>
            <AccordionTrigger>
              <div className='flex items-center justify-between pr-4'>
                <Typography variant='h4'>{node.title}</Typography>
                {node.description && (
                  <Typography variant='body-large' className='pl-4'>
                    {node.description}
                  </Typography>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {node.content && (
                <Typography
                  variant={'body-large'}
                  weight={'light'}
                  dangerouslySetInnerHTML={{
                    __html: decodeIfEscaped(node.content),
                  }}
                />
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </AccordionRoot>
  );
};

export default Accordion;
