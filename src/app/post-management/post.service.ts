import {
  computed,
  Injectable,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPost } from './post.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, Observable, of } from 'rxjs';
import { State } from './state.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseURL = 'https://api.thedogapi.com/v1';
  private paramsURL = `images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=8`;

  private savePost$: WritableSignal<State<IPost>> = signal(
    new State<IPost>('INIT')
  );

  posts: Signal<State<Array<IPost>> | State<null> | undefined> = toSignal(
    this.load()
  );
  savePost = computed(() => this.savePost$());

  constructor(private http: HttpClient) {}

  load(): Observable<State<Array<IPost>> | State<null>> {
    return this.http
      .get<Array<IPost>>(`${this.baseURL}/${this.paramsURL}`)
      .pipe(
        map((posts) => {
          return new State<Array<IPost>>('OK', posts, undefined);
        }),
        catchError((error) => {
          return of(new State<Array<IPost>>('ERROR', undefined, error));
        })
      );
  }
}
