import { Component } from '@angular/core';
import locationjson from '../../assets/json_data/location_data.json';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'map-root',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  title = 'vegetation';
  latitude = 33.6263;
  longitude = -117.4280;
  zoom = 12;

  Locations: any = locationjson;
  LocationMarker = this.Locations[0];
  
  public selectedMoment = new Date()
  
  zipCodeChanged(newObj) {
	//alert(newObj.target.value);
    this.LocationMarker = this.Locations[newObj.target.value];
  }
  loopval = 0;
  
  //Marker change dynamicly
  changemarker(val) {
	//alert(newObj.target.value);
    this.LocationMarker = this.Locations[val];
	this.loopval = val+1;
	if (this.loopval > 3){
		this.loopval = 0;
	}
  }
  
  zipCodeval;
  dateVal;
  timeval;
  env = environment; // Gloable variable
  
 
  clickedMarker(lat, lng, pos, funzipCode, funDateval, funTimeval) {
	//console.log(lat);
	localStorage.setItem('position', pos);
	localStorage.setItem('zipCode', funDateval);
	localStorage.setItem('Dateval', funDateval);
	localStorage.setItem('timeval', funTimeval);
	/*this.env.glZipcode = funzipCode;
	this.env.glDateVal = funDateval;
	this.env.glTimeVal = funTimeval;*/
	this.router.navigate(['/overview']);
  };
  
  liveCamera(funzipCode, funDateval, funTimeval){
	//alert(zipCode+' : '+Dateval+' : '+timeval);
	localStorage.setItem('zipCode', funDateval);
	localStorage.setItem('Dateval', funDateval);
	localStorage.setItem('timeval', funTimeval);
	/*this.env.glZipcode = funzipCode;
	this.env.glDateVal = funDateval;
	this.env.glTimeVal = funTimeval; */
	this.router.navigate(['/users']);
  }
  
  constructor(private router: Router) {}
  
  ngOnInit() {
	//this.env.isHeadContent = false;
	setInterval(() => {
		this.changemarker(this.loopval);
	}, 3000);
  }
  
}
