import ListD1Component from './app/templates/components/ListD1'
import HeaderA3Component from './app/templates/components/HeaderA3';
import SectionComponent from './app/templates/components/Section';
import NLocationComponent from './app/templates/components/NLocation';
import HeaderA4Component from './app/templates/components/HeaderA4';
import FlexibleC2Component from './app/templates/components/FlexibleC2';
import FlexibleC5Component from './app/templates/components/FlexibleC5';
import GridContainerComponent from './app/templates/components/GridContainer';
import HomeCarouselComponent from './app/templates/components/HomeCarousel';
import ContentB1Component from './app/templates/components/ContentB1';
import ButtonComponent from './app/templates/components/Button';
import BreadcrumbComponent from './app/templates/components/Breadcrumb';
import Sample1Component from './app/templates/components/Sample1';
import SampleComponent from './app/templates/components/Sample';
import FlexibleC1Component from './app/templates/components/FlexibleC1';
import ContainerComponent from './app/templates/components/Container';
import Typography from './app/templates/components/Typography';
import { MagnoliaConfig } from '@magnolia/react-editor';

import List from './app/templates/components/List';
import ListItem from './app/templates/components/ListItem';
import Text from './app/templates/components/Text';
import TextImage from './app/templates/components/TextImage';
import Basic from './app/templates/pages/Basic';

export const config: MagnoliaConfig = {
  componentMappings: {
    'spa-lm:components/section': SectionComponent,
    'spa-lm:pages/basic': Basic,

    'spa-lm:components/text': Text,
    'spa-lm:components/textImage': TextImage,
    'spa-lm:components/list': List,
    'spa-lm:components/listItem': ListItem,
    'spa-lm:components/container': ContainerComponent,
    'spa-lm:components/flexibleC1': FlexibleC1Component,
    'spa-lm:components/sample': SampleComponent,
    'spa-lm:components/sample1': Sample1Component,
    'spa-lm:components/breadcrumb': BreadcrumbComponent,
    'spa-lm:components/button': ButtonComponent,
    'spa-lm:components/contentB1': ContentB1Component,
    'spa-lm:components/homeCarousel': HomeCarouselComponent,
    'spa-lm:components/gridContainer': GridContainerComponent,
    'spa-lm:components/flexibleC5': FlexibleC5Component,
    'spa-lm:components/flexibleC2': FlexibleC2Component,
    'spa-lm:components/typography': Typography,
    'spa-lm:components/headerA4': HeaderA4Component,
    'spa-lm:components/nLocation': NLocationComponent,
    'spa-lm:components/headerA3': HeaderA3Component,
    "spa-lm:components/listD1": ListD1Component
  },
};
