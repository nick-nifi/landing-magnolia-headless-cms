import { MagnoliaConfig } from '@magnolia/react-editor';
import Basic from './app/templates/pages/Basic';
import SelectHomePage from './app/templates/pages/SelectHomePage';
import SelectResearchPrivateWealthManagementPage from './app/templates/pages/SelectResearchPrivateWealthManagementPage';
import ServicesBrokerageServicesRetailOnlinePage from './app/templates/pages/ServicesBrokerageServicesRetailOnlinePage';
import ContentB1 from './app/templates/components/content/ContentB1';
import ContentB4 from './app/templates/components/content/ContentB4';

export const config: MagnoliaConfig = {
  componentMappings: {
    'spa-lm:pages/basic': Basic,

    'pages:pages/select-home': SelectHomePage,
    'pages:pages/select-research-private-wealth-management':
      SelectResearchPrivateWealthManagementPage,
    'pages:pages/services-brokerage-services-retail-online':
      ServicesBrokerageServicesRetailOnlinePage,
    'spa-lm:components/contentB1': ContentB1,
    'shared-components:components/contentB4': ContentB4,
  },
};
