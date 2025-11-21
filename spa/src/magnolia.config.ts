import ContentB1Component from './app/templates/components/ContentB1'
import ButtonComponent from './app/templates/components/Button'
import BreadcrumbComponent from './app/templates/components/Breadcrumb'
import Sample1Component from './app/templates/components/Sample1'
import SampleComponent from './app/templates/components/Sample'
import FlexibleC1Component from './app/templates/components/FlexibleC1'
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
    "spa-lm:components/container": ContainerComponent,
    "spa-lm:components/flexibleC1": FlexibleC1Component,
    "spa-lm:components/sample": SampleComponent,
    "spa-lm:components/sample1": Sample1Component,
    "spa-lm:components/breadcrumb": BreadcrumbComponent,
    "spa-lm:components/button": ButtonComponent,
    "spa-lm:components/contentB1": ContentB1Component
  },
};
