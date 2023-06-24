import {fnDbQuery} from '../config/psqlAPM';

export class CommonDBQry {
    constructor(){ }

    async checkDB(){
        let qryText = "Select now()";
        return fnDbQuery("checkDB",qryText);
    }
}