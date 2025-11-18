import Link from 'next/link';

const NavLink = ({
  href,
  children,
  className,
  isMagnoliaEdit = false,
}: {
  href: string;
  className?: string;
  children?: React.ReactNode;
  isMagnoliaEdit: boolean;
}) => {
  if (isMagnoliaEdit) {
    return <span className={className}>{children}</span>;
  }
  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
};

export default NavLink;
