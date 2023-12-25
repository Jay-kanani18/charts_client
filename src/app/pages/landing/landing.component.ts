import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
export interface StepType {
  label: string;
  fields: FormlyFieldConfig[];
}
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  activedStep = 0;

  model = {};
  steps: StepType[] = [
    {
      label: 'Personal data',
      fields: [
        {
          key: 'firstname',
          type: 'input',
          defaultValue: 'This is a default value',
          templateOptions: {
            label: 'First name',
            required: true,
          },
        },
        {
          key: 'age',
          type: 'input',
          templateOptions: {
            type: 'number',
            label: 'Age',
            required: true,
          },
        },
      ],
    },
    {
      label: 'Destination',
      fields: [
        {
          key: 'country',
          type: 'input',
          templateOptions: {
            label: 'Country',
            required: true,
          },
        },
      ],
    },
    {
      label: 'Day of the trip',
      fields: [
        {
          key: 'day',
          type: 'input',
          templateOptions: {
            type: 'date',
            label: 'Day of the trip',
            required: true,
          },
        },
      ],
    },
  ];

  form:any = new FormArray(this.steps.map(() => new FormGroup({})));
  options:any = this.steps.map(() => <any> {});

  prevStep(step
    :any) {
    this.activedStep = step - 1;
  }

  nextStep(step:any) {
    this.activedStep = step + 1;
  }

  submit() {
    alert(JSON.stringify(this.model));
  }
}
