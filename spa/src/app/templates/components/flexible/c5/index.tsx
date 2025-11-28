import { Grid } from "@/components/grid";
import { Typography } from "@/components/typography";
import C5Card, { C5CardProps } from "./c5-card";


interface FlexibleC5Props {
  title?: string;
  items?: C5CardProps[];
}

type Cols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;
export default function FlexibleC5({ title, items = [] }: FlexibleC5Props) {
  return (
    <section data-name="flexible-c5" className="py-12 md:py-16 xl:py-20">
      {title && (
        <Typography
          variant={"h2"}
          className="mb-12 md:mb-16 lg:mb-20 text-center"
          weight={"light"}
        >
          {title}
        </Typography>
      )}

      <div className="container mx-auto px-2 lg:px-0 flex justify-center">
        <div className="w-full">
          <Grid
            cols={1}
            mdCols={items.length > 2 ? 3 : 2}
            lgCols={items.length > 2 ? 3 : 2}
            className="gap-6 md:gap-4 lg:gap-5"
          >
            {items.map((item, idx) => (
              <C5Card key={idx} {...item} />
            ))}
          </Grid>
        </div>
      </div>
    </section>
  );
}

