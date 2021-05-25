import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable
} from 'rxjs';
import { IMusicList } from '../models/music-list.model';




@Injectable({
  providedIn: 'root'
})
export class MusicListService {

  musicList$: BehaviorSubject<IMusicList[]> = new BehaviorSubject<IMusicList[]>([]);
  musicListListener$: Observable<IMusicList[]> = this.musicList$.asObservable();
  constructor(private $http: HttpClient) { }

  getMusicList() {
    this.$http.get<IMusicList[]>('/assets/music-list.json')
      .subscribe(data => {
        if (data) {
          this.musicList$.next(data);
        }
      })
  }
}
