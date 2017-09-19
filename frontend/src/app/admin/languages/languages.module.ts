import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { LanguagesRoutingModule } from './languages-routing.module';
import { LanguagesComponent } from './languages.component';
import { LanguagesService } from './languages.service';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { CreateOrUpdateComponent } from './create-or-update/create-or-update.component';
import { ResourcesComponent } from './resources/resources.component';
import { USERS_GUARD_PROVIDERS } from './guards';
import { LanguageResourcesDialogComponent } from './resources/resources-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    LanguagesRoutingModule
  ],
  declarations: [
    LanguagesComponent,
    CreateComponent,
    EditComponent,
    CreateOrUpdateComponent,
    LanguageResourcesDialogComponent,
    ResourcesComponent
  ],
  providers: [
    LanguagesService,
    USERS_GUARD_PROVIDERS
  ],
  entryComponents: [
    LanguageResourcesDialogComponent,
  ]
})
export class LanguagesModule { }
