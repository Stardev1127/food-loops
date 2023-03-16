import AWS from 'aws-sdk';
import { keys } from '.';

AWS.config.update({
  secretAccessKey: keys.AWS_SECRET_ACCESS_KEY,
  accessKeyId: keys.AWS_ACCESS_KEY
});

export default AWS;
