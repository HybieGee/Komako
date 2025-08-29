// Token Configuration
// Update this file when the token launches with the actual contract address and details

export const tokenConfig = {
  // Contract Address - Update this when token launches
  contractAddress: {
    // Set this to the actual CA when token goes live
    address: '', // Example: 'AbCd1234EfGh5678IjKl9012MnOp3456QrSt7890UvWx'
    isLaunched: false, // Set to true when token is launched
  },
  
  // Token Details
  token: {
    symbol: '$KOMAKO',
    name: 'Komako Token',
    network: 'Solana',
    decimals: 9,
  },
  
  // Social Links
  social: {
    twitter: 'https://x.com/OnlyKomako',
    telegram: '', // Add when available
    discord: '',  // Add when available
  },
  
  // Trading Links (update when token launches)
  trading: {
    dexscreener: '', // Will be: `https://dexscreener.com/solana/${contractAddress.address}`
    birdeye: '',     // Will be: `https://birdeye.so/token/${contractAddress.address}`
    jupiter: '',     // Will be: `https://jup.ag/swap/SOL-${contractAddress.address}`
  },
  
  // Launch Settings
  launch: {
    showCountdown: false, // Set to true if you want a countdown timer
    launchDate: '', // ISO date string when token launches
    showCA: false,  // Set to true when ready to show CA section
  },
};