import Router from "express";
import { CommonCntrl } from "../controller/commoncntrl";
import { encrypt, decrypt } from '../config/config'
import { DefenceController } from "../controller/defenceController";

const router = Router()
const cmnCntrl = new CommonCntrl();
const defenceCntrl = new DefenceController();

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

//calls after authentication
router.post('/addExerciseDetails', async (req: any, res) => {
    try {
        if (cmnCntrl.getIsDBConnected()) {
            let result = await defenceCntrl.addExerciseDetails(JSON.parse(decrypt(req.body.data)));
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
router.get('/getExerciseDetails', async (req: any, res) => {
    try {
        if (cmnCntrl.getIsDBConnected()) {
            let result = await defenceCntrl.getExerciseDetails();
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

export default router;