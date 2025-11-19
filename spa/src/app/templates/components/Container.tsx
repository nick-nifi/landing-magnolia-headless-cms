import React from 'react';
import { EditableArea, EditableComponent } from '@magnolia/react-editor';
import { MgnlContent } from '@magnolia/frontend-helpers-base';

interface ContainerConfig {
  field: 'rows' | 'columns';
  count: number;
}

interface IContainerProps {
  container: ContainerConfig;
  title?: string;
  item1?: MgnlContent;
  item2?: MgnlContent;
  item3?: MgnlContent;
  item4?: MgnlContent;
  item5?: MgnlContent;
}

const Container: React.FC<IContainerProps> = ({
  container,
  title = '',
  item1,
  item2,
  item3,
  item4,
  item5,
}) => {
  const getComponents = (content: MgnlContent | undefined) => {
    return content?.['@nodes']?.map((nodeName) => content[nodeName]) || [];
  };

  const isColumns = container.field === 'columns';
  const { count } = container;
  const items = [item1, item2, item3, item4, item5];

  return (
    <div className='p-2'>
      <div className={`flex ${isColumns ? 'flex-row' : 'flex-col'} gap-4`}>
        {Array.from({ length: count }).map((_, index) => {
          const currentItem = items[index];
          return (
            <div
              key={`${isColumns ? 'column' : 'row'}-${index}`}
              className={`${isColumns ? 'flex-1 ' : ''}items-center justify-center p-4`}
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
  );
};

export default Container;
