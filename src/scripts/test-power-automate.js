
// fetch is global in Node 18+

const url = 'https://defaultafcb403265a34bf5894edb5aeefe64.71.environment.api.powerplatform.com/powerautomate/automations/direct/workflows/7ee5ab6664da4e5bb38e92ce40b8af3c/triggers/manual/paths/invoke?api-version=1&sp=/triggers/manual/run&sv=1.0&sig=wwn7F98vaJWYb9KMOVd_RCfteOTsDjGEidGJCZjfoD8';

const body = {
    "triggerType": "form_submission",
    "payload": {
        "name": "Savings Tool",
        "siteId": "67ed5695314f69c537693240",
        "data": {
            "Empty 6": "",
            "Postcode": "2871kz",
            "Huisnummer": "3",
            "Toevoeging": "",
            "Oppervlakte-Known": "166",
            "Energielabel-known": "Cc",
            "Type huis": "Tussenwoning",
            "Oppervlakte 7": "166",
            "Mensen": "2",
            "Bouwjaar": "Tussen 1971 en 1989",
            "Het dak is geïsoleerd": "false",
            "Met dubbelglas of beter": "true",
            "Met spouwmuurisolatie": "false",
            "Met andere muurisolatie": "false",
            "Met vloerisolatie": "true",
            "Stadsverwarming": "false",
            "Luchtverwarming": "false",
            "Radiatoren": "true",
            "Convectoren in de vloer": "false",
            "Convectoren in de muren": "false",
            "Vloerverwarming": "true",
            "Anders": "false",
            "Radiatoren 2": "false",
            "Oppervlakte": "1400",
            "Savings Data": "Sparrow P60",
            "Savings Data 3": "",
            "Voornaam": "Joris",
            "Achternaam": "Zandbergen",
            "Email": "joris.zandbergen@gmail.com",
            "company": ""
        },
        "submittedAt": "2025-11-27T10:15:22.381Z",
        "id": "692824ba462e10e77b631356",
        "formId": "68d663c57d54d4d7ec462bb2",
        "formElementId": "244093c9-f80f-d2e6-6e9c-9092e3f7e468",
        "pageId": "67f5271fb6e1052f98b09695",
        "publishedPath": "/producten/flint",
        "pageUrl": "https://www.weheat.nl/producten/flint",
        "schema": []
    }
};

async function testApi() {
    try {
        console.log('Sending request to:', url);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        console.log('Response status:', response.status);
        const text = await response.text();
        console.log('Response body:', text);
    } catch (error) {
        console.error('Error:', error);
    }
}

testApi();
