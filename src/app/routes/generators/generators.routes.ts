import { Routes } from '@angular/router';
import { GeneratorsGeneratorsComponent } from './generators.component';
import { GeneratorsUuidComponent } from './uuid/uuid.component';
import { GeneratorsPasswordGeneratorComponent } from './password-generator/password-generator.component';
import { GeneratorsLoremIpsumComponent } from './lorem-ipsum/lorem-ipsum.component';

export const routes: Routes = [
  { path: 'generators', component: GeneratorsGeneratorsComponent },
  { path: 'uuid', component: GeneratorsUuidComponent },
  { path: 'password-generator', component: GeneratorsPasswordGeneratorComponent },
  { path: 'lorem-ipsum', component: GeneratorsLoremIpsumComponent },
];
