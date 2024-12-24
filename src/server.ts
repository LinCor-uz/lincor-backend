import express from "express";
import {getEnvVariable} from "./utils/dotenv";

const app = express();
const PORT = getEnvVariable("SERVER_PORT");
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})

