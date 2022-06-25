import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { Prisma } from '@prisma/client';

const main = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const limit: any = req.query.limit;
    const category: any = req.query.category;
    let take_recent;
    if (parseInt(req.query.take_recent as string) === 1) {
      take_recent = true;
    }
    try {
      let idsToFetch: any;
      if (!category) {
        idsToFetch = await prisma.$queryRaw`select id from public."Question"  ${
          take_recent
            ? Prisma.sql`order by "createdAt" desc`
            : Prisma.sql`order by Random()`
        } limit ${parseInt(limit)}`;
      } else {
        const t = Array.isArray(category) ? category : [category];
        idsToFetch =
          await prisma.$queryRaw`select id from public."Question" where id in (select "B" from public."_CategoryToQuestion" where "A" in (select id from public."Category" where name in (${Prisma.join(
            t
          )}))) ${
            take_recent
              ? Prisma.sql`order by "createdAt" desc limit ${parseInt(limit)}`
              : Prisma.sql`order by Random() limit ${parseInt(limit)}`
          }`;
      }

      const Questions = await prisma.question.findMany({
        where: {
          id: { in: idsToFetch.map((q: any) => q.id) },
        },
        include: {
          choices: true, // Return all fields
          img: true,
          category: true,
        },
        take: Number.isNaN(parseInt(limit)) ? undefined : parseInt(limit),
        ...(take_recent
          ? {
              orderBy: {
                id: 'desc',
              },
            }
          : {}),
      });
      res.json({ result: Questions });
    } catch (err) {
      console.log(err);
    }
  }
};

export default main;
