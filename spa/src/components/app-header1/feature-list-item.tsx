import Link from "next/link";
import { NavigationMenuLink } from "../ui/navigation-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FeaturedItem } from "./menu-config";
import { ReactNode } from "react";
import { Typography } from "../typography";

interface FeatureListItemProps extends FeaturedItem {
  children: ReactNode;
}

export default function FeatureListItem({
  href,
  imageUrl,
  title,
  children,
}: FeatureListItemProps) {
  console.log("🚀 ~ FeatureListItem ~ imageUrl:", imageUrl);
  return (
    <NavigationMenuLink asChild>
      <Link
        href={href || "#"}
        className={cn(
          "no-underline outline-none"
          //   className
        )}
        // {...props}
      >
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <Typography variant="body-small" className="text-primary mb-[10px]">
              {title}
            </Typography>
            <Typography
              variant="body-small"
              className="text-secondary-foreground"
            >
              {children}
            </Typography>
          </div>
          <div className="relative">
            <Image
              src={imageUrl}
              alt={title || "Featured item"}
              className="object-cover"
              unoptimized
              fill
            />
          </div>
        </div>
      </Link>
    </NavigationMenuLink>
  );
}
