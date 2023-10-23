import { PoliticsDbQry } from '../model/politics_db'
import { CommonCntrl } from './commoncntrl';

const politicsDb = new PoliticsDbQry();
const cmnCntrl = new CommonCntrl();

export class PoliticsController {
    constructor() { }

    async insertStates(param: any) {
        let result = await politicsDb.insertStates(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }
    async insertDistricts(param: any) {
        let result = await politicsDb.insertDistricts(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }
    async insertAssemblies(param: any) {
        let result = await politicsDb.insertAssemblies(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }
    async insertParts(param: any) {
        let result = await politicsDb.insertParts(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }
}