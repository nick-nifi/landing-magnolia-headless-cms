"use client";
import { EPageSectionType } from "@/core/page-model";
import { ChevronRight } from "lucide-react";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

interface BreadcrumbItemProps {
  label: string;
  href?: string;
}

interface AppBreadcrumbProps {
  items?: BreadcrumbItemProps[];
}

export default function AppBreadcrumb({ items = [] }: AppBreadcrumbProps) {
  const len = items.length - 1;

  return (
    <div className="bg-secondary-foreground hidden lg:block xl:px-20">
      <div className="container mx-auto py-1">
        <Breadcrumb>
          <BreadcrumbList>
            {items.map(({ label, href }, idx) =>
              idx === len ? (
                <BreadcrumbPage key={idx}>{label}</BreadcrumbPage>
              ) : (
                <React.Fragment key={idx}>
                  <BreadcrumbItem key={idx}>
                    {href ? (
                      <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                    ) : (
                      label
                    )}
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronRight />
                  </BreadcrumbSeparator>
                </React.Fragment>
              )
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}

export type TAppBreadcrumbSection = {
  type: EPageSectionType.BreadCrumb;
  data: AppBreadcrumbProps;
};
