import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuardCard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('customerCart')) {
            // there are data for view details in so return true
            return true;
        }            
        // there are not data for view in so redirect to login page with the return url
        this.router.navigate(['/account/login']);
        return false;
    }
}