# OAuth Configuration Setup

## Issue Summary
GitHub's push protection blocks commits containing OAuth credentials, preventing proper deployment configuration.

## Current Solution
1. Created `src/config/oauth.js` file containing OAuth credentials
2. Added this file to `.gitignore` to prevent GitHub blocking
3. Updated code to import credentials from this config file
4. Set environment variables in Fly.io using `fly secrets set`

## Files Modified
- `.gitignore` - Added `src/config/oauth.js`
- `src/pages/Integrations.tsx` - Updated to use OAUTH_CONFIG
- `src/App.tsx` - Updated to use OAUTH_CONFIG

## Environment Variables Required
```bash
REACT_APP_GOOGLE_CLIENT_ID=<your-google-client-id>
REACT_APP_GOOGLE_CLIENT_SECRET=<your-google-client-secret>
```

## Deployment
Environment variables are set in Fly.io using:
```bash
fly secrets set REACT_APP_GOOGLE_CLIENT_ID="..." REACT_APP_GOOGLE_CLIENT_SECRET="..."
```

## Note
The `src/config/oauth.js` file must be manually created on each new development environment with the correct credentials.