// functions/src/index.ts

"use client";

import { onCall, onRequest } from 'firebase-functions/v2/https';
import * as nodemailer from 'nodemailer';
import { Request, Response } from 'express';

// —— Existing contact-form callable; unchanged ——
export const sendContactEmail = onCall({
  cors: true,
  maxInstances: 10,
  timeoutSeconds: 30,
  secrets: ['ZOHO_PASSWORD']
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
    return { success: false, message: 'Failed to send email' };
  }
});

// —— In-memory store for resume data ——
const resumeStore = new Map<string, string>();

function generateId(len = 3): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < len; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

// —— HTTP function to handle POST/GET at /api/resume ——
export const resume = onRequest({ cors: true }, async (req: Request, res: Response) => {
  if (req.method === 'POST') {
    const { ciphertext, iv, salt } = req.body as {
      ciphertext: string;
      iv: string;
      salt: string;
    };
    let id: string;
    do { id = generateId(); } while (resumeStore.has(id));
    resumeStore.set(id, JSON.stringify({ ciphertext, iv, salt }));
    // Send JSON but do not return the Response object
    res.json({ id });
    return;

  } else if (req.method === 'GET') {
    const id = req.query.id as string | undefined;
    if (!id || !resumeStore.has(id)) {
      res.status(404).send('Not found');
      return;
    }
    const payload = resumeStore.get(id)!;
    res.json(JSON.parse(payload));
    return;

  } else {
    res.status(405).send('Method Not Allowed');
    return;
  }
});
