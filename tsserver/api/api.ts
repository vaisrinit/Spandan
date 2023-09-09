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

router.post('/register', async (req: any, res) => {
    try{
        if (cmnCntrl.getIsDBConnected()) {
            let result = await usrCntrl.register(req.body);
            if (result?.success) res.status(200).json(result);
            else res.status(400).json(result);
        }
        else {
            res.status(400).json({ success: false, message: 'DB Connction failure,try after some time' });
        }
    }
    catch(err:any){
        res.json({success:false,error:true,message:err.stack}); 
    }
    
});
router.post('/login', async (req: any, res) => {
    try{
        if (cmnCntrl.getIsDBConnected()) {
            console.log(req.body);
            let result = await usrCntrl.login(req.body);
            if (result?.success) res.status(200).json(result);
            else res.status(400).json(result);
        }
        else {
            res.status(501).json({ success: false, message: 'DB Connction failure,try after some time' });
        }
    }
    catch(err:any){
        res.json({success:false,error:true,message:err.stack});
    }
    
})

router.use(async (req: any, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        res.json({ success: false, invalidToken: true, message: 'No Token Provided' })
    }
    else {
        let result = await usrCntrl.validateToken(token);
        if (result.success) {
            req.decoded = result.decoded;
            next();
        }
        else {
            res.json(result);
        }
    }
})

router.get('/getUsers', async (req: any, res) => {
    try{
        if (cmnCntrl.getIsDBConnected()) {
            let result = await usrCntrl.getUsers();
            if (result?.success) res.status(200).json(result);
            else res.status(400).json(result);
        }
        else {
            res.status(501).json({ success: false, message: 'DB Connction failure,try after some time' });
        }
    }
    catch(err:any){
        res.json({success:false,error:true,message:err.stack});
    }
    
})

router.post('/addExerciseDetails', async (req: any, res) => {
    try{
        if (cmnCntrl.getIsDBConnected()) {
            console.log(req.body)
            let result = await usrCntrl.addExerciseDetails(req.body);
            if (result?.success) res.status(200).json(result);
            else res.status(400).json(result);
        }
        else {
            res.status(501).json({ success: false, message: 'DB Connction failure,try after some time' });
        }
    }
    catch(err:any){
        res.json({success:false,error:true,message:err.stack});
    }
    
})

router.get('/getExerciseDetails', async (req: any, res) => {
    try{
        if (cmnCntrl.getIsDBConnected()) {
            console.log(req.body)
            let result = await usrCntrl.getExerciseDetails();
            if (result?.success) res.status(200).json(result);
            else res.status(400).json(result);
        }
        else {
            res.status(501).json({ success: false, message: 'DB Connction failure,try after some time' });
        }
    }
    catch(err:any){
        res.json({success:false,error:true,message:err.stack});
    }
    
})