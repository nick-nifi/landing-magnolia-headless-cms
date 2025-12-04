import { Typography } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";
import Link from "next/link";
import { decodeIfEscaped } from "@/app/services/content-service";

export interface C2CardProps {
  title?: string;
  description?: string;
  thumb?: string;
  tag?: string;
  readmoreUrl?: string;
  ctaText?: string;
}
export default function C2Card({
  description = "",
  readmoreUrl = "",
  tag = "",
  thumb = "",
  title = "",
  ctaText = "Read more",
}: C2CardProps) {
  return (
    <Card 
      className="gap-0 flex flex-col overflow-hidden border border-[#e6e7e8] shadow-md h-full"
      style={{ height: '420px' }}
    >
      <div className="relative w-full aspect-[9/5] shrink-0">
        {thumb && (
          <SafeImage src={thumb} alt={title || ''} fill className="object-cover" />
        )}
        {tag && (
          <Badge className="absolute left-0 bottom-0" variant={"secondary"}>
            {tag}
          </Badge>
        )}
      </div>
      <CardContent className="flex flex-col flex-1 min-h-0 p-5 overflow-hidden">
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
          {title && (
            <Typography variant={"h4"} weight={"medium"} className="mb-2 shrink-0">
              {title}
            </Typography>
          )}

          {description && (
            <Typography 
              variant={"body-large"} 
              weight={"light"}
              className="line-clamp-2 flex-1"
              dangerouslySetInnerHTML={{ __html: decodeIfEscaped(description || '') }}
            />
          )}
        </div>

        <div className="mt-auto pt-2 shrink-0">
          <Button asChild variant={"link"} style={{ paddingLeft: 0 }} className="text-[#c33b32] hover:text-[#c33b32]/80 h-auto px-0 pr-2.5 py-1.5 w-fit text-[20px] font-normal justify-start group">
            <Link href={readmoreUrl || '#'} className="flex items-center gap-1">
              {ctaText} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
