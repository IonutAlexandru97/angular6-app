import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LineChartWidgetComponent } from './line-chart-widget.component';
import { MaterialModule } from 'src/@client/shared/material-components.module';
import { LoadingOverlayModule } from 'src/@client/shared/loading-overlay/loading-overlay.module';
import { ClientCardModule } from 'src/@client/shared/card/card.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    // Core
    LoadingOverlayModule,

    // Chart Widget Style
    ClientCardModule
  ],
  declarations: [LineChartWidgetComponent],
  exports: [LineChartWidgetComponent]
})
export class LineChartWidgetModule {
}
