import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IMusicList } from '../../models/music-list.model';
import { MusicListService } from '../../services/music-list.service';


@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss']
})
export class MusicListComponent implements OnInit {

  musicList$!: Observable<IMusicList[]>;
  constructor(
    private _musicListService: MusicListService
  ) {
    this._musicListService.getMusicList();
  }

  ngOnInit(): void {
    this.musicList$ = this._musicListService.musicListListener$;
  }

}
