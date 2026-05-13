import { ChangeDetectorRef, Component } from '@angular/core';
import {Hero} from '../hero';
import { HeroService } from '../hero-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  heroes: Hero[] = []; 

  constructor(private heroService: HeroService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getHeroes();
  } 

  getHeroes () {
    this.heroService.getHeroes().subscribe(x => {
      this.heroes = x.slice(1,5);
      this.cdr.detectChanges();
    }); 
  }
}
