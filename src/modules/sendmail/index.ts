import Elysia from "elysia";
import { sendEmail } from "./mail.service";

export const mailGroup = (app: any) => 
 app.post('/send-email', async (req: { body: { toEmail: string; subject: string; body: string } }) => {
  const { toEmail, subject, body } = req.body;

  try {
    const result = await sendEmail(toEmail, subject, body);
    return {
      status: 'success',
      messageId: result.MessageId,
    };
  } catch (error) {
    return {
      status: 'error',
      error: (error as Error).message,
    };
  }
})
  
;