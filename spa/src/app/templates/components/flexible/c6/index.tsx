import { Typography } from "@/components/typography";
import C6Card, { C6CardProps } from "./c6-card";
import { Grid } from "@/components/grid";

interface FlexibleC6Props {
  title?: string;
  items?: C6CardProps[];
}
export default function FlexibleC6({ items = [], title }: FlexibleC6Props) {
  return (
    <section data-name="flexible-c6" className="py-12 md:py-16 xl:px-20">
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
        <Grid cols={1} mdCols={2} lgCols={3}>
          {items.map((item, idx) => (
            <Grid key={idx}>
              <C6Card {...item} key={idx} />
            </Grid>
          ))}
        </Grid>
      </div>
    </section>
  );
}


