import { Component } from '@angular/core';
import { SFCascaderWidgetSchema, SFSchema } from '@delon/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { of } from 'rxjs'
@Component({
  selector: 'form-cascader-simple',
  template: ` <sf [schema]="schema" (formSubmit)="submit($event)"></sf> `,
})
export class FormCascaderSimpleComponent {
  data = [
          {
            value: 110000,
            label: '北京',
            parent: 0,
            children: [
              {
                value: 110100,
                label: '北京市',
                parent: 110000,
                children: [
                  {
                    value: 110101,
                    label: '东城区',
                    parent: 110100,
                    isLeaf: true,
                  },
                  {
                    value: 110105,
                    label: '朝阳区',
                    parent: 110100,
                    isLeaf: true,
                  },
                ],
              },
            ],
          },
        ]

  getData(){
    console.log (of(this.data))
    return of(this.data)
  }
  
  schema: SFSchema = {
    properties: {
      static: {
        type: 'number',
        title: 'Static',
        enum: this.data,
        ui: 'cascader',
        default: [110000, 110100, 110105],
      },
      async: {
        type: 'number',
        title: 'RealTime',
        ui: {
          widget: 'cascader',
          // 数据源说明, 静态: 指一次性获取数据，数据来源于 asyncData、enum。
          // 如下语法模仿select组件
          asyncData: () => this.getData().toPromise()
        } as SFCascaderWidgetSchema,
        default: [110000, 110100, 110105],
      },
    },
  };

  constructor(private msg: NzMessageService) {}

  submit(value: {}): void {
    this.msg.success(JSON.stringify(value));
  }
}