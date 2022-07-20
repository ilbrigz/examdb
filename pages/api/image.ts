import { IncomingForm } from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
var mv = require('mv');

export const config = {
  api: {
    bodyParser: false,
  },
};

const main = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const uploadedData: any = await new Promise((resolve, reject) => {
      const form = new IncomingForm();
      form.parse(req, (err, fields, files: any) => {
        if (err) return reject(err);
        var oldPath = files.file.filepath;
        var newPath = `public/uploads/${
          Date.now() + '--' + files.file.originalFilename
        }`;
        mv(oldPath, newPath, function (err: any) {
          console.log(err);
        });

        resolve({ newPath: newPath.replace('public/', ''), files });
      });
    });

    await prisma.image.create({
      data: {
        url: uploadedData.newPath,
      },
    });
    res.json({ data: uploadedData });
  } else if (req.method === 'GET') {
    const questionCount = await prisma.image.findMany({
      orderBy: { id: 'desc' },
    });
    res.json({ result: questionCount });
  }
};

export default main;
