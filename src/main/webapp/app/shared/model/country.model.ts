import { ILocation } from 'app/shared/model/location.model';

export interface ICountry {
    id?: number;
    countryName?: string;
    location?: ILocation;
}

export class Country implements ICountry {
    constructor(public id?: number, public countryName?: string, public location?: ILocation) {}
}
