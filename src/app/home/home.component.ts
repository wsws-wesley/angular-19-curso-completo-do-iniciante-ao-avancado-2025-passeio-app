import { Component, inject } from '@angular/core';
import { Profile } from '../shared/models/profile.model';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  public profile: Profile = {
    email: '',
    name: ''
  };

  public ngOnInit(): void {
    this.authService.initConfiguration();
  }

  public navigateToGalery(): void {
    this.router.navigate(['/template/galeria']);
  }

  public login(): void {
    this.authService.login();
  }

  public isLoggedIn(): boolean {
    this.profile = this.authService.getProfile()();
    return !!this.profile.name;
  }
}