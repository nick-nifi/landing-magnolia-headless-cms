'use client';

import Link from 'next/link';
import * as React from 'react';

// import { useIsMobile } from "@/hooks/use-mobile";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Grid } from '../grid';
import { Typography } from '../typography';
import FeatureListItem from './feature-list-item';
import { menuItems } from './menu-config';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function NavigationMenuDemo() {
  // const isMobile = useIsMobile();
  const pathname = usePathname();

  return (
    <NavigationMenu defaultValue='home'>
      <NavigationMenuList className='flex-wrap hidden lg:flex'>
        {menuItems.map((item) => {
          // Determine if the mega menu item is active based on the current pathname
          const isActive =
            item.type === 'megaMenu' &&
            pathname.startsWith(item.pathCheckPrefix ?? '');

          // Render mega menu items with active styling on the trigger
          if (item.type === 'megaMenu') {
            return (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger
                  className={
                    isActive
                      ? 'text-primary border-b border-b-4 border-primary'
                      : ''
                  }
                >
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className='w-screen border-t'>
                    <Grid cols={4} gap={0}>
                      <Grid>
                        <div className='relative'>
                          <Image
                            src={item.content.intro.imageUrl}
                            alt={item.content.intro.title}
                            fill
                            unoptimized
                            className='object-cover'
                          />
                        </div>
                      </Grid>
                      <Grid className='bg-muted-foreground'>
                        <div className='py-8 px-6'>
                          <Typography variant='h3' className='mb-[14px]'>
                            {item.title}
                          </Typography>
                          <Typography variant='body-small'>
                            {item.content.intro.description}
                          </Typography>
                        </div>
                      </Grid>
                      <Grid className='bg-muted-foreground'>
                        <div className='py-8 px-6'>
                          {item.content.linkGroups.map((group, index) => (
                            <ul key={index} className='flex flex-col space-y-3'>
                              {group.links.map((link) => (
                                <li key={link.title}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={link.href}
                                      className='text-sm text-secondary-foreground transition-colors hover:text-accent'
                                    >
                                      {link.title}
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          ))}
                        </div>
                      </Grid>
                      <Grid className='bg-secondary'>
                        <div className='py-8 px-6'>
                          <Typography
                            variant='body-large'
                            className='font-semibold mb-6'
                          >
                            Featured
                          </Typography>
                          <div className='flex flex-col gap-6'>
                            {item.content.featured.items.map(
                              (featureItem, idx) => (
                                <FeatureListItem key={idx} {...featureItem}>
                                  {featureItem.description}
                                </FeatureListItem>
                              )
                            )}
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

          return null;
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
