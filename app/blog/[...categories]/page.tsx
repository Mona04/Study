

export default function Page({ params }: { params: { categories: string[] } }) {
  return <div>My Post: {params.categories}</div>
}

export function generateStaticParams(options: {params: any}) {
 // const posts = await fetch('https://.../posts').then((res) => res.json())
  const posts = [['aaa'], ['bbb'], ['ccc']];
  return posts.map((post) => ({
    categories: post,
  }))
}

export const dynamicParams = false;