import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',   redirectTo: '/toDoPage', pathMatch: 'full'
  },
  {
    path: 'toDoPage',
    title:'To Do Page',
    loadComponent: () => import('../app/to-do-page/to-do-page.component').then(m => m.ToDoPageComponent)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
