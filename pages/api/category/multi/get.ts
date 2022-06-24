import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

const main = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const result = await prisma.category.findMany({
        orderBy: {
          id: 'desc',
        },
      });
      res.json({ data: result });
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
};

export default main;
