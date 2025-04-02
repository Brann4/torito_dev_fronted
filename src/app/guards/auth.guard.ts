import { AuthStore } from '@/stores/AuthStore';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore)
  const router = inject(Router)
  if(!authStore.isLoggedIn()){
    router.navigate(['/'],{replaceUrl:true})
  }
  return true
};
