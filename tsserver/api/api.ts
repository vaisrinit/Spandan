import Router from "express";
import { fnDbQuery } from "../config/psqlAPM";
import { CommonCntrl } from "../controller/commoncntrl";
import { UserController } from "../controller/userContrller";
import { encrypt, decrypt } from '../config/config'
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
            let result = await usrCntrl.login(req.body);
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

//middleware to validate jwttoken

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

router.post('/addExerciseDetails', async (req: any, res) => {
    try {
        if (cmnCntrl.getIsDBConnected()) {
            let result = await usrCntrl.addExerciseDetails(req.body);
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
            let result = await usrCntrl.getExerciseDetails();
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

router.post('/addMatchOfficials', async (req: any, res) => {
    try {
        if (cmnCntrl.getIsDBConnected()) {
            let result = await usrCntrl.addMatchOfficials(req.body);
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
router.get('/getMatchOfficials', async (req: any, res) => {
    try {
        if (cmnCntrl.getIsDBConnected()) {
            let result = await usrCntrl.getMatchOfficials();
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

router.post('/addVenueDetails', async (req: any, res) => {
    try {
        if (cmnCntrl.getIsDBConnected()) {
            let result = await usrCntrl.addVenueDetails(req.body);
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
router.post('/editVenueDetails', async (req: any, res) => {
    try {
        if (cmnCntrl.getIsDBConnected()) {
            let result = await usrCntrl.editVenueDetails(req.body);
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
router.get('/getVenueDetails', async (req: any, res) => {
    try {
        if (cmnCntrl.getIsDBConnected()) {
            let result = await usrCntrl.getVenueDetails();
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

router.post('/addTeamDetails', async (req: any, res) => {
    try {
        if (cmnCntrl.getIsDBConnected()) {
            let result = await usrCntrl.addTeamDetails(req.body);
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
router.get('/getTeamDetails', async (req: any, res) => {
    try {
        if (cmnCntrl.getIsDBConnected()) {
            let result = await usrCntrl.getTeamDetails();
            // {success:result.success,rowCount:result.rowCount,data:encrypt(JSON.stringify(result.rows))}
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

router.post('/addLeagueDetails', async (req: any, res) => {
    try {
        if (cmnCntrl.getIsDBConnected()) {
            let result = await usrCntrl.addLeagueDetails(req.body);
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
router.get('/getLeagueDetails', async (req: any, res) => {
    try {
        if (cmnCntrl.getIsDBConnected()) {
            let result = await usrCntrl.getLeagueDetails();
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

router.post('/addMatchSummary', async (req: any, res) => {
    try {
        if (cmnCntrl.getIsDBConnected()) {
            let result = await usrCntrl.addMatchSummary(req.body);
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
router.post('/getMatchSummary', async (req: any, res) => {
    try {
        if (cmnCntrl.getIsDBConnected()) {
            let result = await usrCntrl.getMatchSummary(req.body);
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

router.post('/getFixtureDetails', async (req: any, res) => {
    try {
        console.log('Inside API')
        if (cmnCntrl.getIsDBConnected()) {
            let result = await usrCntrl.getFixtureDetails(req.body);
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

router.post('/getTeamsPlaying', async (req: any, res) => {
    try {
        console.log('Inside API')
        if (cmnCntrl.getIsDBConnected()) {
            let result = await usrCntrl.getTeamsPlaying(req.body);
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

router.post('/getPlayersForMatch', async (req: any, res) => {
    try {
        console.log('Inside API')
        if (cmnCntrl.getIsDBConnected()) {
            let result = await usrCntrl.getPlayersForMatch(req.body);
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

router.post('/addBattingDetails', async (req: any, res) => {
    try {
        console.log('Inside API')
        if (cmnCntrl.getIsDBConnected()) {
            let result = await usrCntrl.addBattingDetails(req.body);
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

router.post('/addBowlingDetails', async (req: any, res) => {
    try {
        console.log('Inside API')
        if (cmnCntrl.getIsDBConnected()) {
            let result = await usrCntrl.addBowlingDetails(req.body);
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

router.post('/getBattingSummary', async (req: any, res) => {
    try {
        if (cmnCntrl.getIsDBConnected()) {
            let result = await usrCntrl.getBattingSummary(req.body);
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

router.post('/getBowlingSummary', async (req: any, res) => {
    try {
        if (cmnCntrl.getIsDBConnected()) {
            let result = await usrCntrl.getBowlingSummary(req.body);
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