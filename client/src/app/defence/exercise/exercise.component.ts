import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HttpserviceService } from 'src/app/httpservice.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  dataSource = new MatTableDataSource([]);;
  displayedColumns: string[] = ['name', 'type', 'force', 'troop', 'countries', 'place', 'start_date', 'end_date','link'];
  ngOnInit(): void {

  }

  constructor(public dialog: MatDialog,
    private http: HttpserviceService,
  ) {
    this.getExerciseDetails()

  }

  async getExerciseDetails() {
    let result = await this.http.getExerciseDetails();
    if (result.success) {
      this.dataSource = new MatTableDataSource(result.rows);
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddDefenceExerciseDialog, {
      width: '50%',
    });
    dialogRef.afterClosed().subscribe(result => {
        this.getExerciseDetails();
    });
    
  }



}

@Component({
  selector: 'add-defence-exercise-dialog',
  templateUrl: 'add-defence-exercise-dialog.html',
})
export class AddDefenceExerciseDialog implements OnInit {
  form!: FormGroup;
  ex_types = [
    {
      "name": "domestic",
      "dispname": "Domestic"
    },
    {
      "name": "bilateral",
      "dispname": "Bilateral"
    },
    {
      "name": "multilateral",
      "dispname": "Multilateral"
    }
  ];
  selected_ex_type = "";

  forces = [
    {
      "name": "army",
      "dispname": "Army"
    },
    {
      "name": "navy",
      "dispname": "Navy"
    },
    {
      "name": "air force",
      "dispname": "Air Force"
    },
    {
      "name": "coast guard",
      "dispname": "Coast Guard"
    },
    {
      "name": "tri services",
      "dispname": "Tri Services"
    }
  ];
  selected_force = "";

  ex_start_date = "";
  ex_end_date = "";
  constructor(
    public dialogRef: MatDialogRef<AddDefenceExerciseDialog>,
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
      ex_start_date: new FormControl(),
      ex_end_date: new FormControl(),
      ex_name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ])],
      troop: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(100),
      ])],
      countries: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(100),
      ])],
      place: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(100),
      ])],
      description: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(100),
      ])],
      link: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(100),
      ])],
    },
    );
  }

  changeExType(ex_type: any) {
    this.selected_ex_type = ex_type;
  }

  changeForce(force: any) {
    this.selected_force = force;
  }

  async addExerciseDetails() {
    const exercise = {
      name: this.form?.get('ex_name')?.value,
      type: this.selected_ex_type,
      force: this.selected_force,
      troop: this.form?.get('troop')?.value,
      countries: this.form?.get('countries')?.value,
      place: this.form?.get('place')?.value,
      description: this.form?.get('description')?.value,
      link: this.form?.get('link')?.value,
      start_date: this.ex_start_date,
      end_date: this.ex_end_date
    };
    console.log(exercise)
    let result = await this.http.addExerciseDetails(exercise);
    if (result.success) {
      console.log(result);
      this.dialogRef.close();
    }
    // const usr = {data:this.authService.encrypt(JSON.stringify(user))};
    // let data = await this.authService.registerUser(usr);
  }

}
