# Production Deployment Troubleshooting Guide

## Common Issues and Solutions

### 1. Blank Page/White Screen

**Symptoms**: The site loads but shows a blank white page.

**Causes & Solutions**:

- **Missing Environment Variables**:
  - Check that `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set in your deployment platform
  - Ensure variables are set for all environments (Production, Preview, Development)
  - Variable names must be exact (case-sensitive)

- **JavaScript Errors**:
  - Open browser DevTools > Console tab
  - Look for red error messages
  - Common errors: "Cannot read property of undefined", "Module not found"

- **Build Issues**:
  - Check deployment logs for build errors
  - Ensure all dependencies are installed correctly
  - TypeScript compilation errors will prevent the app from starting

### 2. Network/API Errors

**Symptoms**: App loads but features don't work, API calls fail.

**Solutions**:
- Verify Supabase project is active and accessible
- Check Supabase URL format: `https://your-project-id.supabase.co`
- Ensure database tables exist and RLS policies are configured
- Check browser Network tab for failed requests

### 3. Routing Issues

**Symptoms**: Direct links to pages return 404 errors.

**Solutions**:
- Ensure `vercel.json` has proper rewrite rules (already configured)
- For other platforms, configure redirects to `/index.html`

### 4. Environment Variable Issues

**Symptoms**: "Missing VITE_SUPABASE_URL environment variable" error.

**Solutions**:
- Environment variables must be prefixed with `VITE_` for Vite
- Set variables in your deployment platform's environment settings
- Redeploy after adding environment variables

## Debugging Steps

1. **Check Browser Console**: Open DevTools (F12) and look for errors
2. **Check Network Tab**: Look for failed HTTP requests
3. **Check Deployment Logs**: Review build and deployment logs
4. **Test Locally**: Run `npm run build && npm run preview` to test production build
5. **Verify Environment**: Check that all required environment variables are set

## Getting Help

If you're still experiencing issues:
1. Check the error message in the browser console
2. Review the deployment logs
3. Ensure all environment variables are correctly set
4. Try deploying from a clean branch

## Environment Variables Checklist

Make sure these are set in your deployment platform:

- [ ] `VITE_SUPABASE_URL` - Your Supabase project URL
- [ ] `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

## Vercel Specific

For Vercel deployments:
1. Go to Project Settings > Environment Variables
2. Add variables for Production, Preview, and Development
3. Redeploy after adding variables

## Testing Production Build Locally

```bash
# Build the application
npm run build

# Preview the production build
npm run preview

# Check for any errors in the terminal or browser console
```