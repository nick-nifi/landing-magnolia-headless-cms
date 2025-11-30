import Link from 'next/link';
import { Typography } from '../typography';
import Image from 'next/image';
import FormSubscrible from './form-subscrible';

const footerLinks = {
  'Investment services': [
    { title: 'Online trading', href: '/services/online-trading' },
    { title: 'Retail brokerage', href: '/services/retail-brokerage' },
    { title: 'Private wealth management', href: '/services/wealth-management' },
    {
      title: 'Investment banking services',
      href: '/services/investment-banking',
    },
    {
      title: 'Institutional partnerships',
      href: '/services/institutional-partnerships',
    },
  ],
  Research: [
    { title: 'CIO Insights', href: '/research/cio-insights' },
    { title: 'Major markets', href: '/research/major-markets' },
    { title: 'Sectors', href: '/research/sectors' },
    { title: 'Companies', href: '/research/companies' },
  ],
  'Investor relations': [
    { title: 'Announcements', href: '/investor-relations/announcements' },
    {
      title: 'Financial highlights',
      href: '/investor-relations/financial-highlights',
    },
    { title: 'Annual reports', href: '/investor-relations/annual-reports' },
  ],
  About: [
    { title: 'Why UOBKH', href: '/about/why-uobkh' },
    { title: 'Leadership', href: '/about/leadership' },
    { title: 'Careers', href: '/about/careers' },
  ],
  Contact: [{ title: 'Locations', href: '/contact/locations' }],
};

