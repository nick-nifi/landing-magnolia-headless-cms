/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"; // Assumes you have this from shadcn
import Link, { LinkProps } from "next/link";

/* -------------------------------------------------------------------------- */
/*                                 TYPE HELPERS                               */
/* -------------------------------------------------------------------------- */
type AsProp<T extends React.ElementType> = { as?: T };

type TypographyBaseProps = {
  className?: string;
} & VariantProps<typeof typographyVariants>;

type TypographyProps<T extends React.ElementType = "p"> = TypographyBaseProps &
  AsProp<T> &
  Omit<React.ComponentPropsWithoutRef<T>, "as" | "className">;

/* When variant === "link" we want the full LinkProps (href is required) */
type LinkTypographyProps = TypographyProps<typeof Link> &
  LinkProps & { children?: React.ReactNode };

// --- CVA Variants Definition ---
const typographyVariants = cva(
  "text-uobkh-dark-grey cursor-default", // Default color
  {
    variants: {
      variant: {
        // --- Headings ---
        "hero-heading": "font-libre text-[40px] lg:text-[56px] leading-[1.2]",
        "hero-small-heading":
          "font-libre text-[28px] lg:text-[40px] text-7 leading-[1.2]",
        h1: "text-[32px] lg:text-[48px] leading-[1.2]",
        h2: "text-[28px] lg:text-[40px] leading-[1.2]",
        h3: "text-[24px] lg:text-[36px] leading-[1.3]",
        h4: "text-[22px] lg:text-[28px] leading-[1.2]",
        h5: "text-[18px] lg:text-[20px] leading-[1.4]",

        // --- Body ---
        "body-large": "font-sans text-[20px] leading-[1.5]",
        "body-small": "font-sans text-base leading-[1.5]", // 16px

        // --- Link ---
        link: "font-sans text-base leading-[1.5] underline underline-offset-4 transition-colors hover:text-primary cursor-pointer",
      },
      weight: {
        // Only applies to body and link variants
        light: "font-light",
        regular: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
    },
    defaultVariants: {
      variant: "body-small",
      weight: "regular",
    },
  }
);

// --- Helper to map variant to a default HTML tag ---
const getElementForVariant = (
  variant?: VariantProps<typeof typographyVariants>["variant"]
) => {
  if (!variant) return "p";
  if (variant.startsWith("hero")) return "h1";
  if (["h1", "h2", "h3", "h4", "h5"].includes(variant)) return variant;
  return "p";
};

// --- The Typography Component ---
function Typography<T extends React.ElementType = "p">({
  as,
  className,
  variant,
  weight,
  ...props
}: T extends typeof Link ? LinkTypographyProps : TypographyProps<T>) {
  const Comp = (as || getElementForVariant(variant)) as React.ElementType;

  if (variant === "link") {
    // Extract href from props and cast to any because Typography props are generic;
    // Next.js Link requires href, so we ensure it's provided at runtime and satisfy TS.
    const { href, ...rest } = props as unknown as LinkProps;
    return (
      <Link
        href={href ?? "#"}
        className={cn(typographyVariants({ variant, weight, className }))}
        {...(rest as any)}
      />
    );
  }

  return (
    <Comp
      className={cn(typographyVariants({ variant, weight, className }))}
      {...props}
    />
  );
}

Typography.displayName = "Typography";

export { Typography, typographyVariants };
