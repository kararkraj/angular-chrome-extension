import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  color: string = "#FFFFFF";
  title = 'angular-chrome-extention';

  constructor() { }

  ngOnInit() {
    chrome.storage.sync.get('color', ({ color }) => {
      this.color = color;
      // this.colorize();
    });
  }

  public colorize() {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.executeScript(
        tabs[0].id!,
        { code: `document.body.style.backgroundColor = '${this.color}';` }
      );
    });
  }

  public updateColor(color: string) {
    chrome.storage.sync.set({ color });
  }
}
