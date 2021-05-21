import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsComponent } from './layouts.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardModule } from 'src/app/dashboard/dashboard.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [LayoutsComponent],
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    DashboardModule,
    RouterModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ], exports: [LayoutsComponent]
})
export class LayoutsModule { }
