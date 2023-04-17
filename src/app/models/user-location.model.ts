import { Location } from "./location.model";

export interface UserLocation {
    name: string;
    locationDetails: Location
    type: string;
    logo: string;
    details?: string;
}