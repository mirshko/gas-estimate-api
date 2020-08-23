# gas-estimate-api

A simple API to estimate the gas cost of common dApp Smart Contract function calls

## Smart Contract Support

### Compound cToken

#### `mint` Params

- token: `cDAI` | `cETH` | `cBAT` | `cUSDC`
- amount: _string_

**Optional Params**

- speed: `slow` | `average` | `fast`

#### `redeemUnderlying` Params

- token: `cDAI` | `cETH` | `cBAT` | `cUSDC`
- amount: _string_

**Optional Params**

- speed: `slow` | `average` | `fast`

## API

- GET `/api/compound/mint?token={token}&amount={amount}`
- GET `/api/compound/redeemUnderlying?token={token}&amount={amount}`

## Examples

### GET Compound `mint`

Required Params: `token`, `amount`

Optional Params: `speed`

```bash
GET https://gas-estimate-api.xyz/api/compound/mint/?token=cDAI&amount=50

# Response
{
  "success": true,
  "result": {
    "timestamp": 1598193854974,
    "estimation": 181404,
    "fee": 0.015963552
  }
}
```

### GET Compound `redeemUnderlying`

Required Params: `token`, `amount`

Optional Params: `speed`

```bash
GET https://gas-estimate-api.xyz/api/compound/redeemUnderlying?token=cETH&amount=1.5&speed=fast

# Response
{
  "success": true,
  "result": {
    "timestamp": 1598193938072,
    "estimation": 151910,
    "fee": 0.01473527
  }
}
```
