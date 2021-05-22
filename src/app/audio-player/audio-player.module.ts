import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioPlayerComponent } from './audio-player.component';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AudioPlayerComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatSliderModule,
    MatIconModule,
    FlexLayoutModule,
  ], exports: [AudioPlayerComponent, MatButtonModule, MatButtonModule,
    MatSliderModule,
    MatIconModule,]
})
export class AudioPlayerModule { }
