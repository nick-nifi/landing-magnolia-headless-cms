import { MagnoliaConfig } from '@magnolia/react-editor';

import LinkList from './app/templates/components/LinkList';
import ListItem from './app/templates/components/ListItem';
import Text from './app/templates/components/Text';
import TextImage from './app/templates/components/TextImage';
import Basic from './app/templates/pages/Basic';
import SelectHomePage from './app/templates/pages/SelectHomePage';

export const config: MagnoliaConfig = {
  componentMappings: {
    'spa-lm:pages/basic': Basic,
    'pages:pages/select-home': SelectHomePage,

    'spa-lm:components/text': Text,
    'spa-lm:components/textImage': TextImage,
    'spa-lm:components/linkList': LinkList,
    'spa-lm:components/listItem': ListItem,
  },
};
