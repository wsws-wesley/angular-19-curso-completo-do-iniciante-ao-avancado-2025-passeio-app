import { auth } from './auth.config';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Profile } from '../models/profile.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private oAuthService: OAuthService = inject(OAuthService);
  private router: Router = inject(Router);

  constructor() {
    this.initConfiguration();
  }

  public profile = signal<Profile>({ email: '', name: '' });

  public initConfiguration(): void {
    this.oAuthService.configure(auth);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oAuthService.hasValidIdToken()) {
        this.profile.set(this.oAuthService.getIdentityClaims() as Profile);
      }
    });
  }

  public login(): void {
    this.oAuthService.initImplicitFlow();
  }

  public logout(): void {
    this.oAuthService.revokeTokenAndLogout();
    this.oAuthService.logOut();

    this.profile.set({ email: '', name: '' });
    this.router.navigate(['']);
  }

  public getProfile(): Signal<Profile> {
    return this.profile;
  }
}