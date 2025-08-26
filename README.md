# Oasis Pandey - Portfolio Website

A modern, responsive, and performance-optimized personal portfolio website built with clean HTML5, CSS3, and vanilla JavaScript. Features a minimalist design with smooth animations and excellent user experience.

## ✨ Features

- **Modern Design**: Clean, minimalist interface with professional aesthetics
- **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **Performance Optimized**: Fast loading times with lazy loading and efficient code
- **SEO Friendly**: Proper meta tags, semantic HTML, and structured data
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Interactive Elements**: Smooth scrolling, typing animations, and accordion skills section
- **Contact Form**: Functional contact form with validation
- **Cross-browser Compatible**: Works on all modern browsers

## 🚀 Quick Start

### Prerequisites

- A modern web browser
- A text editor (VS Code recommended)
- Basic knowledge of HTML/CSS/JavaScript (for customization)

### Installation

1. **Clone or download** this repository to your local machine
2. **Navigate** to the project directory
3. **Open** `index.html` in your web browser or use a local server

### Using a Local Server (Recommended)

For the best development experience, use a local server:

#### Option 1: VS Code Live Server Extension
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html` and select "Open with Live Server"

#### Option 2: Python HTTP Server
```bash
# Navigate to project directory
cd path/to/portfolio-website

# Python 3
python -m http.server 3000

# Python 2
python -m SimpleHTTPServer 3000
```

#### Option 3: Node.js HTTP Server
```bash
# Install http-server globally
npm install -g http-server

# Navigate to project directory and start server
cd path/to/portfolio-website
http-server -p 3000
```

Then open `http://localhost:3000` in your browser.

## 🛠️ Customization

### Personal Information

1. **Update HTML content** in `index.html`:
   - Change name, title, and description
   - Update social media links
   - Modify contact information
   - Add your projects and experience

2. **Replace placeholder images**:
   - Add your profile photo
   - Add project screenshots in `/assets/` directory
   - Update image paths in HTML

3. **Customize colors** in `styles/main.css`:
   - Modify CSS variables in the `:root` section
   - Change `--hue-color` for different color schemes

### Content Sections

#### About Section
- Update the description and statistics
- Add your resume PDF to `/assets/` directory
- Update the download link

#### Skills Section
- Modify skill categories and percentages
- Add or remove technologies
- Update progress bar widths in CSS

#### Projects Section
- Replace with your actual projects
- Update project descriptions and technologies
- Add live demo and GitHub links

#### Contact Section
- Update contact information
- Configure form submission (see Form Setup section)

### Styling

The website uses CSS custom properties for easy theming:

```css
:root {
  --hue-color: 230; /* Change this for different color schemes */
  --primary-color: hsl(var(--hue-color), 69%, 61%);
  /* Other color variables... */
}
```

Popular color schemes:
- Blue: `--hue-color: 230`
- Purple: `--hue-color: 270`
- Green: `--hue-color: 142`
- Orange: `--hue-color: 25`

## 📧 Contact Form Setup

The contact form includes client-side validation. For full functionality, you'll need to set up server-side processing:

### Option 1: Formspree (Recommended for beginners)
1. Sign up at [Formspree.io](https://formspree.io)
2. Create a new form and get your endpoint URL
3. Update the form action in `index.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="contact__form" id="contact-form">
   ```

### Option 2: Netlify Forms (for Netlify hosting)
1. Add `netlify` attribute to the form:
   ```html
   <form netlify class="contact__form" id="contact-form">
   ```

### Option 3: Custom Backend
Implement your own backend using:
- Node.js with Express and Nodemailer
- PHP with mail() function
- Python with Flask/Django
- Any serverless function (Vercel, Netlify Functions, etc.)

## 🌐 Deployment

### Option 1: Netlify (Recommended)
1. **Drag and drop** your project folder to [Netlify Drop](https://app.netlify.com/drop)
2. **Or connect your Git repository**:
   - Push code to GitHub/GitLab
   - Connect repository in Netlify dashboard
   - Deploy automatically on commits

### Option 2: Vercel
1. Install Vercel CLI: `npm install -g vercel`
2. Navigate to project directory: `cd path/to/portfolio-website`
3. Deploy: `vercel` and follow prompts

### Option 3: GitHub Pages
1. **Push code** to a GitHub repository
2. **Go to repository Settings** → Pages
3. **Select source**: Deploy from main branch
4. **Access** at: `https://username.github.io/repository-name`

### Option 4: Traditional Web Hosting
1. **Compress** project files into a ZIP
2. **Upload** to your web hosting provider
3. **Extract** files to public_html or www directory

## 📱 PWA Setup (Optional)

To make your portfolio installable as a PWA:

1. **Create `manifest.json`**:
```json
{
  "name": "Oasis Pandey Portfolio",
  "short_name": "OP Portfolio",
  "description": "Software Developer Portfolio",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#6366f1",
  "icons": [
    {
      "src": "assets/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

2. **Add to HTML head**:
```html
<link rel="manifest" href="manifest.json">
```

3. **Create service worker** for offline functionality

## 🔧 Performance Optimization

The website is already optimized for performance:

- **Minified CSS/JS** (for production)
- **Lazy loading** for images
- **Optimized fonts** with font-display: swap
- **Efficient animations** with will-change
- **Debounced scroll events**
- **Critical CSS** inlined

### Further Optimizations:
1. **Compress images** using tools like TinyPNG or ImageOptim
2. **Use WebP format** with JPG fallbacks
3. **Implement CDN** for static assets
4. **Add Gzip compression** on server
5. **Minify HTML/CSS/JS** for production

## 🧪 Testing

### Cross-browser Testing
Test on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance Testing
- **Lighthouse** (built into Chrome DevTools)
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/

### Accessibility Testing
- **WAVE**: https://wave.webaim.org/
- **axe DevTools**: Browser extension
- **Lighthouse Accessibility** audit

## 📁 Project Structure

```
portfolio-website/
├── index.html              # Main HTML file
├── styles/
│   └── main.css            # Main stylesheet
├── js/
│   └── main.js             # JavaScript functionality
├── assets/
│   ├── favicon.svg         # Site favicon
│   ├── project1.jpg        # Project images (add yours)
│   ├── project2.jpg
│   ├── project3.jpg
│   └── Oasis-Pandey-Resume.pdf  # Resume file (add yours)
└── README.md               # This file
```

## 🎨 Design System

### Colors
- **Primary**: #6366F1 (Indigo)
- **Secondary**: Calculated from primary hue
- **Text**: Dark gray (#1F2937)
- **Background**: White/Light gray

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semi-bold)

### Spacing
- **Base unit**: 0.25rem (4px)
- **Common spacing**: 1rem, 1.5rem, 2rem, 3rem

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you make improvements that could benefit others, consider submitting a pull request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

If you have questions or need help customizing your portfolio:

1. **Check this README** for common solutions
2. **Review the code comments** for implementation details
3. **Create an issue** on GitHub for bugs or feature requests

## 🎯 Browser Support

- **Chrome**: ✅ Latest 2 versions
- **Firefox**: ✅ Latest 2 versions  
- **Safari**: ✅ Latest 2 versions
- **Edge**: ✅ Latest 2 versions
- **IE**: ❌ Not supported

## 📊 Performance Metrics

Target performance scores:
- **Performance**: 95+ (Lighthouse)
- **Accessibility**: 100 (Lighthouse)
- **Best Practices**: 95+ (Lighthouse)
- **SEO**: 100 (Lighthouse)

---

**Built with ❤️ by Oasis Pandey**

*Last updated: August 2025*
