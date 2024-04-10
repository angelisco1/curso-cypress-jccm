import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaDeContadorComponent } from './carta-de-contador.component';

describe('CartaDeContadorComponent', () => {
  let component: CartaDeContadorComponent;
  let fixture: ComponentFixture<CartaDeContadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartaDeContadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartaDeContadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
