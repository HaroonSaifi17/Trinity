import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Student } from 'src/app/services/student.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
 userData$?: Observable<Student>;
  constructor(private api:ApiService, private router:Router) {
}

  ngOnInit(): void {
    this.userData$ = this.api.userData();
  }

  userLogout():void{
    this.api.logout()
  }
}
