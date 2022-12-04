import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[codeSnippet]'
})
export class CodeSnippetDirective implements OnInit, AfterViewInit, OnDestroy {

  @Input() code: string = '';
  @Input() language: string | undefined = undefined;

  private preTemplate: any;
  private codeTemplate: any;
  private toolBarTemplate: any;

  private lines: number;

  private onClickEv: (() => void) | undefined;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef) { }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.onClickEv) this.onClickEv();
  }

  ngAfterViewInit() {
    this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid #e0e0e0');
    this.createToolBar();
    this.createTabs();
    this.createCopyButton();
    this.createCodeBlock();
  }

  private createToolBar() {
    this.toolBarTemplate = this.renderer.createElement('div');
    this.renderer.setStyle(this.toolBarTemplate, 'display', 'flex');
    this.renderer.setStyle(this.toolBarTemplate, 'justify-content', 'space-between');
    this.renderer.setStyle(this.toolBarTemplate, 'padding', '.6rem');
    this.renderer.setStyle(this.toolBarTemplate, 'border-bottom', '1px solid #e0e0e0');
    this.renderer.appendChild(this.el.nativeElement, this.toolBarTemplate);
  }
  private createTabs() {
    const tabs = this.renderer.createElement('div');
    this.renderer.appendChild(this.toolBarTemplate, tabs);

    if (this.language) {
      const button = this.renderer.createElement('button');
      this.renderer.setStyle(button, 'background-color', '#616161');
      this.renderer.setStyle(button, 'padding', '10px 20px');
      this.renderer.setStyle(button, 'margin', '0 5px');
      this.renderer.setStyle(button, 'border-radius', '0.25rem');
      this.renderer.setStyle(button, 'font-size', '12px');
      this.renderer.setStyle(button, 'line-height', '.8');
      this.renderer.setStyle(button, 'font-weight', '500');
      this.renderer.setStyle(button, 'color', '#fff');
      this.renderer.setStyle(button, 'box-shadow', '0 2px 5px 0 rgb(0 0 0 / 20%), 0 2px 10px 0 rgb(0 0 0 / 10%)');
      this.renderer.setStyle(button, 'outline', 'none');
      this.renderer.setStyle(button, 'border', 'none');
      this.renderer.appendChild(button, this.renderer.createText(this.language.toUpperCase()));
      this.renderer.appendChild(tabs, button);
    }
  }
  private createCopyButton() {
    const copyButton = this.renderer.createElement('button');
    this.renderer.setStyle(copyButton, 'background-color', '#616161');
    this.renderer.setStyle(copyButton, 'padding', '10px 20px');
    this.renderer.setStyle(copyButton, 'margin', '0 5px');
    this.renderer.setStyle(copyButton, 'border-radius', '0.25rem');
    this.renderer.setStyle(copyButton, 'font-size', '12px');
    this.renderer.setStyle(copyButton, 'line-height', '.8');
    this.renderer.setStyle(copyButton, 'font-weight', '500');
    this.renderer.setStyle(copyButton, 'color', '#fff');
    this.renderer.setStyle(copyButton, 'box-shadow', '0 2px 5px 0 rgb(0 0 0 / 20%), 0 2px 10px 0 rgb(0 0 0 / 10%)');
    this.renderer.setStyle(copyButton, 'outline', 'none');
    this.renderer.setStyle(copyButton, 'border', 'none');
    this.renderer.setStyle(copyButton, 'cursor', 'pointer');
    this.renderer.appendChild(copyButton, this.renderer.createText('copy'));
    this.renderer.appendChild(this.toolBarTemplate, copyButton);

    if (this.onClickEv) this.onClickEv();
    this.onClickEv = this.renderer.listen(copyButton, 'click', (event) => {
      copyTextToClipboard(this.code);
    });
  }

  private createCodeBlock() {
    this.codeTemplate = this.renderer.createElement('code');
    this.renderer.appendChild(this.codeTemplate, this.renderer.createText(this.code));
    this.renderer.setStyle(this.codeTemplate, 'line-height', '20px');
    this.renderer.setStyle(this.codeTemplate, 'position', 'relative');

    const spanContainer = this.renderer.createElement('span');
    this.renderer.setStyle(spanContainer, 'position', 'absolute');
    this.renderer.setStyle(spanContainer, 'pointer-events', 'none');
    this.renderer.setStyle(spanContainer, 'top', '0');
    this.renderer.setStyle(spanContainer, 'font-size', '100%');
    this.renderer.setStyle(spanContainer, 'left', '-3.8em');
    this.renderer.setStyle(spanContainer, 'width', '3em');
    this.renderer.setStyle(spanContainer, 'letter-spacing', '-1px');
    this.renderer.setStyle(spanContainer, 'border-right', '1px solid #999');
    this.renderer.setStyle(spanContainer, ' user-select', 'none');
    this.renderer.appendChild(this.codeTemplate, spanContainer);

    this.preTemplate = this.renderer.createElement('pre');
    this.renderer.setStyle(this.preTemplate, 'max-height', '450px');
    this.renderer.setStyle(this.preTemplate, 'padding', '5px 0 5px 3.8em');
    this.renderer.setStyle(this.preTemplate, 'background', '#f5f2f0');
    this.renderer.setStyle(this.preTemplate, 'margin', '0');
    this.renderer.setStyle(this.preTemplate, 'overflow', 'auto');
    this.renderer.appendChild(this.preTemplate, this.codeTemplate);

    this.renderer.appendChild(this.el.nativeElement, this.preTemplate);

    var divHeight = this.codeTemplate.offsetHeight
    var lineHeight = parseInt(this.codeTemplate.style.lineHeight);
    this.lines = divHeight / lineHeight;

    for (let index = 0; index < this.lines; index++) {
      const span = this.renderer.createElement('span');
      this.renderer.setStyle(span, 'display', 'block');
      this.renderer.setStyle(span, 'counter-increment', 'linenumber');
      this.renderer.setStyle(span, 'text-align', 'center');
      this.renderer.appendChild(span, this.renderer.createText(`${index + 1}`));

      this.renderer.appendChild(spanContainer, span);
    }
  }

}

export function copyTextToClipboard(text: string) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function () {
    console.log('Async: Copying to clipboard was successful!');
  }, function (err) {
    console.error('Async: Could not copy text: ', err);
  });
}
export function fallbackCopyTextToClipboard(text: string) {
  const textArea: any = document.createElement("textarea");
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = 0;
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';

  textArea.value = text;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }

  document.body.removeChild(textArea);
}