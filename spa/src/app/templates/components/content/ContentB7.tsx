
import { Typography } from "@/components/typography";
import { cn } from "@/lib/utils";

interface ContentB7Props {
  content?: string;
  text?: string;
  className?: string;
  customClass?: string;
}

export default function ContentB7({ 
  content, 
  text, 
  className,
  customClass 
}: ContentB7Props) {
  // Use content from Magnolia or fallback to text prop
  const displayText = content || text || '';

  return (
    <section
      data-name="content-b7"
      className={cn(
        "bg-muted-foreground py-16 md:py-18 lg:py-28 xl:px-20 w-full border-l border-l-10 border-primary",
        className,
        customClass
      )}
    >
      <div className="container mx-auto px-2 lg:px-0">
        <Typography variant={"hero-small-heading"} weight={"regular"}>
          {displayText}
        </Typography>
      </div>
    </section>
  );
}
