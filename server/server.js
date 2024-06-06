const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("../dotenv").config();

const app = express();
app.use(bodyParser.json());

// CORS 설정
const corsOptions = {
  origin: ["http://localhost:3000", "https://playkit.netlify.app"], // 허용할 도메인
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "jjgs1235@yonsei.ac.kr",
    pass: EMAIL_PASSWORD,
  },
});

app.post("/api/send-email", (req, res) => {
  const { size, date, phone } = req.body;

  const mailOptions = {
    from: "jjgs1235@yonsei.ac.kr",
    to: "jjgs1235@yonsei.ac.kr",
    subject: "새 예약",
    text: `새 예약이 도착했습니다:\n\n사이즈: ${size}\n날짜: ${date}\n전화번호: ${phone}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
