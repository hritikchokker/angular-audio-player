import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioPlayerComponent } from './audio-player.component';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    AudioPlayerComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    FlexLayoutModule,
  ], exports: [AudioPlayerComponent, MatButtonModule]
})
export class AudioPlayerModule { }
