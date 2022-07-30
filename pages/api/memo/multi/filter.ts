import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { Prisma } from '@prisma/client';

const main = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { filter, filter2, filter3 } = req.body;
    try {
      const result = await prisma.pdf.findMany({
        where: {
          text: {
            contains: filter,
            mode: 'insensitive',
          },
        },
      });
      // await prisma.$queryRaw`select id, label,url, text from public."Pdf" where text ilike "%${filter}"`;
      // const result =
      //   await prisma.$queryRaw`select id, label,url, text from public."Pdf" where text_vector @@ phraseto_tsquery(${filter}) ${
      //     filter2
      //       ? Prisma.sql`and text_vector @@ phraseto_tsquery(${filter2})`
      //       : Prisma.empty
      //   } ${
      //     filter3
      //       ? Prisma.sql`and text_vector @@ phraseto_tsquery(${filter3})`
      //       : Prisma.empty
      //   } order by "createdAt"`;
      res.json({ data: result });
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
};

export default main;
