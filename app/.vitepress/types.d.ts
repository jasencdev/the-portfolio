import { DefaultTheme } from 'vitepress'

declare module 'vitepress' {
  namespace DefaultTheme {
    interface Config {
      posts?: {
        title: any;
        date: any;
        link: string;
      }[];
      projects?: {
        title: any;
        date: any;
        link: string;
      }[];
    }
  }
}