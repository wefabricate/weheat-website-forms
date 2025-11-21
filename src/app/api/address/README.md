# Mock Address API

This is a development mock API that simulates the real address data API.

## Endpoint

`GET /api/address`

## Query Parameters

- `postal_code` (required): Postal code without spaces (e.g., `6531KJ`)
- `house_number` (required): House number (e.g., `4`)

## Example Request

```bash
curl "http://localhost:3000/api/address?postal_code=6531KJ&house_number=4"
```

## Example Response

```json
{
  "area": "221",
  "build_year": "1932",
  "city": "Nijmegen",
  "energy_label": "C",
  "estimated_energy_usage": 241,
  "estimated_gas_usage": 2191,
  "house_number": "4",
  "house_number_addition": "None",
  "house_type": "2 onder 1 kap woning",
  "latitude": "51.83027205816181",
  "longitude": "5.8505499641530285",
  "postal_code": "6531KJ",
  "street": "Hindestraat",
  "woz": "830362"
}
```

## Available Mock Addresses

1. **6531KJ, 4** - Hindestraat, Nijmegen (Semi-detached, 1932, Energy Label C)
2. **1234AB, 10** - Voorbeeldstraat, Amsterdam (Terraced, 1985, Energy Label B)
3. **3011AB, 25** - Coolsingel, Rotterdam (Apartment, 2005, Energy Label A)

## Error Responses

### Missing Parameters (400)
```json
{
  "error": "postal_code and house_number are required"
}
```

### Address Not Found (404)
```json
{
  "error": "Address not found"
}
```

## Usage in LocationStep

You can replace the PDOK API call with this mock API for development:

```typescript
const response = await fetch(
  `/api/address?postal_code=${cleanPostalCode}&house_number=${formData.houseNumber}`
);
```
