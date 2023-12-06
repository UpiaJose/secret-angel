import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Angel } from '../model/angel.interface';
import { sql } from "@vercel/postgres";
import { Firestore, addDoc, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecretAngelService {

  data = "../db/angel-db"
  constructor(private firestore: Firestore) { }

  getSecrectAngel(): Observable<Angel[]> {
    const angelRef = collection(this.firestore, 'angels');
    return collectionData(angelRef, { idField: 'id' }) as Observable<Angel[]>;
  }

  updateSecrectAngel(angel: Angel) {
    const angelRefUpdate = doc(this.firestore, `angels/${angel.id}`);
    return updateDoc(angelRefUpdate, angel as any);
  }


  addSecretAngel(angel: Angel) {
    const angelRef = collection(this.firestore, 'angels');
    return addDoc(angelRef, angel);
  }




}
