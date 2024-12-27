import express from "express"
import {getEnvVariable} from "@utils";
import {categoryRouter, videoRouter} from "@router";


const app = express();
const PORT = getEnvVariable("SERVER_PORT") ?? 8000;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// base routes
app.use("/api/v1/category", categoryRouter)
app.use("/api/v1/video", videoRouter)

app.use("/*", (req, res) => {
    res.status(404).send("Page Not Found");
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})

