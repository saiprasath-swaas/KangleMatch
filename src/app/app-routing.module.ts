import {Routes, RouterModule} from '@angular/router';
import {Q1Component} from './q1/q1.component';
import {Q2Component} from './q2/q2.component';
import {NgModule} from '@angular/core';


export const routes:Routes = [
    {path:'',redirectTo:'/q2',pathMatch:'full'},
    {path:'q1',component:Q1Component},
    {path:'q2',component:Q2Component}
];

export const navigatableComponents = [
    Q2Component,
    Q1Component
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule {}