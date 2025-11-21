'use client';
import {
  EditorContextService,
  MgnlContent,
} from '@magnolia/frontend-helpers-base';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  Breadcrumb as ShadcnBreadcrumb,
} from '@/components/ui/breadcrumb';
import { environment } from '../../../environments/environment';
import { fetchPageNav } from '../../services/magnolia-service';
import { Typography } from '@/components/typography';

interface NavigationResponse {
  results: MgnlContent[];
  [key: string]: unknown;
}

interface IBreadcrumbProps {
  title?: string;
}

const Breadcrumb: React.FC<IBreadcrumbProps> = ({ title }) => {
  const [navigation, setNavigation] = useState<NavigationResponse | null>(null);
  const [breadcrumbPath, setBreadcrumbPath] = useState<MgnlContent[] | null>(
    null
  );
  const [isMagnolia, setIsMagnolia] = useState<boolean>(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const location = {
    pathname: pathname ? pathname : '/',
    search: searchParams ? `?${searchParams.toString()}` : '',
  };

  useEffect(() => {
    const loadNavigation = async () => {
      try {
        const path = location.pathname + location.search;
        const nodeName = environment.appBase;
        const ctx = EditorContextService.getMagnoliaContext(
          path,
          nodeName,
          environment.languages
        );
        setIsMagnolia(ctx.isMagnolia);

        const navBase =
          'http://localhost:8080/magnoliaAuthor/.rest/delivery/pagenav/v1';
        const navData = await fetchPageNav('/', navBase);
        setNavigation(navData as unknown as NavigationResponse);
      } catch {
        setNavigation(null);
      }
    };

    loadNavigation();
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!navigation) return;

    const targetPath = !isMagnolia
      ? location.pathname === '/'
        ? environment.appBase
        : location.pathname.startsWith(environment.appBase)
          ? location.pathname
          : `${environment.appBase}${location.pathname}`
      : location.pathname;

    const segments = targetPath.split('/').filter(Boolean);
    let accumulatedPath = '';
    const accumulatedPaths = segments.map((segment) => {
      accumulatedPath += `/${segment}`;
      return accumulatedPath;
    });

    const breadcrumbNodes = accumulatedPaths
      .map((path) => navigation.results.find((n) => n['@path'] === path))
      .filter((node): node is MgnlContent => Boolean(node));

    setBreadcrumbPath(breadcrumbNodes);
  }, [navigation, location.pathname, isMagnolia]);

  const getLinkPath = (nodePath: string): string => {
    if (!isMagnolia && nodePath.startsWith(environment.appBase)) {
      const path = nodePath.replace(environment.appBase, '');
      const linkPath = path === '' ? '/' : path;
      return location.pathname.startsWith(environment.appBase)
        ? `${environment.appBase}${linkPath}`
        : linkPath;
    }
    return nodePath;
  };

  return (
    <div className='bg-secondary-foreground hidden lg:block xl:px-20'>
      <div className='container mx-auto py-1'>
        <ShadcnBreadcrumb>
          <BreadcrumbList>
            {/* {breadcrumbPath.map(({ label, href }, idx) =>
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
            )} */}
            {breadcrumbPath?.map((node, index) => {
              const isLast = index === breadcrumbPath.length - 1;

              return (
                <React.Fragment key={node['@id']}>
                  {isLast ? (
                    <BreadcrumbItem>{node.title as string}</BreadcrumbItem>
                  ) : (
                    <>
                      <BreadcrumbLink href={getLinkPath(node['@path'])}>
                        {node.title as string}
                      </BreadcrumbLink>
                      <BreadcrumbSeparator />
                    </>
                  )}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </ShadcnBreadcrumb>
      </div>
    </div>
  );

  // return (
  //   <div className="p-2">
  //     {title && <p>{title}</p>}
  //     {breadcrumbPath && (
  //       <nav className="text-sm" aria-label="Breadcrumb">
  //         <ol className="list-reset flex text-gray-700">
  //           {breadcrumbPath.map((node, index) => {
  // const isLast = index === breadcrumbPath.length - 1;
  //             return (
  //               <li key={node['@id']} className="flex items-center">
  //                 {!isLast ? (
  //                   <>
  //                     <a
  //                       href={getLinkPath(node['@path'])}
  //                       className="text-blue-600 hover:underline"
  //                     >
  //                       {node.title as string}
  //                     </a>
  //                     <span className="mx-2">/</span>
  //                   </>
  //                 ) : (
  //                   <span>{node.title as string}</span>
  //                 )}
  //               </li>
  //             );
  //           })}
  //         </ol>
  //       </nav>
  //     )}
  //   </div>
  // );
};

export default Breadcrumb;
