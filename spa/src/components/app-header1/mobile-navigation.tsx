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
            'opacity-0 h-0 pointer-events-none': !showMenu,
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
                  className={cn('px-5 data-[state=open]:bg-white group')}
                >
                  <AccordionTrigger
                    className={cn(
                      'border-b rounded-none',
                      'group-data-[state=open]:border-b-primary'
                    )}
                  >
                    <Typography variant={'body-small'} weight={'medium'}>
                      {title}
                    </Typography>
                  </AccordionTrigger>
                  <AccordionContent>
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
