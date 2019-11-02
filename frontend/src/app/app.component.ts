import { Component, ViewChild, Renderer2 } from '@angular/core';
import locationjson from '../assets/json_data/location_data.json';
import { environment } from '../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  env = environment;
  
  Locations: any = locationjson;
  LocationMarker = this.Locations[0];
  
  @ViewChild("Drone1") Drone1;
  @ViewChild("Drone2") Drone2;
  @ViewChild("Drone3") Drone3;
  
  selectDrone(selectedDrone){
	this.Drone1.nativeElement.classList.remove("btn_selected");
	this.Drone2.nativeElement.classList.remove("btn_selected");
	this.Drone3.nativeElement.classList.remove("btn_selected");
	if(selectedDrone == "Drone1"){
		this.Drone1.nativeElement.classList.add("btn_selected");
	}
	else if(selectedDrone == "Drone2"){
		this.Drone2.nativeElement.classList.add("btn_selected");
	}
	else if(selectedDrone == "Drone3"){
		this.Drone3.nativeElement.classList.add("btn_selected");
	}
	localStorage.setItem('selectDrone', selectedDrone);	
  }
}
