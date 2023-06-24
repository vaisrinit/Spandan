import {fnDbQuery} from '../config/psqlAPM';

export class UsersDbQry {
    constructor(){ }

    async register(param:any){
        const qryText = 'INSERT into users (email,name,password) VALUES (LOWER($1),$2,$3) returning id';
        const qryParam = [param.email,param.name, param.password];
        return fnDbQuery("register",qryText,qryParam);
    }

    async login(email:String){
        const qryText = "Select id as user_id,email,password,name from users where email = lower($1)";
        const qryParam = [email];
        console.log(qryText);
        return fnDbQuery("login",qryText,qryParam);
    }
}