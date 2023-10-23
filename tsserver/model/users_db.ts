import { fnDbQuery } from '../config/psqlAPM';

export class UsersDbQry {
    constructor() { }

    async register(param: any) {
        const qryText = 'INSERT INTO users (email,name,salt,hash_password) VALUES (LOWER($1),$2,$3,$4) returning id';
        const qryParam = [param.email, param.name, param.salt, param.hash_password];
        return fnDbQuery("register", qryText, qryParam);
    }
    async login(email: String) {
        const qryText = "SELECT * FROM users WHERE email = lower($1)";
        const qryParam = [email];
        return fnDbQuery("login", qryText, qryParam);
    }
    async getUsers() {
        const qryText = "SELECT * FROM users";
        return fnDbQuery("getUsers", qryText, []);
    }
}