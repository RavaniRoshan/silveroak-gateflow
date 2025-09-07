#!/usr/bin/env node

/**
 * Deployment Verification Script
 * Checks common issues that cause blank page errors in production
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const projectRoot = process.cwd();

console.log('🔍 Deployment Verification Checklist\n');

// Check 1: Environment variables
console.log('1. Checking environment variables...');
const envExample = join(projectRoot, '.env.example');
const envLocal = join(projectRoot, '.env.local');
const env = join(projectRoot, '.env');

if (!existsSync(envExample)) {
  console.log('   ⚠️  .env.example not found');
} else {
  console.log('   ✅ .env.example exists');
}

if (!existsSync(envLocal) && !existsSync(env)) {
  console.log('   ⚠️  No .env file found locally (create .env.local for development)');
} else {
  console.log('   ✅ Environment file exists locally');
}

// Check 2: Package.json scripts
console.log('\n2. Checking package.json scripts...');
try {
  const packageJson = JSON.parse(readFileSync(join(projectRoot, 'package.json'), 'utf8'));
  const requiredScripts = ['build', 'preview'];
  
  requiredScripts.forEach(script => {
    if (packageJson.scripts[script]) {
      console.log(`   ✅ "${script}" script exists`);
    } else {
      console.log(`   ❌ "${script}" script missing`);
    }
  });
} catch (error) {
  console.log('   ❌ Error reading package.json:', error.message);
}

// Check 3: Critical files
console.log('\n3. Checking critical files...');
const criticalFiles = [
  'index.html',
  'src/main.tsx',
  'src/App.tsx',
  'src/integrations/supabase/client.ts',
  'vercel.json'
];

criticalFiles.forEach(file => {
  if (existsSync(join(projectRoot, file))) {
    console.log(`   ✅ ${file} exists`);
  } else {
    console.log(`   ❌ ${file} missing`);
  }
});

// Check 4: Build directory
console.log('\n4. Checking build output...');
const distDir = join(projectRoot, 'dist');
if (existsSync(distDir)) {
  console.log('   ✅ dist directory exists (run npm run build if outdated)');
} else {
  console.log('   ⚠️  dist directory not found (run npm run build)');
}

console.log('\n📋 Next Steps:');
console.log('   1. Run: npm run build');
console.log('   2. Run: npm run preview');
console.log('   3. Test locally before deploying');
console.log('   4. Set environment variables in your deployment platform');
console.log('   5. Deploy and check browser console for errors');

console.log('\n📚 For detailed troubleshooting, see DEPLOYMENT.md');