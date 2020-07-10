import * as sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class MailService{
    public static sendAlert = async (status:string) => {
        await sgMail.send(MailUtil.Alert("listener@conpharma.com", status))
    }

    public static sendSuccessful = async () => {
        await sgMail.send(MailUtil.SuccessMail("listener@conpharma.com"))
    }
}