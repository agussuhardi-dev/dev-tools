import { Routes } from '@angular/router';
import { GeneratorsGeneratorsComponent } from './generators.component';
import { GeneratorsUuidComponent } from './uuid/uuid.component';

export const routes: Routes = [
  { path: 'generators', component: GeneratorsGeneratorsComponent },
  { path: 'uuid', component: GeneratorsUuidComponent },
];
