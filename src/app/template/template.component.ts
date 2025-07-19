import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { Component, inject } from '@angular/core';
import { filter } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Props } from '../shared/models/props.model';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss'
})
export class TemplateComponent {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  public props: Props = {
    titulo: ''
  }

  public ngOnInit(): void {
    this.setPropsFromRoute();

    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.getChild(this.activatedRoute).data.subscribe({
        next: (data: any) => this.props = data as Props,
        error: (error: HttpErrorResponse) => console.error(error)
      })
    });
  }

  private setPropsFromRoute(): void {
    this.getChild(this.activatedRoute).data.subscribe({
      next: (data: any) => this.props = data as Props,
      error: (error: HttpErrorResponse) => console.error(error)
    });
  }

  private getChild(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  public logout(): void {
    this.authService.logout();
  }
}