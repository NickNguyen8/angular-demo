import { Injectable } from '@angular/core';
//import { fakeMovies } from './fake-movies';
import { Movie } from '../models/movie';

// Get data async with Ob
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

// MessageService
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private moviesUrl = 'http://localhost:3000/movies';

  getMovies(): Observable<Movie[]> {
    // this.messageService.add(`${new Date().toLocaleString()}.Get movie list`);
    // return of(fakeMovies);
    return this.http.get<Movie[]>(this.moviesUrl).pipe(
      tap(receivedMovies => console.log(`receivedMovies = ${JSON.stringify(receivedMovies)}`)),
      catchError(error => of([]))
    );
  }

  getMovieFromId(id: number): Observable<Movie> {
    //  return of(fakeMovies.find(movie => movie.id === id));
    const url = `${this.moviesUrl}/${id}`;
    return this.http.get<Movie>(url).pipe(
      tap(selectedMovie => console.log(`selected Movie = ${JSON.stringify(selectedMovie)}`)),
      catchError(error => of(new Movie()))
    );
  }

  updateMovie(movie: Movie): Observable<any> {
    return this.http.put(`${this.moviesUrl}/${movie.id}`, movie, httpOptions).pipe(
      tap(updatedMovie => console.log(`updated Movie = ${JSON.stringify(updatedMovie)}`)),
      catchError(error => of(new Movie()))
    );
  }

  addMovie(newMovie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.moviesUrl, newMovie, httpOptions).pipe(
      tap((movie: Movie) => console.log(`add Movie = ${JSON.stringify(movie)}`)),
      catchError(error => of(new Movie()))
    );
  }

  deleteMovie(movieId: number): Observable<Movie> {
    const url = `${this.moviesUrl}/${movieId}`;
    return this.http.delete<Movie>(url, httpOptions).pipe(
      tap(_ => console.log(`Deleted movie with Id = ${movieId}`)),
      catchError(error => of(null))
    )
  }

  searchMovie(typeString: string): Observable<Movie[]> {
    if (!typeString.trim()) {
      return of([]);
    }
    return this.http.get<Movie[]>(`${this.moviesUrl}?name_like=${typeString}`).pipe(
      tap(foundMovies => console.log(`found movies = ${JSON.stringify(foundMovies)}`)),
      catchError(error => of(null))
    );
  }

  constructor(private http: HttpClient, public messageService: MessageService) { }
}
