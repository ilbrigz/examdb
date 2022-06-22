import { Prisma } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

const main = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { choices, text, category, correctChoice, imgUrl, hint, categories } =
      req.body;
    try {
      type NewType = Prisma.ImageCreateOrConnectWithoutQuestionInput;

      const Question = await prisma.question.create({
        data: {
          text,
          hint: !!hint ? hint : undefined,
          choices: {
            connectOrCreate: choices.map((c: string) => {
              return {
                where: { name: c },
                create: { name: c },
              };
            }),
          },
          category: {
            connect: categories.map((c: string) => ({ id: parseInt(c) })),
          },
          img: {
            connectOrCreate:
              imgUrl !== undefined
                ? ({
                    where: {
                      url: imgUrl,
                    },
                    create: {
                      url: imgUrl,
                    },
                  } as NewType)
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
  }
};

export default main;
