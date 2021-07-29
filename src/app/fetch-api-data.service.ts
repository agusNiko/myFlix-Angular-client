import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflapix.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http

  constructor(private http: HttpClient) { }
  // Making the api call for the user registration endpoint

  
  //-------Register New User
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  //-----login

 public userLogin(username: any, password:any): Observable<any>{
  return this.http.post('https://myflapix.herokuapp.com/login', {
    Username: username,
    Password: password
  }).pipe(catchError(this.handleError)
  );
}

  //----get movies
 getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

   // Non-typed response extraction
   private extractResponseData(res: Object): any {
    const body = res;
    return body || { };
  }

//------- get Movie by title

getMovieByTitle(title: any): Observable<any>{
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies/' + title, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe()

}

//-----add movie to favorites
 addToFavorites(movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(movieId);
    return this.http.post(apiUrl + 'user/movies/'+ movieId,{},{
      headers: new HttpHeaders(
        {
        Authorization: 'Bearer ' + token,
        }),
      } ).pipe(
      catchError(this.handleError)
    );
  }

  //-----remove movie from favorites, 

  removeMovie(movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(movieId)
    let user = localStorage.user
    return this.http.post(apiUrl + 'users/movies/' + user + '/'+ movieId + 'remove',{}, {
      headers: new HttpHeaders(
        {
        Authorization: 'Bearer ' + token,
        }),
      },
    ).pipe(catchError(this.handleError))
    }

  //------Get director

  getDirector(director:string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/director/' +director, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
 
  //------Get genre
  getGenre(genre:string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/movies/' + genre + "/genre", {headers: new HttpHeaders(  
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //-------Get user

  getUser(userName:string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/user/' + userName, {headers: new HttpHeaders(  
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //------ Delete user and

  deleteUser(userName:string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + '/user/' + userName, {headers: new HttpHeaders(  
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

//------- Edit user

updateUsername(userName:string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.put(apiUrl + '/user/' + userName, {headers: new HttpHeaders(  
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}
