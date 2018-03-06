import {Injectable} from '@angular/core';
import {SpeechRecognition} from "@ionic-native/speech-recognition";

@Injectable()
export class ListenService {

  constructor(private sr: SpeechRecognition) {
  }

  async listen() {
    await this.sr.requestPermission()
    const available = await this.sr.isRecognitionAvailable()
    if (available) {
      console.log('start!')
      this.sr.startListening({})
        .subscribe(
          (matches: Array<string>) => console.log(matches),
          (onerror) => console.log('error:', onerror)
        )
      setTimeout(async () => {
        console.log('stop!')
        await this.sr.stopListening()
        console.log('stopped!')
      }, 5000)
    }
  }

}
