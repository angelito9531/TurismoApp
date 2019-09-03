import { Component, OnInit, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LugarService } from '../services/lugar.service';
import { LugarTuristico } from '../models/lugar_turistico';
import { Router } from '@angular/router';
declare var google;
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  map: any;
  location: any;
  hoteles: any = [];
  infoWindow: any;
  mylocation: any;
  directionsService: any;
  directionsDisplay: any;
  constructor(private route: Router, private geolocation: Geolocation, private lugarService: LugarService) { }

  ngOnInit() {
    //this.loadMap();
    this.lugarService.listar().subscribe((data) => {

      this.hoteles = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };

      })
      this.hoteles.map((element, i) => {
        this.addMarker2(element);

      });
    });
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

  addMarker2(element: LugarTuristico) {
    console.log(element.ubicacion);
    var icon = {
      url: element.foto,
      scaledSize: new google.maps.Size(50, 50), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };
    let marker;
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(element.ubicacion.lat, element.ubicacion.lng),
      map: this.map,
      title: element.nombre,
      icon: icon
    });


    this.clickmarker(marker, element);
  }


  clickmarker(marker, element) {
    google.maps.event.addListener(marker, 'dblclick', ((marker2, count) => {
      return () => {
        this.route.navigateByUrl("/informacion/" + element.id);
      }

    })(marker));
  }
}
