//declare module '*.scss';
//declare module '*.css';

declare global {
  type Author = {
    name: string
    picture: string
  }
  interface AAA {
    aaa: any;
  }
  //type Post = {
  //  slug: string
  //  title: string
  //  date: string
  //  coverImage: string
  //  author: Author
  //  excerpt: string
  //  ogImage: {
  //    url: string
  //  }
  //  content: string
  //}
  interface Post {
    slug: string
    title: string
    date: string
    coverImage: string
    author: Author
    excerpt: string
    ogImage: {
      url: string
    }
    content: string
  }
}
type AAA = {
  aaa: any;
}