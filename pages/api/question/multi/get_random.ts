import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

const main = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const limit: any = req.query.limit;
    try {
      const ids: any =
        await prisma.$queryRaw`SELECT id FROM "public"."Question" Order BY random() limit ${parseInt(
          limit
        )}`;
      const Questions = await prisma.question.findMany({
        where: {
          id: { in: ids.map((q: any) => q.id) },
        },
        include: {
          choices: true, // Return all fields
          img: true,
          category: true,
        },
      });
      res.json({ result: Questions });
    } catch (err) {
      console.log(err);
    }
  }
};

export default main;
