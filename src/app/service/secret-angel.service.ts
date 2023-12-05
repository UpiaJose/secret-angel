import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Angel } from '../model/angel.interface';

@Injectable({
  providedIn: 'root'
})
export class SecretAngelService {

  data = "../db/angel-db"
  constructor(private http: HttpClient) { }

  getSecrectAngel() {
    return this.http.get<Angel[]>(this.data);
  }

  getJsonData() {
    return this.http.get<any>(this.data);
  }

  updateSecrectAngel(angel: Angel) {
    return this.http.put<Angel>(this.data, angel);
  }
}
