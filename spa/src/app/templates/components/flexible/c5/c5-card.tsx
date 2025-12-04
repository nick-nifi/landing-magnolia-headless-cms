import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { decodeIfEscaped } from "@/app/services/content-service";

export interface C5CardProps {
  title?: string;
  description?: string;
  subtitle?: string;
  button?: {
    label?: string;
    href?: string;
  };
}
export default function C5Card({
  button,
  description,
  subtitle,
  title,
}: C5CardProps) {
  return (
    <Card className="shadow-lg h-full flex flex-col" style={{ height: '220px' }}>
      <CardContent className="gap-0 flex flex-col flex-1 min-h-0 p-5 overflow-hidden">
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
          <Typography variant={"h4"} weight={"medium"} className="mb-2 shrink-0">
            {title}
          </Typography>
          {description && (
            <Typography 
              variant={"body-large"} 
              weight={"light"} 
              className="mb-2 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: decodeIfEscaped(description || '') }}
            />
          )}
          {subtitle && (
            <Typography 
              variant={"body-small"} 
              weight={"semibold"}
              className="line-clamp-1"
              dangerouslySetInnerHTML={{ __html: decodeIfEscaped(subtitle || '') }}
            />
          )}
        </div>

        <div className="mt-auto pt-2 shrink-0">
          <Button asChild variant={"link"} style={{ paddingLeft: 0 }}>
            <Link href={button?.href || "#"} target="_blank">
              {button?.label} <ArrowRight />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
