const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create a Nodemailer transporter using environment variables
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
        user: process.env.EMAIL_USER, // Use environment variable for email
        pass: process.env.EMAIL_PASS  // Use environment variable for password
    }
});

// Endpoint to send email
app.post('/send-email', (req, res) => {
    const { studentEmail, subject, marks, questionDownloadURL, answerDownloadURL } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER, // Use environment variable for email
        to: studentEmail, // Recipient's email
        subject: 'Your Exam Results Are Now Available',
        html: `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #333;
            line-height: 1.6;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 8px;
          }
          h1 {
            color: #444;
            font-size: 24px;
            margin-bottom: 20px;
          }
          p {
            margin-bottom: 10px;
          }
          a {
            color: #1a73e8;
            text-decoration: none;
          }
          .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #888;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Result Published</h1>
          <p>Dear Student,</p>
          <p>We are pleased to inform you that your exam results for the subject <strong>${subject}</strong> have been Published. Check Your Result</p>
          <p><strong>Marks Obtained:</strong> ${marks}</p>
          <p><strong>Check your result by visiting</strong> <a href="https://sstuition.netlify.app/">SS Tuition</a></p>
          <p>If you have any questions or concerns, please do not hesitate to contact us.</p>
          <p>Best regards,</p>
          <p>SS Tuition</p>
          <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email.');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Email sent successfully.');
        }
    });
});


// Endpoint to send emails for online exercise
app.post('/send-online-exercise-email', (req, res) => {
    const { emails, subject, deadlineDate, downloadURL } = req.body;

    // Create the email content
    const mailOptions = {
        from: process.env.EMAIL_USER, // Use environment variable for email
        to: emails.join(','), // Join email addresses with commas
        subject: subject,
        html: `
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #333;
              line-height: 1.6;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
              border: 1px solid #ddd;
              border-radius: 8px;
            }
            h1 {
              color: #444;
              font-size: 24px;
              margin-bottom: 20px;
            }
            p {
              margin-bottom: 10px;
            }
            a {
              color: #1a73e8;
              text-decoration: none;
            }
            .footer {
              margin-top: 20px;
              font-size: 14px;
              color: #888;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>New Online Exercise Uploaded</h1>
            <p>Dear Students,</p>
            <p>We are pleased to inform you that a new online exercise has been uploaded for your class. Please find the details below:</p>
            <p><strong>Deadline Date:</strong> ${deadlineDate}</p>
            <p><strong>Download the exercise PDF here:</strong> <a href="${downloadURL}">Download Exercise</a></p>
            <p>If you have any questions or concerns, please do not hesitate to contact us.</p>
            <p>Best regards,</p>
            <p>SS Tuition</p>
            <div class="footer">
              <p>This is an automated message. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email.');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Email sent successfully.');
        }
    });
});

// Endpoint to send exam details email
app.post('/send-exam-email', (req, res) => {
    const { emails, subject, examTitle, examDuration, deadline, questions } = req.body;

    // Create the email content
    const mailOptions = {
        from: process.env.EMAIL_USER, // Use environment variable for email
        to: emails.join(','), // Join email addresses with commas
        subject: subject,
        html: `
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #333;
              line-height: 1.6;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
              border: 1px solid #ddd;
              border-radius: 8px;
            }
            h1 {
              color: #444;
              font-size: 24px;
              margin-bottom: 20px;
            }
            p {
              margin-bottom: 10px;
            }
            a {
              color: #1a73e8;
              text-decoration: none;
            }
            .footer {
              margin-top: 20px;
              font-size: 14px;
              color: #888;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>${subject}</h1>
            <p>Dear Students,</p>
            <p>We are pleased to inform you that a new exam has been uploaded for your class. Please find the details below:</p>
            <p><strong>Exam Title:</strong> ${examTitle}</p>
            <p><strong>Deadline Date:</strong> ${deadline}</p>
            <p>You have to complete the exercise within deadline date</p>
            <p>Go here and complete your exercise: <a href="https://sstuition.netlify.app/">SS Tuition</a></p>
            <p>If you have any questions or concerns, please do not hesitate to contact us.</p>
            <p>Best regards,</p>
            <p>SS Tuition</p>
            <div class="footer">
              <p>This is an automated message. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email.');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Email sent successfully.');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
