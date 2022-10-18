import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActionEnum } from "../enum/ActionEnum";

@Injectable({
    providedIn: 'root'
})
export class ProductService {


    constructor(private http: HttpClient) {

    }


    public call(url: string, body: any, appHeaders: HttpHeaders, action: ActionEnum): Promise<any> {
        switch (action) {
            case ActionEnum.GET:
                return this.http.get(url, { headers: appHeaders }).toPromise();
            case ActionEnum.POST:
                return this.http.post(url, JSON.stringify(body), { headers: appHeaders }).toPromise();
            case ActionEnum.PUT:
                return this.http.put(url, JSON.stringify(body), { headers: appHeaders }).toPromise();
            case ActionEnum.DELETE:
                return this.http.delete(url, { headers: appHeaders }).toPromise();
            default:
                return this.http.get(url, { headers: appHeaders }).toPromise();
        }
    }
}