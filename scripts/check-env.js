#!/usr/bin/env node

/**
 * Environment Variable Check Script
 * Run this to verify all required environment variables are set
 */

const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'NEXT_PRIVATE_SUPABASE_SERVICE_KEY'
];

const optionalVars = [
  'SUPABASE_SERVICE_ROLE_KEY',
  'POSTGRES_URL',
  'WAVESPEED_API_KEY',
  'NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL'
];

console.log('🔍 Checking Environment Variables...\n');

let hasErrors = false;

// Check required variables
console.log('Required Variables:');
requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    const masked = value.substring(0, 10) + '...' + value.substring(value.length - 4);
    console.log(`✅ ${varName}: ${masked}`);
  } else {
    console.log(`❌ ${varName}: NOT SET`);
    hasErrors = true;
  }
});

console.log('\nOptional Variables:');
optionalVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    const masked = value.length > 20 
      ? value.substring(0, 10) + '...' + value.substring(value.length - 4)
      : value.substring(0, 10) + '...';
    console.log(`✅ ${varName}: ${masked}`);
  } else {
    console.log(`⚪ ${varName}: not set (optional)`);
  }
});

console.log('\n' + '='.repeat(50));

if (hasErrors) {
  console.log('\n❌ Missing required environment variables!');
  console.log('   Create a .env.local file with the required variables.');
  console.log('   See ENV_SETUP_GUIDE.md for instructions.\n');
  process.exit(1);
} else {
  console.log('\n✅ All required environment variables are set!');
  console.log('   Your waitlist should work correctly.\n');
  process.exit(0);
}

