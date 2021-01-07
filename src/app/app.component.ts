import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalSettingsService } from './sharedServices/LocalSettingsService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  userLang:string;
  constructor(
    public translate: TranslateService,private localSettings:LocalSettingsService
  ) {
    translate.addLangs(['en', 'nl']);
    translate.setDefaultLang('en');
    
    // try to get saved language
    var storedLang: string = localSettings.getLanguage();
       if (storedLang !== ""){
          this.userLang = storedLang;
          translate.use(this.userLang);
       }

  }
}

