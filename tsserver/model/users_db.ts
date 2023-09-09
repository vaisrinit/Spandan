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
    
    async addExerciseDetails(param:any) {
        const qryText = "INSERT INTO defence.exercise(name,type,force,troop,countries,place,description,link,start_date,end_date) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)";
        const qryParam = [param.name,param.type,param.force,param.troop,param.countries,param.place,param.description,param.link,param.start_date,param.end_date];
        return fnDbQuery("addExerciseDetails", qryText, qryParam);
    }
    
    async getExerciseDetails() {
        const qryText = "SELECT * FROM defence.exercise";
        return fnDbQuery("getExerciseDetails", qryText, []);
    }
}