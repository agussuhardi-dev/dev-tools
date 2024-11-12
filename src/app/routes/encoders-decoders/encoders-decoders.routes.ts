import { Routes } from '@angular/router';
import { EncodersDecodersEncodersDecodersComponent } from './encoders-decoders.component';
import { EncodersDecodersCertificateComponent } from './certificate/certificate.component';
import { EncodersDecodersHtmlComponent } from './html/html.component';
import { EncodersDecodersUrlComponent } from './url/url.component';
import { EncodersDecodersBase64TextComponent } from './base64-text/base64-text.component';
import { EncodersDecodersGzipComponent } from './gzip/gzip.component';
import { EncodersDecodersJwtComponent } from './jwt/jwt.component';

export const routes: Routes = [
  { path: 'encoders-decoders', component: EncodersDecodersEncodersDecodersComponent },
  { path: 'certificate', component: EncodersDecodersCertificateComponent },
  { path: 'html', component: EncodersDecodersHtmlComponent },
  { path: 'url', component: EncodersDecodersUrlComponent },
  { path: 'base64-text', component: EncodersDecodersBase64TextComponent },
  { path: 'gzip', component: EncodersDecodersGzipComponent },
  { path: 'jwt', component: EncodersDecodersJwtComponent },
];
