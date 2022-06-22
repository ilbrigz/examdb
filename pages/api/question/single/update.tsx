import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

const main = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { id, hint, categories } = req.body;
    try {
      const result = await prisma.question.update({
        where: {
          id: id,
        },
        include: {
          category: true,
        },
        data: {
          ...(hint ? { hint: hint } : {}),
          ...(categories && categories.length
            ? {
                category: {
                  connect: categories.map((c: string) => ({ id: parseInt(c) })),
                },
              }
            : {}),
        },
      });
      res.json({ msg: result });
    } catch (err) {
      console.log(err);
      res.json({ err });
    }
  }
};

export default main;
