
import { Typography } from "@/components/typography";
import { SafeImage } from "@/components/ui/safe-image";
import { cn } from "@/lib/utils";
import get from "lodash/get";
import has from "lodash/has";
import { environment } from "@/environments/environment";

interface ChartImageChooser {
  field?: 'image' | 'externalImage';
  chartImage?: {
    '@link': string;
  };
  chartImageAlt?: string;
  externalChartImage?: string;
  externalChartImageAlt?: string;
}

interface ChartItem {
  chartTitle?: string;
  mainValue?: string;
  subContent?: string;
  timePeriod?: string;
  chartImageChooser?: ChartImageChooser;
  '@name'?: string;
  '@path'?: string;
  '@id'?: string;
  '@nodeType'?: string;
}

interface ChartCardProps {
  chartImage: string;
  chartImageAlt?: string;
  className?: string;
}

function ChartCard({ chartImageAlt = "Chart", chartImage }: ChartCardProps) {
  return (
    <div>
      {/* Chart Image - contains all information */}
      <div className="relative w-full aspect-auto">
        <SafeImage
          src={chartImage}
          alt={chartImageAlt}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}

interface ContentB9Props {
  title?: string;
  charts?: ChartCardProps[] | Record<string, ChartItem>;
  customClass?: string;
}

// Helper function to convert Magnolia object to array
const getChartsArray = (charts: ChartCardProps[] | Record<string, ChartItem> | undefined): ChartCardProps[] => {
  if (!charts) return [];
  if (Array.isArray(charts)) return charts.filter(chart => chart && chart.chartImage);
  
  // Convert object to array, filtering out metadata keys
  return Object.entries(charts)
    .filter(([key, value]) => {
      if (key.startsWith('@')) return false;
      if (!value || typeof value !== 'object') return false;
      return true;
    })
    .map(([, value]) => {
      const item = value as ChartItem;
      // Get chart image from imageChooser
      let chartImage = '';
      let chartImageAlt = '';
      
      if (item.chartImageChooser) {
        if (has(item.chartImageChooser, 'externalChartImage')) {
          chartImage = get(item.chartImageChooser, 'externalChartImage') || '';
          chartImageAlt = get(item.chartImageChooser, 'externalChartImageAlt') || '';
        } else {
          const imageLink = get(item.chartImageChooser, "chartImage['@link']");
          if (imageLink) {
            chartImage = `${environment.damRawBase}${imageLink}`;
            chartImageAlt = get(item.chartImageChooser, 'chartImageAlt') || '';
          }
        }
      }
      
      return {
        chartImage,
        chartImageAlt,
      };
    })
    .filter(chart => chart.chartImage);
};

export default function ContentB9({
  title = "Stock charts",
  charts: chartsProp,
  customClass,
}: ContentB9Props) {
  // Convert Magnolia data to array
  const charts = getChartsArray(chartsProp);

  return (
    <section
      data-name="content-b9"
      className={cn("bg-white py-16 px-4 lg:px-40", customClass)}
    >
      <div className="container mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] w-full">
          {/* Title Section - Top Left */}
          <div className="flex flex-col gap-8 items-start">
            <Typography variant="h2" weight="light">
              {title}
            </Typography>
          </div>

          {charts.map((chart, index) => (
            <ChartCard key={index} {...chart} />
          ))}
        </div>
      </div>
    </section>
  );
}

