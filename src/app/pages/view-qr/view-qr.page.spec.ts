import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewQRPage } from './view-qr.page';

describe('ViewQRPage', () => {
  let component: ViewQRPage;
  let fixture: ComponentFixture<ViewQRPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewQRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
