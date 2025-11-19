import React from "react";
import { IconName, icons } from "./register";

interface IconWrapperProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  width?: number;
  height?: number;
}
export default function IconWrapper({
  name,
  width = 24,
  height = 24,
  ...rest
}: IconWrapperProps) {
  const icon = icons[name];

  if (!icon) {
    return null;
  }

  return React.cloneElement(icon, {
    width,
    height,
    ...rest,
  });
}
