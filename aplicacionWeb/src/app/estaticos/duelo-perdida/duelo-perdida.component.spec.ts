import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DueloPerdidaComponent } from './duelo-perdida.component';

describe('DueloPerdidaComponent', () => {
  let component: DueloPerdidaComponent;
  let fixture: ComponentFixture<DueloPerdidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DueloPerdidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DueloPerdidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
