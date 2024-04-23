import {postDirectoryRoot, PostDirectory } from 'content-manager'
import CategoryItem from "./sidebar-category-item"

function MakeCategoryView({category, slug = '', depth = 0}: {category : PostDirectory, slug?: string , depth? : number})
{
  slug += '/' + category.category;

  const subviews = Object.values(category.childs)
                    .filter(sub=> Object.keys(sub.childs).length > 0)
                    .map(sub => <MakeCategoryView key={slug} category={sub} slug={slug} depth={depth + 1}/>);

  return (
    <CategoryItem key={slug} slug={slug} label={category.category.toUpperCase()} refCount={category.searchedCount} depth={depth}>
      {subviews.length > 0 ? subviews : <></>}
    </CategoryItem>
  );
}

export default ({filter}:{filter:(v:string)=>boolean}) => {  
  return (
    <div>
    { 
      Object.values(postDirectoryRoot.childs)
        .filter(d=>filter(d.category.toLowerCase()))
        .map(d => <MakeCategoryView key={d.category} category={d}/>) 
    }
    </div>   
  );
};