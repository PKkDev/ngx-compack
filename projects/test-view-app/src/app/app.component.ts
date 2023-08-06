import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';

export enum TypeViewComponent {
  PickerRange = 0,
  Picker = 1,
  DateFormat = 2,
  Toast = 3,
  Banner = 4,
  Button = 5,
  SideBar = 6,
  CodeSnippet = 7
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  public viewComponent = TypeViewComponent.Picker;
  selectedTemplate: TemplateRef<ElementRef> | null = null;
  @ViewChild('pickerRange') pickerRange: TemplateRef<ElementRef> | undefined;
  @ViewChild('picker') picker: TemplateRef<ElementRef> | undefined;
  @ViewChild('toast') toast: TemplateRef<ElementRef> | undefined;
  @ViewChild('banner') banner: TemplateRef<ElementRef> | undefined;
  @ViewChild('dateFormat') dateFormat: TemplateRef<ElementRef> | undefined;

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.viewComponent = TypeViewComponent.Picker;
    this.selectedTemplate = this.picker ?? null;
    this.cdr.detectChanges();
  }

  public loadTemplate(newView: TypeViewComponent) {
    this.viewComponent = newView;
    switch (newView) {
      case TypeViewComponent.PickerRange: this.selectedTemplate = this.pickerRange ?? null; break;
      case TypeViewComponent.Picker: this.selectedTemplate = this.picker ?? null; break;
      case TypeViewComponent.DateFormat: this.selectedTemplate = this.dateFormat ?? null; break;
      case TypeViewComponent.Toast: this.selectedTemplate = this.toast ?? null; break;
      case TypeViewComponent.Banner: this.selectedTemplate = this.banner ?? null; break;
      default: this.selectedTemplate = this.picker ?? null; break;
    }

    // private cm: CompackSideBarService
    // this.cm.openSideBar(
    //   DisplayBComponent,
    //   {
    //     title: 'sds',
    //     dialogWidth: '500px',
    //     viewCloseBtn: true
    //   },
    //   {
    //     test: 'dasd'
    //   })

  }

}
