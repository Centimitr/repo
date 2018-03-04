/**
 * Created by Centimitr on 2016/3/17.
 */

import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {URLSearchParams} from "angular2/http";

@Injectable()
export class WatchService {
  constructor(private http:Http) {
  }

  private _url = 'http://localhost:4567/api/versions/v/watches/';

  getWatches(version:string) {
    let search = new URLSearchParams();
    search.set('version', version);
    let options = new RequestOptions({search: search});

    return this.http.get(this._url, options)
      .map(res=> res.json());
  }

  addWatch(version:string, filepath:string) {
    let search = new URLSearchParams();
    search.set('version', version);
    search.set('filepath', filepath);
    let options = new RequestOptions({search: search});

    return this.http.post(this._url,'', options)
      .map(res=> res.json());
  }
  removeWatch(version:string, filepath:string) {
    let search = new URLSearchParams();
    search.set('version', version);
    search.set('filepath', filepath);
    let options = new RequestOptions({search: search});

    return this.http.delete(this._url,options)
      .map(res=> res.json());
  }
}
