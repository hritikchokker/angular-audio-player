import { AfterViewInit, Component, ElementRef, Inject, OnInit, Optional, ViewChild } from '@angular/core';
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
  audioSource = '/assets/media/t-rex-roar.mp3';
  @ViewChild('audioPlayer', { static: false }) audioPlayer!: ElementRef<HTMLAudioElement>;
  @ViewChild('downloadLink', { static: false }) downloadLink!: ElementRef<HTMLAnchorElement>;
  constructor(
    @Optional() @Inject(WINDOW) private _window: Window
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }
  handleSuccess(stream: any) {
    console.log(stream, 'stream obje');
    const options = { mimeType: 'audio/webm' };
    const recordedChunks: any[] | undefined = [];
    const mediaRecorder = new MediaRecorder(stream, options);
    mediaRecorder.addEventListener('dataavailable', (e: any) => {
      debugger;
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
      }
      if (this.shouldStop === true && this.stopped === false) {
        debugger;
        mediaRecorder.stop();
        this.stopped = true;
      }
    });

    mediaRecorder.addEventListener('stop', () => {
      this.downloadLink.nativeElement.href = URL.createObjectURL(new Blob(recordedChunks));
      this.downloadLink.nativeElement.download = 'acetest.wav';
    });

    mediaRecorder.start();
  };

  async userAction() {
    try {
      // const updateSource = (source: any) => {
      //   if (window.URL) {
      //     this.audioPlayer.nativeElement.srcObject = source;
      //   } else {
      //     this.audioPlayer.nativeElement.src = source;
      //   }
      // }
      const response = await this._window.navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      this.handleSuccess(response);

    } catch (error) {

    }
  }

  async revokeAccess() {
    try {
      const response = await this._window.navigator.mediaDevices.getUserMedia({ audio: false, video: false })

      console.log('after revoked', response);
      // .then(this.handleSuccess)
    } catch (error) {

    }
  }
}
