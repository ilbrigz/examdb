import { IncomingForm } from 'formidable';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
const util = require('util');
var mv = require('mv');
const pdf = require('pdf-parse');
var fsExtra = require('fs-extra');

export const config = {
  api: {
    bodyParser: false,
  },
};

const main = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Hey yo');
  if (req.method === 'POST') {
    const uploadedData: any = await new Promise((resolve, reject) => {
      const form = new IncomingForm();
      form.parse(req, async (err, fields: any, files: any) => {
        const body = JSON.parse(fields.body);
        if (err) {
          console.log(err);
          return reject(err);
        }
        var oldPath = files.file.filepath;
        var newPath = `public/uploads/${
          Date.now() + '--' + files.file.originalFilename
        }`;
        fsExtra.move(oldPath, newPath, function (err: any) {
          if (err) {
            console.log(err);
            reject();
          }
          resolve({
            originalFilename: files.file.originalFilename,
            newPath: newPath.replace('public/', ''),
            files,
            body,
          });
        });
      });
    });

    let dataBuffer = fs.readFileSync(`public/${uploadedData.newPath}`);
    pdf(dataBuffer).then(async function (data: any) {
      const t = data.text.replace(/\s{2,}|\n/g, ' ').replaceAll('\u0000', '');
      try {
        await prisma.pdf.create({
          data: {
            url: uploadedData.newPath,
            text: t,
            originalName: uploadedData.originalFilename,
            label: uploadedData.body.label,
          },
        });
        res.json({ data: uploadedData });
      } catch (error) {
        if (error) {
          if (error) {
            console.error(error);
            res.json({ error: 'PDF already Exists' });
          }
          fsExtra.remove(`public/${uploadedData.newPath}`, (err: any) => {
            if (err) {
              console.error(err);
              res.json({ error: 'PDF already Exists' });
              return;
            }
          });
        }
      }
    });
  } else if (req.method === 'GET') {
    const questionCount = await prisma.image.findMany({
      orderBy: { id: 'desc' },
    });
    res.json({ result: questionCount });
  }
};

export default main;
