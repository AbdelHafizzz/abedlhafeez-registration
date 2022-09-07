import { Component, OnInit } from '@angular/core';
import { FetchDataService } from 'src/app/services/fetch-data.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

imports: [CommonModule];
@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.css'],
})
export class RegFormComponent implements OnInit {
  myData: any[];
  logo = '';
  token: any[];
  days: any[];
  months: any[];
  years: any[];
  countries: any;
  registrationData: any;

  constructor(
    private fetchDataService: FetchDataService,
    private route: ActivatedRoute
  ) {
    this.token = [];
    this.myData = [];
    this.days = [];
    this.months = [];
    this.years = [];
    this.registrationData = {};
    this.countries = {};
  }

  ngOnInit(): void {
    this.days = [...Array(32).keys()];
    this.months = [...Array(13).keys()];

    this.years = [...Array(2023).keys()].filter((el) => {
      return ![...Array(1950).keys()].includes(el);
    });

    this.fetchDataService.getRegistrationAttributes().subscribe((data) => {
      this.registrationData = data;
    });

    this.fetchDataService.getCountries().subscribe((data) => {
      this.countries = data;
    });

    this.route.queryParams.subscribe((data) => {
      this.token = Object.values(data)[0];

      this.token != undefined &&
        this.fetchDataService
          .getRequiredQuestions(this.token)
          .subscribe((data) => {
            Object.entries(data).map(([key, value]) => {
              if (key === 'venue_logo') {
                this.logo = value.url;
              }

              value === true && this.myData.push(key.replaceAll('_', ' '));
            });
          });
    });
  }
}
