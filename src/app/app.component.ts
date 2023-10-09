import { Component } from '@angular/core';
import { NgxSerial } from 'ngx-serial';
import { SerialPort, SerialOptions } from './serial';
let selectedPort: SerialPort;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ngx-serial-example';

  serial: NgxSerial;
  port: any;

  constructor() {
    this.serial = new NgxSerial(this.dataHandler);
    this.serial;
    this.listar();
  }

  async listar() {
    this.serial = new NgxSerial(this.dataHandler);
    console.log(this.serial);
  }
  dataHandler(data: string) {
    console.log('From arduino -> ' + data);
  }

  connect() {
    if (!this.port) {
      this.serial.connect((port: any) => {
        console.log("test",port);
        this.port = port;
      });
    }
  }

  toggleL1() {
    console.log('test');
    console.log(this.port);
    if (this.port) {
      console.log("yyyyy")
      this.serial.sendData("detect-device");
    } //L1\n
  }
  toggleL2() {
    console.log('test1');
    // if (this.port) this.serial.sendData('L2\n'); //L2\n
    if (this.port) this.serial.sendData('get-device-id'); //L2\n
  }

  close() {
    if (this.port)
      this.serial.close((port: any) => {
        this.port = port;
      });
  }
}
