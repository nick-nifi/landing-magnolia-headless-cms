import { Typography } from "@/components/typography";
import C3Card, { C3CardProps } from "./c3-card";
import { Grid } from "@/components/grid";

interface FlexibleC3Props {
  title?: string;
  items?: C3CardProps[];
}
export default function FlexibleC3({ title, items = [] }: FlexibleC3Props) {
  return (
    <section data-name="flexible-c2" className="py-12 md:py-16 xl:px-20">
      {title && (
        <Typography
          variant={"h2"}
          className="mb-12 md:mb-16 lg:mb-20 text-center"
          weight={"light"}
        >
          {title}
        </Typography>
      )}

      <div className="container mx-auto px-2 lg:px-0">
        <Grid cols={1} mdCols={2} className="gap-6" items="stretch">
          {items.map((item, idx) => (
            <C3Card key={idx} {...item} />
          ))}
        </Grid>
      </div>
    </section>
  );
}

