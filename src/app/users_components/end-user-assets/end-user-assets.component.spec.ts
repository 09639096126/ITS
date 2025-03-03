import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndUserAssetsComponent } from './end-user-assets.component';

describe('EndUserAssetsComponent', () => {
  let component: EndUserAssetsComponent;
  let fixture: ComponentFixture<EndUserAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EndUserAssetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndUserAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
