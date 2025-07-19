import { AuthService } from '../services/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Profile } from '../models/profile.model';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  const profile: Profile = authService.getProfile()();

  if (profile.name) {
    return true;
  } else {
    router.navigate(['']);
    return false;
  }
};