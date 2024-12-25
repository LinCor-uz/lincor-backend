import express from "express"
import {getEnvVariable} from "@utils";
import {router} from "@router";


const app = express();
const PORT = getEnvVariable("SERVER_PORT") ?? 8000;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api/v1/", router)


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})

