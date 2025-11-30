import { cn } from '@/lib/utils';

interface HeaderMaskGroupProps {
  className?: string;
  width?: number;
  height?: number;
}
export default function HeaderMaskGroup({
  className,
  width = 375,
  height = 576,
}: HeaderMaskGroupProps) {
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={cn('hidden md:block', className)}
      >
        <g opacity='0.5'>
          <mask
            id='mask0_12953_20296'
            style={{ maskType: 'alpha' }}
            maskUnits='userSpaceOnUse'
            x='-1'
            y='0'
            width={width}
            height={height}
          >
            <rect x='-0.5' width={width} height={height} fill='#FF0202' />
          </mask>
          <g mask='url(#mask0_12953_20296)'>
            <path
              d='M365.956 354.796C496.094 354.796 601.592 249.298 601.592 119.16C601.592 -10.9779 496.094 -116.476 365.956 -116.476C235.818 -116.476 130.32 -10.9779 130.32 119.16C130.32 249.298 235.818 354.796 365.956 354.796Z'
              stroke='white'
              strokeMiterlimit='10'
            />
            <path
              d='M749.68 119.16H365.949V354.796H749.68C814.75 354.796 867.501 302.045 867.501 236.975C867.501 171.905 814.75 119.153 749.68 119.153V119.16Z'
              stroke='white'
              strokeMiterlimit='10'
            />
            <path
              d='M365.957 354.796V590.432H778.321C843.391 590.432 896.143 537.68 896.143 472.61C896.143 407.54 843.391 354.789 778.321 354.789H365.957V354.796Z'
              stroke='white'
              strokeMiterlimit='10'
            />
            <path
              d='M365.957 -310V441.75C365.957 523.087 300.023 589.021 218.686 589.021C137.348 589.021 71.4141 523.087 71.4141 441.75L71.4141 -310'
              stroke='white'
              strokeMiterlimit='10'
            />
            <path
              d='M719.25 354.796H1249.43'
              stroke='white'
              strokeMiterlimit='10'
            />
            <path d='M719.5 -310V1022' stroke='white' strokeMiterlimit='10' />
            <path d='M1249.5 -310V1022' stroke='white' strokeMiterlimit='10' />
            <path
              d='M1036.5 1012L365.5 119.243V118.756L687 -308.995'
              stroke='white'
              strokeMiterlimit='10'
            />
          </g>
        </g>
      </svg>

      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={cn('md:hidden', className)}
      >
        <g opacity='0.5'>
          <mask
            id='mask0_12953_22378'
            style={{ maskType: 'alpha' }}
            maskUnits='userSpaceOnUse'
            x='-1'
            y='0'
            width={width}
            height={height}
          >
            <rect x='-0.5' width={width} height={height} fill='#FF0202' />
          </mask>
          <g mask='url(#mask0_12953_22378)'>
            <path
              d='M-1.05805 354.558C68.3489 354.558 124.614 298.292 124.614 228.885C124.614 159.478 68.3489 103.213 -1.05805 103.213C-70.465 103.213 -126.73 159.478 -126.73 228.885C-126.73 298.292 -70.465 354.558 -1.05805 354.558Z'
              stroke='white'
              strokeMiterlimit='10'
            />
            <path
              d='M203.598 228.885H-1.05859V354.558H203.598C238.302 354.558 266.436 326.424 266.436 291.72C266.436 257.016 238.302 228.882 203.598 228.882V228.885Z'
              stroke='white'
              strokeMiterlimit='10'
            />
            <path
              d='M-1.05469 354.558V480.231H218.873C253.577 480.231 281.711 452.097 281.711 417.393C281.711 382.689 253.577 354.555 218.873 354.555H-1.05469V354.558Z'
              stroke='white'
              strokeMiterlimit='10'
            />
            <path
              d='M187.367 354.558H470.129'
              stroke='white'
              strokeMiterlimit='10'
            />
            <path d='M187.5 0V710.4' stroke='white' strokeMiterlimit='10' />
            <path
              d='M356.566 705.067L-1.30078 228.93V228.67L170.166 0.536133'
              stroke='white'
              strokeMiterlimit='10'
            />
          </g>
        </g>
      </svg>
    </>
  );
}
