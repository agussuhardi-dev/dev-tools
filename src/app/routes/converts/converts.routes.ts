import { Routes } from '@angular/router';
import { ConvertsConvertsComponent } from './converts.component';
import { ConvertsJsonYamlComponent } from './json-yaml/json-yaml.component';
import { ConvertsTimestampComponent } from './timestamp/timestamp.component';
import { ConvertsNumberBaseComponent } from './number-base/number-base.component';
import { ConvertsCronParserComponent } from './cron-parser/cron-parser.component';

export const routes: Routes = [
  { path: '', component: ConvertsConvertsComponent },
  {
    path: 'json-yaml',
    component: ConvertsJsonYamlComponent,
  },
  { path: 'timestamp', component: ConvertsTimestampComponent },
  {
    path: 'number-base',
    component: ConvertsNumberBaseComponent,
  },
  { path: 'cron-parser', component: ConvertsCronParserComponent },
];
