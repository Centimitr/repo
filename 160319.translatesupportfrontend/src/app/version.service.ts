/**
 * Created by Centimitr on 2016/3/17.
 */

import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {URLSearchParams} from "angular2/http";

@Injectable()
export class VersionService {
  constructor(private http:Http) {
  }

  private _url = 'http://localhost:4567/api/versions/';

  getVersions() {
    return this.http.get(this._url)
      .map(res=> res.json());
  }

  addVersion(version:string) {
    let search = new URLSearchParams();
    search.set('version', version);
    let options = new RequestOptions({search: search});
    return this.http.post(this._url, '', options)
      .map(res=> res.json());
  }

  removeVersion(version:string) {
    let search = new URLSearchParams();
    search.set('version', version);
    let options = new RequestOptions({search: search});
    return this.http.delete(this._url, options)
      .map(res=> res.json());
  }
}
