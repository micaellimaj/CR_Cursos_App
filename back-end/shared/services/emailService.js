require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail({ to, subject, template, context }) {
  try {
    console.log('🔍 Enviando email para:', to);
    console.log('🔍 Usando template:', template);
    
    const templatePath = path.join(__dirname, '../templates', `${template}.hbs`);
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const compiledTemplate = handlebars.compile(templateSource);
    const html = compiledTemplate(context);
    
    const msg = {
      to: to,
      from: `"CR Cursos" <${process.env.EMAIL_FROM}>`,
      subject: subject,
      html: html
    };
    
    console.log('🔍 Enviando via SendGrid...');
    const result = await sgMail.send(msg);
    console.log('✅ Email enviado:', result[0].statusCode);
    return { success: true };
    
  } catch (error) {
    console.error('❌ Erro completo:', error);
    if (error.response) {
      console.error('❌ Resposta SendGrid:', error.response.body);
    }
    throw new Error(`Falha ao enviar email: ${error.message}`);
  }
}

module.exports = { sendEmail };