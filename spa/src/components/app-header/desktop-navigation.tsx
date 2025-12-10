"use client";

import Link from "next/link";
import * as React from "react";
import { useState } from "react";

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
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export function NavigationMenuDemo() {
  // const isMobile = useIsMobile();
  const pathname = usePathname();
  
  // Find Services menu and set default selected category
  const servicesMenu = menuItems.find((item) => item.title === "Services");
  const defaultCategory = servicesMenu?.content.linkGroups[0]?.links.find(
    (link) => link.subItems && link.subItems.length > 0
  )?.title || null;
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(defaultCategory);

  return (
    <NavigationMenu defaultValue="home">
      <NavigationMenuList className="flex-wrap hidden lg:flex">
        {menuItems.map((item) => {
          // Determine if the mega menu item is active based on the current pathname
          const isActive =
            item.type === "megaMenu" &&
            pathname.startsWith(item.pathCheckPrefix ?? "");
          
          const isServices = item.title === "Services";
          const isResearch = item.title === "Research";
          const isInvestorRelations = item.title === "Investor relations";
          const isAbout = item.title === "About";

          // Render mega menu items with active styling on the trigger
          if (item.type === "megaMenu") {
            return (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger
                  className={
                    isActive
                      ? "text-uobkh-red border-b-2 border-uobkh-red"
                      : ""
                  }
                >
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  {isResearch ? (
                    // Research menu - New 2-column layout
                    <div className="w-screen border-t bg-muted-foreground">
                      <div className="container mx-auto px-4 lg:px-20 max-w-[1280px] py-8">
                        <div className="flex gap-8 relative">
                          {/* Left section - Title and description */}
                          <div className="flex-1 min-w-[300px] border-r-[2px] border-uobkh-steel-grey pr-8">
                            <Typography
                              variant="h3"
                              className="mb-4"
                              style={{
                                fontSize: "28px",
                                lineHeight: "1.2",
                                letterSpacing: "-0.28px",
                              }}
                            >
                              {item.content.intro.title}
                            </Typography>
                            <Typography
                              variant="body-large"
                              weight="light"
                              className="text-uobkh-dark-grey"
                            >
                              {item.content.intro.description}
                            </Typography>
                          </div>

                          {/* Right section - Links list */}
                          <div className="flex-1">
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
                        </div>
                      </div>
                    </div>
                  ) : isInvestorRelations ? (
                    // Investor relations menu - 2-column layout (same as Research)
                    <div className="w-screen border-t bg-muted-foreground">
                      <div className="container mx-auto px-4 lg:px-20 max-w-[1280px] py-8">
                        <div className="flex gap-8 relative">
                          {/* Left section - Title and description */}
                          <div className="flex-1 min-w-[300px] border-r-[2px] border-uobkh-steel-grey pr-8">
                            <Typography
                              variant="h3"
                              className="mb-4"
                              style={{
                                fontSize: "28px",
                                lineHeight: "1.2",
                                letterSpacing: "-0.28px",
                              }}
                            >
                              {item.content.intro.title}
                            </Typography>
                            <Typography
                              variant="body-large"
                              weight="light"
                              className="text-uobkh-dark-grey"
                            >
                              {item.content.intro.description}
                            </Typography>
                          </div>

                          {/* Right section - Links list */}
                          <div className="flex-1">
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
                        </div>
                      </div>
                    </div>
                  ) : isServices ? (
                    // Services menu - New layout with categories and sub-items
                    <div className="w-screen border-t bg-muted-foreground">
                      <div className="container mx-auto px-4 lg:px-20 max-w-[1280px] py-8">
                        <div className="flex gap-8 relative">
                          {/* Left section - Title and description */}
                          <div className="flex-1 min-w-[300px] border-r-[2px] border-uobkh-steel-grey pr-8">
                            <Typography
                              variant="h3"
                              className="mb-4"
                              style={{
                                fontSize: "28px",
                                lineHeight: "1.2",
                                letterSpacing: "-0.28px",
                              }}
                            >
                              {item.content.intro.title}
                            </Typography>
                            <Typography
                              variant="body-large"
                              weight="light"
                              className="text-uobkh-dark-grey"
                            >
                              {item.content.intro.description}
                            </Typography>
                          </div>

                          {/* Right section - Categories and Sub-items in one row */}
                          <div className="flex-1 flex gap-6 relative min-h-[200px]">
                            {/* Categories */}
                            <div className="flex flex-col min-w-[200px]">
                              {item.content.linkGroups[0]?.links.map((link) => {
                                const hasSubItems = link.subItems && link.subItems.length > 0;
                                const isSelected = selectedCategory === link.title;
                                
                                return (
                                  <div
                                    key={link.title}
                                    onClick={() => {
                                      if (hasSubItems) {
                                        setSelectedCategory(isSelected ? null : link.title);
                                      }
                                    }}
                                    className={`flex items-center justify-between py-2 ${
                                      hasSubItems ? "cursor-pointer group" : ""
                                    }`}
                                  >
                                    {hasSubItems ? (
                                      <>
                                        <span
                                          className={`text-sm font-medium transition-colors ${
                                            isSelected
                                              ? "text-uobkh-red"
                                              : "text-secondary-foreground"
                                          }`}
                                          style={{
                                            color: isSelected ? "#c33b32" : undefined,
                                          }}
                                        >
                                          {link.title}
                                        </span>
                                        <div className="flex items-center justify-center w-[24px] h-[24px] shrink-0">
                                          <ChevronRight
                                            className={`w-5 h-5 rotate-0 transition-transform duration-200 ${
                                              isSelected ? "rotate-90" : ""
                                            }`}
                                            style={{
                                              color: isSelected ? "#c33b32" : undefined,
                                            }}
                                          />
                                        </div>
                                      </>
                                    ) : (
                                      <Link href={link.href} className="flex-1">
                                        <span className="text-sm font-medium transition-colors hover:text-accent text-secondary-foreground">
                                          {link.title}
                                        </span>
                                      </Link>
                                    )}
                                  </div>
                                );
                              })}
                            </div>

                            {/* Vertical line 2 - Between categories and sub-items */}
                            {selectedCategory && (
                              <div 
                                className="absolute left-[calc(200px+1.5rem)] top-0 bottom-0 w-[2px] bg-[#dbe0e4] z-10 pointer-events-none"
                                style={{ backgroundColor: '#dbe0e4' }}
                              ></div>
                            )}

                            {/* Sub-items */}
                            {selectedCategory && (
                              <div className="flex flex-col min-w-[200px] pl-6">
                                {item.content.linkGroups[0]?.links
                                  .find((link) => link.title === selectedCategory)
                                  ?.subItems?.map((subItem) => (
                                    <Link
                                      key={subItem.title}
                                      href={subItem.href}
                                      className="py-2 text-sm text-secondary-foreground hover:text-accent transition-colors"
                                    >
                                      {subItem.title}
                                    </Link>
                                  ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : isAbout ? (
                    // About menu - 2-column layout (left 2/3, right 1/3)
                    <div className="w-screen border-t bg-muted-foreground">
                      <div className="container mx-auto px-4 lg:px-20 max-w-[1280px] py-8">
                        <div className="flex gap-8 relative">
                          {/* Left section - Title and description (2/3 width) */}
                          <div className="flex-[2] min-w-[300px] border-r-[2px] border-uobkh-steel-grey pr-8">
                            <Typography
                              variant="h3"
                              className="mb-4"
                              style={{
                                fontSize: "28px",
                                lineHeight: "1.2",
                                letterSpacing: "-0.28px",
                              }}
                            >
                              {item.content.intro.title}
                            </Typography>
                            <Typography
                              variant="body-large"
                              weight="light"
                              className="text-uobkh-dark-grey"
                            >
                              {item.content.intro.description}
                            </Typography>
                          </div>

                          {/* Right section - Links list (1/3 width) */}
                          <div className="flex-1">
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
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Other menus - Original 4-column layout
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
                  )}
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
