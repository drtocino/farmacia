import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from './models/Session';

@Injectable({
  providedIn: 'root'
})
export class ApiFarmaciaService {

  apiGlobal : string = "http://localhost:3001"

  constructor(private http : HttpClient) { }

  login(user : string,pass : string){
    console.log("a")
    return this.http.get<Session>(this.apiGlobal + "/login")
  }
}

// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Character } from './character.model';
// import { Results } from './results.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class CharactersService {

//   apiGlobal : string = "https://swapi.dev/api/"
//   data : any;
//   character : Character = new Character()
//   lista : any[] = [];

//   constructor(private http : HttpClient) {
//     //console.log(http.get(this.apiGlobal + "people/1"))
//   }
//   devolverTodo(){

//     //console.log(this.getCharacterLuke)
//     //return this.http.get("https://swapi.dev/api/people/1");
    
//     //return this.character;
//     this.getAllCharacters().subscribe((val) => {
//       this.lista.push(val);
//       this.data = val.results;
//       console.log(val);
//     })
//     console.log(this.data)
//     return this.data;
//   }

//   getCharacterLuke(){
//     //console.log(this.http.get<Character>(this.apiGlobal + "people/1"))
//     return this.http.get<Character>(this.apiGlobal + "people/1");
//   }
//   getAllCharacters(){
//     //console.log(this.http.get<Character>(this.apiGlobal + "people/1"))
//     return this.http.get<Results>(this.apiGlobal + "people");
//   }
// }
