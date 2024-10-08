import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { ApiService } from 'src/app/services/api.service'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html',
  styleUrls: ['./login-callback.component.scss'],
})
export class LoginCallbackComponent implements OnInit, OnDestroy {
  public apiSubscription: Subscription | undefined
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService
  ) { }
  ngOnInit(): void {
    const token = localStorage.getItem('token')

    if (token) {
      this.router.navigate(['/student'], {
        queryParams: {
          token: null,
        },
        queryParamsHandling: 'merge',
      })
      return
    }

    this.route.queryParams.subscribe((params) => {
      const tokenFromParams = params['token']
      if (!tokenFromParams) {
        window.location.href = environment.trinityApiUrl + '/login'
        return
      }

      localStorage.setItem('token', tokenFromParams)
      this.apiSubscription = this.api.checkNew().subscribe((data) => {
        if (data.isNew) {
          this.router.navigate(['/student'], {
            queryParams: {
              token: null,
            },
            queryParamsHandling: 'merge',
          })
        } else {
          console.log(data)
          this.router.navigate(['/newStudent'], {
            state: {
              viaNavigate: true,
              name:data.name
            },
            queryParams: {
              token: null,
            },
            queryParamsHandling: 'merge',
          })
        }
      })
    })
  }

  ngOnDestroy(): void {
    this.apiSubscription?.unsubscribe()
  }
}
