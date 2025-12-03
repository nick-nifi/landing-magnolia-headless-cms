import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
    <div className="h-full flex flex-col">
      <Card className="shadow-lg gap-0 h-full flex flex-col">
        <div className="relative aspect-71/30 lg:aspect-110/41 shrink-0">
          <Image src={thumb} alt={title} fill className="object-cover" />
        </div>
        <CardContent className="flex flex-col flex-1 justify-between items-start">
          <div className="mb-6">
            <Typography variant={"h4"} weight={"medium"}>
              {title}
            </Typography>
          </div>

          <div className="mt-auto">
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
