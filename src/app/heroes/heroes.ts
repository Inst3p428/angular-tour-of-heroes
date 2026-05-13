import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hero } from '../hero';
import { HeroDetail } from '../hero-detail/hero-detail';
import { HeroService } from '../hero-service';
import { RouterLink } from '@angular/router';


  
@Component({
  selector: 'app-heroes', 
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './heroes.html',
  styleUrl: './heroes.css',
})
 
export class Heroes { 

  heroes: Hero[] = [];
  //selectedHero?: Hero;

  //onSelect(hero: Hero): void {
    //this.selectedHero = hero;
  //}  

  constructor(private heroService: HeroService, private cdr: ChangeDetectorRef) { }

  
  ngOnInit(): void {
    this.getHeroes();
  }
  
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(x => {
        console.log(x);
        this.heroes = x;
        this.cdr.detectChanges();
      })
  }

} 


