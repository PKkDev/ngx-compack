import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';

export enum TypeViewComponent {
  PickerRange = 0,
  Picker = 1,
  DateFormat = 2,
  Toast = 3,
  Banner = 4,
  Button = 5,
  SideBar = 6,
  CodeSnippet = 7,
  Alert = 8
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
  @ViewChild('btn') btn: TemplateRef<ElementRef> | undefined;
  @ViewChild('sideBar') sideBar: TemplateRef<ElementRef> | undefined;
  @ViewChild('snippet') snippet: TemplateRef<ElementRef> | undefined;
  @ViewChild('alert') alert: TemplateRef<ElementRef> | undefined;

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.viewComponent = TypeViewComponent.Button;
    this.loadTemplate(this.viewComponent);
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
      case TypeViewComponent.Button: this.selectedTemplate = this.btn ?? null; break;
      case TypeViewComponent.SideBar: this.selectedTemplate = this.sideBar ?? null; break;
      case TypeViewComponent.CodeSnippet: this.selectedTemplate = this.snippet ?? null; break;
      case TypeViewComponent.Alert: this.selectedTemplate = this.alert ?? null; break;
      default: this.selectedTemplate = this.picker ?? null; break;
    }

  }

}
