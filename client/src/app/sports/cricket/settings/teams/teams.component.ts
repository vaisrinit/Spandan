import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpserviceService } from 'src/app/_services/httpservice.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit{

  dataSource: any;
  displayedColumns: string[] = ['name','owner','league','edit','delete'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  
  ngOnInit(): void {
    sessionStorage.setItem("currentRoute","/home/sports/cricket/settings/leagues");
  }

  constructor(public dialog: MatDialog,
    private http: HttpserviceService,
  ) {
    this.getTeamDetails()

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTeamDetailsDialogComponent, {
      width: '50%',
    });
    dialogRef.afterClosed().subscribe(result => {
        this.getTeamDetails();
    });
    
  }

  openEditDialog(data:any): void {
    const dialogRef = this.dialog.open(EditTeamDetailsDialogComponent, {
      width: '50%',
      data:data
    });
    dialogRef.afterClosed().subscribe(result => {
        this.getTeamDetails();
    });
    
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}

  

  async getTeamDetails() {
    let result = await this.http.getTeamDetails();
    if (result.success) {
      this.dataSource = new MatTableDataSource(result.rows);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    }
  }
}

@Component({
  selector: 'app-add-team-details-dialog',
  templateUrl: './add-team-details-dialog.html',
})
export class AddTeamDetailsDialogComponent implements OnInit{
  form!: FormGroup;
  leagues = [
    {
      "name": "",
    }
  ];

  constructor(
    public dialogRef: MatDialogRef<AddTeamDetailsDialogComponent>,
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
      team_name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      team_owner: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      league: ['', Validators.compose([
        Validators.required,
      ])],
    },
    );
  }

  async getLeagueDetails() {
    let result = await this.http.getLeagueDetails();
    if (result.success) {
      this.leagues = result.rows;
    }
  }

  async addTeamDetails() {
    const team = {
      name: this.form?.get('team_name')?.value,
      owner: this.form?.get('team_owner')?.value,
      league: this.form?.get('league')?.value,
    };
    let result = await this.http.addTeamDetails(team);
    if (result.success) {
      this.dialogRef.close();
    }
    // const usr = {data:this.authService.encrypt(JSON.stringify(user))};
    // let data = await this.authService.registerUser(usr);
  }
  
}

@Component({
  selector: 'app-edit-team-details-dialog',
  templateUrl: './edit-team-details-dialog.html',
})
export class EditTeamDetailsDialogComponent implements OnInit{
  form!: FormGroup;
  leagues = [
    {
      "edition_title": "","id":''
    }
  ];
  selected_league = "";
  constructor(
    public dialogRef: MatDialogRef<AddTeamDetailsDialogComponent>,
    private formBuilder: FormBuilder,
    private http: HttpserviceService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getLeagueDetails();
    this.setFormValue();
    this.selected_league = this.data.id
  }

  onClose(): void {
    this.dialogRef.close();
  }

  createForm() {
    this.form = this.formBuilder.group({
      team_name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      team_owner: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      league: ['', Validators.compose([
        Validators.required,
      ])],
    },
    );
  }

  setFormValue()
  {
    this.form.controls['team_name'].setValue(this.data.name);
    this.form.controls['team_owner'].setValue(this.data.owner);
    this.form.controls['league'].setValue(this.data.id);

  }


  changeLeague(league: any) {
    this.selected_league = league;
  }

  async getLeagueDetails() {
    let result = await this.http.getLeagueDetails();
    if (result.success) {
      this.leagues = result.rows;
    }
  }

  async addTeamDetails() {
    const team = {
      name: this.form?.get('team_name')?.value,
      owner: this.form?.get('team_owner')?.value,
      league: this.form?.get('league')?.value,
    };
    // let result = await this.http.addTeamDetails(team);
    // if (result.success) {
    //   this.dialogRef.close();
    // }
    // const usr = {data:this.authService.encrypt(JSON.stringify(user))};
    // let data = await this.authService.registerUser(usr);
  }
  
}
