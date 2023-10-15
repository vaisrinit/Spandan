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

    async addExerciseDetails(param: any) {
        const qryText = "INSERT INTO defence.exercise(name,type,force,troop,countries,place,description,link,start_date,end_date) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)";
        const qryParam = [param.name, param.type, param.force, param.troop, param.countries, param.place, param.description, param.link, param.start_date, param.end_date];
        return fnDbQuery("addExerciseDetails", qryText, qryParam);
    }

    async getExerciseDetails() {
        const qryText = "SELECT * FROM defence.exercise";
        return fnDbQuery("getExerciseDetails", qryText, []);
    }

    async addMatchOfficials(param: any) {
        console.log(param)
        const qryText = "INSERT INTO sports.cricket_officials(name,country,date_of_birth,gender,is_umpire) VALUES ($1,$2,$3,$4,$5)";
        const qryParam = [param.name, param.country, param.date_of_birth, param.gender, param.is_umpire];
        return fnDbQuery("addUmpireDetails", qryText, qryParam);
    }

    async getMatchOfficials() {
        const qryText = "SELECT * FROM sports.cricket_officials";
        return fnDbQuery("getMatchOfficials", qryText, []);
    }
    async addVenueDetails(param: any) {
        const qryText = "INSERT INTO sports.cricket_venues(name,city,state,country,owner,capacity,latitude,longitude,location,end_1,end_2) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)";
        const qryParam = [param.name, param.city, param.state, param.country, param.owner, param.capacity, param.latitude, param.longitude, 'POINT(' + param.latitude + ' ' + param.longitude + ')',param.end_1,param.end_2];
        return fnDbQuery("addVenueDetails", qryText, qryParam);
    }
    
    async editVenueDetails(param: any) {
        const qryText = "UPDATE sports.cricket_venues set name = $1 ,city = $2,state = $3,country = $4,owner = $5,capacity = $6,latitude = $7,longitude = $8,location = $9,end_1 = $10,end_2 = $11,edited_at = now() where id = $12";
        const qryParam = [param.name, param.city, param.state, param.country, param.owner, param.capacity, param.latitude, param.longitude, 'POINT(' + param.latitude + ' ' + param.longitude + ')',param.end_1,param.end_2,param.id];
        return fnDbQuery("editVenueDetails", qryText, qryParam);
    }

    async getVenueDetails() {
        const qryText = "SELECT * FROM sports.cricket_venues";
        return fnDbQuery("getVenueDetails", qryText, []);
    }

    async addTeamDetails(param: any) {
        const qryText = "INSERT INTO sports.cricket_teams(name,owner,league) VALUES ($1,$2,$3)";
        const qryParam = [param.name, param.owner, param.league];
        return fnDbQuery("addTeamDetails", qryText, qryParam);
    }

    async getTeamDetails() {
        const qryText = "SELECT * FROM sports.cricket_teams";
        return fnDbQuery("getTeamDetails", qryText, []);
    }

    async addLeagueDetails(param: any) {
        const qryText = "INSERT INTO sports.cricket_leagues(name,type,administrator,format,edition_title) VALUES ($1,$2,$3,$4,$5)";
        const qryParam = [param.name, param.type, param.administrator, param.format,param.edition_title];
        return fnDbQuery("addLeagueDetails", qryText, qryParam);
    }

    async getLeagueDetails() {
        const qryText = "SELECT * FROM sports.cricket_leagues";
        return fnDbQuery("getLeagueDetails", qryText, []);
    }

    async addMatchSummary(param: any) {
        const qryText = "INSERT INTO sports.cricket_match_summary(match_id,captain_1,captain_2,toss_won_by,choose_to,umpire_1,umpire_2,umpire_3,match_referee,inn1_score,inn2_score,inn1_wkt,inn2_wkt,winner,run_margin,wicket_margin,balls_left,man_of_the_match,match_link) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)";
        const qryParam = [param.match_id, param.captain_1, param.captain_2, param.toss_won_by, param.choose_to, param.umpire_1, param.umpire_2, param.umpire_3, param.match_referee, param.inn1_score, param.inn2_score, param.inn1_wkt, param.inn2_wkt, param.winner, param.run_margin, param.wicket_margin, param.balls_left, param.man_of_the_match, param.match_link];
        return fnDbQuery("addMatchSummary", qryText, qryParam);
    }

    async getMatchSummary(param:any) {
        const qryText = "select ct2.name team1,ct3.name team2,ct1.name winner,cms.run_margin,cms.wicket_margin,cv.name venue,cms.match_link from sports.cricket_teams ct1 join sports.cricket_match_summary cms on cms.winner = ct1.id join sports.cricket_fixtures cf on cms.match_id = cf.id join sports.cricket_venues cv on cf.venue = cv.id join sports.cricket_teams ct2 on ct2.id = cf.team_1 join sports.cricket_teams ct3 on ct3.id = cf.team_2 where cf.league_id = $1";
        const qryParam = [param.league_id];
        return fnDbQuery("getMatchSummary", qryText, qryParam);
    }

    async getFixtureDetails(param: any) {
        console.log(param)
        const qryText = "SELECT * FROM sports.cricket_fixtures where league_id = $1";
        const qryParam = [param.league_id];
        return fnDbQuery("getFixtureDetails", qryText, qryParam);
    }

    async getTeamsPlaying(param: any) {
        console.log(param)
        const qryText = "select id,name,league from sports.cricket_teams where id in ((select team_1 from sports.cricket_fixtures where id = $1),(select team_2 from sports.cricket_fixtures where id = $2))";
        const qryParam = [param.match_id, param.match_id];
        return fnDbQuery("getTeamsPlaying", qryText, qryParam);
    }

    async getPlayersForMatch(param: any) {
        let qryText = ''
        if (param.league == 'International') {
            qryText = "select id,international_team_id,name from sports.cricket_players where international_team_id in ($1,$2);";
        }
        const qryParam = [param.team1, param.team2];
        return fnDbQuery("getTeamsPlaying", qryText, qryParam);
    }
    
    async addBattingDetails(param: any) {
        let result:any;
        param.map((e:any)=>{
            let qryText = "INSERT INTO sports.batting_details (match_id, player_id, runs, balls, fours, sixes, is_out, out_type,bowled_by,catch_by,stumped_by,run_out_by) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)"
            let qryParam: any=[e.match_no,e.player_no,e.runs,e.balls,e.fours,e.sixes,e.is_out,e.out_type,e.bowled_by,e.catch_by,e.stumped_by,e.run_out_by];
            result =  fnDbQuery("addBattingDetails", qryText, qryParam);
        })
        return result
    }
    
    async addBowlingDetails(param: any) {
        let result:any;
        param.map((e:any)=>{
            let qryText = "INSERT INTO sports.bowling_details (match_id, player_id,overs, runs, balls, maidens, wickets, no_balls, wides) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)"
            let qryParam: any=[e.match_no,e.player_no,e.overs,e.runs,e.balls,e.maidens,e.wickets,e.no_balls,e.wides];
            result =  fnDbQuery("addBowlingDetails", qryText, qryParam);
        })
        return result;
    }

    async getBattingSummary(param:any) {
        const qryText = "select sum(runs) runs,round(sum(cast(runs as numeric))/sum(cast(balls as numeric))*100,2) sr,cp.name player_name,ct.name team_name from sports.batting_details batd join sports.cricket_players cp on cp.id = batd.player_id join sports.cricket_teams ct on cp.international_team_id = ct.id join sports.cricket_fixtures cf on cf.id = batd.match_id where cf.league_id = $1 group by cp.name,ct.name order by runs desc;";
        const qryParam = [param.league_id];
        return fnDbQuery("getBattingSummary", qryText, qryParam);
    }
    

    async getBowlingSummary(param:any) {
        const qryText = "select sum(wickets) wickets,cp.name player_name,ct.name team_name from sports.bowling_details bowld join sports.cricket_players cp on cp.id = bowld.player_id join sports.cricket_teams ct on cp.international_team_id = ct.id join sports.cricket_fixtures cf on cf.id = bowld.match_id where cf.league_id = $1 group by cp.name,ct.name order by wickets desc;";
        const qryParam = [param.league_id];
        return fnDbQuery("getBowlingSummary", qryText, qryParam);
    }

    async getFixtures(param:any) {
        const qryText = "select match_no,ct1.name team_1,ct2.name team_2,cv.name venue,cf.match_date,cf.start_time from sports.cricket_fixtures cf join sports.cricket_teams ct1 on cf.team_1 = ct1.id join sports.cricket_teams ct2 on cf.team_2 = ct2.id join sports.cricket_venues cv on cv.id = cf.venue where cf.league_id = $1;";
        const qryParam = [param.league_id];
        return fnDbQuery("getFixtures", qryText, qryParam);
    }
    
}