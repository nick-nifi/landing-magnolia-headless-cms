"use client";
import { Typography } from "@/components/typography";
import { useState, ReactNode, useEffect, useCallback, useMemo, useRef, startTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { environment } from "@/environments/environment";

interface MenuItem {
  id: string;
  label: string;
  isActive?: boolean;
  href?: string;
  '@name'?: string;
  '@path'?: string;
  '@id'?: string;
  '@nodeType'?: string;
  linkChooser?: {
    field?: 'noLink' | 'internalPageLink' | 'externalPageLink';
    internalLink?: string;
    externalLink?: string;
  };
}

interface SpecialMenuProps {
  items?: MenuItem[];
  menuItems?: MenuItem[] | Record<string, MenuItem>;
  onItemChange?: (itemId: string) => void;
  category?: string;
  children?: ReactNode;
}

// Helper function to convert Magnolia object to array
const getMenuItemsArray = (items: MenuItem[] | Record<string, MenuItem> | undefined): MenuItem[] => {
  if (!items) return [];
  if (Array.isArray(items)) return items.filter(item => item && item.id && item.label);
  
  // Convert object to array, filtering out metadata keys and invalid items
  return Object.entries(items)
    .filter(([key, value]) => {
      // Skip metadata keys
      if (key.startsWith('@')) return false;
      // Skip if value is not an object or doesn't have required fields
      if (!value || typeof value !== 'object') return false;
      if (!value.id || !value.label) return false;
      return true;
    })
    .map(([, value]) => value);
};

// Helper function to get href from linkChooser
const getHref = (item: MenuItem): string | undefined => {
  if (!item.linkChooser || item.linkChooser.field === 'noLink') {
    return undefined;
  }
  if (item.linkChooser.field === 'externalPageLink') {
    return item.linkChooser.externalLink;
  }
  if (item.linkChooser.field === 'internalPageLink') {
    let link = item.linkChooser.internalLink;
    if (!link) return undefined;
    
    // Remove appBase if exists (like other components do)
    if (link.startsWith(environment.appBase)) {
      link = link.slice(environment.appBase.length);
      if (!link.startsWith('/')) {
        link = '/' + link;
      }
    }
    
    return link;
  }
  return undefined;
};

export default function SpecialMenu({
  items: itemsProp,
  menuItems,
  onItemChange,
  category,
  children,
}: SpecialMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Get active tab from URL query params - prioritize URL params
  // Trim and normalize the value to handle edge cases
  const activeTabFromUrlRaw = searchParams.get("tab");
  const activeTabFromUrl = activeTabFromUrlRaw ? activeTabFromUrlRaw.trim() : null;
  
  // Memoize items to prevent unnecessary re-renders
  const items = useMemo(() => {
    const magnoliaItems = getMenuItemsArray(menuItems);
    return itemsProp || magnoliaItems.map(item => ({
      id: item.id,
      label: item.label,
      isActive: item.isActive,
      href: getHref(item),
    }));
  }, [itemsProp, menuItems]);
  
  // Initialize activeId - default to empty, will be set by useEffect
  const [activeId, setActiveId] = useState<string>("");
  
  // Track if we're navigating to prevent flicker
  const isNavigatingRef = useRef(false);
  const previousPathnameRef = useRef(pathname);
  const previousTabRef = useRef<string | null>(null);

  // Sync activeId with URL params when they change - prioritize URL params
  useEffect(() => {
    // Always prioritize URL params if they exist and are valid
    if (activeTabFromUrl) {
      // Normalize for comparison
      const normalizedUrlTab = activeTabFromUrl.trim();
      
      // Check if the tab from URL exists in items (normalize item IDs too)
      const tabExists = items.some(item => item.id?.trim() === normalizedUrlTab);
      
      if (tabExists) {
        // Update if URL param changed or activeId is different
        const currentActiveId = activeId?.trim() || "";
        if (previousTabRef.current !== normalizedUrlTab || currentActiveId !== normalizedUrlTab) {
          setActiveId(normalizedUrlTab);
          previousTabRef.current = normalizedUrlTab;
        }
        return;
      }
    }
    
    // If no URL param or URL param doesn't exist in items
    if (!activeTabFromUrl) {
      previousTabRef.current = null;
      
      // Check category
      if (category) {
        const normalizedCategory = category.trim();
        const categoryExists = items.some(item => item.id?.trim() === normalizedCategory);
        const currentActiveId = activeId?.trim() || "";
        
        if (categoryExists && currentActiveId !== normalizedCategory) {
          setActiveId(normalizedCategory);
          return;
        }
      }
      
      // Default to first item if available and not already set
      if (items.length > 0) {
        const firstItemId = items[0].id?.trim();
        const currentActiveId = activeId?.trim() || "";
        
        if (firstItemId && currentActiveId !== firstItemId) {
          setActiveId(firstItemId);
        }
      }
    }
  }, [activeTabFromUrl, items, activeId, category]);

  // Restore scroll position only when pathname actually changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPosition = sessionStorage.getItem("specialMenuScrollPosition");
      const pathnameChanged = previousPathnameRef.current !== pathname;
      
      if (savedPosition && (pathnameChanged || activeTabFromUrl)) {
        // Wait a bit longer to ensure content is fully loaded
        const restoreScroll = () => {
          const position = parseInt(savedPosition, 10);
          // Use scrollTo with x, y coordinates for instant scroll (no animation)
          window.scrollTo(0, position);
          sessionStorage.removeItem("specialMenuScrollPosition");
          isNavigatingRef.current = false;
        };
        
        // Use double RAF for better timing - ensures DOM is fully ready
        requestAnimationFrame(() => {
          requestAnimationFrame(restoreScroll);
        });
      } else if (!savedPosition) {
        isNavigatingRef.current = false;
      }
      
      previousPathnameRef.current = pathname;
    }
  }, [pathname, activeTabFromUrl]);

  const handleItemClick = useCallback((id: string, href?: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    
    // Don't do anything if clicking the same tab
    if (id === activeId || id === activeTabFromUrl) {
      return;
    }
    
    // Mark as navigating to prevent flicker
    isNavigatingRef.current = true;
    
    // Save current scroll position before changing tab/page
    if (typeof window !== "undefined") {
      const currentScroll = window.scrollY;
      sessionStorage.setItem("specialMenuScrollPosition", currentScroll.toString());
    }
    
    // Update state immediately for smooth UI feedback
    setActiveId(id);
    onItemChange?.(id);
    
    // Use startTransition for smooth navigation
    startTransition(() => {
      // If item has href, navigate to that page with tab query param
      if (href) {
        // Check if it's an external link
        if (href.startsWith('http://') || href.startsWith('https://')) {
          // For external links, navigate normally (will lose scroll position)
          window.location.href = href;
          return;
        }
        
        // For internal links, process the path and add tab query param
        let processedPath = href;
        
        // Remove appBase if still exists
        if (processedPath.startsWith(environment.appBase)) {
          processedPath = processedPath.slice(environment.appBase.length);
        }
        
        // Remove leading slash
        if (processedPath.startsWith('/')) {
          processedPath = processedPath.substring(1);
        }
        
        // Remove 'home/' prefix if exists (case-insensitive, anywhere in path)
        // Handle both 'home/' at start and '/home/' in middle
        processedPath = processedPath.replace(/^home\//i, '').replace(/\/home\//i, '/');
        
        // Remove trailing slash if exists
        if (processedPath.endsWith('/')) {
          processedPath = processedPath.slice(0, -1);
        }
        
        // Remove existing query params if any
        const [pathPart] = processedPath.split('?');
        
        // Clean up any double slashes
        const cleanPath = pathPart.replace(/\/+/g, '/');
        
        // Build final path with tab query param
        const finalPath = `/${cleanPath}?tab=${id}`;
        
        // Navigate with scroll: false to preserve scroll position
        router.push(finalPath, { scroll: false });
      } else {
        // If no href, just update query param on current page
        const params = new URLSearchParams(searchParams.toString());
        params.set("tab", id);
        
        // Use replace to avoid adding to history and prevent scroll
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      }
    });
  }, [router, pathname, searchParams, onItemChange, activeId, activeTabFromUrl]);

  // Memoize active state calculation - prioritize URL params
  const getIsActive = useCallback((itemId: string) => {
    // Normalize IDs for comparison (trim whitespace, case-insensitive if needed)
    const normalizedItemId = itemId?.trim();
    
    // First priority: URL query param (always check this first)
    if (activeTabFromUrl) {
      const normalizedUrlTab = activeTabFromUrl.trim();
      return normalizedItemId === normalizedUrlTab;
    }
    
    // Second priority: activeId state
    if (activeId) {
      return normalizedItemId === activeId.trim();
    }
    
    // Third priority: category prop
    if (category) {
      return normalizedItemId === category.trim();
    }
    
    return false;
  }, [activeTabFromUrl, activeId, category]);

  return (
    <>
      <div
        data-name="special-menu"
        className="flex gap-6 items-center justify-center w-full xl:px-16"
      >
        {items.map((item) => {
          const isActive = getIsActive(item.id);
          
          const menuItemClassName = `flex-1 py-5 px-0 flex items-end justify-center min-h-28 transition-colors border-b-2 ${
            isActive
              ? "border-primary text-primary"
              : "border-foreground text-foreground hover:text-primary"
          }`;
          
          return (
            <button
              key={item.id}
              onClick={(e) => handleItemClick(item.id, item.href, e)}
              className={menuItemClassName}
              type="button"
              aria-pressed={isActive}
            >
              <Typography
                variant="h5"
                weight="medium"
                className="text-center whitespace-nowrap"
              >
                {item.label}
              </Typography>
            </button>
          );
        })}
      </div>
      {children && <div>{children}</div>}
    </>
  );
}

