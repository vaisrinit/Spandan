import {CommonDBQry} from '../model/common_db'

const commonCntrl = new CommonDBQry();
let isDBConnected = false;
let isDBCheckRunning = false;
export class CommonCntrl {
    constructor() {}
    async checkDB(){
        let result:any = await commonCntrl.checkDB();
        if(result.success){
            isDBConnected = true;
            isDBCheckRunning = false;
            console.log('DB Connected');
        }
        else if(result?.connection_error){
            isDBConnected = false;
            isDBCheckRunning = true;
            console.log('Could not connect to DB retry in 30 sec');  
            setTimeout(()=>{
                this.checkDB()
            },30000);
        }
        else{
            isDBConnected = true;
            isDBCheckRunning = false;
            console.log('DB Connected,query error');
        }
    }
    getIsDBConnected(){
        if(!isDBConnected && !isDBCheckRunning) this.checkDB();
        return isDBConnected;
    }
}