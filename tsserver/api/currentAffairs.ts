import Router from "express";
import { CommonCntrl } from "../controller/commoncntrl";
import { encrypt, decrypt } from '../config/config'
import { CaController } from "../controller/currentAffairsController";

const router = Router()
const cmnCntrl = new CommonCntrl();
const caCntrl = new CaController();

//middleware
router.use(async (req: any, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        res.json({ success: false, invalidToken: true, message: 'No Token Provided' })
    }
    else {
        let result = await cmnCntrl.validateToken(token);
        if (result.success) {
            req.decoded = result.decoded;
            next();
        }
        else {
            res.json(result);
        }
    }
})

export default router;