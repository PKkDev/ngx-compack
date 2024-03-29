import { AfterViewInit, Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { formatHtml } from './html-format-utils';

export type SnippetCodeType = 'html' | 'ts' | 'other';

export class CompackCodeSnippetModel {
  public type: SnippetCodeType;
  public title: string;
  public code: string;

  constructor(type: SnippetCodeType, title: string, code: string) {
    this.type = type;
    this.title = title;
    this.code = code;
  }
}

export class CompackCodeSnippetInnerModel {
  public type: SnippetCodeType;
  public id: number;
  public title: string;
  public code: string;
  public tabTemplate: any | undefined;
  public onClickEv: (() => void) | undefined;

  constructor(type: SnippetCodeType, id: number, title: string, code: string) {
    this.type = type;
    this.id = id;
    this.title = title;
    this.code = code;
    this.tabTemplate = undefined;
    this.onClickEv = undefined;
  }
}

@Directive({
  selector: '[codeSnippet]'
})
export class CodeSnippetDirective implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  @Input() snippets: CompackCodeSnippetModel[] = [];
  @Input() rowAttributes = 2;
  @Input() viewHeader = true;

  private innerSnippets: CompackCodeSnippetInnerModel[] = [];
  private nowCode: string | undefined = undefined;

  private preTemplate: any;
  private codeTemplate: any;
  private toolBarTemplate: any;
  private spanContainerTemplate: any;

  private lines: number | undefined;

  private onCopyClickEv: (() => void) | undefined;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef) { }

  ngOnInit() {
    this.snippets.map((value, index) => {
      this.innerSnippets.push(
        new CompackCodeSnippetInnerModel(
          value.type,
          index,
          value.title,
          this.formatText(value.type, value.code)))
    });
  }

  ngAfterViewInit() {
    this.viewTabs();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['snippets']) {
      if (!changes['snippets'].firstChange) {
        this.removeView();
        this.innerSnippets = [];
        this.snippets.map((value, index) => {
          this.innerSnippets.push(
            new CompackCodeSnippetInnerModel(
              value.type,
              index,
              value.title,
              this.formatText(value.type, value.code)))
        });
        this.viewTabs();
      }
    }
  }

  ngOnDestroy() {
    if (this.onCopyClickEv) this.onCopyClickEv();
    for (const snippet of this.innerSnippets)
      if (snippet.onClickEv) snippet.onClickEv();
  }

  private formatText(type: SnippetCodeType, code: string): string {
    switch (type) {
      case 'html':
        return formatHtml(code, this.rowAttributes)
      default:
        return code;
    }
  }

  private viewTabs() {
    this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid #e0e0e0');

    if (this.viewHeader) {
      this.createToolBar();
      this.createTabs();
      this.createCopyButton();
    }

    if (this.innerSnippets.length > 0) {
      if (this.viewHeader) {
        this.innerSnippets[0].tabTemplate.click();
      } else {
        this.createCodeBlockFromModel(this.innerSnippets[0]);
      }
    }
  }

  private removeView() {
    if (this.toolBarTemplate)
      this.renderer.removeChild(this.el.nativeElement, this.toolBarTemplate);
    if (this.preTemplate)
      this.renderer.removeChild(this.el.nativeElement, this.preTemplate);

    this.preTemplate = null;
    this.codeTemplate = null;
    this.toolBarTemplate = null;
    this.spanContainerTemplate = null;
  }

  private createToolBar() {
    this.toolBarTemplate = this.renderer.createElement('div');
    this.renderer.setStyle(this.toolBarTemplate, 'display', 'flex');
    this.renderer.setStyle(this.toolBarTemplate, 'justify-content', 'space-between');
    this.renderer.setStyle(this.toolBarTemplate, 'padding', '.4rem');
    this.renderer.setStyle(this.toolBarTemplate, 'border-bottom', '1px solid #e0e0e0');
    this.renderer.appendChild(this.el.nativeElement, this.toolBarTemplate);
  }
  private createTabs() {
    const tabs = this.renderer.createElement('div');
    this.renderer.appendChild(this.toolBarTemplate, tabs);

    for (const snippet of this.innerSnippets) {
      const button = this.renderer.createElement('button');
      this.renderer.setStyle(button, 'background-color', '#616161');
      this.renderer.setStyle(button, 'padding', '8px 15px');
      this.renderer.setStyle(button, 'margin', '0 5px');
      this.renderer.setStyle(button, 'border-radius', '2px');
      this.renderer.setStyle(button, 'font-size', '14px');
      this.renderer.setStyle(button, 'line-height', '.8');
      this.renderer.setStyle(button, 'font-weight', '500');
      this.renderer.setStyle(button, 'color', '#fff');
      // this.renderer.setStyle(button, 'box-shadow', '0 2px 5px 0 rgb(0 0 0 / 20%), 0 2px 10px 0 rgb(0 0 0 / 10%)');
      this.renderer.setStyle(button, 'box-shadow', '0 2px #00000004');
      this.renderer.setStyle(button, 'outline', 'none');
      this.renderer.setStyle(button, 'border', 'none');

      this.renderer.setStyle(button, 'cursor', 'pointer');
      snippet.onClickEv = this.renderer.listen(button, 'click', () => {
        for (const savedSnippet of this.innerSnippets) {
          if (savedSnippet.tabTemplate) {
            if (savedSnippet.id == snippet.id)
              this.renderer.setStyle(savedSnippet.tabTemplate, 'background-color', '#27ae60');
            else
              this.renderer.setStyle(savedSnippet.tabTemplate, 'background-color', '#616161');
          }
        }
        this.createCodeBlockFromModel(snippet);
      });
      snippet.tabTemplate = button;

      this.renderer.appendChild(button, this.renderer.createText(snippet.title));
      this.renderer.appendChild(tabs, button);
    }
  }
  private createCopyButton() {
    const copyButton = this.renderer.createElement('button');
    this.renderer.setStyle(copyButton, 'background-color', '#616161');
    this.renderer.setStyle(copyButton, 'padding', '8px 15px');
    this.renderer.setStyle(copyButton, 'margin', '0 5px');
    this.renderer.setStyle(copyButton, 'border-radius', '2px');
    this.renderer.setStyle(copyButton, 'font-size', '14px');
    this.renderer.setStyle(copyButton, 'line-height', '.8');
    this.renderer.setStyle(copyButton, 'font-weight', '500');
    this.renderer.setStyle(copyButton, 'color', '#fff');
    // this.renderer.setStyle(copyButton, 'box-shadow', '0 2px 5px 0 rgb(0 0 0 / 20%), 0 2px 10px 0 rgb(0 0 0 / 10%)');
    this.renderer.setStyle(copyButton, 'box-shadow', '0 2px #00000004');
    this.renderer.setStyle(copyButton, 'outline', 'none');
    this.renderer.setStyle(copyButton, 'border', 'none');
    this.renderer.setStyle(copyButton, 'cursor', 'pointer');
    this.renderer.appendChild(copyButton, this.renderer.createText('copy'));
    this.renderer.appendChild(this.toolBarTemplate, copyButton);

    if (this.onCopyClickEv) this.onCopyClickEv();
    this.onCopyClickEv = this.renderer.listen(copyButton, 'click', () => {
      if (this.nowCode)
        copyTextToClipboard(this.nowCode);
    });
  }

  private createCodeBlockFromModel(model: CompackCodeSnippetModel) {
    if (!this.preTemplate) this.cretePreBlok();

    if (this.codeTemplate) {
      this.renderer.removeChild(this.preTemplate, this.codeTemplate);
      this.codeTemplate = undefined;
    }
    this.creteCodeBlock();
    this.renderer.appendChild(this.codeTemplate, this.renderer.createText(model.code));
    this.nowCode = model.code;


    if (this.spanContainerTemplate) {
      this.renderer.removeChild(this.codeTemplate, this.spanContainerTemplate);
      this.spanContainerTemplate = undefined;
    }
    this.createSpanContainerTemplateBlock();
    this.createCodeLines();
  }
  private cretePreBlok() {
    this.preTemplate = this.renderer.createElement('pre');
    this.renderer.setStyle(this.preTemplate, 'max-height', '450px');
    this.renderer.setStyle(this.preTemplate, 'padding', '5px 0 5px 3.8em');
    this.renderer.setStyle(this.preTemplate, 'background', '#f5f2f0');
    this.renderer.setStyle(this.preTemplate, 'margin', '0');
    this.renderer.setStyle(this.preTemplate, 'overflow', 'auto');
    this.renderer.setStyle(this.preTemplate, 'font-family', 'inherit');
    this.renderer.appendChild(this.el.nativeElement, this.preTemplate);
  }
  private creteCodeBlock() {
    this.codeTemplate = this.renderer.createElement('code');
    this.renderer.setStyle(this.codeTemplate, 'line-height', '20px');
    this.renderer.setStyle(this.codeTemplate, 'position', 'relative');
    this.renderer.setStyle(this.codeTemplate, 'tab-size', '10px');
    this.renderer.setStyle(this.codeTemplate, 'font-family', 'inherit');
    this.renderer.appendChild(this.preTemplate, this.codeTemplate);
  }
  private createSpanContainerTemplateBlock() {
    this.spanContainerTemplate = this.renderer.createElement('span');
    this.renderer.setStyle(this.spanContainerTemplate, 'position', 'absolute');
    this.renderer.setStyle(this.spanContainerTemplate, 'pointer-events', 'none');
    this.renderer.setStyle(this.spanContainerTemplate, 'top', '0');
    this.renderer.setStyle(this.spanContainerTemplate, 'font-size', '100%');
    this.renderer.setStyle(this.spanContainerTemplate, 'left', '-3.8em');
    this.renderer.setStyle(this.spanContainerTemplate, 'width', '3em');
    this.renderer.setStyle(this.spanContainerTemplate, 'letter-spacing', '-1px');
    this.renderer.setStyle(this.spanContainerTemplate, 'border-right', '1px solid #999');
    this.renderer.setStyle(this.spanContainerTemplate, ' user-select', 'none');
    this.renderer.appendChild(this.codeTemplate, this.spanContainerTemplate);
  }
  private createCodeLines() {
    const divHeight = this.codeTemplate.offsetHeight
    const lineHeight = parseInt(this.codeTemplate.style.lineHeight);
    this.lines = divHeight / lineHeight;

    for (let index = 0; index < this.lines; index++) {
      const span = this.renderer.createElement('span');
      this.renderer.setStyle(span, 'display', 'block');
      this.renderer.setStyle(span, 'counter-increment', 'linenumber');
      this.renderer.setStyle(span, 'text-align', 'center');
      this.renderer.appendChild(span, this.renderer.createText(`${index + 1}`));

      this.renderer.appendChild(this.spanContainerTemplate, span);
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
    const successful = document.execCommand('copy');
    const msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.error('unable to copy', err);
  }

  document.body.removeChild(textArea);
}