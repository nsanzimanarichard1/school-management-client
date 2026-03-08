# 🛠️ Helpful Commands Reference

## Quick Commands

### Setup Commands

```bash
# Automated setup (Windows)
setup.bat

# Manual setup - Client App
cd client-app
copy .env.example .env
npm install
npm run dev

# Manual setup - Admin App
cd admin-app
copy .env.example .env
npm install
npm run dev
```

---

## Development Commands

### Client App (Port 5173)

```bash
# Navigate to client app
cd client-app

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Clean install (if issues)
rm -rf node_modules package-lock.json
npm install
```

### Admin App (Port 5174)

```bash
# Navigate to admin app
cd admin-app

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Clean install (if issues)
rm -rf node_modules package-lock.json
npm install
```

---

## Running Both Apps Simultaneously

### Option 1: Two Terminals

**Terminal 1 - Client App:**
```bash
cd client-app
npm run dev
```

**Terminal 2 - Admin App:**
```bash
cd admin-app
npm run dev
```

### Option 2: Using npm-run-all (Optional)

```bash
# Install npm-run-all globally
npm install -g npm-run-all

# Create a script in root package.json
# Then run:
npm run dev:all
```

---

## Git Commands

### Initial Setup

```bash
# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "feat: initial commit - school management system frontend"

# Add remote repository
git remote add origin https://github.com/yourusername/school-management-frontend.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Regular Workflow

```bash
# Check status
git status

# Add specific files
git add client-app/src/pages/Dashboard.jsx

# Add all changes
git add .

# Commit with message
git commit -m "feat: add dashboard statistics"

# Push to remote
git push

# Pull latest changes
git pull

# Create new branch
git checkout -b feature/new-feature

# Switch branches
git checkout main

# Merge branch
git merge feature/new-feature
```

### Useful Git Commands

```bash
# View commit history
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard all local changes
git reset --hard HEAD

# View differences
git diff

# View remote URL
git remote -v

# Clone repository
git clone https://github.com/yourusername/repo.git
```

---

## NPM Commands

### Package Management

```bash
# Install all dependencies
npm install

# Install specific package
npm install axios

# Install dev dependency
npm install -D vite

# Uninstall package
npm uninstall package-name

# Update packages
npm update

# Check for outdated packages
npm outdated

# Audit for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

### Useful NPM Commands

```bash
# List installed packages
npm list --depth=0

# Clear npm cache
npm cache clean --force

# View package info
npm info react

# Run custom script
npm run custom-script

# Check npm version
npm --version

# Update npm
npm install -g npm@latest
```

---

## Troubleshooting Commands

### Port Issues

```bash
# Check what's running on port 5173
netstat -ano | findstr :5173

# Kill process on port (Windows)
npx kill-port 5173

# Kill process on port (Linux/Mac)
lsof -ti:5173 | xargs kill
```

### Node/NPM Issues

```bash
# Check Node version
node --version

# Check NPM version
npm --version

# Clear npm cache
npm cache clean --force

# Reinstall node_modules
rm -rf node_modules package-lock.json
npm install

# Use specific Node version (with nvm)
nvm use 16
```

### Build Issues

```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Clear build folder
rm -rf dist

# Rebuild
npm run build

# Check for errors
npm run build --verbose
```

---

## Environment Commands

### Environment Variables

```bash
# Copy example env file (Windows)
copy .env.example .env

# Copy example env file (Linux/Mac)
cp .env.example .env

# View environment variables (Windows)
set

# View environment variables (Linux/Mac)
printenv

# Set environment variable (Windows)
set VITE_API_URL=http://localhost:5000/api

# Set environment variable (Linux/Mac)
export VITE_API_URL=http://localhost:5000/api
```

---

## Testing Commands (Optional)

### If you add testing

```bash
# Install testing libraries
npm install -D vitest @testing-library/react @testing-library/jest-dom

# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test Dashboard.test.jsx
```

---

## Deployment Commands

### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

### Manual Deployment

```bash
# Build for production
npm run build

# The dist/ folder contains your production files
# Upload this folder to your hosting service
```

---

## Useful VS Code Commands

### Terminal Commands

```bash
# Open VS Code in current directory
code .

# Open specific file
code client-app/src/App.jsx

# Open folder
code client-app

# Install VS Code extensions
code --install-extension extension-name
```

---

## Database Commands (For Backend)

### MongoDB (When you setup backend)

```bash
# Start MongoDB (Windows)
net start MongoDB

# Stop MongoDB (Windows)
net stop MongoDB

# Connect to MongoDB
mongo

# Or with MongoDB Compass (GUI)
# Connection string: mongodb://localhost:27017
```

---

## Docker Commands (Optional)

### If you dockerize the apps

```bash
# Build Docker image
docker build -t school-client-app .

# Run Docker container
docker run -p 5173:5173 school-client-app

# View running containers
docker ps

# Stop container
docker stop container-id

# Remove container
docker rm container-id

# View logs
docker logs container-id
```

---

## Performance Commands

### Bundle Analysis

```bash
# Install bundle analyzer
npm install -D rollup-plugin-visualizer

# Build and analyze
npm run build

# The analysis will be in stats.html
```

### Lighthouse Audit

```bash
# Install Lighthouse
npm install -g lighthouse

# Run audit
lighthouse http://localhost:5173 --view
```

---

## Useful Shortcuts

### VS Code Shortcuts

```
Ctrl + `          - Toggle terminal
Ctrl + P          - Quick file open
Ctrl + Shift + P  - Command palette
Ctrl + /          - Toggle comment
Ctrl + D          - Select next occurrence
Alt + Up/Down     - Move line up/down
Ctrl + Shift + K  - Delete line
F2                - Rename symbol
```

### Browser DevTools

```
F12               - Open DevTools
Ctrl + Shift + C  - Inspect element
Ctrl + Shift + J  - Open console
Ctrl + Shift + M  - Toggle device toolbar
Ctrl + R          - Reload page
Ctrl + Shift + R  - Hard reload
```

---

## Quick Reference URLs

```bash
# Client App
http://localhost:5173

# Admin App
http://localhost:5174

# Backend API (when setup)
http://localhost:5000/api

# MongoDB (when setup)
mongodb://localhost:27017
```

---

## Emergency Commands

### If Everything Breaks

```bash
# Nuclear option - start fresh
rm -rf node_modules package-lock.json dist
npm cache clean --force
npm install
npm run dev
```

### If Git Breaks

```bash
# Reset to last commit
git reset --hard HEAD

# Reset to specific commit
git reset --hard commit-hash

# Discard all changes
git checkout .
```

---

## Helpful Aliases (Optional)

### Add to your shell profile

```bash
# Bash/Zsh aliases
alias client="cd client-app && npm run dev"
alias admin="cd admin-app && npm run dev"
alias install-all="cd client-app && npm install && cd ../admin-app && npm install"
alias build-all="cd client-app && npm run build && cd ../admin-app && npm run build"
```

---

## Documentation Commands

### Generate Documentation (Optional)

```bash
# Install JSDoc
npm install -g jsdoc

# Generate docs
jsdoc -c jsdoc.json
```

---

## Monitoring Commands

### Check Application Health

```bash
# Check if app is running
curl http://localhost:5173

# Check API endpoint
curl http://localhost:5000/api/health

# Monitor logs
tail -f logs/app.log
```

---

## Backup Commands

### Backup Your Work

```bash
# Create backup
tar -czf backup-$(date +%Y%m%d).tar.gz client-app admin-app

# Restore backup
tar -xzf backup-20240101.tar.gz
```

---

**Pro Tip**: Save this file for quick reference during development!

---

*Last Updated: 2024*
