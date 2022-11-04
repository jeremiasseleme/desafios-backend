const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const router = require("./routes")

app.use("/api", router)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/public', express.static(__dirname + './public'));


app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});