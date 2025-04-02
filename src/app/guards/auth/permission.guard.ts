import { StorageService } from '@/app/services/storage.service';
import { AuthStore } from '@/stores/AuthStore';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const permissionGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const storageService = inject(StorageService);

  // Obtiene los permisos necesarios y los permisos del usuario
  const requiredPermission = route.data['permission'];
  const permissions = JSON.parse(storageService.get('permissions') || '[]');

  // Verifica si el usuario tiene permisos
  if (permissions.length === 0) {
    return false;
  }

  // Verifica si tiene el permiso requerido
  if (permissions.includes(requiredPermission)) {
    return true;
  }

  // Si tiene permisos, pero no el requerido, simplemente bloquea sin redirigir
  return false;
};
