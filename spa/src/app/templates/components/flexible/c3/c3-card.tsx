import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";
import Link from "next/link";
import { decodeIfEscaped } from "@/app/services/content-service";

export interface C3CardProps {
  href?: string;
  title?: string;
  description?: string;
  thumb?: string;
}
export default function C3Card({
  description,
  href = "#",
  thumb = "/assets/placeholder-img.png",
  title = "",
}: C3CardProps) {
  return (
    <div className="h-full flex flex-col" style={{ height: '420px' }}>
      <Card className="shadow-lg gap-0 h-full flex flex-col">
        <div className="relative aspect-71/30 lg:aspect-110/41 shrink-0">
          <SafeImage src={thumb} alt={title || ''} fill className="object-cover" />
        </div>
        <CardContent className="flex flex-col flex-1 min-h-0 p-5 overflow-hidden">
          <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
            <Typography variant={"h4"} weight={"medium"} className="mb-2 shrink-0">
              {title}
            </Typography>
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
            <Button asChild variant={"link"} style={{ paddingLeft: 0 }}>
              <Link href={href}>
                Find out now <ArrowRight />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
