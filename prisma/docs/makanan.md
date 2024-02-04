# Makanan API Spec

## Create Makanan API

Endpoint : POST /api/makanans

Headers :

- Authorization : token

Request Body :

```json
{
  "makanan": "iga bakar",
  "minuman": "jus alpuket",
  "paket_murah": "paket keluarga",
  "aneka_salad": "salad buah",
  "jumlah": "2000",
  "harga": "2000"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "makanan": "iga bakar",
    "minuman": "jus alpuket",
    "paket_murah": "paket keluarga",
    "aneka_salad": "salad buah",
    "jumlah": "2000",
    "harga": "2000"
  }
}
```

Response Body Error :

```json
{
  "errors": "Email or Phone is not valid format"
}
```

## Update Makanan API

Endpoint : PUT /api/Makanans/:id

Headers :

- Authorization : token

Request Body :

```json
{
  "makanan": "iga bakar",
  "minuman": "jus alpuket",
  "paket_murah": "paket keluarga",
  "aneka_salad": "salad buah",
  "jumlah": "2000",
  "harga": "2000"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "makanan": "iga bakar",
    "minuman": "jus alpuket",
    "paket_murah": "paket keluarga",
    "aneka_salad": "salad buah",
    "jumlah": "2000",
    "harga": "2000"
  }
}
```

Response Body Error :

```json
{
  "errors": "Email or Phone is not valid format"
}
```

## Get Makanan API

Endpoint : GET /api/Makanans/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "makanan": "iga bakar",
    "minuman": "jus alpuket",
    "paket_murah": "paket keluarga",
    "aneka_salad": "salad buah",
    "jumlah": "2000",
    "harga": "2000"
  }
}
```

Response Body Error :

```json
{
  "errors": "Makanan is not found"
}
```

## Search Makanan API

Endpoint : GET /api/Makanans

Headers :

- Authorization : token

Query params :

- makanan : Search by makanan, using like, optional
- minuman : Search by minuman using like, optional
- paket murah : Search by paket_murah using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "makanan": "iga bakar",
      "minuman": "jus alpuket",
      "paket_murah": "paket keluarga",
      "aneka_salad": "salad buah",
      "jumlah": "2000",
      "harga": "2000"
    },
    {
      "id": 2,
      "makanan": "iga bakar",
      "minuman": "jus alpuket",
      "paket_murah": "paket keluarga",
      "aneka_salad": "salad buah",
      "jumlah": "2000",
      "harga": "2000"
    }
  ],
  "paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30
  }
}
```

Response Body Error :

## Remove Makanan API

Endpoint : DELETE /api/Makanans/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": "Makanan is not found"
}
```
