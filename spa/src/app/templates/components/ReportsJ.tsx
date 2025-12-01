import { EditableArea, EditableComponent } from '@magnolia/react-editor';
import { MgnlContent } from '@magnolia/frontend-helpers-base';
import React from 'react';

interface IReportsJProps {
  reports?: MgnlContent;
  pagination?: MgnlContent;
}

const ReportsJ: React.FC<IReportsJProps> = ({ reports, pagination }) => {
  const getComponents = (content: MgnlContent | undefined) => {
    return content?.['@nodes']?.map((nodeName) => content[nodeName]) || [];
  };

  return (
    <div
      data-name='J / Reports'
      className='bg-[#dbe0e4] flex flex-col gap-20 items-center px-[160px] py-16 w-full'
    >
      <div className='flex flex-col gap-8 items-center max-w-[1280px] w-full'>
        {/* Reports Area */}
        {reports && (
          <div className='flex flex-col gap-8 items-start w-full'>
            <EditableArea content={reports} />
          </div>
        )}

        {/* Pagination */}
        {pagination && (
          <div className='flex flex-col gap-4 items-center max-w-[1024px] w-full'>
            <EditableArea content={pagination} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsJ;

