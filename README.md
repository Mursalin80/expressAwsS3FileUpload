# express AwsS3 FileUpload

Nodejs express project to upload images to aws S3 service

Install required packages

```bash
npm install or npm i

```

Add .env file in root directory of project.

Get your parameters from AWS and add in .env file as shown in following code

```
AWS_ACCESS_KEY = ''
AWS_SECRET_KEY = ''
AWS_REGION = ''
AWS_S3_BUCKET_NAME = ''

PORT = 5000
```

start the app

```bash
npm start
```

use postman to send post request to http://localhost:5000/image
