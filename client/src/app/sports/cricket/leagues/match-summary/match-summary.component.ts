import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpserviceService } from 'src/app/_services/httpservice.service';

@Component({
  selector: 'app-match-summary',
  templateUrl: './match-summary.component.html',
  styleUrls: ['./match-summary.component.css']
})
export class MatchSummaryComponent implements OnInit {
  dataSource:any;
  displayedColumns: string[] = ["team1", "team2", "winner", "run_margin", "wicket_margin", "venue", "match_link"];
  leagues = [{ edition_title: '', id: '' }]
  selected_league:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    sessionStorage.setItem("currentRoute", "/home/sports/cricket/settings/leagues");
    // this.getMatchSummary();
    this.getLeagueDetails();
  }

  constructor(public dialog: MatDialog,
    private http: HttpserviceService,
  ) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddMatchSummaryDialogComponent, {
      width: '60%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getMatchSummary(this.selected_league);
    });

  }
  changeLeague(league: any) {
    this.selected_league={league_id:league}
    this.getMatchSummary({ league_id: league });
  }

  applyFilter(event: Event) {
    console.log(event)
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async getMatchSummary(param:any) {
    let result = await this.http.getMatchSummary(param);
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
  selector: 'app-match-summary',
  templateUrl: './add-match-summary-dialog.html',
})
export class AddMatchSummaryDialogComponent implements OnInit {

  form!: FormGroup;
  leagues = [{ edition_title: '', id: '' }]
  fixtures = [{ league_id: '', id: '', match_no: '' }]
  teams = [{ name: '', id: '' }];
  formats = [
    {
      "name": "50 Overs",
      "dispname": "50 Overs"
    },
    {
      "name": "test",
      "dispname": "Test"
    },
    {
      "name": "20 Overs",
      "dispname": "20 Overs"
    },
  ];
  types = [
    {
      "name": "internationl",
      "dispname": "International"
    },
    {
      "name": "domestic",
      "dispname": "Domestic"
    },
  ];
  toss_options = [
    { name: 'Bat' },
    { name: 'Bowl' },
  ]
  players = [{ id: '', name: '', international_team_id: '' }];
  t1_players = [{ id: '', name: '', }];
  t2_players = [{ id: '', name: '' }];
  umpires = [{ id: '', name: '' }];
  match_referees = [{ id: '', name: '' }];

  selected_league = "";
  selected_type = "";
  selected_u1 = "";
  selected_u2 = "";
  selected_u3 = "";
  selected_referee = "";
  selected_match = "";
  selected_option = "";
  selected_winner = "";
  selected_toss_winner = "";
  selected_c1 = "";
  selected_c2 = "";
  selected_mom = "";



  constructor(
    public dialogRef: MatDialogRef<AddMatchSummaryDialogComponent>,
    private formBuilder: FormBuilder,
    private http: HttpserviceService,

  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getLeagueDetails();
    this.getMatchOfficals();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  createForm() {
    this.form = this.formBuilder.group({
      inn1_score: ['', Validators.compose([
        Validators.required,
      ])],
      inn2_score: ['', Validators.compose([
        Validators.required,
      ])],
      inn1_wkt: ['', Validators.compose([
        Validators.required,
      ])],
      inn2_wkt: ['', Validators.compose([
        Validators.required,
      ])],
      run_margin: ['', Validators.compose([
      ])],
      wkt_margin: ['', Validators.compose([
      ])],
      balls_left: ['', Validators.compose([
      ])],
      match_link: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
    },
    );
  }


  changeLeague(league: any) {
    this.getFixtureDetails({ league_id: league });
  }
  changeOption(option: any) {
    this.selected_option = option;
  }
  changeWinner(winner: any, option: any) {
    if (option == 'Toss')
      this.selected_toss_winner = winner;
    else
      this.selected_winner = winner
  }
  changeMatch(match: any) {
    this.selected_match = match;
    this.getTeamsPlaying({ match_id: this.selected_match })
  }

  changeUmpire(id: any, official: any) {
    if (official == 'Umpire1')
      this.selected_u1 = id
    else if (official == 'Umpire2')
      this.selected_u2 = id;
    else if (official == 'Umpire3')
      this.selected_u3 = id;
    else
      this.selected_referee = id;
  }

  changeCaptain(id: any, captain: any) {
    if (captain == 'T1')
      this.selected_c1 = id
    else if (captain == 'T2')
      this.selected_c2 = id;
    else if (captain == 'MoM')
      this.selected_mom = id;
  }


  async addMatchSummary() {
    let run_margin = this.form?.get('run_margin')?.value;
    if (run_margin == "")
      run_margin = null
    let wicket_margin = this.form?.get('wkt_margin')?.value;
    if (wicket_margin == "")
      wicket_margin = null
    let balls_left = this.form?.get('balls_left')?.value;
    if (balls_left == "")
      balls_left = null
    const match_summary = {
      match_id: this.selected_match,
      captain_1: this.selected_c1,
      captain_2: this.selected_c2,
      toss_won_by: this.selected_toss_winner,
      choose_to: this.selected_option,
      umpire_1: this.selected_u1,
      umpire_2: this.selected_u2,
      umpire_3: this.selected_u3,
      match_referee: this.selected_referee,
      inn1_score: this.form?.get('inn1_score')?.value,
      inn2_score: this.form?.get('inn2_score')?.value,
      inn1_wkt: this.form?.get('inn1_wkt')?.value,
      inn2_wkt: this.form?.get('inn2_wkt')?.value,
      winner: this.selected_winner,
      run_margin: run_margin,
      wicket_margin: wicket_margin,
      balls_left: balls_left,
      man_of_the_match: this.selected_mom,
      match_link: this.form?.get('match_link')?.value
    };
    console.log(match_summary)
    let result = await this.http.addMatchSummary(match_summary);
    if (result.success) {
      this.dialogRef.close();
    }
    // const usr = {data:this.authService.encrypt(JSON.stringify(user))};
    // let data = await this.authService.registerUser(usr);
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

  async getMatchOfficals() {
    let result = await this.http.getMatchOfficials();
    if (result.success) {
      this.umpires = result.rows.filter((e: any) => e.is_umpire == true);
      this.match_referees = result.rows.filter((e: any) => e.is_umpire == false)

    }
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
        this.t1_players = this.players.filter((e) => e.international_team_id == param2.team1)
        this.t2_players = this.players.filter((e) => e.international_team_id == param2.team2)

      }
    }
  }


}