import { Typography } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface C2CardProps {
  title?: string;
  description?: string;
  thumb?: string;
  tag?: string;
  readmoreUrl?: string;
}
export default function C2Card({
  description = "",
  readmoreUrl = "",
  tag = "",
  thumb = "",
  title = "",
}: C2CardProps) {
  return (
    <Card className="gap-0">
      <div className="relative aspect-9/5">
        <Image src={thumb} alt={thumb} fill className="object-cover" />
        {tag && (
          <Badge className="absolute left-0 bottom-0" variant={"secondary"}>
            {tag}
          </Badge>
        )}
      </div>
      <CardContent className="justify-between h-full flex flex-col">
        <div className="mb-6">
          {title && (
            <Typography variant={"h4"} weight={"medium"} className="mb-4">
              {title}
            </Typography>
          )}

          {description && (
            <Typography variant={"body-large"} weight={"light"}>
              {description}
            </Typography>
          )}
        </div>

        <div>
          <Button asChild variant={"link"} style={{ paddingLeft: 0 }}>
            <Link href={readmoreUrl}>
              Read more <ArrowRight />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
