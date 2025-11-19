"use client";

import Link from "next/link";
import * as React from "react";

// import { useIsMobile } from "@/hooks/use-mobile";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Grid } from "../grid";
import { Typography } from "../typography";
import FeatureListItem from "./feature-list-item";
import { menuItems } from "./menu-config";
import Image from "next/image";

export function NavigationMenuDemo() {
  // const isMobile = useIsMobile();

  return (
    <NavigationMenu defaultValue="home">
      <NavigationMenuList className="flex-wrap hidden lg:flex">
        {menuItems.map((item) => {
          // Kiểm tra xem link có active không
          // const isActive =
          //   item.type === "link"
          //     ? pathname === item.href
          //     : pathname.startsWith(item.pathCheckPrefix);

          // if (item.type === "link") {
          //   return (
          //     <NavigationMenuItem key={item.title}>
          //       <Link href={item.href} legacyBehavior passHref>
          //         <NavigationMenuLink active={isActive}>
          //           {item.title}
          //         </NavigationMenuLink>
          //       </Link>
          //     </NavigationMenuItem>
          //   );
          // }

          if (item.type === "megaMenu") {
            return (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-screen border-t">
                    <Grid cols={4} gap={0}>
                      <Grid>
                        <div className="relative">
                          <Image
                            src={item.content.intro.imageUrl}
                            alt={item.content.intro.title}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                      </Grid>
                      <Grid className="bg-muted-foreground">
                        <div className="py-8 px-6">
                          <Typography variant="h3" className="mb-[14px]">
                            {item.title}
                          </Typography>
                          <Typography variant="body-small">
                            {item.content.intro.description}
                          </Typography>
                        </div>
                      </Grid>
                      <Grid className="bg-muted-foreground">
                        <div className="py-8 px-6">
                          {item.content.linkGroups.map((group, index) => (
                            <ul key={index} className="flex flex-col space-y-3">
                              {group.links.map((link) => (
                                <li key={link.title}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={link.href}
                                      className="text-sm text-secondary-foreground transition-colors hover:text-accent"
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
                      <Grid className="bg-secondary">
                        <div className="py-8 px-6">
                          <Typography
                            variant="body-large"
                            className="font-semibold mb-6"
                          >
                            Featured
                          </Typography>

                          <div className="flex flex-col gap-6">
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

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
