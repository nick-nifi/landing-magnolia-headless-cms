import { MgnlContent } from '@magnolia/frontend-helpers-base';
import Image from '../fragments/Image';
import { decodeIfEscaped } from '../../services/content-service';

const TextImage = ({
  image,
  altText,
  text,
  caption,
}: {
  image: MgnlContent;
  altText: string;
  text: string;
  caption: string;
}) => {
  return (
    <div className='py-6 px-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div dangerouslySetInnerHTML={{ __html: decodeIfEscaped(text) }} />
        <Image image={image} alt={altText} caption={caption} />
      </div>
    </div>
  );
};

export default TextImage;
