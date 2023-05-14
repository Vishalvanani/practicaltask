import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQrPage implements OnInit {
  isScannerRunning: boolean = false;
  qrCodeB64: string = '';
  qrCodeStr: string = '';

  constructor(
    private commonService: CommonService,
    public cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  // --- Start QR code scanner
  async startScanner() {
    // Check camera permission
    let status = await BarcodeScanner.checkPermission({ force: true });

    document.querySelector('body')?.classList.add('scanner-active');

    document.body.style.background = 'transparent';

    // make background of WebView transparent
    await BarcodeScanner.hideBackground();

    this.isScannerRunning = true;
    await BarcodeScanner.startScanning(
      {
        targetedFormats: ['QR_CODE'],
      },
      async (result, err) => {
        await BarcodeScanner.stopScan();
        console.log('result: ', result);
        // if the result has content
        document.querySelector('body')?.classList.remove('scanner-active');
        this.isScannerRunning = false;
        if (result.hasContent) {
          this.qrCodeStr = result.content;
          this.qrCodeB64 = this.commonService.toQRCode(result.content, 350);
          this.cdr.detectChanges();
        }
      }
    );
  }

  // --- stop scanning when navigate from page
  async ngOnDestroy() {
    this.stopScan();
  }

  // --- Toggle torch control
  isTorchEnabled: boolean = false;
  async toggleTorch() {
    this.isTorchEnabled = !this.isTorchEnabled;
    if (this.isTorchEnabled) await BarcodeScanner.enableTorch();
    else await BarcodeScanner.disableTorch();
  }

  // --- stop scanner
  async stopScan() {
    document.querySelector('body')?.classList.remove('scanner-active');
    await BarcodeScanner.stopScan();
    this.isScannerRunning = false;
  }
}
