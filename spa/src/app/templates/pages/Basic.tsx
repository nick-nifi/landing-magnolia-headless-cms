import { MgnlContent } from '@magnolia/frontend-helpers-base';
import { EditableArea } from '@magnolia/react-editor';
import Footer from '../fragments/Footer';

const Basic = ({
  title,
  main,
  footer,
}: {
  title?: string;
  main: MgnlContent;
  footer: MgnlContent;
}) => {
  return (
    <div className='flex flex-col justify-between min-h-[calc(100vh-5rem)]'>
      {title &&
        <header className="hidden">
          <h1 className="sr-only">{title}</h1>
        </header>
      }

      <main>{main && <EditableArea content={main} />}</main>

      {footer && (
        <EditableArea
          className={'bg-dark-teal text-white px-8'}
          content={footer}
          customView={Footer}
        />
      )}
    </div>
  );
};

export default Basic;
