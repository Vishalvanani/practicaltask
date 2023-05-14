import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
declare var QRious: any

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController) {}

  // --- Generate random string with given length
  generateRandomString(length: number): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  // --- generate qr code
  toQRCode(code: string, size: number): string {
    // set QR code
    var qr = new QRious({
      value: code,
      size: size,
    });

    var qrBase64 = qr.toDataURL();

    return qrBase64;
  }

  // --- Present alert
  alert: any;
  presentAlert(msg: any, title?: any, buttons?: any, cssClass?: any) {
    return new Promise(async (resolve, reject) => {
      this.alert = await this.alertCtrl.create({
        header: title ? title : 'Alert',
        message: msg,
        backdropDismiss: false,
        buttons: buttons
          ? buttons
          : [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  resolve('');
                },
              },
            ],
      });
      this.alert.present();
      return alert;
    });
  }

  /**
   * helper function to ask confirmation
   * @returns Promise of type boolean, resolves with true if positive button clicked, false otherwise
   */
  confirm(
    msg = "Are you sure?",
    title = "Confirmation",
    positiveBtnText = "Yes",
    negativeBtnText = "No",
    cssClass?: string,
    positiveBtnHandler?: Function,
    negativeBtnHandler?: Function
  ): Promise<boolean> {
    return new Promise((resolve) => {
      this.presentAlert(
        msg,
        title,
        [
          {
            text: negativeBtnText,
            handler: () => {
              if (negativeBtnHandler) return negativeBtnHandler();
              else return resolve(false);
            },
            role: "cancel",
          },
          {
            text: positiveBtnText,
            handler: () => {
              if (positiveBtnHandler) return positiveBtnHandler();
              else return resolve(true);
            },
          },
        ],
        cssClass
      );
    });
  }

  // --- show error message on toast
  async errorMessage(msg: string, duration?: number) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: duration ? duration : 2000,
      animated: true,
      cssClass: 'text-center',
      color: 'danger'
    });
    toast.present();
  }
}
