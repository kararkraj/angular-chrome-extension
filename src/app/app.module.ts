import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from "echarts/renderers";
import { TooltipComponent } from 'echarts/components';
import { GaugeChart } from "echarts/charts";

import { AppComponent } from './app.component';
import { MemoryMeterComponent } from './memory-meter/memory-meter.component';
import { CpuMeterComponent } from './cpu-meter/cpu-meter.component';

echarts.use([GaugeChart, TooltipComponent, CanvasRenderer]);

@NgModule({
  declarations: [
    AppComponent,
    MemoryMeterComponent,
    CpuMeterComponent
  ],
  imports: [
    BrowserModule,
    ColorPickerModule,
    NgxEchartsModule.forRoot({
      echarts
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
