import { NgIf, NgFor } from "@angular/common";
import { Component, OnChanges, Input, SimpleChanges, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { ConsentProvision } from "fhir/r5";

import { BaseComponent } from "../base/base.component";
import { ConsentCategorySettings } from "@asushares/core";
import { ProvisionCentricComponent } from "../provision/provision-centric.component";
import { v4 as uuidv4 } from 'uuid';
import { SettingsService } from "../settings/settings.service";

@Component({
    selector: 'category-selector',
    templateUrl: './category-selector.component.html',
    styleUrl: './category-selector.component.scss',
    standalone: true,
    imports: [NgIf, FormsModule, NgFor]
})
export class CategorySelectorComponent extends ProvisionCentricComponent implements OnInit, OnChanges {

    // @Input() provision: ConsentProvision | null = null;


    // sharingSettings: { [key: string]: ConsentCategorySettings } | null = null;// this.loadSharingSettingsFromProvision();
    randomId = uuidv4().substring(0, 4);

    constructor(protected settingsService: SettingsService) {
        super();
        console.log('CategorySelectorComponent constructor', this.provision);
    }
    ngOnInit(): void {
        console.log('CategorySelectorComponent ngOnInit', this.provision);
        // this.sharingSettings = this.loadSharingSettingsFromProvision();
        this.loadSharingSettingsFromProvision();
    }

    settings() { return this.settingsService; }

    ngOnChanges(changes: SimpleChanges) {
        this.loadSharingSettingsFromProvision();
    }

    updateCategorySetting() {
        if (this.categorySettings && this.provision) {
            this.categorySettings.updateConsentProvision(this.provision);
        }
    }

    loadSharingSettingsFromProvision() {
        if (this.provision) {
          console.log("Loading category settings from provision id: ", this.provision.id);
          const tmp = new ConsentCategorySettings();
          tmp.loadCategoriesFromConsentProvision(this.provision);
          this.categorySettings = tmp;
        } else {
          console.warn("PROVISION WAS NULL WHEN LOADING SHARING SETTINGS!");
        }
      }
}