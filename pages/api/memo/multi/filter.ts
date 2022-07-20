import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

const main = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { filter } = req.body;
    try {
      const result =
        await prisma.$queryRaw`select id, label,url, text from public."Pdf" where to_tsvector(text) @@ phraseto_tsquery(${filter})`;
      res.json({ data: result });
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
};

export default main;
