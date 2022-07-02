# Banking API documentation guide
An API made as the first project in Node.js.

### Base URL:
```
localhost:4004
```

## Routes:

### Create account:
```http
POST /account
```
Body:
  - SSN - String;
  - Name - String;
```json
{
  "ssn": "1234567890",
  "name": "john"
}
```
Expected return: 201

### Delete account:
```http
DELETE /account
```
Header:
- SSN - String;
```
ssn 1234567890
```
Expected return: 200

### Fetch account:
```http
GET /account
```
Header:
- SSN - String;
```
ssn 1234567890
```
Expected return:
- 200
- JSON
```json
{
  "ssn": "1234567890",
  "name": "acname",
  "id": "uuid",
  "statement": [
    {
      "description": "Deposit for funds",
      "amount": 667,
      "created_at": "2022-07-02T08:25:34.712Z",
      "type": "add funds"
    },
    {
      "description": "Deposit for funds",
      "amount": 100,
      "created_at": "2022-07-02T08:25:37.832Z",
      "type": "remove funds"
    }
  ]
}
```

### Add funds:
```http
POST /deposit
```
Header:
- ssn - string;
```
ssn 1234567890
```
Body:
- description - string;
- amount - float;
```json
{
  "description": "Deposit for funds",
  "amount": 667.00
}
```
Expected return: 201

### Withdrawal:
```http
POST /withdrawal
```
Header:
- ssn - string;
```
ssn 123456789
```
Body:
- amount: int;
```json
{
  "amount": 150.00
}
```
Expected return: 201

### Get balance:
```http
GET /balance
```
Header:
- ssn - string;
```
ssn 123456789
```
Expected return:
- 200
- JSON
```json
{
  "funds": 1025
}
```

### Get statement:
```http
GET /statement
```
Header:
- ssn - string;
```
ssn 1234567890
```
Expected return:
- 200
- JSON
```json
[
    {
      "description": "Deposit for funds",
      "amount": 667,
      "created_at": "2022-07-02T08:25:34.712Z",
      "type": "add funds"
    },
    {
      "description": "Deposit for funds",
      "amount": 100,
      "created_at": "2022-07-02T08:25:37.832Z",
      "type": "remove funds"
    }
  ]
```

### Get statement by date:
```http
GET /statement/date
```
Header:
- ssn - string;
```
ssn 1234567890
```
Query:
- date - yyyy-mm-dd
```
date 2022-07-02
```
Expected return:
- 200
- JSON
```json
[
    {
      "description": "Deposit for funds",
      "amount": 667,
      "created_at": "2022-07-02T08:25:34.712Z",
      "type": "add funds"
    },
    {
      "description": "Deposit for funds",
      "amount": 100,
      "created_at": "2022-07-02T08:25:37.832Z",
      "type": "remove funds"
    }
  ]
```

### Change name on account:
```http
PUT /account
```
Header:
- ssn - string;
```
ssn 1234567890
```
Body:
- name - string;
```json
  "name": "new name"
```
Expected return: 201
