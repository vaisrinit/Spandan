import {UsersDbQry} from '../model/users_db'
import { CommonCntrl } from './commoncntrl';

const usrDb = new UsersDbQry();
const cmnCntrl = new CommonCntrl();

export class UserController{
    constructor() {}
    async register(param:any){
        let result = await usrDb.register(param);
        if(result?.success){
            return {success:true, rowCount:result.rowCount,rows:result.rows};
        }
        else{
            if (result?.connection_error) cmnCntrl.getIsDBConnected();
            return {success:true, message:result?.message};
        }
    }

    async login(param:any){
        let result = await usrDb.login(param.email);
        console.log(result?.rows);
        if(result?.success && result?.rowCount && result?.rowCount>0){
            let res = result.rows[0];
            if(res.password == param?.password){
                return {success:true,rows:[{name:res.name,user_id:res.user_id,email:res.email}]}
            }
            else{
                return {success:false,message:'Invalid user/password'};
            }
        }
        else{
            return {success:false,message:'Invalid user/password'}
        }
    }
    
}