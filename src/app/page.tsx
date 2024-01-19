import CategoryView from './blog/categories-view'
import {AAA} from 'content-builder'
export default function PostView() {
  console.log(AAA)
  return (
    <>
      <CategoryView path='/blog'/>
    </>
  )
}