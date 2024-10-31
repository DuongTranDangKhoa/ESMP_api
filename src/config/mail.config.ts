import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";


export const sesClient = new SESClient({
  region: "ap-southeast-1", 
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});