'use client';
import { MenuIcon, X } from 'lucide-react';
import { Button } from '../ui/button';

import { cn } from '@/lib/utils';
import { useDisclosure } from '@/hooks/use-disclosure';
import { menuItems } from './menu-config';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import Link from 'next/link';
import { Typography } from '../typography';

export default function MobileNavigation() {
  const [showMenu, handler] = useDisclosure();

  return (
    <div className='block lg:hidden'>
      <Button variant={'ghost'} onClick={handler.toggle}>
        {showMenu ? <X /> : <MenuIcon />}
      </Button>

      <div
        className={cn(
          'overlay bg-black/30 absolute top-full left-0 w-full transition-all ease-in-out duration-300',
          {
            'opacity-100 h-screen': showMenu,
            'opacity-0 h-0': !showMenu,
          }
        )}
      >
        {/* Main Menu */}
        <div className='bg-ring h-full'>
          <Accordion type='single' collapsible className='w-full'>
            {menuItems.map(({ content, title, key }) => {
              return (
                <AccordionItem
                  key={key}
                  value={key}
                  className={cn('group data-[state=open]:bg-white')}
                >
                  <div
                    className={cn(
                      'border-b border-b data-[state=open]:border-b-primary'
                    )}
                  >
                    <AccordionTrigger className={cn('rounded-none px-5')}>
                      <Typography variant={'body-small'} weight={'medium'}>
                        {title}
                      </Typography>
                    </AccordionTrigger>
                  </div>

                  <AccordionContent className='px-5'>
                    {content.linkGroups.map((linkGroup, index) => (
                      <div key={index}>
                        {linkGroup.links.map((link, index) => (
                          <Link
                            key={index}
                            href={link.href}
                            className='block py-2'
                          >
                            <Typography variant={'body-small'} weight={'light'}>
                              {link.title}
                            </Typography>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
