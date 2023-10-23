import Router from "express";
import { CommonCntrl } from "../controller/commoncntrl";
import { encrypt, decrypt } from '../config/config'
import { PoliticsController } from "../controller/politicsController";
import * as fs from 'fs';
const router = Router()
const cmnCntrl = new CommonCntrl();
const politicsCntrl = new PoliticsController();

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

//calls after jwt authentication
router.get('/insertStates', async (req: any, res) => {
    try {
        if (cmnCntrl.getIsDBConnected()) {
            let states;
            fs.readFile("../jsonFiles/states.json", "utf8", async (err: any, jsonString: any) => {
                if (err) {
                    console.log("File read failed:", err);
                    return;
                }
                states = JSON.parse(jsonString);
                let result = await politicsCntrl.insertStates(states);
                if (result?.success) res.status(200).json(result);
                else res.status(400).json(result);
            })
        }
        else {
            res.status(501).json({ success: false, message: 'DB Connction failure,try after some time' });
        }
    }
    catch (err: any) {
        res.json({ success: false, error: true, message: err.stack });
    }

})
router.get('/insertDistricts', async (req: any, res) => {
    try {
        if (cmnCntrl.getIsDBConnected()) {
            let result: any;
            fs.readFile("../jsonFiles/states.json", "utf8", (err, jsonString) => {
                if (err) {
                    console.log("File read failed:", err);
                    return;
                }
                let states = JSON.parse(jsonString);
                states.map((e: any) => {
                    fs.readFile("../jsonFiles/" + e.stateCd + "/districts.json", "utf8", async (err, jsonString) => {
                        if (err) {
                            console.log("File read failed:", err);
                            return;
                        }
                        let districts = JSON.parse(jsonString);
                        result = await politicsCntrl.insertDistricts(districts);
                    })
                })
                if (result?.success) res.status(200).json(result);
                else res.status(400).json(result);
            })

        }
        else {
            res.status(501).json({ success: false, message: 'DB Connction failure,try after some time' });
        }
    }
    catch (err: any) {
        res.json({ success: false, error: true, message: err.stack });
    }
})
router.get('/insertAssemblies', async (req: any, res) => {
    try {
        if (cmnCntrl.getIsDBConnected()) {
            let result: any;
            fs.readFile("../jsonFiles/states.json", "utf8", (err, jsonString) => {
                if (err) {
                    console.log("File read failed:", err);
                    return;
                }
                let states = JSON.parse(jsonString);
                states.map((e:any) => {
                    fs.readFile("../jsonFiles/" + e.stateCd + "/districts.json", "utf8", (err, jsonString) => {
                        if (err) {
                            console.log("File read failed:", err);
                            return;
                        }
                        let districts = JSON.parse(jsonString);
                        districts.map((f:any) => {
                            fs.readFile("../jsonFiles/" + e.stateCd + "/" + f.districtCd + "/assemblies.json", "utf8", async (err, jsonString) => {
                                if (err) {
                                    console.log("File read failed:", err);
                                    return;
                                }
                                let assemblies = JSON.parse(jsonString);
                                result = await politicsCntrl.insertAssemblies(assemblies);
                            })
                        })
                    })
                })
                if (result?.success) res.status(200).json(result);
                else res.status(400).json(result);
            })
        }
        else {
            res.status(501).json({ success: false, message: 'DB Connction failure,try after some time' });
        }
    }
    catch (err: any) {
        res.json({ success: false, error: true, message: err.stack });
    }
})
router.get('/insertParts', async (req: any, res) => {
    try {
        if (cmnCntrl.getIsDBConnected()) {
            let result: any;
            fs.readFile("../jsonFiles/states.json", "utf8", (err, jsonString) => {
                if (err) {
                    console.log("File read failed:", err);
                    return;
                }
                let states = JSON.parse(jsonString);
                states.filter((a:any) => {
                    return a.stateId % 5 == 4;
                }).map((e:any) => {
                    fs.readFile("../jsonFiles/" + e.stateCd + "/districts.json", "utf8", (err, jsonString) => {
                        if (err) {
                            console.log("File read failed:", err);
                            return;
                        }
                        let districts = JSON.parse(jsonString);
                        districts.filter((c:any) => {
                            return parseInt(c.districtNo) % 5 == 4;
                        }).map((f:any) => {
                            fs.readFile("../jsonFiles/" + e.stateCd + "/" + f.districtCd + "/assemblies.json", "utf8", async (err, jsonString) => {
                                if (err) {
                                    console.log("File read failed:", err);
                                    return;
                                }
                                let assemblies = JSON.parse(jsonString);
                                assemblies.map((g:any) => {
                                    fs.readFile("../jsonFiles/" + e.stateCd + "/" + f.districtCd + "/" + g.asmblyNo +"/parts.json", "utf8", async (err, jsonString) => {
                                        if (err) {
                                            console.log("File read failed:", err);
                                            return;
                                        }
                                        let parts = JSON.parse(jsonString);
                                        result = await politicsCntrl.insertParts(parts.payload);
                                    })
                                })
                            })
                        })
                    })
                })
                if (result?.success) res.status(200).json(result);
                else res.status(400).json(result);
            })
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