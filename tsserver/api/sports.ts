import Router from "express";
import { CommonCntrl } from "../controller/commoncntrl";
import { encrypt, decrypt } from '../config/config'
import { SportsController } from "../controller/sportsController";

const router = Router()
const cmnCntrl = new CommonCntrl();
const sportsCntrl = new SportsController();

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

//calls with authentications
router.post('/addMatchOfficials', async (req: any, res) => {
    try {
        if (cmnCntrl.getIsDBConnected()) {
            let result = await sportsCntrl.addMatchOfficials(req.body);
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
            let result = await sportsCntrl.getMatchOfficials();
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
            let result = await sportsCntrl.addVenueDetails(req.body);
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
            let result = await sportsCntrl.editVenueDetails(req.body);
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
            let result = await sportsCntrl.getVenueDetails();
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
            let result = await sportsCntrl.addTeamDetails(req.body);
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
            let result = await sportsCntrl.getTeamDetails();
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
            let result = await sportsCntrl.addLeagueDetails(req.body);
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
            let result = await sportsCntrl.getLeagueDetails();
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
            let result = await sportsCntrl.addMatchSummary(req.body);
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
            let result = await sportsCntrl.getMatchSummary(req.body);
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
        if (cmnCntrl.getIsDBConnected()) {
            let result = await sportsCntrl.getFixtureDetails(req.body);
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
        if (cmnCntrl.getIsDBConnected()) {
            let result = await sportsCntrl.getTeamsPlaying(req.body);
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
        if (cmnCntrl.getIsDBConnected()) {
            let result = await sportsCntrl.getPlayersForMatch(req.body);
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
        if (cmnCntrl.getIsDBConnected()) {
            let result = await sportsCntrl.addBattingDetails(req.body);
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
        if (cmnCntrl.getIsDBConnected()) {
            let result = await sportsCntrl.addBowlingDetails(req.body);
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
            let result = await sportsCntrl.getBattingSummary(req.body);
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
            let result = await sportsCntrl.getBowlingSummary(req.body);
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
router.post('/getFixtures', async (req: any, res) => {
    try {
        if (cmnCntrl.getIsDBConnected()) {
            let result = await sportsCntrl.getFixtures(req.body);
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