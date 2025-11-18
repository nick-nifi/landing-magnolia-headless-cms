import NavLink from './NavLink';
import { MgnlContent } from '@magnolia/frontend-helpers-base';
import { environment } from '@/environments/environment';

const NavItem = ({
  content,
  nodeName,
  currentLanguage,
  isMagnoliaEdit,
}: {
  content: MgnlContent;
  nodeName?: string | null;
  currentLanguage: string;
  isMagnoliaEdit: boolean;
}) => {
  const baseName =
    currentLanguage === environment.languages[0] ? '' : '/' + currentLanguage;

  if (!content) {
    return null;
  }

  const children = content!['@nodes']?.map((name) => (
    <NavItem
      key={name}
      content={content[name] as MgnlContent}
      nodeName={nodeName}
      currentLanguage={currentLanguage}
      isMagnoliaEdit={isMagnoliaEdit}
    />
  ));

  return (
    <>
      <NavLink
        className='navbar-item'
        href={baseName + content['@path'].replace(nodeName || '', '') || '/'}
        isMagnoliaEdit={isMagnoliaEdit}
      >
        {
          (content.navigationTitle ||
            content.title ||
            content['@name']) as string
        }
      </NavLink>
      {children}
    </>
  );
};

export default NavItem;
