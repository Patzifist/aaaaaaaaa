import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICountry } from 'app/shared/model/country.model';
import { CountryService } from './country.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location';

@Component({
    selector: 'jhi-country-update',
    templateUrl: './country-update.component.html'
})
export class CountryUpdateComponent implements OnInit {
    country: ICountry;
    isSaving: boolean;

    locations: ILocation[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected countryService: CountryService,
        protected locationService: LocationService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ country }) => {
            this.country = country;
        });
        this.locationService
            .query({ filter: 'country-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<ILocation[]>) => mayBeOk.ok),
                map((response: HttpResponse<ILocation[]>) => response.body)
            )
            .subscribe(
                (res: ILocation[]) => {
                    if (!this.country.location || !this.country.location.id) {
                        this.locations = res;
                    } else {
                        this.locationService
                            .find(this.country.location.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<ILocation>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<ILocation>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: ILocation) => (this.locations = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.country.id !== undefined) {
            this.subscribeToSaveResponse(this.countryService.update(this.country));
        } else {
            this.subscribeToSaveResponse(this.countryService.create(this.country));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICountry>>) {
        result.subscribe((res: HttpResponse<ICountry>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackLocationById(index: number, item: ILocation) {
        return item.id;
    }
}
