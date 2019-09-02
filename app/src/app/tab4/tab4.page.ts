import { Component, OnInit, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  map: any;
  location: any;
  infoWindow: any;
  mylocation: any;
  directionsService: any;
  directionsDisplay: any;
  constructor(private geolocation: Geolocation) { }

  ngOnInit() {
    //this.loadMap();
    this.loadmap();

  }
  loadmap() {
    //-17.375363, -66.141051
    this.location = {
      lat: -17.375363,
      lng: -66.141051
    }
    this.map
    this.map = new google.maps.Map(document.getElementById('mapa'), {
      center: this.location,
      zoom: 15
    });

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude


      this.mylocation = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      }
      this.map.setCenter(new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude));
      this.addMarker();
      console.log(this.mylocation);
    }).catch((error) => {
      console.log('Error getting location', JSON.stringify(error));
    });
  }

  ionViewDidLoad() {
    //this.loadMap();
  }
  addMarker() {

    let marker = new google.maps.Marker({
      position: this.mylocation,
      map: this.map,
      title: "Pedido",
      icon: 'https://i.ibb.co/Mhc0P4v/Map-03-5121-90x90.png'
    });

    marker.addListener('click', (event) => {
      console.log("Animr");
    });

  }



}
