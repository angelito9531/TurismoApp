import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ValidacionLoginGuard } from './validacion_login/validacion-login.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [ValidacionLoginGuard]
  },
  { path: 'perfil', loadChildren: './pages/perfil/perfil.module#PerfilPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'registro', loadChildren: './pages/registro/registro.module#RegistroPageModule' },
  { path: 'recuperar', loadChildren: './pages/recuperar/recuperar.module#RecuperarPageModule' },
  { path: 'registrar', loadChildren: './pages/lugares/registrar/registrar.module#RegistrarPageModule' },
  { path: 'actualizar/:id', loadChildren: './pages/lugares/actualizar/actualizar.module#ActualizarPageModule' },
  { path: 'informacion/:id', loadChildren: './pages/lugares/informacion/informacion.module#InformacionPageModule' }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
