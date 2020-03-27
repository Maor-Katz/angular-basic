import { Component, OnInit } from '@angular/core';
import { FamilyService } from 'src/app/services/family.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public localList
  constructor(public _fs: FamilyService) { }

  ngOnInit() {
    this.getTodo();
  }

  getTodo() {
    this._fs.getTodoList().subscribe(
      data => { this.localList = data; console.log(this.localList) },
      err => console.log(err)
    )
  }

  completeTask(idTask) {
    this._fs.editTask({ id: idTask, finished: true }).subscribe(
      data => { console.log('sucess');this.getTodo(); },
      err => console.log(err)
    )
  }

  deleteTask(id) {
    this._fs.deleteTask(id).subscribe(
      data => { console.log('deleted');this.getTodo(); },
      err => console.log(err)
    )
  }

}
