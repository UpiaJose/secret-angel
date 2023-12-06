import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecretAngelComponent } from './secret-angel/secret-angel.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


@NgModule({
  declarations: [	
    AppComponent,
    SecretAngelComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp({"projectId":"secret-angel-f6b76","appId":"1:397667091032:web:682ec45f4839b7eccbc02d","storageBucket":"secret-angel-f6b76.appspot.com","apiKey":"AIzaSyDm3B_tUfW9b45X2er6X6kDc5ADt7AQ67g","authDomain":"secret-angel-f6b76.firebaseapp.com","messagingSenderId":"397667091032","measurementId":"G-38C3FB0BX7"})),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
