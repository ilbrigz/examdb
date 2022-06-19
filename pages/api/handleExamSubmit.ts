import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

const main = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { data } = req.body;
    // Process a POST request
    try {
      const result = await prisma.$transaction(
        data.map((item: any) =>
          prisma.question.update({
            where: {
              id: item.id,
            },
            data: {
              ...(item.isCorrect
                ? { checkCount: { increment: 1 } }
                : {
                    mistakeCount: {
                      increment: 1,
                    },
                  }),
            },
          })
        )
      );
      res.json({ msg: result });
    } catch (err) {
      console.log(err);
    }
  }
};

export default main;
