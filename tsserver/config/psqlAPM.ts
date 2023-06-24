import { Pool,PoolClient} from 'pg';
import { pgDbConfig } from './config';
const pool = new Pool(pgDbConfig);

export async function fnDbQuery(methodName:string,queryText:string,queryParam?:any) {
    let client : PoolClient;
    let start;
    let qryResult;
    try {
        start = Date.now();
        client = await pool.connect();
        try {
            let qParam = queryParam ? queryParam : [];
            const qResult = await client.query(queryText,qParam);
            qryResult = {success:true,rowCount:qResult.rowCount,rows:qResult.rows};
        } catch(e:any){
            qryResult = {success:false,message:e.message};
            console.log(e);
        } finally {
            client.release();
        }
    } catch (e:any){
        qryResult = {success:false,connection_error:true,message:e.message};
    } finally {
        return qryResult;
    }
}
pool.on('error',(err:Error)=>{
    console.log(`${process.pid}, PSQL Pool error, ${err.message}, ${err.stack}`)
})