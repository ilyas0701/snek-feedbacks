import {RouterModule} from '@angular/router';
import { MainComponent } from './main/main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

export const commonModuleImports: ReadonlyArray<any> = [
  RouterModule,
  ReactiveFormsModule,
  HttpClientModule
];

export const commonComponentImports: ReadonlyArray<any> = [
    MainComponent
];

export const commonImports: ReadonlyArray<any> = [
  ...commonModuleImports,
  ...commonComponentImports
]