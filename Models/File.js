const mongoose = require("mongoose");
const nodeMailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  imgUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

/* Post middleware - post method use to do 
 specific task before making a entry in database */

fileSchema.post("save", async function (doc) {
  try {
    console.log("DOC", doc);

    // transporter
    let transporter = nodeMailer.transporter({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    //send mail
    let info = await transporter.sendMail({
      from: `codeHelp`,
      to: doc.email,
      subject: "New file Uploaded to cloudinary",
      html: `<h2>Hello jee <p>file uploaded</p></h2>`,
    });
  } catch (error) {
    console.error(error);
  }
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
