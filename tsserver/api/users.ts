import Router from "express";
import { CommonCntrl } from "../controller/commoncntrl";
import { encrypt, decrypt } from '../config/config'
import { UserController } from "../controller/userContrller";

const router = Router()
const cmnCntrl = new CommonCntrl();
const usrCntrl = new UserController();

//calls without middleware
router.post('/register', async (req: any, res) => {
    try {
        if (cmnCntrl.getIsDBConnected()) {
            let result = await usrCntrl.register(req.body);
            if (result?.success) res.status(200).json(result);
            else res.status(400).json(result);
        }
        else {
            res.status(400).json({ success: false, message: 'DB Connction failure,try after some time' });
        }
    }
    catch (err: any) {
        res.json({ success: false, error: true, message: err.stack });
    }

});
router.post('/login', async (req: any, res) => {
    try {
        if (cmnCntrl.getIsDBConnected()) {
            // let result = await usrCntrl.login(req.body);
            let result = await usrCntrl.login(JSON.parse(decrypt(req.body.data)));
            result.rows = encrypt(result.rows)
            if (result?.success) res.status(200).json(result);
            else res.status(400).json(result);
        }
        else {
            res.status(501).json({ success: false, message: 'DB Connction failure,try after some time' });
        }
    }
    catch (err: any) {
        res.json({ success: false, error: true, message: err.stack });
    }

})
//middleware for jwt authentication
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

//calls with authentication
router.get('/getUsers', async (req: any, res) => {
    try {
        if (cmnCntrl.getIsDBConnected()) {
            let result = await usrCntrl.getUsers();
            if (result?.success) res.status(200).json(result);
            else res.status(400).json(result);
        }
        else {
            res.status(501).json({ success: false, message: 'DB Connction failure,try after some time' });
        }
    }
    catch (err: any) {
        res.json({ success: false, error: true, message: err.stack });
    }

})

export default router;