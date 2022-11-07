// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_KEY })

async function getDetail(pageId: string, propertyId: string) {
  try {
    const response = await notion.pages.properties.retrieve({
      page_id: pageId,
      property_id: propertyId,
    })
    console.log(
      '🚀 ~ file: get-detail.ts ~ line 20 ~ getDetail ~ response',
      response
    )
    return response
  } catch (error) {
    console.error(JSON.stringify(error))
  }
}

type Items = {
  object: string
  id: string
  created_time: string
  last_edited_time: string
  created_by: [Object]
  last_edited_by: [Object]
  cover: null
  icon: null
  parent: [Object]
  archived: boolean
  properties: [Object]
  url: string
}

type Data = {
  detail?: any
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { pageId, propertiesId } = req.query
    const response = await getDetail(String(pageId), String(propertiesId))
    console.log('🚀 ~ file: get-items.ts ~ line 38 ~ response', response)
    res.status(200).json({ detail: response, message: 'Success Detail' })
  } catch (error) {
    res.status(400).json({ message: `Fail to get Detail` })
  }
}
