const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public")); // For serving HTML/CSS/JS

// Gmail credentials
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "YOUR_GMAIL@gmail.com",      // replace with your Gmail
        pass: "YOUR_APP_PASSWORD"          // use Gmail App Password
    }
});

app.post("/submit", (req, res) => {
    const { name, class: cls, section, hall, hostel } = req.body;

    const mailOptions = {
        from: "YOUR_GMAIL@gmail.com",
        to: "YOUR_GMAIL@gmail.com",
        subject: `New Student Submission: ${name}`,
        text: `Student Details:\nName: ${name}\nClass: ${cls}\nSection: ${section}\nHall: ${hall}\nHostel: ${hostel}`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.json({status: "error", error});
        } else {
            console.log("Email sent: " + info.response);
            res.json({status: "success"});
        }
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));
