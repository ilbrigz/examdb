import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
  } else if (req.method === 'GET') {
    const questionCount = await prisma.question.count();
    res.json({ result: questionCount });
  }
};
