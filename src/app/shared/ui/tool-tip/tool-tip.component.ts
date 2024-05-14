import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { TooltipTemplateDirective } from '../../directive/custom-template.directive';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-tool-tip',
  templateUrl: './tool-tip.component.html',
  styleUrls: ['./tool-tip.component.scss']
})
export class ToolTipComponent {
  @Input() data:any;
  theme: string = this.sharedService.getTheme();
  @Input() showTooltip: boolean[] = [];
    @Input()leftWidth: any;
    @Input()top: any;
dataId
  @ContentChild(TooltipTemplateDirective, { read: TemplateRef }) customToolTip: TemplateRef<any>;

  constructor(private sharedService:SharedService) { }
  ngOnInit(){



  }
  getLeft(){
    const leftWidth = this.leftWidth
    const theme=this.theme
    const top = this.top
    return {
      'margin-left': `${leftWidth}`,
      '--border-color': `${theme}`,
      'top':`${top}`,
    };
  }
}
