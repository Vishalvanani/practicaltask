import { Component } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private _location: Location,
    private alertController: AlertController,
    private router: Router
  ) {
    this.platform.backButton.subscribeWithPriority(10, async (res) => {

      // --- fetch user data from local storage
      let userData: any = await Preferences.get({key: 'user'});
      if (userData && userData.value) userData = JSON.parse(userData.value);
      if ((this._location.isCurrentPathEqualTo('/home') && userData) ||
      (this._location.isCurrentPathEqualTo('') || this._location.isCurrentPathEqualTo('/login'))) {
        this.showExitConfirm();
        return;
      }

      // --- remove scanner class
      if(this._location.isCurrentPathEqualTo('/scan-qr')) {
        document.querySelector('body')?.classList.remove('scanner-active');
      }

      // --- go back
      this.goToBack();
    });
  }

  async ngOnInit() {
    let userData: any = await Preferences.get({key: 'user'});
    if (!userData || !userData.value) {
      this.router.navigateByUrl('');
    } else {
      this.router.navigateByUrl('/home')
    }
  }

  // --- Navigate to back page
  goToBack() {
    this._location.back();
  }

  // --- Show app close confirmation dialog
  closeAppAlert: any;
  async showExitConfirm() {
    if (!this.closeAppAlert) {
      this.closeAppAlert = await this.alertController.create({
        header: 'Confirmation',
        message: 'Do you want to close the app?',
        backdropDismiss: false,
        buttons: [
          {
            text: 'Stay',
            role: 'cancel',
            handler: () => {
              this.closeAppAlert = null;
            },
          },
          {
            text: 'Exit',
            handler: () => {
              (navigator as any).app.exitApp();
            },
          },
        ],
      });
      this.closeAppAlert.present();
    }
  }
}
