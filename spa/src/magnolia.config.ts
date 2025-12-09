import { MagnoliaConfig } from '@magnolia/react-editor';
import Basic from './app/templates/pages/Basic';
import SelectHomePage from './app/templates/pages/SelectHomePage';
import SelectResearchPrivateWealthManagementPage from './app/templates/pages/SelectResearchPrivateWealthManagementPage';
import ContentB1 from './app/templates/components/content/ContentB1';

export const config: MagnoliaConfig = {
  componentMappings: {
    'spa-lm:pages/basic': Basic,

    'pages:pages/select-home': SelectHomePage,
    'pages:pages/select-research-private-wealth-management':
      SelectResearchPrivateWealthManagementPage,
    'spa-lm:components/contentB1': ContentB1,
  },
};
