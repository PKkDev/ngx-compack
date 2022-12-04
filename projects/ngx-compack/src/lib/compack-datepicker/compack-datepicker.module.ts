import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// directive
import { DateMaskDirective } from './directive/date-mask.directive';
import { TimeMaskDirective } from './directive/time-mask.directive';
import { CompackDatePickerRangeHostDirective } from './compack-date-picker-range/compack-date-picker-range-host.directive';
// components
import { CompackDatePickerComponent } from './compack-date-picker/compack-date-picker.component';
import { CompackDatePickerRangeComponent } from './compack-date-picker-range/compack-date-picker-range.component';
import { CompackDatePickerHostDirective } from './compack-date-picker/compack-date-picker-host.directive';
import { CompackDatePickerService } from './compack-date-picker.service';
import { CompackDateFormatService } from './compack-date-format.service';
import { CalendarDayBuildService } from './calendar-day-build.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    DateMaskDirective,
    TimeMaskDirective,
    CompackDatePickerRangeHostDirective,
    CompackDatePickerHostDirective,
    CompackDatePickerComponent,
    CompackDatePickerRangeComponent
  ],
  exports: [
    DateMaskDirective,
    TimeMaskDirective,
    CompackDatePickerRangeHostDirective,
    CompackDatePickerHostDirective,
    CompackDatePickerComponent,
    CompackDatePickerRangeComponent
  ],
  providers: [CalendarDayBuildService, CompackDateFormatService, CompackDatePickerService]
})
export class CompackDatepickerModule { }
