import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompackToastComponent } from './compack-toast.component';
import { CompackToastMergeService } from './compack-toast-merge.service';
import { ChangeDetectorRef } from '@angular/core';


describe('TestLibComponent', () => {
  let component: CompackToastComponent;
  let fixture: ComponentFixture<CompackToastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompackToastComponent],
      providers: [ChangeDetectorRef, CompackToastMergeService]
    });
    fixture = TestBed.createComponent(CompackToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
