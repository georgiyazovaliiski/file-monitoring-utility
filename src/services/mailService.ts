import * as sgMail from '@sendgrid/mail'
import {MailUtil} from "../models/mailUtil";


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export class MailService{
    public static sendAlert = async (status:string) => {
        await sgMail.send(MailUtil.Alert(process.env.SENDGRID_RECEIVER_MAIL, status))
    }

    public static sendSuccessful = async () => {
        await sgMail.send(MailUtil.SuccessMail(process.env.SENDGRID_RECEIVER_MAIL))
    }
}