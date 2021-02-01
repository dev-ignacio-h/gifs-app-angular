import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'api_key=Br7Gb6AcrEfll1eULoqVIYzzceq2m6JT';
  private baseUrl: string = 'https://api.giphy.com/v1/gifs';
  private _record: string[] = [];

  get record() {
    return [...this._record];
  }

  constructor(private http: HttpClient) {}

  searchGifs(query: string) {
    query = query.trim().toLowerCase();
    if (!this._record.includes(query)) {
      this._record.unshift(query);
      this._record = this._record.splice(0, 10);
    }

    this.http
      .get(`${this.baseUrl}/search?${this.apiKey}&q=${query}&limit=12`)
      .subscribe((resp: any) => {
        console.log(resp.data);
      });
  }
}
