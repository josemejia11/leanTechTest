import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor( private http: HttpClient ) { }

  getWeatherCelsius(city: string): Observable<any> {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5e61a94490cfc506c80a3ee506c5480d`);
  }

  getWeatherFahrenheit(city: string): Observable<any> {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=5e61a94490cfc506c80a3ee506c5480d`);
  }

  getWeatherKelvin(city: string): Observable<any> {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5e61a94490cfc506c80a3ee506c5480d`);
  }
}
