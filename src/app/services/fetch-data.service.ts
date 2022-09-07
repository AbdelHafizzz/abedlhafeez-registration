import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  constructor(private http: HttpClient) {}
  // Sample Tokens: 5jzy96gn2u19f35s6 , o4f12s624fvce23e9 , 66dtuh692tj687yx7

  getCountries() {
    return this.http.get(
      `https://xjae-glgb-i33k.f2.xano.io/api:ZQoSrFTr/country`
    );
  }

  getRequiredQuestions(token: any[]) {
    return this.http.get(
      `https://xjae-glgb-i33k.f2.xano.io/api:ZQoSrFTr/required_fields/${token}`
    );
  }

  getRegistrationAttributes() {
    return this.http.get(
      `https://xjae-glgb-i33k.f2.xano.io/api:ZQoSrFTr/reg_attributes`
    );
  }
}
