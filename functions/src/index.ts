"use client";

import { onCall } from 'firebase-functions/v2/https';
import * as nodemailer from 'nodemailer';

export const sendContactEmail = onCall({
    cors: true,
    maxInstances: 10,
    timeoutSeconds: 30,
    secrets: ['ZOHO_PASSWORD'] // Declare that we're using this secret
}, async (request) => {
    try {
        const { name, email, subject, message } = request.data;

        // Get the secret value
        const zohoPassword = process.env.ZOHO_PASSWORD;
        
        if (!zohoPassword) {
            console.error('Zoho password not found');
            return {
                success: false,
                message: 'Email configuration error'
            };
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.zoho.com',
            port: 465,
            secure: true,
            auth: {
                user: 'info@cajcode.com',
                pass: zohoPassword
            }
        });

        const mailOptions = {
            from: '"CAJCODE Contact" <info@cajcode.com>',
            to: 'info@cajcode.com',
            replyTo: email,
            subject: `Contact Form: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif;">
                    <h2>New Contact Form Message</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        return { success: true, message: 'Email sent successfully' };

    } catch (error) {
        console.error('Error:', error);
        return {
            success: false,
            message: 'Failed to send email'
        };
    }
});