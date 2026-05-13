import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})

export class HeroService {

  constructor(private httpClient: HttpClient) { }

  getHero(id: number): Observable<Hero> {
    const hero = this.httpClient.get<Hero>(
      `http://127.0.0.1:5000/detail/` + id.toString()
    );

    
    return hero;

  }

  getHeroes(): Observable<Hero[]> {
    const heroes = this.httpClient.get<Hero[]>(
      'http://127.0.0.1:5000/heroes'
    );
    return heroes;
    
  }

  updateHero(hero: Hero): Observable<any> {
    return this.httpClient.post(
      `http://127.0.0.1:5000/update`,
      hero
    );
  }

}
