import { Grid } from "@/components/grid";
import { Typography } from "@/components/typography";
import C2Card, { C2CardProps } from "./c2-card";


interface FlexibleC2Props {
  title?: string;
  items?: C2CardProps[];
  background?: string;
}
export default function FlexibleC2({
  title,
  items = [],
  background = "#dbe0e4",
}: FlexibleC2Props) {
  return (
    <section
      style={{ background }}
      data-name="flexible-c2"
      className="py-12 md:py-16 xl:px-20"
    >
      {title && (
        <Typography
          variant={"h2"}
          className="mb-12 md:mb-16 lg:mb-20 text-center"
          weight={"light"}
          style={{
            fontFamily: "Roboto, sans-serif",
            fontSize: "var(--Text-Sizes-Heading-2, 40px)",
            fontStyle: "normal",
            fontWeight: 300,
            lineHeight: "120%",
            letterSpacing: "-0.4px",
          }}
        >
          {title}
        </Typography>
      )}

      <Grid
        cols={1}
        mdCols={3}
        className="gap-6 md:gap-5 container mx-auto px-2 md:px-0"
      >
        {items.map((item, index) => (
          <Grid key={index}>
            <C2Card {...item} />
          </Grid>
        ))}
      </Grid>
    </section>
  );
}
