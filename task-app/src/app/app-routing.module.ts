import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import{HomeComponent} from  './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { SidemenuComponent } from './layout/sidemenu/sidemenu.component';
import  {ErrorComponent} from  './error/error.component';  
import{AuthGuardService}  from  './SharedServices/auth-guard.service';
const routes: Routes = [
  { path: 'login', component: LoginComponent },  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },  
  {
    path:'',
    component:LayoutComponent,
    canActivate:[AuthGuardService],
    children:[
      {
        path: 'home',       
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)        
       // 
      },
      { path: 'users',      
       loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },  
       { path: 'page2', loadChildren: () => import('./page2/page2.module').then(m => m.Page2Module) },
      { path: 'page3', loadChildren: () => import('./page3/page3.module').then(m => m.Page3Module) }
    ]
  },
  { path: 'error/:code', component:ErrorComponent }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
