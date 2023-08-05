import { Component, Input } from '@angular/core';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-confetti',
  templateUrl: './confetti.component.html',
  styleUrls: ['./confetti.component.scss']
})
export class ConfettiComponent {

  // confetti(args: any = {}) {
  //   return (window as any)['confetti'].apply(this, arguments);
  // }

  // shoot() {
  //   try {
  //     this.confetti({
  //       angle: this.random(60, 120),
  //       spread: this.random(10, 50),
  //       particleCount: this.random(40, 50),
  //       origin: {
  //           y: 0.6
  //       }
  //     });
  //   } catch(e) {
  //     console.log(e)
  //     // noop, confettijs may not be loaded yet
  //   }
  // }

  // random(min: number, max: number) {
  //   return Math.random() * (max - min) + min;
  // }

  renderConfetti(){
    confetti()
  }
}
