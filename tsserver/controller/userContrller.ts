import { UsersDbQry } from '../model/users_db'
import { CommonCntrl } from './commoncntrl';
import { randomBytes, createHash } from 'crypto';
import { sign, verify } from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/config';

const usrDb = new UsersDbQry();
const cmnCntrl = new CommonCntrl();

export class UserController {
    constructor() { }

    async randBytes(length: any) {
        return randomBytes(length);
    }

    async MD5Hash(msgBuffer: any) {
        return createHash('md5').update(msgBuffer).digest("hex")
    }

    async validateToken(token: any) {
        try {
            const decoded = verify(token, JWT_SECRET_KEY)
            return { success: true, decoded: decoded }
        }
        catch {
            return { success: false, message: "Token Invalid" }
        }
    }

    async register(param: any) {
        let salt = await this.randBytes(32);
        param['hash_password'] = await this.MD5Hash(Buffer.concat([Buffer.from(Buffer.from(param.password, "utf-8").toString("base64"), "base64"), salt]));
        param['salt'] = salt.toString("base64");
        let result = await usrDb.register(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }

    async login(param: any) {
        let result = await usrDb.login(param.email);
        if (result?.success && result?.rowCount && result?.rowCount > 0) {
            let res = result.rows[0];
            let hash_password = await this.MD5Hash(Buffer.concat([Buffer.from(Buffer.from(param.password, "utf-8").toString("base64"), "base64"), Buffer.from(res.salt, "base64")]));
            if (res.hash_password === hash_password) {
                const token = sign({ id: res.id }, JWT_SECRET_KEY, { expiresIn: '1h' });
                return { success: true, rows: [{ user_id: res.id, token: token }] }
            }
            else {
                return { success: false, message: 'Invalid user/password' };
            }
        }
        else {
            return { success: false, message: 'Invalid user/password' }
        }
    }


    async getUsers() {
        let result = await usrDb.getUsers();
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }
    
    async addExerciseDetails(param:any) {
        let result = await usrDb.addExerciseDetails(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }

    async getExerciseDetails() {
        let result = await usrDb.getExerciseDetails();
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }
    
    async addVenueDetails(param:any) {
        let result = await usrDb.addVenueDetails(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }

    async editVenueDetails(param:any) {
        let result = await usrDb.editVenueDetails(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }

    async getVenueDetails() {
        let result = await usrDb.getVenueDetails();
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }

    async addLeagueDetails(param:any) {
        let result = await usrDb.addLeagueDetails(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }

    async getLeagueDetails() {
        let result = await usrDb.getLeagueDetails();
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }

    async addTeamDetails(param:any) {
        let result = await usrDb.addTeamDetails(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }

    async getTeamDetails() {
        let result = await usrDb.getTeamDetails();
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }

    async addMatchOfficials(param:any) {
        let result = await usrDb.addMatchOfficials(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }

    async getMatchOfficials() {
        let result = await usrDb.getMatchOfficials();
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }

    async addMatchSummary(param:any) {
        let result = await usrDb.addMatchSummary(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }

    async getMatchSummary(param:any) {
        let result = await usrDb.getMatchSummary(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }

    async getFixtureDetails(param:any) {
        let result = await usrDb.getFixtureDetails(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }
    
    async getTeamsPlaying(param:any) {
        let result = await usrDb.getTeamsPlaying(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }

    async getPlayersForMatch(param:any) {
        let result = await usrDb.getPlayersForMatch(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }
    
    async addBattingDetails(param:any) {
        
        let result = await usrDb.addBattingDetails(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }
    
    async addBowlingDetails(param:any) {
        
        let result = await usrDb.addBowlingDetails(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }
    async getBattingSummary(param:any) {
        
        let result = await usrDb.getBattingSummary(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }

    async getBowlingSummary(param:any) {
        
        let result = await usrDb.getBowlingSummary(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }

    async getFixtures(param:any) {
        
        let result = await usrDb.getFixtures(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }
}