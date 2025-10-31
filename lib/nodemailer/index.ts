import nodemailer from 'nodemailer';
import {google} from 'googleapis';
import {WELCOME_EMAIL_TEMPLATE, NEWS_SUMMARY_EMAIL_TEMPLATE} from "@/lib/nodemailer/templates";

// export const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.NODEMAILER_EMAIL!,
//         pass: process.env.NODEMAILER_PASSWORD!,
//     }
// })
// export const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//         type: 'OAuth2',
//         user: 'user@example.com',
//         clientId: process.env.CLIENT_ID!,
//         clientSecret: process.env.CLIENT_SECRET!,
//         refreshToken: process.env.REFRESH_TOKEN!,
//         accessToken: await OAuth2Client.getAccessToken().then(res => res.token as string)
//     }
// });

const OAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID!,
    process.env.CLIENT_SECRET!,
    "https://developers.google.com/oauthplayground"
);



// export const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         type: 'OAuth2',
//         user: process.env.NODEMAILER_EMAIL!,
//         clientId: process.env.CLIENT_ID!,
//         clientSecret: process.env.CLIENT_SECRET!,
//         refreshToken: process.env.REFRESH_TOKEN!,
//         accessToken: await OAuth2Client.getAccessToken().then(res => res.token as string)
//     }
// });

export const sendWelcomeEmail = async ({ email, name, intro }: WelcomeEmailData) => {

    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.NODEMAILER_EMAIL!,
        clientId: process.env.CLIENT_ID!,
        clientSecret: process.env.CLIENT_SECRET!,
        refreshToken: process.env.REFRESH_TOKEN!,
        accessToken: await OAuth2Client.getAccessToken().then(res => res.token as string)
    }
});

    
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE
        .replace('{{name}}', name)
        .replace('{{intro}}', intro);

    const mailOptions = {
        from: `"Signalist" <signalist@jsmastery.pro>`,
        to: email,
        subject: `Welcome to Signalist - your stock market toolkit is ready!`,
        text: 'Thanks for joining Signalist',
        html: htmlTemplate,
    }

    await transporter.sendMail(mailOptions);
}

export const sendNewsSummaryEmail = async (
    { email, date, newsContent }: { email: string; date: string; newsContent: string }
): Promise<void> => {

    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.NODEMAILER_EMAIL!,
        clientId: process.env.CLIENT_ID!,
        clientSecret: process.env.CLIENT_SECRET!,
        refreshToken: process.env.REFRESH_TOKEN!,
        accessToken: await OAuth2Client.getAccessToken().then(res => res.token as string)
    }
});

    const htmlTemplate = NEWS_SUMMARY_EMAIL_TEMPLATE
        .replace('{{date}}', date)
        .replace('{{newsContent}}', newsContent);

    const mailOptions = {
        from: `"Signalist News" <signalist@jsmastery.pro>`,
        to: email,
        subject: `📈 Market News Summary Today - ${date}`,
        text: `Today's market news summary from Signalist`,
        html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);
};
