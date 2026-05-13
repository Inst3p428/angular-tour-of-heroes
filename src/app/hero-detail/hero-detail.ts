import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hero } from '../hero';
import { HeroService} from '../hero-service';
import { ActivatedRoute } from '@angular/router';
import { Location} from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero-detail.html',
  styleUrl: './hero-detail.css',
})
export class HeroDetail {

  hero?: Hero;

  constructor(private heroService: HeroService, private route: ActivatedRoute, private location: Location, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getHero();
}

  getHero(): void {

  this.route.paramMap.subscribe(params => {

    const id = Number(params.get('id'));

    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = hero;
        this.cdr.detectChanges();
      });

  });

}

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe();
    }
}

}
