import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

const main = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
  } else if (req.method === 'GET') {
    const questionCount = await prisma.question.count();
    res.json({ result: questionCount });
  }
};

export default main;
