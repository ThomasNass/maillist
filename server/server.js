const express = require('express');
const fs = require('fs');
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

app.post("/", (req, res) => {
    fs.readFile("emails.json", (err, data) => {
        if (err) {
            console.log(err);
            res.status(400).json({ success: false });
            return;
        }

        const emails = JSON.parse(data);
        emails.push(req.body);
        fs.writeFile("emails.json", JSON.stringify(emails, null, 2), (err) => {
            if (err) {
                console.log(err);
            }
        });
        res.status(200).json({ success: true });
    })
});


app.get("/", (req, res) => {
    fs.readFile("emails.json", (err, data) => {
        if (err) {
            console.log(err);
            res.status(400).json({ success: false });
            return;
        }

        const emails = JSON.parse(data);

        res.send(emails);
    })
});

app.listen(5000, () => console.log("Express app is running...."));

