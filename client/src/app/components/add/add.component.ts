import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FamilyService } from 'src/app/services/family.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public form: FormGroup
  public persons

  constructor(public _fb: FormBuilder, public _fs: FamilyService, public router:Router) { }

  ngOnInit() {
    this.form = this._fb.group({
      task_description: ["", Validators.required],
      person_id: [0, [Validators.required, Validators.min(1)]]
    })
    this._fs.getHomeMembers().subscribe(
      res => { this.persons = res; console.log(this.persons) },
      err => console.log(err)
    )
  }
  addTask() {
    this._fs.addTodoList(this.form.value).subscribe(
      res => {
        console.log("created")
      },
      err => console.log(err)
    )
    this.router.navigate(['/home']);
  }

}
