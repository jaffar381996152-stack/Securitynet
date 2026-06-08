import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { SES_CONFIG } from '../libs/awsconfig'
const sign = {
    credentials: SES_CONFIG,
    region: process.env.NEXT_AWS_REGION,
};
const sesClient = new SESClient(sign);
export const sendemaildata = async (recipientEmail, name, phone, desc) => {
    let params = {
        Source: 'SecurityNet.ai <info@securitynet.ai>',
        Destination: {
            ToAddresses: ["info@securitynet.ai", "admin@securitynet.ai"],
        },
        ReplyToAddresses: [recipientEmail],
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `<p>New contact form submission from SecurityNet.ai</p>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${recipientEmail}</p>
                    <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                    <p><strong>Message:</strong></p>
                    <p>${desc}</p>`,
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: `Contact Form: Message from ${name}`,
            },
        },
    };
    return await sesClient.send(new SendEmailCommand(params));
};

export const forgetPassword = async (recipientEmail, username, key) => {
    let params = {
        Source: 'SecurityNet.ai <info@securitynet.ai>',
        Destination: {
            ToAddresses: [recipientEmail],
        },
        ReplyToAddresses: [],
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `<p>Need to reset your password at securitynet.ai?</p>
                    <p>To reset your password <a href="${process.env.NEXT_PUBLIC_APP_URL}/verify?key=${key}">click here</a>.</p>
                    <br />
                    <p>If you did not make this request, please ignore this email.</p>
                    `,
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: `Password Reset Request — SecurityNet.ai`,
            },
        },
    };
    return await sesClient.send(new SendEmailCommand(params));
};
