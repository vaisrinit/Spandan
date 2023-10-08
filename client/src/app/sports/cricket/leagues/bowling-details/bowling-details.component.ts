import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpserviceService } from 'src/app/_services/httpservice.service';

@Component({
  selector: 'app-bowling-details',
  templateUrl: './bowling-details.component.html',
  styleUrls: ['./bowling-details.component.css']
})
export class BowlingDetailsComponent implements OnInit{

  dataSource:any;
  displayedColumns: string[] = ["player_name", "team_name", "wickets"];
  leagues = [{ edition_title: '', id: '' }]
  selected_league:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    sessionStorage.setItem("currentRoute", "/home/sports/cricket/settings/leagues");
    // this.getBowlingSummary();
    this.getLeagueDetails();
  }

  constructor(public dialog: MatDialog,
    private http: HttpserviceService,
  ) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddBowlingDetailsComponent, {
      width: '60%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getBowlingSummary(this.selected_league);
    });

  }

  changeLeague(league: any) {
    this.selected_league={league_id:league}
    this.getBowlingSummary({ league_id: league });
  }

  applyFilter(event: Event) {
    console.log(event)
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async getBowlingSummary(param:any) {
    let result = await this.http.getBowlingSummary(param);
    if (result.success) {
      this.dataSource = new MatTableDataSource(result.rows);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  async getLeagueDetails() {
    let result = await this.http.getLeagueDetails();
    if (result.success) {
      this.leagues = result.rows;
    }
  }
}

@Component({
  selector: 'app-add-bowling-details',
  templateUrl: './add-bowling-details.html'
})
export class AddBowlingDetailsComponent implements OnInit{
  form!: FormGroup;
  dataSource: any = [];

  leagues = [{ edition_title: '', id: '' }]
  fixtures = [{ league_id: '', id: '', match_no: '' }]
  teams = [{ name: '', id: '' }];
  players = [{ id: '', name: '', international_team_id: '' }];
  selected_players = [{ id: '', name: '', }];

  selected_format = null;
  selected_type = null;
  selected_match = null;
  selected_player = null;
  selected_team = null;



  constructor(
    public dialogRef: MatDialogRef<AddBowlingDetailsComponent>,
    private formBuilder: FormBuilder,
    private http: HttpserviceService,

  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getLeagueDetails();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  createForm() {
    this.form = this.formBuilder.group({
      overs: ['', Validators.compose([
        Validators.required,
      ])],
      balls: ['', Validators.compose([
        Validators.required,
      ])],
      runs: ['', Validators.compose([
        Validators.required,
      ])],
      maidens: ['', Validators.compose([
        Validators.required,
      ])],
      wickets: ['', Validators.compose([
        Validators.required,
      ])],
      no_balls: ['', Validators.compose([
        Validators.required,
      ])],
      wides: ['', Validators.compose([
        Validators.required,
      ])],
    },
    );
  }


  changeLeague(league: any) {
    this.getFixtureDetails({ league_id: league });
  }
  changeMatch(match: any) {
    this.selected_match = match;
    this.getTeamsPlaying({ match_id: this.selected_match })
  }
  changeTeam(team: any) {
    this.selected_team = team;
    this.selected_players = this.players.filter((e) => e.international_team_id == team)
  }
  changePlayer(id: any, player: any) {
    if (player == 'bowler')
      this.selected_player = id;
  }

  addLPlayerBowlingDetails() {
    let player_bowl_det = {
      match_no: this.selected_match,
      player_no: this.selected_player,
      overs: this.form?.get('overs')?.value,
      runs: this.form?.get('runs')?.value,
      balls: this.form?.get('balls')?.value,
      maidens: this.form?.get('maidens')?.value,
      wickets: this.form?.get('wickets')?.value,
      no_balls: this.form?.get('no_balls')?.value,
      wides: this.form?.get('wides')?.value,
    }
    this.dataSource.push(player_bowl_det);
    console.log(this.dataSource)
    this.selected_player = null
    this.form.reset();
  }



  async getLeagueDetails() {
    let result = await this.http.getLeagueDetails();
    if (result.success) {
      this.leagues = result.rows;
    }
  }

  async getFixtureDetails(param: any) {
    let result = await this.http.getFixtureDetails(param);
    if (result.success) {
      this.fixtures = result.rows;
    }
  }

  async addBowlingDetails() {
    let result = await this.http.addBowlingDetails(this.dataSource);
    if (result.success) {
      this.dialogRef.close();
    }
    // const usr = {data:this.authService.encrypt(JSON.stringify(user))};
    // let data = await this.authService.registerUser(usr);
  }

  async getTeamsPlaying(param: any) {
    let result = await this.http.getTeamsPlaying(param);
    if (result.success) {
      this.teams = result.rows;
      let param2 = { team1: result.rows[0].id, team2: result.rows[1].id, league: result.rows[0].league }
      console.log(param2)
      let result2 = await this.http.getPlayersForMatch(param2);
      if (result2.success) {
        this.players = result2.rows;
      }
    }
  }
  
}
