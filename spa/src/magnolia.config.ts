import { MagnoliaConfig } from '@magnolia/react-editor';
import Basic from './app/templates/pages/Basic';
import SelectHomePage from './app/templates/pages/SelectHomePage';
import ContentB1 from './app/templates/components/content/ContentB1';

export const config: MagnoliaConfig = {
  componentMappings: {
    'spa-lm:pages/basic': Basic,

    'pages:pages/select-home': SelectHomePage,
    'spa-lm:components/contentB1': ContentB1,
  },
};
