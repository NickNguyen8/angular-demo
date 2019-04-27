import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../models/movie';
// Router
import { MovieService } from '../movie.service';
import { ActivatedRoute, ActivationEnd } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  @Input() movie: Movie;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getMovieFromRoute();
  }

  getMovieFromRoute(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(`this.route.snapshot.paramMap = ${JSON.stringify(this.route.snapshot.paramMap)}`);
    // Call service to get movie from Id
    this.movieService.getMovieFromId(id).subscribe(movie => this.movie = movie);
  }
  save(): boolean {
    this.movieService.updateMovie(this.movie).subscribe(() => this.goBack());
    return true;
  }
  goBack(): void {
    this.location.back();
  }
}
