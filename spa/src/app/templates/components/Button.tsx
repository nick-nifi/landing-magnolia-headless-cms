"use client"

import React from 'react';
import { environment } from '../../../environments/environment';

interface PageLinkChooser {
  field?: 'internalPageLink' | 'externalPageLink';
  internalLink?: string;
  externalLink?: string;
}

interface IButtonProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'ternary' | 'outline' | 'link';
  size?: 'small' | 'medium' | 'large';
  backgroundColor?: string;
  disabled?: boolean;
  pageLinkChooser?: PageLinkChooser;
}

const Button: React.FC<IButtonProps> = ({
  title,
  variant = 'primary',
  backgroundColor,
  size = 'medium',
  disabled,
  pageLinkChooser
}) => {
  const baseClasses = 'font-bold rounded focus:outline-none focus:shadow-outline';
  const variantStyles = {
    primary: 'bg-blue-500 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-700 text-white',
    ternary: 'bg-green-500 hover:bg-green-700 text-white',
    outline: 'bg-transparent border border-gray-500 hover:bg-gray-100 text-gray-700',
    link: 'bg-transparent text-blue-500 hover:underline',
  };
  const sizeStyles = {
    small: 'py-1 px-2 text-sm',
    medium: 'py-2 px-4 text-base',
    large: 'py-3 px-6 text-lg',
  };
  const variantClass = variantStyles[variant] || variantStyles.primary;
  const sizeClass = sizeStyles[size] || sizeStyles.medium;
  const buttonStyle = backgroundColor ? { backgroundColor } : {};

  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';

  let linkHref = '#';
  let isExternal = false;
  if (pageLinkChooser && pageLinkChooser.field && (pageLinkChooser.internalLink || pageLinkChooser.externalLink)) {
    if (pageLinkChooser.field === 'internalPageLink') {
      let link = pageLinkChooser.internalLink || '';
      if (link.startsWith(environment.appBase)) {
        link = link.slice(environment.appBase.length);
        if (!link.startsWith('/')) {
          link = '/' + link;
        }
      }
      linkHref = link;
      isExternal = false;
    } else if (pageLinkChooser.field === 'externalPageLink') {
      linkHref = pageLinkChooser.externalLink || '#';
      isExternal = true;
    }
  }

  return (
    <div className="p-2">
      <a
        href={disabled ? undefined : linkHref}
        className={`${variantClass} ${sizeClass} ${baseClasses} ${disabledClass}`}
        style={buttonStyle}
        onClick={disabled ? (e) => e.preventDefault() : undefined}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        role="button"
        aria-disabled={disabled}
      >
        {title}
      </a>
    </div>
  );
};

export default Button;
