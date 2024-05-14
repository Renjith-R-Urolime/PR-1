import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Table from "@editorjs/table";
import SimpleImage from '@editorjs/simple-image';
import ImageTool from '@editorjs/image';
import { ApiService } from 'src/app/shared/services/api.service';
@Component({
  selector: 'app-new-editor',
  templateUrl: './new-editor.component.html',
  styleUrls: ['./new-editor.component.scss'],
})
export class NewEditorComponent implements OnInit, AfterViewInit {
  @ViewChild('editor', { read: ElementRef, static: true }) editorElement: ElementRef;

  editor: EditorJS;

  constructor(private apiService: ApiService){}

  ngAfterViewInit() {
    this.editor = new EditorJS({
      autofocus: true,
      minHeight: 200,
      holder: this.editorElement.nativeElement,
      tools: {
        header: {
          class: Header,
          inlineToolbar: ['bold', 'italic']
        },
        table: Table,
        image: {
          class: ImageTool,
          config: {
            uploader: {
              uploadByFile(file) {
                console.log(file);
                this.apiService.post()
              }
            }
          }
        }
      }
    })
  }
  showData() {
    this.editor.save().then(data => {
      console.log(data);

    })
  }

  ngOnInit() { }
}
