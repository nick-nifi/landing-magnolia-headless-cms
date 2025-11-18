import { decodeIfEscaped } from '../../services/content-service';

const Text = ({ text }: { text: string }) => {
  return (
    <div
      className='py-6 px-8 bg-light-green'
      dangerouslySetInnerHTML={{ __html: decodeIfEscaped(text) }}
    ></div>
  );
};

export default Text;
