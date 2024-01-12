import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import ElectionNewsletterForm from 'pliny/ui/ElectionNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  ElectionNewsletterForm,
}
