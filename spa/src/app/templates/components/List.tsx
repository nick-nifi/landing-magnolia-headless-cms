import { MgnlContent } from '@magnolia/frontend-helpers-base';
import { EditableArea, EditableComponent } from '@magnolia/react-editor';
import classnames from 'classnames';

const List = ({
  title,
  theme,
  items,
}: {
  title: string;
  theme: string;
  items: MgnlContent;
}) => {
  const getComponents = () => {
    return (
      (items?.['@nodes']?.map((nodeName) => {
        return items[nodeName];
      }) as MgnlContent[]) || []
    );
  };
  return (
    <div
      className={classnames('px-8', 'py-6', {
        'bg-dark-teal': theme === 'dark',
      })}
    >
      <p
        className={classnames('pb-4', {
          'text-light-green': theme === 'dark',
          'text-dark-teal': theme === 'light',
        })}
      >
        {title}
      </p>
      {items && (
        <EditableArea content={items} elementType='ul' className='space-y-2'>
          {getComponents().map((component) => {
            return (
              <li key={component['@name']}>
                <EditableComponent content={component} />
              </li>
            );
          })}
        </EditableArea>
      )}
    </div>
  );
};

export default List;
