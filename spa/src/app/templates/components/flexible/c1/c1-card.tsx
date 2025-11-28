import ImageHover from "@/components/image-hover";
import { Typography } from "@/components/typography";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export interface C1CardProps {
  title?: string;
  description?: string;
  thumb?: string;
  href?: string;
}
export default function C1Card({
  description = "",
  href = "#",
  thumb = "/assets/placeholder-img.png",
  title = "",
}: C1CardProps) {
  return (
    <Link href={href}>
      <Card className="gap-0 h-full flex-1">
        <CardContent className="p-5 flex flex-1 flex-col">
          <Typography variant={"h4"} weight={"medium"} className="mb-4">
            {title}
          </Typography>
          <Typography variant={"body-large"} weight={"light"}>
            {description}
          </Typography>
        </CardContent>
        <ImageHover
          src={thumb}
          alt={title}
          fill
          unoptimized
          className="object-cover"
          imageContainerClass="aspect-13/8"
        />
      </Card>
    </Link>
  );
}
