import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import doneneDatajson from '../../assets/json_data/drone_data.json';
import { MapComponent } from '../map/map.component';
import { environment } from '../../environments/environment';
import {BrowserModule} from '@angular/platform-browser'

@Component({
  selector: 'overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class overviewComponent implements OnInit {
	
  doneneData: any = doneneDatajson;
  dorneimagedata = this.doneneData[0].drones[0];
  zipcode;
  dateVal;
  timeval;
  env = environment;  
  
  constructor() { }
  ngOnInit() {
	//this.env.isHeadContent = true;
	this.zipcode = localStorage.getItem('zipCode');
	this.dateVal = localStorage.getItem('Dateval');
	this.timeval = localStorage.getItem('timeval');
	/*if(localStorage.getItem('position') > 2){
		this.dorneimagedata = this.doneneData[0].drones[localStorage.getItem('position')-3];
	}
	else{ */
		this.dorneimagedata = this.doneneData[0].drones[localStorage.getItem('position')];
	//}
	/*this.zipcode = this.env.glZipcode;
	this.dateVal = this.env.glDateVal;
	this.timeval = this.env.glTimeVal; */
  }

}
