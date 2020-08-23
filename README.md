# gas-estimate-api

A simple API to estimate the gas cost of common dApp Smart Contract function calls

## Status

The API currently supports the following dApps contracts and function calls:

- Compound cToken
  - `mint`
    **Params**
    - `token`: "cDAI" | "cETH"
    - `amount`: string
  - `redeemUnderlying`
    **Params**
    - `token`: "cDAI" | "cETH"
    - `amount`: string

## API

- GET `/compound/mint?token={token}&amount={amount}`
- GET `/compound/redeemUnderlying?token={token}&amount={amount}`

## Examples

### GET Compound `mint`

Required Params: `token`, `amount`

```bash
GET https://gas-estimate-api.xyz/compound/mint/?token=cDAI&amount=50

# Response
{
  "success": true,
  "result": {
    "timestamp": 1598185539803,
    "estimation": 181463
  }
}
```

### GET Compound `redeemUnderlying`

Required Params: `token`, `amount`

```bash
GET https://gas-estimate-api.vercel.app/api/compound/redeemUnderlying?token=cETH&amount=1.5

# Response
{
  "success": true,
  "result": {
    "timestamp": 1598185820687,
    "estimation": 151910
  }
}
```
