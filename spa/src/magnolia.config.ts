import TimelineL1Component from './app/templates/components/TimelineL1'
import CardZ1Component from './app/templates/components/CardZ1'
import ListD5Component from './app/templates/components/ListD5'
import FastfactTileComponent from './app/templates/components/FastfactTile'
import FlexibleC3Component from './app/templates/components/FlexibleC3';
import Flexiblec6Component from './app/templates/components/Flexiblec6';
import { MagnoliaConfig } from '@magnolia/react-editor';
import AccordionComponent from './app/templates/components/Accordion';
import BreadcrumbComponent from './app/templates/components/Breadcrumb';
import ButtonComponent from './app/templates/components/Button';
import ContainerComponent from './app/templates/components/Container';
import GridContainerComponent from './app/templates/components/GridContainer';
import HeaderA3Component from './app/templates/components/HeaderA3';
import HeaderA4Component from './app/templates/components/HeaderA4';
import HeroH1Component from './app/templates/components/HeroH1';
import HomeCarouselComponent from './app/templates/components/HomeCarousel';
import List from './app/templates/components/List';
import ListD1Component from './app/templates/components/ListD1';
import ListD2Component from './app/templates/components/ListD2';
import ListD3Component from './app/templates/components/ListD3';
import ListItem from './app/templates/components/ListItem';
import LogoMComponent from './app/templates/components/LogoM';
import NLocationComponent from './app/templates/components/NLocation';
import SampleComponent from './app/templates/components/Sample';
import Sample1Component from './app/templates/components/Sample1';
import SectionComponent from './app/templates/components/Section';
import StepsKComponent from './app/templates/components/StepsK';
import Text from './app/templates/components/Text';
import TextImage from './app/templates/components/TextImage';
import Typography from './app/templates/components/Typography';
import ContentB1Component from './app/templates/components/content/ContentB1';
import ContentB2Component from './app/templates/components/content/ContentB2';
import ContentB3Component from './app/templates/components/content/ContentB3';
import ContentB4Component from './app/templates/components/content/ContentB4';
import ContentB7Component from './app/templates/components/content/ContentB7';
import FlexibleC1Component from './app/templates/components/flexible/FlexibleC1';
import FlexibleC2Component from './app/templates/components/flexible/FlexibleC2';
import FlexibleC4Component from './app/templates/components/FlexibleC4';
import FlexibleC5Component from './app/templates/components/flexible/FlexibleC5';
import Basic from './app/templates/pages/Basic';
import Grid from './app/templates/components/Grid';

export const config: MagnoliaConfig = {
  componentMappings: {
    'spa-lm:pages/basic': Basic,

    'spa-lm:components/flexibleC3': FlexibleC3Component,
    'spa-lm:components/accordion': AccordionComponent,
    'spa-lm:components/breadcrumb': BreadcrumbComponent,
    'spa-lm:components/button': ButtonComponent,
    'spa-lm:components/container': ContainerComponent,
    'spa-lm:components/contentB1': ContentB1Component,
    'spa-lm:components/contentB2': ContentB2Component,
    'spa-lm:components/contentB3': ContentB3Component,
    'spa-lm:components/contentB4': ContentB4Component,
    'spa-lm:components/contentB7': ContentB7Component,
    'spa-lm:components/flexibleC1': FlexibleC1Component,
    'spa-lm:components/flexibleC2': FlexibleC2Component,
    'spa-lm:components/flexibleC4': FlexibleC4Component,
    'spa-lm:components/flexibleC5': FlexibleC5Component,
    'spa-lm:components/flexiblec6': Flexiblec6Component,
    'spa-lm:components/grid': Grid,
    'spa-lm:components/gridContainer': GridContainerComponent,
    'spa-lm:components/headerA3': HeaderA3Component,
    'spa-lm:components/headerA4': HeaderA4Component,
    'spa-lm:components/heroH1': HeroH1Component,
    'spa-lm:components/homeCarousel': HomeCarouselComponent,
    'spa-lm:components/list': List,
    'spa-lm:components/listD1': ListD1Component,
    'spa-lm:components/listD2': ListD2Component,
    'spa-lm:components/listD3': ListD3Component,
    'spa-lm:components/listItem': ListItem,
    'spa-lm:components/logoM': LogoMComponent,
    'spa-lm:components/nLocation': NLocationComponent,
    'spa-lm:components/sample': SampleComponent,
    'spa-lm:components/sample1': Sample1Component,
    'spa-lm:components/section': SectionComponent,
    'spa-lm:components/stepsK': StepsKComponent,
    'spa-lm:components/text': Text,
    'spa-lm:components/textImage': TextImage,
    'spa-lm:components/typography': Typography,
    "spa-lm:components/fastfactTile": FastfactTileComponent,
    "spa-lm:components/listD5": ListD5Component,
    "spa-lm:components/cardZ1": CardZ1Component,
    "spa-lm:components/timelineL1": TimelineL1Component
  },
};
