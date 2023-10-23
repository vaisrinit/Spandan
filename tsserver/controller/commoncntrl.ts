import {CommonDBQry} from '../model/common_db'
import { randomBytes,createCipheriv,createDecipheriv } from 'crypto';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/config';

const commonCntrl = new CommonDBQry();
let isDBConnected = false;
let isDBCheckRunning = false;
export class CommonCntrl {
    algorithm = 'aes-256-cbc';
    key = "7efcfc483b004fabadd3d951f44decf7";//crypto.randomBytes(16);
    iv = randomBytes(16); //inicialization vector
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

    encrypt(text:any) {
        let cipher = createCipheriv(this.algorithm, Buffer.from(this.key), this.iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return { iv: this.iv.toString('hex'), encryptedData: encrypted.toString('hex') };
    }
    decrypt(text:any) {
        let iv = Buffer.from(text.iv, 'hex');
        let encryptedText = Buffer.from(text.encryptedData, 'hex');
        let decipher = createDecipheriv('aes-256-cbc', Buffer.from(this.key), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted;
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
}
