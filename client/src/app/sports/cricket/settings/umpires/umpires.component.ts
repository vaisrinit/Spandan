import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpserviceService } from 'src/app/_services/httpservice.service';

@Component({
  selector: 'app-umpires',
  templateUrl: './umpires.component.html',
  styleUrls: ['./umpires.component.css']
})
export class UmpiresComponent {

  dataSource: any;
  displayedColumns: string[] = ['name','country','date_of_birth','gender'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  ngOnInit(): void {
    sessionStorage.setItem("currentRoute","/home/sports/cricket/settings/leagues");
  }

  constructor(public dialog: MatDialog,
    private http: HttpserviceService,
  ) {
    this.getMatchOfficials()

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUmpireDetailsDialogComponent, {
      width: '50%',
    });
    dialogRef.afterClosed().subscribe(result => {
        this.getMatchOfficials();
    });
    
  }

  applyFilter(event: Event) {
    console.log(event)
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}

  async getMatchOfficials() {
    let result = await this.http.getMatchOfficials();
    if (result.success) {
      this.dataSource = new MatTableDataSource(result.rows);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

}

@Component({
  selector: 'app-add-umpire-details-dialog',
  templateUrl: './add-umpire-details-dialog.html',
})
export class AddUmpireDetailsDialogComponent implements OnInit{
  form!: FormGroup;
  countries = [{name:'',dispname:''}];
  genders = [
    {
      "name": "male",
      "dispname": "Male"
    },
    {
      "name": "female",
      "dispname": "Female"
    },
  ];
  officials = [
    {
      "value": true,
      "dispname": "Umpire"
    },
    {
      "value": false,
      "dispname": "Match Referee"
    },
  ];

  date_of_birth = "";

  constructor(
    public dialogRef: MatDialogRef<AddUmpireDetailsDialogComponent>,
    private formBuilder: FormBuilder,
    private http: HttpserviceService,

  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getTeamDetails();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  createForm() {
    this.form = this.formBuilder.group({
      date_of_birth: new FormControl(),
      ump_name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ])],
      country: ['', Validators.compose([
        Validators.required,
      ])],
      gender: ['', Validators.compose([
        Validators.required,
      ])],
      official: ['', Validators.compose([
        Validators.required,
      ])],
    },
    );
  }


  async getTeamDetails() {
    let result = await this.http.getTeamDetails();
    if (result.success) {
      this.countries = result.rows.filter((e:any)=>
        e.league == "International"
      )
    }
  }

  async addMatchOfficials() {
    const umpire = {
      name: this.form?.get('ump_name')?.value,
      country: this.form?.get('country')?.value,
      gender: this.form?.get('gender')?.value,
      date_of_birth: new Date(this.date_of_birth).getFullYear().toString()+"-"+((new Date(this.date_of_birth).getMonth())+1).toString()+"-"+new Date(this.date_of_birth).getDate().toString(),
      is_umpire:this.form?.get('official')?.value,
    };
    console.log(umpire)
    let result = await this.http.addMatchOfficials(umpire);
    if (result.success) {
      this.dialogRef.close();
    }
    // const usr = {data:this.authService.encrypt(JSON.stringify(user))};
    // let data = await this.authService.registerUser(usr);
  }

}
