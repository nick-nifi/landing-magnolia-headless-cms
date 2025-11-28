import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

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
    <Card className="shadow-lg">
      <CardContent className="gap-0 flex flex-col flex-1 justify-between">
        <div className="mb-6">
          <Typography variant={"h4"} weight={"medium"} className="mb-4">
            {title}
          </Typography>
          <Typography variant={"body-large"} weight={"light"} className="mb-4">
            {description}
          </Typography>
          {subtitle && (
            <Typography variant={"body-small"} weight={"semibold"}>
              {subtitle}
            </Typography>
          )}
        </div>

        <div>
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
