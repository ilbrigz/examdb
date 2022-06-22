import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

const main = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { category } = req.body;
    if (!category) res.json({ ok: false, msg: 'Category required' });
    try {
      const result = await prisma.category.create({
        data: {
          name: category,
        },
      });
      res.json({ data: result });
    } catch (err) {
      console.log(err);
      res.json({ ok: false, msg: 'Duplicate Record' });
    }
  }
};

export default main;