export default function AppFooter() {
  return (
    <footer className=''>
      <div className='relative container mx-auto lg:mt-60'>
        <div className='w-full shadow-xs flex flex-col lg:flex-row w-full bg-white relative lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2'>
          <div className='relative aspect-3/2 md:aspect-4/1 lg:aspect-2/1 lg:min-w-[360px]'>
            <Image
              src='/assets/footer-bg.png'
              alt='lorem'
              className='object-cover w-full h-full '
              fill
            />
          </div>
          <div className='px-4 py-9 lg:py-8 lg:px-40 flex flex-1 flex-col border'>
            <Typography
              variant='h2'
              className='text-primary mb-5 block'
              weight={'light'}
            >
              Subscribe to be an informed investor
            </Typography>
            <Typography
              variant={'body-small'}
              weight={'light'}
              className='mb-5'
            >
              Get UOBKH research, news, webinars and special offers:
            </Typography>

            <FormSubscrible />

            <Typography
              variant={'body-small'}
              weight={'light'}
              className='mt-5'
            >
              We comply with GDPR regulations and will never share your personal
              data.
            </Typography>
          </div>
        </div>
      </div>
      <div className='bg-primary lg:pt-60'>
        <div className='mb-8 container mx-auto px-4 lg:px-0'>
          {/* Top section: Links and Tagline */}
          <div className='grid grid-cols-1 gap-8 border-b border-white/20 pb-12 md:grid-cols-3 lg:grid-cols-4 pt-8 lg:pt-0'>
            {/* Link Columns */}
            <div className='lg:grid grid-cols-2 gap-8 md:col-span-2 lg:col-span-3 lg:grid-cols-5 hidden'>
              {Object.entries(footerLinks).map(([title, links]) => (
                <div key={title}>
                  <Typography
                    variant='body-small'
                    weight='bold'
                    className='mb-4 text-white'
                  >
                    {title}
                  </Typography>
                  <ul className='space-y-2'>
                    {links.map((link) => (
                      <li key={link.title}>
                        <Link
                          href={link.href}
                          className='text-sm text-white/80 transition-colors hover:text-white hover:underline'
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Tagline Section */}
            <div className='md:pl-8'>
              <Typography
                variant='h5'
                as='h3'
                className='text-white font-libre'
              >
                Serious about investing
              </Typography>
              <Typography variant='body-small' className='mt-4 text-white/80'>
                For over 100 years UOB Kay Hian has grown by earning the trust
                of people and institutions with our multiple wealth-building
                solutions in multiple markets.
              </Typography>
              <div className='mt-6 relative'>
                <Image
                  src='/assets/uob-white-logo.png'
                  alt='UOB white logo'
                  width={170}
                  height={34}
                />
              </div>
              <div className='mt-4 flex items-center space-x-4'>
                <a
                  href='https://linkedin.com/company/uob-kay-hian'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-white hover:opacity-80 transition-opacity'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M20.47,2H3.53A1.45,1.45,0,0,0,2.06,3.43V20.57A1.45,1.45,0,0,0,3.53,22H20.47a1.45,1.45,0,0,0,1.47-1.43V3.43A1.45,1.45,0,0,0,20.47,2ZM8.09,18.74h-3v-9h3ZM6.59,8.48h0a1.56,1.56,0,1,1,0-3.12,1.57,1.57,0,1,1,0,3.12ZM18.91,18.74h-3V13.91c0-1.21-.43-2-1.52-2A1.65,1.65,0,0,0,12.85,13a2,2,0,0,0-.1.73v5h-3s0-8.18,0-9h3V11A3,3,0,0,1,15.46,9.5c2,0,3.45,1.29,3.45,4.06Z' />
                  </svg>
                  <span className='sr-only'>LinkedIn</span>
                </a>
                <a
                  href='https://facebook.com/uobkayhian'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-white hover:opacity-80 transition-opacity'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M22,12c0-5.52-4.48-10-10-10S2,6.48,2,12c0,4.84,3.44,8.87,8,9.8V15H8v-3h2V9.5C10,7.57,11.57,6,13.5,6H16v3h-2 c-0.55,0-1,0.45-1,1v2h3v3h-3v6.95C18.05,21.45,22,17.19,22,12z' />
                  </svg>
                  <span className='sr-only'>Facebook</span>
                </a>
                <a
                  href='https://t.me/uobkayhian'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-white hover:opacity-80 transition-opacity'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' />
                  </svg>
                  <span className='sr-only'>Telegram</span>
                </a>
                <a
                  href='https://instagram.com/uobkayhian'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-white hover:opacity-80 transition-opacity'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M12,2.162c3.204,0,3.584,0.012,4.849,0.07c1.308,0.06,2.655,0.358,3.608,1.311c0.962,0.962,1.251,2.296,1.311,3.608 c0.058,1.265,0.07,1.645,0.07,4.849c0,3.204-0.012,3.584-0.07,4.849c-0.059,1.301-0.364,2.661-1.311,3.608 c-0.962,0.962-2.295,1.251-3.608,1.311c-1.265,0.058-1.645,0.07-4.849,0.07s-3.584-0.012-4.849-0.07 c-1.291-0.059-2.669-0.371-3.608-1.311c-0.957-0.957-1.251-2.304-1.311-3.608c-0.058-1.265-0.07-1.645-0.07-4.849 c0-3.204,0.012-3.584,0.07-4.849c0.059-1.296,0.367-2.664,1.311-3.608c0.96-0.96,2.299-1.251,3.608-1.311 C8.416,2.174,8.796,2.162,12,2.162 M12,0C8.741,0,8.332,0.014,7.052,0.072C5.197,0.157,3.355,0.673,2.014,2.014 C0.668,3.36,0.157,5.198,0.072,7.052C0.014,8.332,0,8.741,0,12c0,3.259,0.014,3.668,0.072,4.948c0.085,1.853,0.603,3.7,1.942,5.038 c1.345,1.345,3.186,1.857,5.038,1.942C8.332,23.986,8.741,24,12,24c3.259,0,3.668-0.014,4.948-0.072 c1.854-0.085,3.698-0.602,5.038-1.942c1.347-1.347,1.857-3.184,1.942-5.038C23.986,15.668,24,15.259,24,12 c0-3.259-0.014-3.668-0.072-4.948c-0.085-1.855-0.602-3.698-1.942-5.038C20.643,0.671,18.797,0.156,16.948,0.072 C15.668,0.014,15.259,0,12,0z M12,5.838C8.597,5.838,5.838,8.597,5.838,12c0,3.403,2.759,6.162,6.162,6.162 c3.403,0,6.162-2.759,6.162-6.162C18.162,8.597,15.403,5.838,12,5.838z M12,16c-2.209,0-4-1.791-4-4s1.791-4,4-4s4,1.791,4,4 S14.209,16,12,16z M18.406,4.155c-0.796,0-1.441,0.645-1.441,1.44s0.645,1.44,1.441,1.44c0.795,0,1.439-0.645,1.439-1.44 S19.201,4.155,18.406,4.155z' />
                  </svg>
                  <span className='sr-only'>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className='container px-4 lg:px-0 mx-auto text-white pb-3'>
          <div className='flex flex-col lg:flex-row justify-between items-center gap-4'>
            <Typography variant={'body-small'} weight={'light'}>
              Copyright © 2025 UOB Kay Hian. All Rights Reserved. |{' '}
              <Link href='#'>Legal</Link>
            </Typography>

            <span className='font-light text-[12px] sm:text-left w-full lg:w-auto'>
              Branding and website design by Stepworks
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
