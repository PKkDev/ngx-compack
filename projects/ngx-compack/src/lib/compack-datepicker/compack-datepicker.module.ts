import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompackDatePickerComponent } from './compack-date-picker/compack-date-picker.component';
import { DisplayDatePipe } from './pipe/display-date.pipe';
import { DisplayPeriodDatePipe } from './pipe/display-period-date.pipe';
import { FormsModule } from '@angular/forms';
import { TimeMaskDirective } from './directive/time-mask.directive';
import { DateMaskDirective } from './directive/date-mask.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    DateMaskDirective,
    TimeMaskDirective,
    DisplayPeriodDatePipe,
    DisplayDatePipe,
    CompackDatePickerComponent
  ],
  exports: [
    DateMaskDirective,
    TimeMaskDirective,
    DisplayPeriodDatePipe,
    DisplayDatePipe,
    CompackDatePickerComponent
  ]
})
export class CompackDatepickerModule { }
