// contentlayer.config.ts
import { ListFieldDefItem, defineDocumentType, makeSource } from 'contentlayer/source-files'


export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.(md|mdx)`,
  contentType: 'markdown',
  fields: {
    title:        { required: true, type: 'string' },
    date:         { required: true, type: 'date',  },
    description:  { required: true, type: 'string'},
    tag:          { required: true, type: 'list', of: {type: "string"}},
  },
}))


export default makeSource({
    contentDirPath: '_content', 
    documentTypes: [Post],
})