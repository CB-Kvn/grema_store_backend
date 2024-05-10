import nodemailer from 'nodemailer'

export const  createConnectionEmail = () => {

    const transporter = nodemailer.createTransport({
        service:process.env.SMTP_HOST,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PWD
        }
    })
    return transporter
}