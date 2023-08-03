import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';

export type NgcButtonType = 'default' | 'primary' | 'dangerous';

@Directive({
  selector: '[cmp-button]'
})
export class CmpButtonDirective {

  @Input() btnType: NgcButtonType = 'default';
  @Input() loading = false;

  constructor(private el: ElementRef, private renderer2: Renderer2) {
    this.renderer2.addClass(this.el.nativeElement, 'cmp-btn');
  }

  ngOnInit() {
    switch (this.btnType) {
      case 'primary':
        this.renderer2.addClass(this.el.nativeElement, 'cmp-btn-primary');
        break;
      case 'dangerous':
        this.renderer2.addClass(this.el.nativeElement, 'cmp-btn-dangerous');
        break;
      case 'default':
        break;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['loading'] && !changes['loading'].firstChange) {

      if (this.loading)
        this.renderer2.setProperty(this.el.nativeElement, 'disabled', true);
      else
        this.renderer2.setProperty(this.el.nativeElement, 'disabled', false);

      // if (this.ngcIcon) {
      //   if (this.loading) this.ngcIcon.setLoading();
      //   else this.ngcIcon.unsetLoading();
      // } else {
      //   if (this.loading) {
      //     if (this.loadingSpan) {
      //       this.renderer2.appendChild(this.el.nativeElement, this.loadingSpan);
      //     } else {
      //       const span = this.renderer2.createElement('span');
      //       this.renderer2.addClass(span, 'span-icon');
      //       this.renderer2.addClass(span, 'ngc-loading');
      //       span.innerHTML = this.loadingSvg
      //       this.loadingSpan = span;
      //       this.renderer2.appendChild(this.el.nativeElement, span);
      //     }
      //   } else {
      //     if (this.loadingSpan)
      //       this.renderer2.removeChild(this.el.nativeElement, this.loadingSpan);
      //   }
      // }
    }
  }

}
