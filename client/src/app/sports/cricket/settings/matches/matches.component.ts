import { Component,OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpserviceService } from 'src/app/_services/httpservice.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent {
  dataSource: any;
  displayedColumns: string[] = ['match_no', 'match_date','team_1', 'team_2', 'venue',  'start_time'];
  leagues = [{ edition_title: '', id: '' }]
  selected_league:any;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatPaginator | undefined;


  ngOnInit(): void {
    sessionStorage.setItem("currentRoute", "/home/sports/cricket/settings/leagues");
    this.getLeagueDetails();
  }

  constructor(
    public dialog: MatDialog,
    private http: HttpserviceService,
  ) {}

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(AddVenueDetailsDialogComponent, {
  //     width: '50%',
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.getVenueDetails();
  //   });

  // }

  // openEditDialog(data: any): void {
  //   const dialogRef = this.dialog.open(EditVenueDetailsDialogComponent, {
  //     width: '50%',
  //     data: data
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.getVenueDetails();
  //   });

  // }

  changeLeague(league: any) {
    this.selected_league={league_id:league}
    this.getFixtures({ league_id: league });
  }

  
  applyFilter(event: Event) {
    console.log(event)
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}


  async getFixtures(param:any) {
    let result = await this.http.getFixtures(param);
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


