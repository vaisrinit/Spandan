import { DefenceDbQry } from '../model/defence_db'
import { CommonCntrl } from './commoncntrl';

const defenceDb = new DefenceDbQry();
const cmnCntrl = new CommonCntrl();

export class DefenceController {
    constructor() { }

    async addExerciseDetails(param: any) {
        let result = await defenceDb.addExerciseDetails(param);
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: result.rows };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }
    async getExerciseDetails() {
        let result = await defenceDb.getExerciseDetails();
        if (result?.success) {
            return { success: true, rowCount: result.rowCount, rows: JSON.stringify(result.rows) };
        }
        else {
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return { success: true, message: result?.message };
        }
    }
}