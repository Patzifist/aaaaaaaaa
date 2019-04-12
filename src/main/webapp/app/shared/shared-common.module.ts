import { NgModule } from '@angular/core';

import { AaaaaaaaaaaaSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [AaaaaaaaaaaaSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [AaaaaaaaaaaaSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class AaaaaaaaaaaaSharedCommonModule {}
