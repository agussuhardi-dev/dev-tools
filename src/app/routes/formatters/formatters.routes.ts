import { Routes } from '@angular/router';
import { FormattersJsonComponent } from './json/json.component';
import { FormattersFormattersComponent } from './formatters.component';
import { FormattersSqlComponent } from './sql/sql.component';
import { FormattersXmlComponent } from './xml/xml.component';

export const routes: Routes = [
  { path: 'formatters', component: FormattersFormattersComponent },
  { path: 'json', component: FormattersJsonComponent },
  { path: 'sql', component: FormattersSqlComponent },
  { path: 'xml', component: FormattersXmlComponent },
];
