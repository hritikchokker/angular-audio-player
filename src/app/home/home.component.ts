import { Component, OnInit } from '@angular/core';
import { MusicListService } from '../music/services/music-list.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showPlayer = false;
  constructor(
    private _musicDataService: MusicListService
  ) { }

  ngOnInit(): void {
    this._musicDataService.getMusicList();
  }

  toggle() {
    this.showPlayer = !this.showPlayer;
  }
}
