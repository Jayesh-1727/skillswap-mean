import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { authGuard } from './core/guards/auth.guard';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', component: Home },

  { path: 'login', component: Login },
  { path: 'register', component: Register },

  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./dashboard/dashboard').then(m => m.Dashboard)
  },

  {
  path: 'profile',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./profile/profile').then(m => m.Profile)
},

{
  path: 'discovery',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./discovery/discovery').then(m => m.Discovery)
},

{
  path: 'user/:id',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./public-profile/public-profile').then(m => m.PublicProfile)
},

{
  path: 'teacher-requests',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./teacher-requests/teacher-requests')
      .then(m => m.TeacherRequests)
},


{
  path: 'my-requests',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./my-requests/my-requests')
      .then(m => m.MyRequests)
},

{
  path: 'chat/:sessionId',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./chat/chat')
      .then(m => m.Chat)
},


  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
