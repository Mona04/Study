// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files'


export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.(md|mdx)`,
  contentType: 'mdx',
  fields: {
    title:        { type: 'string',   required: true },
    date:         { type: 'date',     required: true },
    description:  { type: 'string',   required: false},
    excerpt:      { type: 'string',   required: false},
  },
}))


export default makeSource({
    contentDirPath: '_content', 
    documentTypes: [Post],
})