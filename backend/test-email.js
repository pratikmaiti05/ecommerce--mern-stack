// require('dotenv').config();
// const { sendEmail } = require('./src/email');

// async function run() {
//   try {
//     const to = process.env.EMAIL_TEST_TO || process.env.EMAIL_USER;
//     console.log('Sending test email to:', to);
//     const info = await sendEmail(to, 'Test email from Fullstack_Ecommerce', 'This is a test', '<p>This is a test</p>');
//     console.log('sendEmail returned:', info);
//     if (info && info.messageId) console.log('MessageId:', info.messageId);
//     try {
//       const url = require('nodemailer').getTestMessageUrl(info);
//       if (url) console.log('Preview URL (Ethereal):', url);
//     } catch (e) {
//       // ignore
//     }
//   } catch (err) {
//     console.error('Test send failed:', err);
//   }
// }

// run();
