import Image from "next/image";
import { Typography } from "../typography";
import Link from "next/link";
import { IconName } from "../icon-wrapper/register";
import IconWrapper from "../icon-wrapper";

const investedCountries: { src: IconName; name: string; code: string }[] = [
  {
    src: "sg",
    name: "Singapore",
    code: "SG", // ISO 3166
  },
  {
    src: "hk",
    name: "Hong Kong",
    code: "HK", // ISO 3166
  },

  {
    src: "id",
    name: "Indonesia",
    code: "ID", // ISO 3166
  },
  {
    src: "my",
    name: "Malaysia",
    code: "MY", // ISO 3166
  },
  {
    src: "th",
    name: "Thailand",
    code: "TH", // ISO 3166
  },
];

export default function TopBar() {
  return (
    <div className=" border-b">
      <div className="container mx-auto flex items-center justify-end">
        <div className="flex py-3 gap-5">
          <Typography
            className="text-primary lg:text-[12px] font-medium"
            variant="body-small"
          >
            Invest with us
          </Typography>

          {investedCountries.map(({ code, name, src }) => (
            <div key={code} className="flex items-center justify-between gap-1">
              {/* <Image
                src={src}
                alt={name}
                width={15}
                height={15}
                unoptimized
                className="rounded-full border border-uobkh-dark-grey"
              /> */}
              <IconWrapper
                name={src}
                className="rounded-full border"
                width={15}
                height={15}
              />
              <Typography
                variant="body-small"
                className="hidden lg:block text-secondary-foreground text-[12px] font-light hover:text-primary"
              >
                {name}
              </Typography>
            </div>
          ))}

          <div className="border border-l" />
          <Link
            href="/services/institutional-partnerships"
            className="text-[12px] text-secondary-foreground hover:text-primary hidden lg:block font-light"
          >
            Institutional partnerships
          </Link>
        </div>
      </div>
    </div>
  );
}
