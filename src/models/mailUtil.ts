class MailUtil{
    public static Alert = (mail:string, status:string) => {
        return {
            to: mail,
            from: 'support@arxum.com',
            subject: 'Run Alert!',
            text: 'Data has been modified on a file in your monitored folder!',
            html: `<strong>Your run was marked as <span style="color: #ff0000">invalid</span> after a </strong> ${status} event!`,
        }
    }

    public static SuccessMail = (mail:string) => {
        return {
            to: mail,
            from: 'support@arxum.com',
            subject: 'Successful Run!',
            text: 'Data has been recorded for a file in your monitored folder!',
            html: `<strong>Process in your run was marked as <span style="color: green">successful</span>!`,
        }
    }
}