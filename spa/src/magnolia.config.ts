import { MagnoliaConfig } from '@magnolia/react-editor';
import Basic from './app/templates/pages/Basic';
import SelectHomePage from './app/templates/pages/SelectHomePage';

export const config: MagnoliaConfig = {
  componentMappings: {
    'spa-lm:pages/basic': Basic,

    'pages:pages/select-home': SelectHomePage,
  },
};
