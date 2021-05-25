import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IMusicList } from '../../models/music-list.model';

@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  styleUrls: ['./music-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MusicCardComponent implements OnInit {

  musicDetail!: IMusicList;
  @Input() set item(data: IMusicList) {
    if (data) {
      this.musicDetail = data;
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
