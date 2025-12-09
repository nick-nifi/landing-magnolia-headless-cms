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
                  <div className='w-screen border-t bg-background'>
                    <div className='container mx-auto'>
                      <Grid cols={12} gap={0} className='min-h-[360px]'>
                        {/* Column 1: Intro (Image & Text) */}
                        <div className='col-span-3 relative group overflow-hidden'>
                          <Image
                            src={item.content.intro.imageUrl}
                            alt={item.content.intro.title}
                            fill
                            unoptimized
                            className='object-cover transition-transform duration-700 group-hover:scale-105'
                          />
                          {/* Overlay for better text readability if needed, or gradient */}
                          <div className='absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors' />

                          <div className='absolute bottom-0 left-0 p-8 text-white z-10'>
                            <Typography
                              variant='h3'
                              className='mb-3 text-white font-bold'
                            >
                              {item.content.intro.title}
                            </Typography>
                            <Typography
                              variant='body-small'
                              className='text-white/90 line-clamp-3'
                            >
                              {item.content.intro.description}
                            </Typography>
                          </div>
                        </div>

                        {/* Column 2: Links */}
                        <div className='col-span-5 bg-muted/30 p-8'>
                          <div className='grid grid-cols-2 gap-8'>
                            {item.content.linkGroups.map((group, index) => (
                              <ul key={index} className='space-y-4'>
                                {group.links.map((link) => (
                                  <li key={link.title}>
                                    <NavigationMenuLink asChild>
                                      <Link
                                        href={link.href}
                                        className='block text-base font-medium text-foreground/80 hover:text-primary transition-colors hover:translate-x-1 duration-200'
                                      >
                                        {link.title}
                                      </Link>
                                    </NavigationMenuLink>
                                  </li>
                                ))}
                              </ul>
                            ))}
                          </div>
                        </div>

                        {/* Column 3: Featured */}
                        <div className='col-span-4 bg-secondary/50 p-8'>
                          <div className='flex items-center justify-between mb-6'>
                            <Typography
                              variant='body-large'
                              className='font-bold'
                            >
                              Featured
                            </Typography>
                            {/* Optional: Add a "View All" link here if needed */}
                          </div>
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
                    </div>
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
