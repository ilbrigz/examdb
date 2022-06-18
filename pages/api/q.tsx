import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { choices, text, category, correctChoice } = req.body;
    // Process a POST request
    try {
      const Question = await prisma.question.create({
        data: {
          text,
          choices: {
            connectOrCreate: choices.map((c: string) => {
              return {
                where: { name: c },
                create: { name: c },
              };
            }),
          },
          category: {
            connectOrCreate:
              category !== undefined
                ? {
                    where: {
                      id: category.id,
                    },
                    create: {
                      id: category.id,
                      name: category.name,
                    },
                  }
                : undefined,
          },
        },
      });
      const UpdatedQuestion = await prisma.question.update({
        where: {
          id: Question.id,
        },
        data: {
          correctChoice: {
            connect: {
              name: correctChoice, //change me
            },
          },
        },
      });
      res.json({ result: UpdatedQuestion });
    } catch (e) {
      res.status(401);
      res.json({ error: 'Question already exists' });
      return;
    }

    return;
  } else if (req.method === 'GET') {
    const Questions = await prisma.question.findMany({
      include: {
        choices: true, // Return all fields
      },
    });
    res.json({ result: Questions });
  }
};
