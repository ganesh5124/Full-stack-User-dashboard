import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AuthGuard } from './components/auth.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, 
    children: [ // child components of dashboard
        { path: 'add-user', component: AddUserComponent },
        { path: 'view-user', component:UserComponent},
        { path: '', redirectTo:'add-user', pathMatch:'full'}
    ], canActivate:[AuthGuard] },
    { path: '*', component: NotFoundComponent }, // wildcard entries
    { path: '**', component: NotFoundComponent }
];
