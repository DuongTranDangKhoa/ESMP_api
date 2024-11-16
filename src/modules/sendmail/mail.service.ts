import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "../../config/mail.config";

export const sendEmail = async (toEmail: string, subject: string, body: string) => {
  const params = {
    Source: "esmpservice@esmp.id.vn", // Địa chỉ email đã xác thực
    Destination: {
      ToAddresses: [toEmail],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: body,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
  };

  const command = new SendEmailCommand(params);
  return sesClient.send(command);
};
