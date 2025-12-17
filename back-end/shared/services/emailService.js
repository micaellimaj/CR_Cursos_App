require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail({ to, subject, template, context }) {
  try {
    // 1. Ler o template Handlebars
    const templatePath = path.join(__dirname, '../templates', `${template}.hbs`);
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    
    // 2. Compilar o template com Handlebars
    const compiledTemplate = handlebars.compile(templateSource);
    const html = compiledTemplate(context);
    
    // 3. Enviar via SendGrid API
    const msg = {
      to: to,
      from: `"CR Cursos" <${process.env.EMAIL_FROM}>`,
      subject: subject,
      html: html
    };
    
    await sgMail.send(msg);
    console.log('✅ Email enviado com sucesso para:', to);
    return { success: true };
    
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error.response?.body || error);
    throw new Error('Falha ao enviar email');
  }
}

module.exports = { sendEmail };