import Image from 'next/image';
import TopBar from './top-bar';
import { NavigationMenuDemo } from './desktop-navigation';
import Link from 'next/link';
import MobileNavigation from './mobile-navigation';

export default function AppHeader() {
  return (
    <header className='sticky top-0 bg-white' style={{ zIndex: 100 }}>
      <TopBar />

      <div className='pt-3 shadow-lg relative'>
        <div className='container mx-auto flex justify-between items-center px-2 lg:px-0 relative'>
          <Link href='/'>
            <Image
              src='/assets/uob-color-logo.png'
              alt='UOBKayHian'
              width={170}
              height={34}
            />
          </Link>

          {/* desktop navigation */}
          <NavigationMenuDemo />
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
