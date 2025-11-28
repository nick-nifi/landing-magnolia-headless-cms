"use client";
import { ArrowDownToLine } from "lucide-react";
import { Typography } from "./typography";
import { cn } from "@/lib/utils";

interface DownloadItemProps {
  title: string;
  description?: string;
  className?: string;
}
export default function DownloadItem({
  title,
  description = "",
  className,
}: DownloadItemProps) {
  return (
    <div
      className={cn(
        "flex justify-between transition-colors cursor-pointer group-download-item py-[11px] bg-muted-foreground border-b cursor-pointer border-b-foreground",
        className
      )}
      role="button"
      tabIndex={0}
      aria-label={`Download ${title}`}
      onClick={() => {
        console.log(`Download Item: `, title);
      }}
    >
      <div className="flex-1">
        <Typography
          variant={"h5"}
          weight={"medium"}
          className="group-download-item-hover:text-primary"
        >
          {title}
        </Typography>
        {description && (
          <Typography
            variant={"body-small"}
            weight={"light"}
            className="overflow-hidden text-ellipsis"
          >
            {description}
          </Typography>
        )}
      </div>
      <div>
        <button className="text-foreground cursor-pointer flex items-center justify-between w-full w-4 h-4 inline-block group-download-item-hover:text-primary">
          <ArrowDownToLine />
        </button>
      </div>
    </div>
  );
}
