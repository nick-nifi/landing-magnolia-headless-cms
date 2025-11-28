import { Grid } from "@/components/grid";
import { Typography } from "@/components/typography";
import C1Card, { C1CardProps } from "./c1-card";

interface FlexibleC1Props {
  title?: string;
  items?: C1CardProps[];
}
export default function FlexibleC1({
  title = "",
  items = [],
}: FlexibleC1Props) {
  return (
    <section data-name="flexible-c1" className="py-12 md:py-16 lg:py-28">
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
        <Grid cols={1} mdCols={2} lgCols={4}>
          {items.map((item, idx) => (
            <C1Card {...item} key={idx} />
          ))}
        </Grid>
      </div>
    </section>
  );
}
