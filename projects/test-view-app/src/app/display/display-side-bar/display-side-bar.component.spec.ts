import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySideBarComponent } from './display-side-bar.component';
import { CmpButtonDirective, CompackCardComponent, CompackSideBarService } from 'ngx-compack';
import { CodeSnippetDirective } from '../../code-snippet.directive';
import { FormsModule } from '@angular/forms';

describe('DisplaySideBarComponent', () => {
  let component: DisplaySideBarComponent;
  let fixture: ComponentFixture<DisplaySideBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplaySideBarComponent, CompackCardComponent, CmpButtonDirective, CodeSnippetDirective],
      providers: [CompackSideBarService],
      imports: [FormsModule]
    });
    fixture = TestBed.createComponent(DisplaySideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
