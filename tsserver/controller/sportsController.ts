import { SportsDbQry } from '../model/sports_db'
import { CommonCntrl } from './commoncntrl';

const sportsDb = new SportsDbQry();
const cmnCntrl = new CommonCntrl();

export class SportsController {
    constructor() { }
    async addVenueDetails(param: any) {
        let result = await sportsDb.addVenueDetails(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }
    async editVenueDetails(param: any) {
        let result = await sportsDb.editVenueDetails(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }
    async getVenueDetails() {
        let result = await sportsDb.getVenueDetails();
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }
    async addLeagueDetails(param: any) {
        let result = await sportsDb.addLeagueDetails(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }
    async getLeagueDetails() {
        let result = await sportsDb.getLeagueDetails();
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }
    async addTeamDetails(param: any) {
        let result = await sportsDb.addTeamDetails(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }
    async getTeamDetails() {
        let result = await sportsDb.getTeamDetails();
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }
    async addMatchOfficials(param: any) {
        let result = await sportsDb.addMatchOfficials(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }
    async getMatchOfficials() {
        let result = await sportsDb.getMatchOfficials();
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }
    async addMatchSummary(param: any) {
        let result = await sportsDb.addMatchSummary(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }
    async getMatchSummary(param: any) {
        let result = await sportsDb.getMatchSummary(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }
    async getFixtureDetails(param: any) {
        let result = await sportsDb.getFixtureDetails(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }
    async getTeamsPlaying(param: any) {
        let result = await sportsDb.getTeamsPlaying(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }
    async getPlayersForMatch(param: any) {
        let result = await sportsDb.getPlayersForMatch(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }
    async addBattingDetails(param: any) {

        let result = await sportsDb.addBattingDetails(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }
    async addBowlingDetails(param: any) {

        let result = await sportsDb.addBowlingDetails(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }
    async getBattingSummary(param: any) {
        let result = await sportsDb.getBattingSummary(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }
    async getBowlingSummary(param: any) {

        let result = await sportsDb.getBowlingSummary(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }
    async getFixtures(param: any) {

        let result = await sportsDb.getFixtures(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }
}