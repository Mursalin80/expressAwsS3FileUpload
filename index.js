const express = require('express');
const fileupload = require('express-fileupload');
const AWS = require('aws-sdk');
const json = express.json();
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

AWS.config.update({ region: process.env.AWS_REGION });

app.use(json);
app.use(fileupload({ limits: { fieldSize: 10 * 1024 * 1024 } }));

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

app.post('/image', async ({ files }, res) => {
  const upParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: files.image.name,
    Body: Buffer.from(files.image.data),
    ContentType: files.image.mimetype,
  };
  s3.upload(upParams, (err, data) => {
    if (err) {
      console.log('Error: ', err);
      res.status(400).send({ Ërror: err });
      return;
    }

    data && console.log('Upload Image Success.', data.Location);
  });

  res.send('OK');
});

const server = app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});
