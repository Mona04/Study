import Link from "nextwrap/link"

import {CATEGORY_DISPLAY_DEPTH} from "configs/blog-config"
import {postDirectories, PostDirectory} from 'utils/content-helper'

import style from "./sidebar.module.scss"


function MakeCategoryView(category : PostDirectory, slug: string = '', depth : number = 0)
{
  slug += '/' + category.category;

  if(depth > CATEGORY_DISPLAY_DEPTH || Object.keys(category.childs).length < 1) return <div key={slug}></div>

  const subviews = Object.values(category.childs).map(sub => MakeCategoryView(sub, slug, depth + 1));

  return (
    <div key={`${slug}`}>
      <div className={style["category-item-" + depth]}>        
        <Link href={`${slug}`}>
          {`${category.category}(${category.count})`}
        </Link>
      </div>
      { subviews.length > 0 && <div>{subviews}</div> }    
    </div>
  );
}

export default () => {  
  const categories = postDirectories;

  return (
    <div>
      { Object.values(categories).map(sub => MakeCategoryView(sub)) }
    </div>   
  );
};