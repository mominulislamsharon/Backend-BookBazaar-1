import nodemailer from "nodemailer"


const sendMail = async(to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "training3378@gmail.com",
      pass: "cjva wzpq quwv fvym",
    },
  });
  await transporter.sendMail({
    from: 'Book Bazaar', // sender address
    to, // list of receivers
    subject, // Subject line
    text: "Hello world?", // plain text body
    html, // html body
  });
}

export default sendMail;