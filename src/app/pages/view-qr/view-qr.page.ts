import { Component, OnInit } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-view-qr',
  templateUrl: './view-qr.page.html',
  styleUrls: ['./view-qr.page.scss'],
})
export class ViewQRPage implements OnInit {
  qrData: any = '';
  qrBase64: any;

  constructor(private commonService: CommonService) {}

  ngOnInit() {}

  // --- generate qr code and display
  async generate() {
    this.qrData = this.commonService.generateRandomString(15);
    this.qrBase64 = this.commonService.toQRCode(this.qrData, 350);
  }

  // --- share qr code
  async share() {
    if (!this.qrData) {
      this.commonService.presentAlert('Please generate QR code first!');
      return;
    }

    // --- file name
    let fileName = `${this.qrData}.png`;

    // --- first write file
    return Filesystem.writeFile({
      path: fileName,
      data: this.qrBase64,
      directory: Directory.Cache,
    })
      .then(() => {
        // --- get url from directory cache
        return Filesystem.getUri({
          directory: Directory.Cache,
          path: fileName,
        });
      })
      .then((uriResult) => {
        // --- share this QR file
        return Share.share({
          title: fileName,
          text: fileName,
          url: uriResult.uri,
        });
      });
  }
}
