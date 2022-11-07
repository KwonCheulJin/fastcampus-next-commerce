// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getProducts() {
  try {
    const response = await prisma.products.findMany()
    console.log(
      '🚀 ~ file: get-items.ts ~ line 20 ~ getItems ~ response',
      response
    )
    return response
  } catch (error) {
    console.error(error)
  }
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
    const products = await getProducts()
    console.log('🚀 ~ file: get-items.ts ~ line 38 ~ products', products)
    res.status(200).json({ items: products, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: `Fail to get Products` })
  }
}
