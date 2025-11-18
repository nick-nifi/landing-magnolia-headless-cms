export interface IEnvironment {
  appBase: string;
  pageBase: string;
  templateAnnotationsBase: string;
  navBase: string;
  damRawBase: string;
  languages: string[];

  isDev: boolean;
}

const MGNL_BASE = process.env.MGNL_IS_PREVIEW
  ? process.env.MGNL_BASE_AUTHOR || '/'
  : process.env.MGNL_BASE_PUBLIC || '/';
const MGNL_HOST = process.env.MGNL_HOST || 'http://localhost:8080';
const MGNL_URL = MGNL_HOST + MGNL_BASE;

export const environment: IEnvironment = {
  appBase: process.env.MGNL_SITE_PATH || '/home',
  pageBase: MGNL_URL + process.env.MGNL_API_PAGES,
  templateAnnotationsBase: MGNL_URL + process.env.MGNL_API_TEMPLATES,
  navBase: MGNL_URL + process.env.MGNL_API_NAV,
  damRawBase: MGNL_HOST,
  languages: process.env.MGNL_LANGUAGES?.split(' ') || [],

  isDev: process.env.NODE_ENV === 'development',
};
