
import type { MarkdownBody, MDXBody, RawDocumentData } from '@archivelayer/core'

export type { MarkdownBody, MDXBody, RawDocumentData }
/** Document types */
export type BlogMDPost = {
  _id:  string,
  _type: BlogMDPost,
  _raw: RawDocumentData,
  body: MarkdownBody,
  title: string,
  date: Date,
  description: string,
  tags: string[],
  thumbnail: string,
  isDirectory: boolean,
  url: string,
}
/** Document types */
export type BlogMDXPost = {
  _id:  string,
  _type: BlogMDXPost,
  _raw: RawDocumentData,
  body: MDXBody,
  title: string,
  date: Date,
  description: string,
  tags: string[],
  thumbnail: string,
  isDirectory: boolean,
  url: string,
}
