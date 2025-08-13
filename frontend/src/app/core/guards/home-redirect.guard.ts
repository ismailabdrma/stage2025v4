import { inject } from '@angular/core'
import { CanActivateFn, Router, UrlTree } from '@angular/router'
import { AuthService } from '../services/auth.service'

export const homeRedirectGuard: CanActivateFn = (): boolean | UrlTree => {
  const auth = inject(AuthService)
  const router = inject(Router)

  try {
    const token = auth.getToken()
    if (!token) return true
    const payload = JSON.parse(atob(token.split('.')[1]))
    const role = payload.role || payload.authorities || payload.roles
    if (role && (role === 'ADMIN' || role === 'ROLE_ADMIN')) {
      return router.parseUrl('/admin')
    }
  } catch {
    // ignore malformed token
  }
  return true
}


