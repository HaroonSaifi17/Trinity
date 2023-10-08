import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit(): void { }
  public navStatus:boolean=false
  toggleClass(list: HTMLDivElement): void {
    if (list.style.right == '0px') {
      list.style.right = '-100%'
      this.navStatus=false
    } else {
      list.style.right = '0px'
      this.navStatus=true
    }
  }
  navigateToRoute() {
    this.router.navigateByUrl('logincallback')
  }
  adminLogin(){

    this.router.navigateByUrl('adminlogin')
  }
}
