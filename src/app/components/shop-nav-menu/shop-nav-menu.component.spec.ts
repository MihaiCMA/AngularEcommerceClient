import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopNavMenuComponent } from './shop-nav-menu.component';

describe('ShopNavMenuComponent', () => {
  let component: ShopNavMenuComponent;
  let fixture: ComponentFixture<ShopNavMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopNavMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopNavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
