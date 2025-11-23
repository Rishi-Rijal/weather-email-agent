import { Agent, tool, run } from '@openai/agents'
import { z } from 'zod';
import axios from 'axios';
import 'dotenv/config';
import * as nodemailer from 'nodemailer'

interface SendEmailParams {
    toEmail: string;
    subject: string;
    body: string;
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

async function sendMail(mailOptions: nodemailer.SendMailOptions) {
    await transporter.sendMail(mailOptions);
}



const weatherTool = tool({
    name: 'get_weather',
    description: 'Get the current weather for a given location.',
    parameters: z.object({
        city: z.string().describe('The city to get the weather for'),
    }),
    execute: async function city({ city }: { city: string }) {
        const url = `https://wttr.in/${city.toLocaleLowerCase()}?format=%C+%t`;
        const response = await axios.get(url, { responseType: 'text' });
        return `The current weather in ${city} is ${response.data}`;

    }
});

const sendEmailTool = tool({
    name: 'send_email',
    description: 'This tool sends an email',
    parameters: z.object({
        toEmail: z.string().describe('email address to'),
        subject: z.string().describe('subject'),
        body: z.string().describe('body of the email')
    }),
    execute: async function sendEmail({ body, subject, toEmail }: SendEmailParams) {
        const mailOptions = {
            from: process.env.GMAIL_ID,
            to: toEmail,
            subject: subject,
            text: body
        }
        await sendMail(mailOptions)
        return `Email queued to ${toEmail} with subject "${subject}"`;
    },
});

const agent = new Agent({
    name: 'Weather Agent',
    instructions: 'You are the agent that provides weather information based on user queries.',
    model: 'gpt-4o-mini',
    tools: [weatherTool, sendEmailTool],
});

async function main(query: string = '') {
    const result = await run(agent, query);
    console.log('Agent Result:', result.finalOutput);
}

main('What is the weather in my current location(Aschaffenburg) find it and email to my address ramrijalrishi@gmail.com');