import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

const main = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { id, hint } = req.body;
    try {
      const result = await prisma.question.update({
        where: {
          id: id,
        },
        data: {
          hint: hint,
        },
      });
      res.json({ msg: result });
    } catch (err) {
      console.log(err);
    }
  }
};

export default main;
