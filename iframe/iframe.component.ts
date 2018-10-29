import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser"
import {RuntimeService} from '../../services/runtime.service';
import {GadgetInstanceService} from '../../grid/grid.service';
import {EndPointService} from '../../configuration/tab-endpoint/endpoint.service';
import {GadgetPropertyService} from '../_common/gadget-property.service';
import {GadgetBase} from '../_common/gadget-base';
import {OptionsService} from "../../configuration/tab-options/service";

@Component({
  //selector: 'app-iframe',
  templateUrl: './iframe.component.html',
 // styleUrls: ['./iframe.component.css']
  selector: 'app-dynamic-component',
  moduleId: module.id,
 // templateUrl: './view.html',
  styleUrls: ['../_common/styles-gadget.css']


})
export class IframeComponent extends GadgetBase implements OnInit {

  constructor(protected _runtimeService: RuntimeService,
    protected _gadgetInstanceService: GadgetInstanceService,
    protected _propertyService: GadgetPropertyService,
    protected _endPointService: EndPointService,
    protected _changeDetectionRef: ChangeDetectorRef,   
    protected _optionsService: OptionsService,
    private sanitizer: DomSanitizer) {
super(_runtimeService,
_gadgetInstanceService,
_propertyService,
_endPointService,
_changeDetectionRef,
_optionsService);

}





  ngOnInit() {

    this.showOperationControls = true;
  
  }

  destURL = "https://fr.wikipedia.org/wiki/Main_Page";
  getURL()
  {
    // cross-domain so we need to sanitize this.
    console.log("getURL=" + this.destURL)
    return(this.sanitizer.bypassSecurityTrustResourceUrl(this.destURL));
  }
     


  /* public clicky()
  {
    console.log("clicky")    
    this.dumpProps();
    this.stop();
  } */

  public preRun(): void {

   
    // get our configured URL
    console.log("in Prerun...")
    this.destURL = this.getPropFromPropertyPages('endpoint');
    console.log("in Prerun...foo =" + this.destURL);

     return; // don't ru
     /*
    this.dumpProps();
    this.updateData(null);
    this.run(); */
}

public run() {
    return;  // don't run 
    
   /* console.log("running iframe...");
    this.initializeRunState(true);
    this.updateData(null); */
}

public stop() {
    this.setStopState(false);
}

public updateData(data: any[]) {


}

public updateProperties(updatedProperties: any) {

    /**
     * todo
     *  A similar operation exists on the procmman-config-service
     *  whenever the property page form is saved, the in memory board model
     *  is updated as well as the gadget instance properties
     *  which is what the code below does. This can be eliminated with code added to the
     *  config service or the property page service.
     *
     * **/

     console.log ("update props");
     // this.dumpProps();

    const updatedPropsObject = JSON.parse(updatedProperties);

    this.propertyPages.forEach(function (propertyPage) {


        for (let x = 0; x < propertyPage.properties.length; x++) {

            for (const prop in updatedPropsObject) {
                if (updatedPropsObject.hasOwnProperty(prop)) {
                    if (prop === propertyPage.properties[x].key) {
                        propertyPage.properties[x].value = updatedPropsObject[prop];
                    }

                }
            }
        }
    });

    this.title = updatedPropsObject.title;
    this.setEndPoint(updatedPropsObject.endpoint);
    this.updateData(null);
}

}
