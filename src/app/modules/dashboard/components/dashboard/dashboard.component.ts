import { Component, OnInit, Injectable } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cities: any = getCities();
  selectedCities: any = [];
  selectedCity: string;
  celsius = false;
  farenheit = false;
  kelvin = false;


  constructor( private weatherService: WeatherService ) { }

  ngOnInit(): void {
    this.cities = getCities();
  }

  clickBtn() {
    const input = (<HTMLInputElement>document.getElementById("selectedCity"));
    const selectedCity = input.value;
    const exist = this.cities.find(({name}: any) => name === input.value);
    
    input.value = '';

    if (selectedCity.trim() == '' || exist == undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid value',
      });
    } else {
      this.weatherService.getWeatherCelsius(selectedCity).subscribe((res) => {
        const duplicates = this.selectedCities.find(({name}: any) => name === res.name);
        if( duplicates == undefined) {
          this.selectedCities.push({'name': res.name,'temp': res.main.temp, 'tempC': res.main.temp}); 
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Card already exist',
          });
        }
      });
    }
  }

  setCelsius(city: any) {
    const setTemp:any = this.selectedCities.indexOf(city)

    this.weatherService.getWeatherCelsius(city.name).subscribe(res => {
      city.temp = res.main.temp;
      this.selectedCities[setTemp] = city;
      this.celsius = true;
      this.kelvin = false;
      this.farenheit = false;
    }); 
  }

  setKelvin(city: any) {
    const setTemp:any = this.selectedCities.indexOf(city)

    this.weatherService.getWeatherKelvin(city.name).subscribe(res => {
      city.temp = res.main.temp;
      this.selectedCities[setTemp] = city;
      this.celsius = false;
      this.kelvin = true;
      this.farenheit = false;
    }); 
  }

  setFarenheit(city: any) {
    const setTemp:any = this.selectedCities.indexOf(city)

    this.weatherService.getWeatherFahrenheit(city.name).subscribe(res => {
      city.temp = res.main.temp;
      this.selectedCities[setTemp] = city;
      this.celsius = false;
      this.kelvin = false;
      this.farenheit = true;
    }); 
  }

  updateClick(city: any) {
    if( this.celsius === true ){
      this.setCelsius(city);
    }
    if( this.kelvin === true ){
      this.setKelvin(city);
    }
    if( this.farenheit === true ){
      this.setFarenheit(city);
    }
  }

  removeCard(city: any) {
    const removeItem: any = this.selectedCities.indexOf(city);
    this.selectedCities.splice(removeItem, 1);
  }
}

export interface Cities {
  name: string;
}

export const getCities: () => Cities[] = () => [
      {
        "name" : "miami"
      },
      {
        "name" : "bogota"
      },
      {
        "name" : "paris"
      },
      {
        "name" : "londres"
      },
      {
        "name" : "tokio"
      },
      {
        "name" : "seul"
      },
      {
        "name" : "lisboa"
      },
      {
        "name" : "medellin"
      },
      {
        "name" : "belgica"
      }
]
