# Netlify Deployment Guide

This guide will help you deploy the Task Manager web application to Netlify.

## Prerequisites

- A [Netlify](https://www.netlify.com/) account (free tier available)
- A GitHub account with access to this repository

## Deployment Options

### Option 1: One-Click Deploy (Easiest)

You can deploy this application to Netlify with a single click using the button below:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Jlymoure25/PY.FILE1)

### Option 2: Deploy via Netlify Dashboard

1. **Login to Netlify**
   - Go to [https://app.netlify.com](https://app.netlify.com)
   - Sign in with your GitHub account

2. **Import Your Repository**
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub" as your Git provider
   - Authorize Netlify to access your GitHub repositories
   - Select the `PY.FILE1` repository

3. **Configure Build Settings**
   - Netlify will automatically detect the `netlify.toml` file
   - Build command: (leave empty - static site)
   - Publish directory: `.` (current directory)
   - Click "Deploy site"

4. **Wait for Deployment**
   - Netlify will build and deploy your site
   - This usually takes 30-60 seconds
   - You'll see a live URL once deployment is complete

5. **Custom Domain (Optional)**
   - Click "Domain settings"
   - Add a custom domain or use the provided `.netlify.app` subdomain

### Option 3: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```
   This will open a browser window for authentication.

3. **Initialize Your Site**
   ```bash
   cd /path/to/PY.FILE1
   netlify init
   ```
   Follow the prompts to create a new site or link to an existing one.

4. **Deploy Your Site**
   
   For a draft deploy (preview):
   ```bash
   netlify deploy
   ```
   
   For production:
   ```bash
   netlify deploy --prod
   ```

### Option 4: Continuous Deployment with GitHub

1. **Connect Repository to Netlify**
   - Follow steps 1-3 from Option 2

2. **Enable Continuous Deployment**
   - Once connected, Netlify automatically deploys on every push to your main branch
   - Pull request previews are also generated automatically

3. **Automatic Deployments**
   - Push to main branch → Production deployment
   - Create pull request → Preview deployment
   - All deployments are automatic!

## Configuration Details

The `netlify.toml` file includes:

### Build Settings
- **Publish directory**: `.` (root directory)
- No build command needed (static files)

### Security Headers
- `X-Frame-Options`: Prevents clickjacking attacks
- `X-Content-Type-Options`: Prevents MIME sniffing
- `X-XSS-Protection`: Enables XSS filter
- `Referrer-Policy`: Controls referrer information
- `Permissions-Policy`: Restricts browser features

### Performance Optimizations
- HTML files: No caching (always fresh)
- CSS/JS files: 1-year cache with immutable flag
- Single Page Application (SPA) routing support

## Post-Deployment

### View Your Site
After deployment, your site will be available at:
- `https://[your-site-name].netlify.app`
- Or your custom domain if configured

### Monitor Deployments
- View deployment logs in the Netlify dashboard
- Check analytics and performance metrics
- Set up notifications for deployment status

### Update Your Site
To update your deployed site:
1. Make changes to your code
2. Commit and push to GitHub
3. Netlify automatically deploys the changes

## Troubleshooting

### Deployment Failed
- Check the deployment logs in Netlify dashboard
- Verify all files are committed to the repository
- Ensure `netlify.toml` is in the root directory

### 404 Errors
- The `netlify.toml` includes SPA routing configuration
- All routes redirect to `index.html` with status 200

### Local Testing
Test your site locally before deploying:
```bash
# Using Python
python3 -m http.server 8080

# Or using Netlify Dev
netlify dev
```

Then visit `http://localhost:8080` in your browser.

## Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify CLI Documentation](https://cli.netlify.com/)
- [Netlify Community Forums](https://answers.netlify.com/)

## Support

If you encounter issues:
1. Check the [Netlify Status Page](https://www.netlifystatus.com/)
2. Review [Netlify Support Guides](https://docs.netlify.com/support/)
3. Open an issue in this repository

---

**Happy Deploying! 🚀**
