import { NotionAPI } from 'notion-client'

// Uses Notion's unofficial API — no token required for public pages
export const notion = new NotionAPI()

export const HOME_PAGE_ID = '24d059c5d48d4f6d9ae6af5558658cfb'

export async function getPage(pageId: string) {
  const recordMap = await notion.getPage(pageId)
  return recordMap
}
