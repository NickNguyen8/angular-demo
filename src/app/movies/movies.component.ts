import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
// import { fakeMovies } from '../fake-movies';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor(private movieService: MovieService) { }

  // movie: Movie = {
  //   id: 1,
  //   name: 'Star Wars',
  //   releaseYear: 1977
  // };

  // movies = fakeMovies;
  movies: Movie[];

  getMoviesFromServices(): void {
    //  this.movies = this.movieService.getMovies();
    this.movieService.getMovies().subscribe(updateMovies => this.movies = updateMovies);
  }

  ngOnInit() {
    this.getMoviesFromServices();
  }

  // selectedMovie: Movie;
  // onSelect(movie: Movie): void {
  //   this.selectedMovie = movie;
  //   console.log(`selectedMovie = ${JSON.stringify(this.selectedMovie)}`);
  // alert(`selectedMovie = ${JSON.stringify(this.selectedMovie)}`);
  //}

  add(name: string, releaseYear: string): void {
    name = name.trim();
    if (Number.isNaN(Number(releaseYear)) || !name || Number(releaseYear) === 0) {
      alert('Name must not be blank, Release year must not be a number');
      return;
    }
    const newMovie: Movie = new Movie();
    newMovie.name = name;
    newMovie.releaseYear = Number(releaseYear);
    this.movieService.addMovie(newMovie)
      .subscribe(insertedMovie => {
        this.movies.push(insertedMovie);
      });
  }

  delete(movieId: number): void {
    this.movieService.deleteMovie(movieId).subscribe(_ => {
      this.movies = this.movies.filter(eachMovie => eachMovie.id !== movieId);
    });
  }
}
