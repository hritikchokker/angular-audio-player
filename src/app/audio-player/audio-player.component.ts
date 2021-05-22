import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Optional,
  ViewChild
} from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WINDOW } from '../app.module';
declare var MediaRecorder: any;
@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit, AfterViewInit {

  shouldStop = false;
  stopped = false;
  audioSource = '/assets/media/Calvin Harris - josh pan.mp3';
  private _isPlaying = false;
  audioProgress$!: Observable<any>;
  currentTime!: number;
  totalTime!: string;
  currentShowTime!: any;
  maxTime!: number;
  public get isPlaying(): boolean {
    return this._isPlaying;
  }
  public set isPlaying(value: boolean) {
    this._isPlaying = value;
  }
  mediaStream!: MediaStream;
  _window!: Window;
  @ViewChild('audioPlayer', { static: false }) audioPlayer!: ElementRef<HTMLAudioElement>;
  @ViewChild('downloadLink', { static: false }) downloadLink!: ElementRef<HTMLAnchorElement>;
  constructor(
    @Optional() @Inject(DOCUMENT) private _document: Document
  ) {
    this._window = this._document.defaultView as Window;
  }

  ngOnInit(): void {
  }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
  formatTime(seconds: any) {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s]
      .filter(a => a)
      .join(':')
  }

  ngAfterViewInit(): void {
    this.audioPlayer.nativeElement.src = this.audioSource;
    this.audioProgress$ = fromEvent(this.audioPlayer.nativeElement, 'timeupdate');

    this.audioPlayer.nativeElement.oncanplay = (ev: any) => {
      const { target } = ev;
      this.maxTime = target.duration;
      this.totalTime = this.formatTime(target.duration);
      const te = this.totalTime.indexOf('.')
      this.totalTime = this.totalTime.substr(0, te);
    }
    this.audioProgress$.pipe(map((ev: any) => {
      const { target } = ev;
      let time = target.currentTime
      return time.toFixed(2)
    })).subscribe(data => {
      this.currentShowTime = this.formatTime(data);
      const te = this.currentShowTime.indexOf('.')
      this.currentShowTime = this.currentShowTime.substr(0, te);
      this.currentTime = data;
    })
  }

  play(): void {
    this.audioPlayer.nativeElement.play();
    this.isPlaying = true;
  }
  pause(): void {
    this.audioPlayer.nativeElement.pause();
    this.isPlaying = false;
  }
  forwardAudio() {
    if (this.canUpdateTime(true)) {
      this.currentTime += 30;
      this.audioPlayer.nativeElement.currentTime = this.currentTime;
    }
  }

  canUpdateTime(flag: boolean) {
    if (flag) {
      return this.audioPlayer.nativeElement.currentTime <= this.audioPlayer.nativeElement.duration;
    } else {
      return this.audioPlayer.nativeElement.currentTime >= 0;
    }
  }
  rewindAudio() {
    if (this.canUpdateTime(false)) {
      this.currentTime -= 30;
      this.audioPlayer.nativeElement.currentTime = this.currentTime;
    }
  }
  handleSuccess(stream: MediaStream) {
    console.log(stream, 'stream obje');
    const options = { mimeType: 'audio/webm' };
    const recordedChunks: any[] | undefined = [];
    const mediaRecorder = new MediaRecorder(stream, options);
    const addDownload = () => {
      const anchor = this._window.document.createElement('a');
      anchor.href = URL.createObjectURL(new Blob(recordedChunks));
      anchor.download = 'audio_test.wav';
      this._window.document.body.appendChild(anchor);
      this.audioPlayer.nativeElement.src = anchor.href;
      anchor.click();
    }
    mediaRecorder.addEventListener('dataavailable', (e: any) => {
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
      }
      if (this.shouldStop === true && this.stopped === false) {
        if (mediaRecorder.state !== 'inactive') {
          mediaRecorder.stop();
          this.stopped = true;
        }
      }
    });
    mediaRecorder.addEventListener('stop', addDownload);
    mediaRecorder.start();
  };

  async userAction() {
    try {
      const updateSource = (source: any) => {
        if (window.URL) {
          this.audioPlayer.nativeElement.srcObject = source;
        } else {
          this.audioPlayer.nativeElement.src = source;
        }
        this.audioPlayer.nativeElement.play();
      }
      const response: MediaStream = await this._window.navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      this.mediaStream = response;
      this.handleSuccess(response);
    } catch (error) {
    }
  }

  removeAllTrack(): void {
    for (let i of this.mediaStream.getTracks()) {
      i.stop();
    }
  }

  async revokeAccess() {
    this.removeAllTrack();
  }
}
