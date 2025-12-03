import { Grid } from '@/components/grid';
import { Typography } from '@/components/typography';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ReportJ from './report-j';

const reports = [
  {
    year: '2023',
    title: 'Annual report',
    image: ``,
    imageAlt: '2023 Annual report cover',
    href: '#',
  },
  {
    year: '2022',
    title: 'Annual report',
    image: ``,
    imageAlt: '2022 Annual report cover',
    href: '#',
  },
  {
    year: '2021',
    title: 'Annual report',
    image: ``,
    imageAlt: '2021 Annual report cover',
    href: '#',
  },
  {
    year: '2020',
    title: 'Annual report',
    image: ``,
    imageAlt: '2020 Annual report cover',
    href: '#',
  },
  {
    year: '2019',
    title: 'Annual report',
    image: ``,
    imageAlt: '2019 Annual report cover',
    href: '#',
  },
  {
    year: '2018',
    title: 'Annual report',
    image: ``,
    imageAlt: '2018 Annual report cover',
    href: '#',
  },
];

const AnnualReport = ({ text }: { text: string }) => {
  const firstReport = reports[0];

  return (
    <section>
      <div className='container mx-auto py-16 px-4 md:px-20'>
        {text && (
          <Typography
            variant='h2'
            weight={'light'}
            className='text-center mb-8'
          >
            {text}
          </Typography>
        )}

        <div className='flex justify-center'>
          <div className='w-full lg:w-[20vw] flex flex-col lg:flex-row justify-center gap-[10px]'>
            <div className='w-full'>
              <Typography
                variant='body-large'
                weight='medium'
                className='text-uobkh-dark-grey mb-3'
              >
                Year
              </Typography>
              <Select>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select year' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='2024'>2024</SelectItem>
                  <SelectItem value='2023'>2023</SelectItem>
                  <SelectItem value='2022'>2022</SelectItem>
                  <SelectItem value='2021'>2021</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='w-full'>
              <Typography
                variant='body-large'
                weight='medium'
                className='text-uobkh-dark-grey mb-3'
              >
                Categories
              </Typography>
              <Select>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select category' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All</SelectItem>
                  <SelectItem value='corporate'>Corporate</SelectItem>
                  <SelectItem value='sustainability'>Sustainability</SelectItem>
                  <SelectItem value='risk-management'>
                    Risk Management
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-ring'>
        <div className='container mx-auto py-16 px-4 md:px-20'>
          <Grid lgCols={5} cols={1} className='lg:gap-16'>
            <Grid className='col-span-2'>
              <ReportJ
                imageSrc={firstReport.image}
                title={firstReport.title}
                cta={{ href: '#', label: 'View', isExternal: false }}
              />
            </Grid>
            <Grid className='col-span-3'>
              <Grid cols={1} mdCols={3} className='lg:gap-7'>
                {reports.map((report) => (
                  <Grid key={report.year} className='col-span-1'>
                    <ReportJ
                      imageSrc={report.image}
                      title={report.title}
                      cta={{
                        href: report.href,
                        label: 'View',
                        isExternal: false,
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </section>
  );
};

export default AnnualReport;
