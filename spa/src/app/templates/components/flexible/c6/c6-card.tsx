import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { decodeIfEscaped } from "@/app/services/content-service";

export interface C6CardProps {
  title?: string;
  description?: string;
  href?: string;
  items?: string[];
}
export default function C6Card({
  description,
  href,
  title,
  items,
}: C6CardProps) {
  return (
    <Card className="shadow-lg h-full flex flex-col" style={{ height: '220px' }}>
      <CardContent className="p-5 flex flex-col flex-1 min-h-0 overflow-hidden">
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
          <Typography variant={"h4"} weight={"medium"} className="mb-2 shrink-0">
            {title}
          </Typography>
          {items ? (
            <div className="space-y-1 flex-1 overflow-hidden">
              {items.slice(0, 3).map((item, idx) => (
                <Typography key={idx} variant={"body-large"} className="line-clamp-1">
                  {item}
                </Typography>
              ))}
            </div>
          ) : (
            <Typography 
              variant={"body-large"}
              className="line-clamp-2 flex-1"
              dangerouslySetInnerHTML={{ __html: decodeIfEscaped(description || '') }}
            />
          )}
        </div>
        {href && (
          <div className="mt-auto pt-2 shrink-0">
            <Button asChild variant={"link"} style={{ paddingLeft: 0 }}>
              <Link href={href} target="_blank">
                View website
                <SquareArrowOutUpRight />
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
