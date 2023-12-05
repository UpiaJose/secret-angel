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
    return this.http.get<Angel[]>("/api/angels");
  }

  // updateSecrectAngel(angel: Angel) {
  //   return this.http.put<Angel>(this.data, angel);
  // }

  updateSecrectAngel(code: string) {
    const body = { code };
    return this.http.put<Angel>("/api/angels", body);
  }
}
