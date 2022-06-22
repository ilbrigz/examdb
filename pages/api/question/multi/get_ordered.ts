import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

const main = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const limit: any = req.query.limit;
    const Questions = await prisma.question.findMany({
      orderBy: { id: 'desc' },
      take: limit ? parseInt(limit) : undefined,
      include: {
        choices: true, // Return all fields
        img: true,
      },
    });
    res.json({ result: Questions });
  }
};

export default main;
