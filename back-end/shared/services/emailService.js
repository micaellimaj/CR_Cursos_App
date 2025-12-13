const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars").default;
const path = require("path");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: Number(process.env.EMAIL_PORT) === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extname: ".hbs",
      partialsDir: path.join(__dirname, "../templates"),
      layoutsDir: path.join(__dirname, "../templates"),
      defaultLayout: false
    },
    viewPath: path.join(__dirname, "../templates"),
    extName: ".hbs"
  })
);

async function sendEmail({ to, subject, template, context }) {
  return transporter.sendMail({
    from: `"CR Cursos" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    template,
    context
  });
}

module.exports = { sendEmail };
