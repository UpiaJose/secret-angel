import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecretAngelComponent } from './secret-angel/secret-angel.component';

const routes: Routes = [
  { path: 'secret-angel', component: SecretAngelComponent },
  { path: '', redirectTo: '/secret-angel', pathMatch: 'full' },
  { path: '**', redirectTo: '/secret-angel', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
