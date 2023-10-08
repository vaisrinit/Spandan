import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HttpserviceService } from 'src/app/_services/httpservice.service';
import { AddLeagueDetailsDialogComponent } from '../../settings/leagues/leagues.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-batting-details',
  templateUrl: './batting-details.component.html',
  styleUrls: ['./batting-details.component.css']
})
export class BattingDetailsComponent implements OnInit {
  dataSource:any;
  displayedColumns: string[] = ["player_name", "team_name", "runs", "sr"];
  leagues = [{ edition_title: '', id: '' }]
  selected_league: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    sessionStorage.setItem("currentRoute", "/home/sports/cricket/settings/leagues");
    this.getLeagueDetails();
    // this.getBattingSummary();
  }

  constructor(public dialog: MatDialog,
    private http: HttpserviceService,
  ) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddBattingDetailsDialog, {
      width: '60%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getBattingSummary(this.selected_league);
    });

  }

  changeLeague(league: any) {
    this.selected_league = { league_id: league }
    this.getBattingSummary({ league_id: league });
  }

  applyFilter(event: Event) {
    console.log(event)
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async getBattingSummary(param: any) {
    let result = await this.http.getBattingSummary(param);
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
  selector: 'app-add-batting-details',
  templateUrl: './add-batting-details-dialog.html'
})
export class AddBattingDetailsDialog implements OnInit {
  form!: FormGroup;
  dataSource: any = [];

  leagues = [{ edition_title: '', id: '' }]
  fixtures = [{ league_id: '', id: '', match_no: '' }]
  teams = [{ name: '', id: '' }];
  players = [{ id: '', name: '', international_team_id: '' }];
  selected_players = [{ id: '', name: '', }];
  unselected_players = [{ id: '', name: '', }];

  out_options = [
    {
      name: 'Out',
      value: true
    },
    {
      name: 'Not Out',
      value: false
    }
  ];

  out_types = [
    { name: 'Catch' },
    { name: 'Bowled' },
    { name: 'Stumped' },
    { name: 'Run Out' },
    { name: 'Retired Hurt' },
    { name: 'Hit Wicket' },
    { name: 'Catch & Bowled' },
    { name: 'LBW' },


  ]

  selected_format = null;
  selected_type = null;
  selected_match = null;
  selected_player = null;
  is_out = null;
  selected_out_type = null;
  selected_bowler = null;
  selected_catcher = null;
  selected_run_out = null;
  selected_wk = null;
  selected_team = null;



  constructor(
    public dialogRef: MatDialogRef<AddLeagueDetailsDialogComponent>,
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
      runs: ['', Validators.compose([
        Validators.required,
      ])],
      balls: ['', Validators.compose([
        Validators.required,
      ])],
      fours: ['', Validators.compose([
        Validators.required,
      ])],
      sixes: ['', Validators.compose([
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
    this.unselected_players = this.players.filter((e) => e.international_team_id != team)
  }
  changePlayer(id: any, player: any) {
    if (player == 'batter')
      this.selected_player = id;
    else if (player == 'bowler')
      this.selected_bowler = id;
    else if (player == 'catcher')
      this.selected_catcher = id;
    else if (player == 'stumping')
      this.selected_wk = id;
    else if (player == 'runout')
      this.selected_run_out = id;
  }
  changeOutType(type: any) {
    this.selected_out_type = type;
  }
  changeIsOut(out: any) {
    this.is_out = out;
  }
  addLPlayerBattingDetails() {
    let player_bat_det = {
      match_no: this.selected_match,
      player_no: this.selected_player,
      runs: this.form?.get('runs')?.value,
      balls: this.form?.get('balls')?.value,
      fours: this.form?.get('fours')?.value,
      sixes: this.form?.get('sixes')?.value,
      is_out: this.is_out,
      out_type: this.selected_out_type,
      bowled_by: this.selected_bowler,
      catch_by: this.selected_catcher,
      run_out_by: this.selected_run_out,
      stumped_by: this.selected_wk
    }
    this.dataSource.push(player_bat_det);
    console.log(this.dataSource)
    this.selected_player = null
    this.is_out = null
    this.selected_out_type = null
    this.selected_bowler = null
    this.selected_catcher = null
    this.selected_run_out = null
    this.selected_wk = null
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

  async addBattingDetails() {
    let result = await this.http.addBattingDetails(this.dataSource);
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