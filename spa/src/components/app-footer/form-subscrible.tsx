import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function FormSubscrible() {
  return (
    <form className='flex flex-col gap-4'>
      <Input placeholder='Name*' />
      <Input placeholder='Email*' type='email' />
      <div>
        <Button variant={'outline'}>
          Subscrible <ArrowRight />
        </Button>
      </div>
    </form>
  );
}
