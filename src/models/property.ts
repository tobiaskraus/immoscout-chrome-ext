import { Image } from "./Image";

/**
 * - all prices in EUR
 */
export interface Property {
    title: string;
    scout_id: string;
    street: string;
    city_region: string;
    price_net: number;
    price_total: number;
    price_additional: number;
    price_heating: number;
    price_deposit: number;
    vacant_from: string;
    sqm: string;
    sqm_nutzflaeche: string;
    sqm_wohnflaeche: string;
    features: string[];
    /** urls */
    images: Image[];
    floor: number;
    floorTotal: number;
    construction_year: string;
    object_condition: string;
    heating_type: string;
    energy_consumption_value: string;
    has_balcony_terrace: boolean;
    description_object: string;
    description_furnishing: string;
    description_location: string;
    description_other: string;

    // Premium Info
    premium_info: string[];
    quickcheck_intro: string;
    quickcheck_this_object: string;
    quickcheck_min: string;
    quickcheck_average_min: string;
    quickcheck_average_max: string;
    quickcheck_max: string;
}
