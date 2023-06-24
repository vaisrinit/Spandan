import Router from "express";
import { fnDbQuery } from "../config/psqlAPM";
import { CommonCntrl } from "../controller/commoncntrl";
import { UserController } from "../controller/userContrller";
const router = Router()
module.exports = router;

const cmnCntrl = new CommonCntrl();
const usrCntrl = new UserController();
console.log('My API router is loaded');

initialize();
async function initialize() {
    cmnCntrl.checkDB();
}

router.post('/register',async (req:any, res)=>{
    if(cmnCntrl.getIsDBConnected()){
        let result = await usrCntrl.register(req.body);
        if(result?.success) res.status(200).json(result);
        else res.status(400).json(result);
    }
    else{
        res.status(400).json({success:false,message:'DB Connction failure,try after some time'});
    }
});
router.post('/login',async (req:any, res)=>{
    if(cmnCntrl.getIsDBConnected()){
        console.log(req.body)
        let result = await usrCntrl.login(req.body);
        if(result?.success) res.status(200).json(result);
        else res.status(400).json(result);
    }
    else{
        res.status(501).json({success:false,message:'DB Connction failure,try after some time'});
    }
})