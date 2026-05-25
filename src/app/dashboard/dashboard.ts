import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {Hero} from '../hero';
import { HeroService } from '../hero-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  heroes: Hero[] = []; 
  private chart?: Chart;
  private viewReady = false;

  @ViewChild('heroPowerChart') private heroPowerChart?: ElementRef<HTMLCanvasElement>;

  constructor(private heroService: HeroService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getHeroes();
  } 

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.renderHeroPowerChart();
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  getHeroes () {
    this.heroService.getHeroes().subscribe(x => {
      this.heroes = x.slice(1,5);
      this.renderHeroPowerChart();
      this.cdr.detectChanges();
    }); 
  }

  private renderHeroPowerChart(): void {
    if (!this.viewReady || !this.heroPowerChart || this.heroes.length === 0) {
      return;
    }

    const powerLevels = [95, 88, 76, 91];
    //Chartconfiguration determines type of chart displayed 
    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: this.heroes.map(hero => hero.name),
        datasets: [
          {
            label: 'Power Level',
            data: powerLevels.slice(0, this.heroes.length),
            backgroundColor: [
              'rgba(63, 82, 92, 0.72)',
              'rgba(25, 118, 210, 0.72)',
              'rgba(0, 150, 136, 0.72)',
              'rgba(245, 124, 0, 0.72)',
            ],
            borderColor: [
              '#3f525c',
              '#1976d2',
              '#009688',
              '#f57c00',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: 100,
          },
        },
      },
    };

    this.chart?.destroy();
    this.chart = new Chart(this.heroPowerChart.nativeElement, config);
  }
}
