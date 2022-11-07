// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_KEY })

const database_id = process.env.NOTION_DATABASE_ID!

async function getItems() {
  try {
    const response = await notion.databases.query({
      database_id,
      sorts: [
        {
          property: 'price',
          direction: 'ascending',
        },
      ],
    })
    console.log(
      '🚀 ~ file: get-items.ts ~ line 20 ~ getItems ~ response',
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
  items?: any
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const response = await getItems()
    console.log('🚀 ~ file: get-items.ts ~ line 38 ~ response', response)
    res.status(200).json({ items: response?.results, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: `Fail to get Items` })
  }
}
