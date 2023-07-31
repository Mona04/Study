import Link from "next/link"

import {BLOG_NAME, CATEGORY_DISPLAY_DEPTH} from "configs/blog-config"
import {blogCategories, Category, Categories} from 'utils/blog-helper'
import SideBarInteract from './siderbar-interact'
import style from "./sidebar.module.scss"

const maxDepth : number = 4;

function MakeCategoryView(category : Category, slug: string = '', depth : number = 0)
{
  if(depth > CATEGORY_DISPLAY_DEPTH) return <></>

  const subviews : JSX.Element[] = [];
  slug += '/' + category.category;
  Object.values(category.childs).map(sub => {
    subviews.push(MakeCategoryView(sub, slug, depth + 1))
  });

  return (
    <div>
      <div className={style["category-item-" + depth]}>        
        <Link href={slug}>
          {`${category.category}(${category.count})`}
        </Link>
      </div>
      { subviews.length > 0 && <div>{subviews}</div> }    
    </div>
  );
}
function MakeCategoriesView(categories : Categories)
{
  const subviews : JSX.Element[] = [];
  Object.values(categories).map(sub => {
    subviews.push(MakeCategoryView(sub))
  });
  return (
    <>
      {subviews.length > 0 && <div>{subviews}</div>}
    </>
  )
}

async function sidebar() {
  const categories = await blogCategories();

  return (
    <div className={style.sidebar}>
          <div>
          <Link href="/">
            {"Home Page"}
          </Link>
        </div>
      { MakeCategoriesView(categories) }
    </div>   
  );
}

function SideBar() {
  return (
    <aside>
      <SideBarInteract>    
        {sidebar()}
      </SideBarInteract>  
    </aside>
  );
}

export default SideBar;