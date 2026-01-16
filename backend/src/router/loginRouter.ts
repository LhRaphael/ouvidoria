import { Router } from "express";
import { LoginMiddleware } from "../controller/loginMidleware";

const loginRouter = Router();
const loginMiddleware = new LoginMiddleware();  

loginRouter.post("/", async (req, res) => {
    const { email, password } = req.body;
    const response = await loginMiddleware.middleware(email, password);
    console.log(response);
    return res.json(response);
});

export { loginRouter };