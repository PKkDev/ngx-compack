import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompackDatePickerComponent } from './compack-date-picker/compack-date-picker.component';
import { DisplayDatePipe } from './pipe/display-date.pipe';
import { DisplayPeriodDatePipe } from './pipe/display-period-date.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    DisplayPeriodDatePipe,
    DisplayDatePipe,
    CompackDatePickerComponent
  ],
  exports: [
    CompackDatePickerComponent
  ]
})
export class CompackDatepickerModule { }
