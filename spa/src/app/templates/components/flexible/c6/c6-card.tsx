import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

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
    <Card className="shadow-lg">
      <CardContent className="p-5 flex flex-col justify-between flex-1 gap-6">
        <div>
          <Typography variant={"h4"} weight={"medium"} className="mb-4">
            {title}
          </Typography>
          {items ? (
            <div className="space-y-2">
              {items.map((item, idx) => (
                <Typography key={idx} variant={"body-large"}>
                  {item}
                </Typography>
              ))}
            </div>
          ) : (
            <Typography variant={"body-large"}>{description}</Typography>
          )}
        </div>
        {href && (
          <div>
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
