import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, private commonService: CommonService) {}

  // --- Redirect to scan Qr code component
  openScanQR() {
    this.router.navigateByUrl('/scan-qr');
  }

  // --- Redirect to generate Qr code component
  openGenerateQRPage() {
    this.router.navigateByUrl('/view-qr');
  }

  // --- logout user
  async logout() {
    let res = await this.commonService.confirm("Are you sure you want to log out?", "Attention");
    if(res) {
      await Preferences.remove({key: 'user'})
      this.router.navigateByUrl('');
    }
  }

}
