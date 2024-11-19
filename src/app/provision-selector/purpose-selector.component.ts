// Author: Preston Lee

import { NgIf, NgFor } from "@angular/common";
import { Component, OnChanges, Input, SimpleChanges, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { ConsentCategorySettings } from "@asushares/core";
import { ProvisionCentricComponent } from "../provision/provision-centric.component";
import { v4 as uuidv4 } from 'uuid';
import { SettingsService } from "../settings/settings.service";

@Component({
    selector: 'purpose-selector',
    templateUrl: './purpose-selector.component.html',
    styleUrl: './purpose-selector.component.scss',
    standalone: true,
    imports: [NgIf, FormsModule, NgFor]
})
export class PurposeSelectorComponent extends ProvisionCentricComponent implements OnInit {

    randomId = uuidv4().substring(0, 4);

    constructor(protected settingsService: SettingsService) {
        super();
        console.log('PurposeSelectorComponent constructor', this.provision);
    }

    settings() { return this.settingsService; }

    ngOnInit(): void {
        console.log('PurposeSelectorComponent ngOnInit', this.provision);
        this.loadSharingSettingsFromProvision();
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log('CHANGES: ', changes['provision']);
        this.loadSharingSettingsFromProvision();
    }

    updateCategorySetting() {
        if (this.categorySettings && this.provision) {
            this.categorySettings.updateConsentProvision(this.provision);
        }
    }

    updatePurposeSetting() {
        if (this.categorySettings && this.provision) {
            this.categorySettings.updateConsentProvision(this.provision);
        }
    }
    loadSharingSettingsFromProvision() {
        if (this.provision) {
          console.log("Loading purpose settings from provision id: ", this.provision.id);
          const tmp = new ConsentCategorySettings();
          tmp.loadPurposesFromConsentProvision(this.provision);
          this.categorySettings = tmp;
        } else {
          console.warn("PROVISION WAS NULL WHEN LOADING SHARING SETTINGS!");
        }
      }

}