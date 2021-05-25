import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicComponent } from './music.component';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { MusicListComponent } from './components/music-list/music-list.component';
import { MusicCardComponent } from './components/music-card/music-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';


const routes: Routes = [
  {
    path: '',
    component: MusicComponent
  }
]
@NgModule({
  declarations: [
    MusicComponent,
    MusicListComponent,
    MusicCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ]
})
export class MusicModule { }
