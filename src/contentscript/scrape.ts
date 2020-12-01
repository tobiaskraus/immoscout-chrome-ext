import * as $ from "jquery";

export function scrape() {
    // retrieve real image URLs from `<img data-default="">` attributes
    const imageUrls = $("img.sp-image")
        .map((i, el) => $(el).attr("data-default") || $(el).attr("data-src"))
        .get();

    const result = {
        title: $("h1#expose-title").first().text(),
        scout_id: $(".is24-scoutid__content")
            .first()
            .text()
            .match(/(?<=Scout-ID: )\d{9,9}/)[0],
        street: $('span[data-qa="is24-expose-address"] .address-block span:first-child')
            .first()
            .text(),
        city_region: $('span[data-qa="is24-expose-address"] .address-block .zip-region-and-country')
            .first()
            .text(),
        price_net: $(".is24-preis-value").first().text(),
        price_total: $(".is24qa-gesamtmiete").first().text(),
        price_additional: $(".is24qa-nebenkosten").first().text(),
        price_heating: $(".is24qa-heizkosten").first().text(),
        price_deposit: $(".is24qa-kaution-o-genossenschaftsanteile").first().text(),
        vacant_from: $(".is24qa-bezugsfrei-ab").first().text(),
        sqm: $(".is24qa-flaeche, .is24qa-flaeche-ca").first().text(),
        sqm_nutzflaeche: $(".is24qa-nutzflaeche, .is24qa-nutzflaeche-ca").first().text(),
        sqm_wohnflaeche: $(".is24qa-wohnflaeche, .is24qa-wohnflaeche-ca").first().text(),
        images: imageUrls,
        construction_year: $(".is24qa-baujahr").first().text(),
        object_condition: $(".is24qa-objektzustand").first().text(),
        heating_type: $(".is24qa-heizungsart").first().text(),
        energy_consumption_value: $(".is24qa-energieverbrauchskennwert").first().text(),
        has_balcony_terrace: $(".is24qa-balkon-terrasse-label").length > 0,

        description_object: $(".is24qa-objektbeschreibung").first().text(),
        description_furnishing: $(".is24qa-ausstattung").first().text(),
        description_location: $(".is24qa-lage").first().text(),
        description_other: $(".is24qa-sonstiges").first().text(),

        // premium only

        premium_info: $("#additional-info-boxes-layer-premium .gutter-m>.grid-item.one-half")
            .map((i, el) => $(el).text())
            .get(),

        quickcheck_intro: $('#is24-expose-quickcheck [data-qa="quickcheck-intro"]').first().text(),
        quickcheck_this_object: $("#is24-expose-quickcheck *:not(:has(*))")
            .map((i, el) => $(el).text())
            .get()[2],
        quickcheck_min: $("#is24-expose-quickcheck *:not(:has(*))")
            .map((i, el) => $(el).text())
            .get()[7],
        quickcheck_average_min: $("#is24-expose-quickcheck *:not(:has(*))")
            .map((i, el) => $(el).text())
            .get()[5],
        quickcheck_average_max: $("#is24-expose-quickcheck *:not(:has(*))")
            .map((i, el) => $(el).text())
            .get()[6],
        quickcheck_max: $("#is24-expose-quickcheck *:not(:has(*))")
            .map((i, el) => $(el).text())
            .get()[8],
    };
    return result;
}
