import { Component, inject } from '@angular/core';
import { LoaderService } from '../core/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  standalone: false,
})
export class LoaderComponent {
  loaderService = inject(LoaderService);
  loading = this.loaderService.loadingSignal();
}
