# Token Launch Guide

## Quick Setup for $KOMAKO Token Launch

When your token is ready to launch, simply update the `src/config/token.ts` file:

### Step 1: Update Contract Address
```typescript
contractAddress: {
  address: 'YOUR_ACTUAL_CONTRACT_ADDRESS_HERE', // Replace with real CA
  isLaunched: true, // Change to true
},
```

### Step 2: Enable CA Section
```typescript
launch: {
  showCountdown: false,
  launchDate: '2025-08-29T15:00:00Z', // Set your launch date
  showCA: true, // Change to true to show CA section on homepage
},
```

### Step 3: Add Trading Links (Optional)
```typescript
trading: {
  dexscreener: `https://dexscreener.com/solana/${contractAddress.address}`,
  birdeye: `https://birdeye.so/token/${contractAddress.address}`,
  jupiter: `https://jup.ag/swap/SOL-${contractAddress.address}`,
},
```

### Step 4: Add Social Links (Optional)
```typescript
social: {
  twitter: 'https://x.com/OnlyKomako',
  telegram: 'https://t.me/YourTelegramChannel', // Add when available
  discord: 'https://discord.gg/YourDiscord',    // Add when available
},
```

## What This Does:

- ✅ **Shows CA section on homepage** with copy-to-clipboard functionality
- ✅ **Displays trading links** for easy access to DEX platforms  
- ✅ **Ready-to-use token information** styled to match Komako theme
- ✅ **Mobile-friendly** design with proper responsive layout

## Before Launch:
The CA section is hidden and shows "Token Coming Soon" message.

## After Launch:
The CA section displays the contract address with trading links and copy functionality.

---

**Note:** After updating the config file, the changes will be automatically deployed via Cloudflare Pages when you commit to the main branch.