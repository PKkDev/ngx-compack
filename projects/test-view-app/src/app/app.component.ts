import { ChangeDetectorRef, Component, EventEmitter, TemplateRef, ViewChild } from '@angular/core';

export enum TypeViewComponent {
  PickerRange = 0,
  Picker = 1,
  DateFormat = 2,
  Toast = 3,
  Banner = 4
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public viewComponent = TypeViewComponent.Picker;
  selectedTemplate: TemplateRef<any> | null = null;
  @ViewChild('pickerRange') pickerRange: TemplateRef<any> | undefined;
  @ViewChild('picker') picker: TemplateRef<any> | undefined;
  @ViewChild('toast') toast: TemplateRef<any> | undefined;
  @ViewChild('banner') banner: TemplateRef<any> | undefined;
  @ViewChild('dateFormat') dateFormat: TemplateRef<any> | undefined;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    // setTimeout(() => this.cbs.viewBanner(TypeMessage.Info, TypePositionMessage.TopRight, 'asdas'), 0)
  }

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
    this.cdr.detectChanges();
  }







}
