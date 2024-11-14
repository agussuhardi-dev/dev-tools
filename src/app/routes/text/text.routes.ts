import { Routes } from '@angular/router';
import { TextTextComponent } from './text.component';
import { TextInspectorCaseConverterComponent } from './inspector-case-converter/inspector-case-converter.component';
import { TextRegexTesterComponent } from './regex-tester/regex-tester.component';
import { TextMarkdownPreviewComponent } from './markdown-preview/markdown-preview.component';
import { TextTextDiffComponent } from './text-diff/text-diff.component';

export const routes: Routes = [
  { path: 'text', component: TextTextComponent },
  { path: 'inspector-case-converter', component: TextInspectorCaseConverterComponent },
  { path: 'regex-tester', component: TextRegexTesterComponent },
  { path: 'markdown-preview', component: TextMarkdownPreviewComponent },
  { path: 'text-diff', component: TextTextDiffComponent },
];
