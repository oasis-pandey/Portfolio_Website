#!/bin/bash

# Simple deployment script for Oasis Pandey Portfolio
# Make this file executable: chmod +x deploy.sh

echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found. Please run this script from the project root directory."
    exit 1
fi

echo "📁 Current directory: $(pwd)"

# Option selection
echo ""
echo "Select deployment option:"
echo "1) Deploy to Netlify (drag & drop)"
echo "2) Deploy to Vercel"
echo "3) Deploy to GitHub Pages"
echo "4) Create production build"
echo "5) Run local server for testing"

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo "📦 Preparing files for Netlify..."
        echo "1. Zip your project folder"
        echo "2. Go to https://app.netlify.com/drop"
        echo "3. Drag and drop the zip file"
        echo "4. Your site will be live!"
        ;;
    2)
        echo "🔧 Deploying to Vercel..."
        if command -v vercel &> /dev/null; then
            vercel
        else
            echo "❌ Vercel CLI not found. Install with: npm install -g vercel"
            echo "Then run: vercel"
        fi
        ;;
    3)
        echo "📚 GitHub Pages deployment:"
        echo "1. Push your code to GitHub"
        echo "2. Go to repository Settings → Pages"
        echo "3. Select 'Deploy from a branch' → main"
        echo "4. Your site will be at: https://username.github.io/repository-name"
        ;;
    4)
        echo "🏗️ Creating production build..."
        
        # Create dist directory
        mkdir -p dist
        
        # Copy files
        cp index.html dist/
        cp -r styles dist/
        cp -r js dist/
        cp -r assets dist/
        cp manifest.json dist/
        
        # Minify CSS (if uglify-css is installed)
        if command -v uglifycss &> /dev/null; then
            echo "📦 Minifying CSS..."
            uglifycss dist/styles/main.css > dist/styles/main.min.css
            sed -i 's/main.css/main.min.css/g' dist/index.html
        fi
        
        # Minify JS (if uglify-js is installed)
        if command -v uglifyjs &> /dev/null; then
            echo "📦 Minifying JavaScript..."
            uglifyjs dist/js/main.js -o dist/js/main.min.js
            sed -i 's/main.js/main.min.js/g' dist/index.html
        fi
        
        echo "✅ Production build created in 'dist' directory"
        echo "📁 Ready to upload to any web hosting service"
        ;;
    5)
        echo "🌐 Starting local server..."
        
        # Try different server options
        if command -v python3 &> /dev/null; then
            echo "Starting Python 3 server on http://localhost:8000"
            python3 -m http.server 8000
        elif command -v python &> /dev/null; then
            echo "Starting Python 2 server on http://localhost:8000"
            python -m SimpleHTTPServer 8000
        elif command -v http-server &> /dev/null; then
            echo "Starting Node.js server on http://localhost:8080"
            http-server
        else
            echo "❌ No suitable server found. Please install:"
            echo "   - Python 3: python3 -m http.server 8000"
            echo "   - Node.js http-server: npm install -g http-server"
            echo "   - Or use VS Code Live Server extension"
        fi
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "✨ Deployment process completed!"
echo "📋 For more details, check the README.md file."
