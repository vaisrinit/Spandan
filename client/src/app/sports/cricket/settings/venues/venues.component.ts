import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpserviceService } from 'src/app/_services/httpservice.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.css']
})
export class VenuesComponent {

  dataSource: any;
  displayedColumns: string[] = ['name', 'city', 'state', 'country', 'capacity', 'owner', 'edit', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatPaginator | undefined;

  ngOnInit(): void {
    sessionStorage.setItem("currentRoute", "/home/sports/cricket/settings/leagues");
  }

  constructor(public dialog: MatDialog,
    private http: HttpserviceService,
  ) {
    this.getVenueDetails()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddVenueDetailsDialogComponent, {
      width: '50%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getVenueDetails();
    });

  }

  openEditDialog(data: any): void {
    const dialogRef = this.dialog.open(EditVenueDetailsDialogComponent, {
      width: '50%',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getVenueDetails();
    });

  }

  
  applyFilter(event: Event) {
    console.log(event)
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}


  async getVenueDetails() {
    let result = await this.http.getVenueDetails();
    if (result.success) {
      this.dataSource = new MatTableDataSource(result.rows);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    }
  }
}

@Component({
  selector: 'app-add-venue-details-dialog',
  templateUrl: './add-venue-details-dialog.html',
})
export class AddVenueDetailsDialogComponent implements OnInit {

  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddVenueDetailsDialogComponent>,
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
      ven_name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      ven_city: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      ven_state: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      ven_country: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      ven_owner: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      ven_capacity: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      latitude: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      longitude: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      end_1: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      end_2: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
    },
    );
  }


  async addVenueDetails() {
    const umpire = {
      name: this.form?.get('ven_name')?.value,
      city: this.form?.get('ven_city')?.value,
      state: this.form?.get('ven_state')?.value,
      country: this.form?.get('ven_country')?.value,
      owner: this.form?.get('ven_owner')?.value,
      capacity: this.form?.get('ven_capacity')?.value,
      latitude: this.form?.get('latitude')?.value,
      longitude: this.form?.get('longitude')?.value,
      end_1: this.form?.get('end_1')?.value,
      end_2: this.form?.get('end_2')?.value,

    };
    let result = await this.http.addVenueDetails(umpire);
    if (result.success) {
      this.dialogRef.close();
    }
    // const usr = {data:this.authService.encrypt(JSON.stringify(user))};
    // let data = await this.authService.registerUser(usr);
  }

}

@Component({
  selector: 'app-add-venue-details-dialog',
  templateUrl: './edit-venue-details-dialog.html',
})
export class EditVenueDetailsDialogComponent implements OnInit {

  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditVenueDetailsDialogComponent>,
    private formBuilder: FormBuilder,
    private http: HttpserviceService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.setFormValue();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  createForm() {
    this.form = this.formBuilder.group({
      ven_name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      ven_city: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      ven_state: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      ven_country: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      ven_owner: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      ven_capacity: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      latitude: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      longitude: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      end_1: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      end_2: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
    },
    );
  }

  setFormValue() {
    this.form.controls['ven_name'].setValue(this.data.name);
    this.form.controls['ven_city'].setValue(this.data.city);
    this.form.controls['ven_state'].setValue(this.data.state);
    this.form.controls['ven_country'].setValue(this.data.country);
    this.form.controls['ven_owner'].setValue(this.data.owner);
    this.form.controls['ven_capacity'].setValue(this.data.capacity);
    this.form.controls['latitude'].setValue(this.data.latitude);
    this.form.controls['longitude'].setValue(this.data.longitude);
    this.form.controls['end_1'].setValue(this.data.end_1);
    this.form.controls['end_2'].setValue(this.data.end_2);
  }


  async editVenueDetails() {
    const umpire = {
      name: this.form?.get('ven_name')?.value,
      city: this.form?.get('ven_city')?.value,
      state: this.form?.get('ven_state')?.value,
      country: this.form?.get('ven_country')?.value,
      owner: this.form?.get('ven_owner')?.value,
      capacity: this.form?.get('ven_capacity')?.value,
      latitude: this.form?.get('latitude')?.value,
      longitude: this.form?.get('longitude')?.value,
      end_1: this.form?.get('end_1')?.value,
      end_2: this.form?.get('end_2')?.value,
      id: this.data.id
    };
    let result = await this.http.editVenueDetails(umpire);
    if (result.success) {
      this.dialogRef.close();
    }
    // const usr = {data:this.authService.encrypt(JSON.stringify(user))};
    // let data = await this.authService.registerUser(usr);
  }

}