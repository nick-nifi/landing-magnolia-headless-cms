import { Grid } from "@/components/grid";
import { Typography } from "@/components/typography";
import E2Card, { E2CardProps } from "./e2-card";

interface AccordionE2Props {
  title?: string;
  items?: E2CardProps[];
}
export default function AccordionE2({ items = [], title }: AccordionE2Props) {
  return (
    <section data-name="accordion-e2" className="py-12 md:py-16">
      {title && (
        <Typography
          variant={"h2"}
          className="mb-12 md:mb-16 lg:mb-20 text-center"
          weight={"light"}
        >
          {title}
        </Typography>
      )}

      <div>
        <Grid cols={1} mdCols={2} className="gap-0 gap-col-0 lg:gap-16">
          {items.map((item, idx) => (
            <E2Card key={idx} {...item} />
          ))}
        </Grid>
      </div>
    </section>
  );
}


