import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

const main = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query, '<====');
  if (req.method === 'GET') {
    const limit: any = req.query.limit;
    const category: any = req.query.category;
    let take_recent;
    if (parseInt(req.query.take_recent as string) === 1) {
      take_recent = true;
    }

    try {
      const idsToFetch: any =
        await prisma.$queryRaw`SELECT id FROM "public"."Question" Order BY random() limit ${parseInt(
          limit
        )}`;

      const Questions = await prisma.question.findMany({
        where: {
          ...(take_recent
            ? {}
            : { id: { in: idsToFetch.map((q: any) => q.id) } }),
          ...(category && {
            category: {
              some: {
                name: {
                  in: Array.isArray(category) ? category : [category],
                },
              },
            },
          }),
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
                createdAt: 'desc',
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
