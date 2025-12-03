import { Grid } from "@/components/grid";
import { Typography } from "@/components/typography";
import { SafeImage } from "@/components/ui/safe-image";

export interface FastFactTileProps {
  logo?: string;
  text?: string;
  logoWidth?: number;
  logoHeight?: number;
}

export default function FastFactTile({
  logo,
  text,
  logoWidth = 200,
  logoHeight = 60,
}: FastFactTileProps) {
  return (
    <Grid
      cols={1}
      mdCols={3}
      lgCols={2}
      className="gap-5 lg:gap-16 border shadow-lg"
    >
      <Grid className="flex item-center justify-center md:justify-start pt-8 md:pt-0 md:pl-10">
        {logo && (
          <SafeImage
            src={logo}
            alt={text || ""}
            width={logoWidth}
            height={logoHeight}
            className="object-contain"
          />
        )}
      </Grid>
      <Grid className="flex items-center justify-center md:justify-start py-10 md:col-span-2 lg:col-span-1">
        {text && (
          <Typography variant="h4" weight="medium">
            {text}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}
