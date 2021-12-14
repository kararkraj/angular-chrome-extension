import { AfterViewInit, Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-memory-meter',
  templateUrl: './memory-meter.component.html',
  styleUrls: ['./memory-meter.component.scss']
})
export class MemoryMeterComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  memoryChartOption: EChartsOption = {
    series: {
      name: 'RAM Usage',
      type: 'gauge',
      progress: {
        show: true
      },
      detail: {
        valueAnimation: true,
        formatter: '{value} %'
      },
      data: [
        {
          value: 50,
          name: 'RAM'
        }
      ]
    }
  };
  cpuChartOption: EChartsOption = {
    series: {
      name: 'CPU Usage',
      type: 'gauge',
      progress: {
        show: true
      },
      detail: {
        valueAnimation: true,
        formatter: '{value} %'
      },
      data: [
        {
          value: 50,
          name: 'CPU'
        }
      ]
    }
  };
  memoryMergeOptions: any;
  cpuMergeOptions: any;
  interval!: Subscription;
  cpuInfo!: chrome.system.cpu.CpuInfo;

  constructor() { }

  ngOnChanges(change: SimpleChanges) {
  }

  ngOnInit(): void {
    let port = chrome.runtime.connect();
    window.addEventListener("message", (event) => {
      if (event.source != window) {
        return;
      }
      if (event.data.type && (event.data.type == "FROM_PAGE")) {
        console.log("Content script received: " + event.data.text);
        port.postMessage(event.data.text);
      }
    }, false);
  }

  ngAfterViewInit() {
    const secondsCounter = interval(5000);
    this.interval = secondsCounter.subscribe(n => {
      this.getCPUUsage().then((cpuInfo: chrome.system.cpu.CpuInfo) => {
        this.getMemoryUsage().then((memoryInfo: chrome.system.memory.MemoryInfo) => {
          let percentRAMUsage = Math.round(100 * (memoryInfo.capacity - memoryInfo.availableCapacity) / memoryInfo.capacity);
          this.updateMemoryMeter(percentRAMUsage);
          window.postMessage({ type: "FROM_PAGE", text: percentRAMUsage }, "*");
        });

        let cpuUsagePercent: number = 0;
        for (let i = 0; i < cpuInfo.numOfProcessors; i++) {
          let usage = cpuInfo.processors[i].usage;
          if (this.cpuInfo) {
            let oldUsage = this.cpuInfo.processors[i].usage;
            cpuUsagePercent += Math.floor((usage.kernel + usage.user - oldUsage.kernel - oldUsage.user) / (usage.total - oldUsage.total) * 100);
          } else {
            cpuUsagePercent += Math.floor((usage.kernel + usage.user) / usage.total * 100);
          }
        }
        this.cpuInfo = cpuInfo;
        this.updateCPUMeter(Math.round(cpuUsagePercent / cpuInfo.numOfProcessors));
      });
    });
  }

  ngOnDestroy() {
    this.interval.unsubscribe();
    console.log("destroyed");
    
  }

  getMemoryUsage(): Promise<chrome.system.memory.MemoryInfo> {
    return new Promise((resolve, reject) => {
      chrome.system.memory.getInfo((memoryInfo: chrome.system.memory.MemoryInfo) => {
        resolve(memoryInfo);
      });
    });
  }

  getCPUUsage(): Promise<chrome.system.cpu.CpuInfo> {
    return new Promise((resolve, reject) => {
      chrome.system.cpu.getInfo((cpuInfo: chrome.system.cpu.CpuInfo) => {
        resolve(cpuInfo);
      });
    });
  }

  updateMemoryMeter(percentRAMUsage: number) {
    this.memoryMergeOptions = {
      series: {
        data: [
          {
            value: percentRAMUsage,
            name: 'RAM'
          }
        ]
      }
    };
  }

  updateCPUMeter(CPUUsage: number) {
    this.cpuMergeOptions = {
      series: {
        data: [
          {
            value: CPUUsage,
            name: 'CPU'
          }
        ]
      }
    };
  }

}
