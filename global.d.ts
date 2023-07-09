declare module '*.scss';
declare module '*.css';

declare global {
  type Author = {
    name: string
    picture: string
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
