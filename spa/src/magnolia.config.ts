import ContainerComponent from './app/templates/components/Container'
import { MagnoliaConfig } from '@magnolia/react-editor';

import List from './app/templates/components/List';
import ListItem from './app/templates/components/ListItem';
import Text from './app/templates/components/Text';
import TextImage from './app/templates/components/TextImage';
import Basic from './app/templates/pages/Basic';

export const config: MagnoliaConfig = {
  componentMappings: {
    'spa-lm:pages/basic': Basic,

    'spa-lm:components/text': Text,
    'spa-lm:components/textImage': TextImage,
    'spa-lm:components/list': List,
    'spa-lm:components/listItem': ListItem,
    "spa-lm:components/container": ContainerComponent
  },
};
