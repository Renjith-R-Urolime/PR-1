import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation, forwardRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';
import { SharedService } from '../../services/shared.service';
declare const tinymce: any;
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorComponent),
      multi: true,
    },
  ],
})
export class EditorComponent {
  // @Input() fieldData:any;
  fieldValue:string='';
  htmlContent = '';
  // dataModel : string | number | GLfloat;
  inputValue: string | number | GLfloat;
  private inputValueSubject: Subject<string> = new Subject<string>();

  theme: string = this.sharedService.getTheme();
  tinyeditor:any = {
   // menubar: 'file edit view insert format tools table help',
    menubar: false,
      branding: false,
      plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap emoticons quickbars',
      toolbar:
      'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |table |  numlist bullist | forecolor backcolor | fullscreen  preview | insertfile image media link code',
      file_picker_callback: function(cb) {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.onchange = function() {
          const file = input.files[0];
          const reader = new FileReader();
          reader.onload = function() {
            const id = "blobid" + new Date().getTime();
            const blobCache = tinymce.activeEditor.editorUpload.blobCache;
            const base64 = (<string>reader.result).split(",")[1];
            const blobInfo = blobCache.create(id, file, base64);
            blobCache.add(blobInfo);
            cb(blobInfo.blobUri());
          };
          reader.readAsDataURL(file);
        };

        input.click();
      },
      toolbar_mode: 'sliding'

  }
  constructor(private sharedService:SharedService){
    this.inputValueSubject.pipe(debounceTime(300)).subscribe(value => {
      this.logValueAndEmit(value);
    });

  }

  // config: AngularEditorConfig = {
  //   editable: true,
  //   spellcheck: true,
  //   height: '12rem',
  //   minHeight: '5rem',
  //   placeholder: 'Enter text here...',
  //   translate: 'no',
  //   defaultParagraphSeparator: 'p',
  //   defaultFontName: 'Arial',
  //    toolbarHiddenButtons: [
  //     ['indent',
  //     'outdent',],
  //     [ 'customClasses',
  //     'link',
  //     'unlink','insertVideo',
  //     'insertHorizontalRule',
  //     'removeFormat',
  //     ]
  //     ],
  //   customClasses: [
  //     {
  //       name: "quote",
  //       class: "quote",
  //     },
  //     {
  //       name: 'redText',
  //       class: 'redText'
  //     },
  //     {
  //       name: "titleText",
  //       class: "titleText",
  //       tag: "h1",
  //     },
  //   ],

  // };
  editorStyle={
    //height:'200px',
    backgroundColor:'white'
  }

  form = new FormGroup({
    editorContent: new FormControl(
      // { value: jsonDoc, disabled: false },
      // Validators.required()
    ),
  });

  get doc(): AbstractControl {
    return this.form.get('editorContent');
  }
  @Output() inputValueChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() inputBlurChange: EventEmitter<any> = new EventEmitter<any>();

  writeValue(value: any): void {

      this.inputValue = value;


  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  onChange(value: any): void {
    this.inputValue = value;


  }
  onTouched(): void {
    // You can add custom touch behavior here if needed.
  }
  logValueAndEmit(event): void {
    // const textContent = this.extractTextFromHtml(event);

    let text;
    let value = event;

    text = value;

    this.onChange(text);
    this.inputBlurChange.emit(text); // Emit the value to the parent component
    this.inputValueChange.emit(text); // Emit the value specifically for the parent component

  }



  // logValueWhileTyping(value: string): void {
  //   const textContent = this.extractTextFromHtml(value);
  //
  // }

  // extractTextFromHtml(html: string): string {
  //   const doc = new DOMParser().parseFromString(html, 'text/html');
  //   return doc.body.textContent || "";
  // }

  logValueWhileTypingDebounced(value: string): void {
    this.inputValueSubject.next(value);
  }


}

