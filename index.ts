/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

let map: google.maps.Map;

const montreal = { lat: 45.473, lng: -73.572 };
const chicago = { lat: 41.85, lng: -87.65 };
const nyc = { lat: 40.7128, lng: -74.0060 };

function createFastTravelMTL(map) {
    //function which describes a custom control, which takes a map element , so it can work with it, later called during initialization of the map
    const controlButton = document.createElement("button");
    //CSS for control
    controlButton.style.backgroundColor = "#FF9999";
    controlButton.style.border = "2px solid #000";
    controlButton.style.borderRadius = "6px";
    controlButton.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlButton.style.color =  "rgb(0,0,0)";
    controlButton.style.cursor = "pointer";
    controlButton.style.fontFamily = "Roboto,Arial,sans-serif";
    controlButton.style.fontSize = "16px";
    controlButton.style.lineHeight = "38px";
    controlButton.style.margin = "8px 0 22px";
    controlButton.style.padding = "0 5px";
    controlButton.style.textAlign = "center";
    controlButton.ariaLabel = "MTL fast travel";

    controlButton.textContent = "MTL";
    controlButton.title = "Click to go to MTL";
    controlButton.type = "button";
   
    controlButton.addEventListener("click", () => {
        map.setCenter(montreal);
        map.setzoom(12.5);
    });

    return controlButton;
}
function createFastTravelNYC(map) {
    //function which describes a custom control, which takes a map element , so it can work with it, later called during initialization of the map
    const nycFAST = document.createElement("button");
    //CSS for control
    nycFAST.style.backgroundColor = "#00FFFF";
    nycFAST.style.border = "2px solid #000";
    nycFAST.style.borderRadius = "6px";
    nycFAST.style.boxShadow = "0 3px 8px rgba(0,0,0,.3)";
    nycFAST.style.color = "rgb(0,0,0)";
    nycFAST.style.cursor = "pointer";
    nycFAST.style.fontFamily = "Roboto,Arial,bold";
    nycFAST.style.fontSize = "16px";
    nycFAST.style.lineHeight = "38px";
    nycFAST.style.margin = "8px 0 22px";
    nycFAST.style.padding = "0 5px";
    nycFAST.style.textAlign = "center";
    nycFAST.ariaLabel = "NYC fast travel";
    
    nycFAST.textContent = "NYC";
    nycFAST.title = "Click to go to NYC";
    nycFAST.type = "button";

    nycFAST.addEventListener("click", () => {
        map.setCenter(nyc);
        map.setzoom(12.5);
    });

    return nycFAST;
}

function createFastTravelCHI(map) {
    //function which describes a custom control, which takes a map element , so it can work with it, later called during initialization of the map
    const chiFAST = document.createElement("button");
    //CSS for control
    chiFAST.style.backgroundColor = "#66FF66";
    chiFAST.style.border = "2px solid #000";
    chiFAST.style.borderRadius = "6px";
    chiFAST.style.boxShadow = "0 3px 8px rgba(0,0,0,.3)";
    chiFAST.style.color = "rgb(0,0,0)";
    chiFAST.style.cursor = "pointer";
    chiFAST.style.fontFamily = "Roboto,Arial,bold";
    chiFAST.style.fontSize = "16px";
    chiFAST.style.lineHeight = "38px";
    chiFAST.style.margin = "8px 0 22px";
    chiFAST.style.padding = "0 5px";
    chiFAST.style.textAlign = "center";
    chiFAST.ariaLabel = "Chi-Town fast travel";

    chiFAST.textContent = "CHI";
    chiFAST.title = "Click to go to Chi-Town";
    chiFAST.type = "button";

    chiFAST.addEventListener("click", () => {
        map.setCenter(chicago);
        map.setZoom(12.5);
    });

    return chiFAST;
}

async function initMap(): Promise<void> {
    //intializing the map, this function is called down below
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;

    map = new Map(document.getElementById("map") as HTMLElement, {
        center: nyc,
        zoom: 12,
        disableDefaultUI: true,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DEFAULT,
            mapTypeIds: ["satellite", "roadmap"],
            position: google.maps.ControlPosition.TOP_CENTER,
        },
        mapTypeId: "satellite",
        backgroundColor: "teal",
        
    });//end of map object elements property descriptions, still in initilaize map interface function, do all initializting needs here

    const marker = new google.maps.Marker({ //not sure i want this marker anyway



    });

    //test adding listener and calling function to zoom in or out when click or dblclick respectively
    map.addListener("click", () => {

        map.setZoom(8)

    })

    const bottomControlDiv = document.createElement('div'); //creates the DIV to hold the custom control
    const centerControl = createFastTravelMTL(map); //creates the control (the function we made called createFastTravelControl)
    bottomControlDiv.appendChild(centerControl); //append the control to the div container

    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(bottomControlDiv);

    const bottomControl = createFastTravelNYC(map); //trying to add second custom control to bottom, is centerControl and bottomControl a free to choose name??? seems so!
    bottomControlDiv.appendChild(bottomControl);

    const bottomControlChi = createFastTravelCHI(map); //adding chitown button
    bottomControlDiv.appendChild(bottomControlChi);




}

declare global {
    interface Window {
        initMap: () => void;

    }
}


initMap();
export { };


