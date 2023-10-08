import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpserviceService } from 'src/app/_services/httpservice.service';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent implements OnInit{
  dataSource = new MatTableDataSource([]);;
  displayedColumns: string[] = ['name','type','administrator','format'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  ngOnInit(): void {
    sessionStorage.setItem("currentRoute","/home/sports/cricket/settings/leagues");
  }

  constructor(public dialog: MatDialog,
    private http: HttpserviceService,
  ) {
    this.getLeagueDetails()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddLeagueDetailsDialogComponent, {
      width: '50%',
    });
    dialogRef.afterClosed().subscribe(result => {
        this.getLeagueDetails();
    });
    
  }

  applyFilter(event: Event) {
    console.log(event)
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}

  async getLeagueDetails() {
    let result = await this.http.getLeagueDetails();
    if (result.success) {
      this.dataSource = new MatTableDataSource(result.rows);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
}

@Component({
  selector: 'app-add-league-details-dialog',
  templateUrl: './add-league-details-dialog.html',
})
export class AddLeagueDetailsDialogComponent implements OnInit{
  form!: FormGroup;
  countries = [{name:'',dispname:''}];
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

  constructor(
    public dialogRef: MatDialogRef<AddLeagueDetailsDialogComponent>,
    private formBuilder: FormBuilder,
    private http: HttpserviceService,

  ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }

  createForm() {
    this.form = this.formBuilder.group({
      league_name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      league_admin: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      type: ['', Validators.compose([
        Validators.required,
      ])],
      format: ['', Validators.compose([
        Validators.required,
      ])],
      edition_title: ['', Validators.compose([
        Validators.required,
      ])],
    },
    );
  }

  async addLeagueDetails() {
    const league = {
      name: this.form?.get('league_name')?.value,
      administrator: this.form?.get('league_admin')?.value,
      type: this.form?.get('type')?.value,
      format: this.form?.get('format')?.value,
      edition_title: this.form?.get('edition_title')?.value,

    };
    let result = await this.http.addLeagueDetails(league);
    if (result.success) {
      this.dialogRef.close();
    }
    // const usr = {data:this.authService.encrypt(JSON.stringify(user))};
    // let data = await this.authService.registerUser(usr);
  }

}
