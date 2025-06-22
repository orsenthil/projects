# Technical Portfolio Website

A modern, accessible, and professional portfolio website built with Bulma CSS framework. Designed for technical professionals to showcase their projects in a clean, 3x3 grid layout with hover effects and comprehensive accessibility features.

## 🌟 Features

### Design & Layout
- **Modern Design**: Clean, professional aesthetic using Bulma CSS framework
- **3x3 Grid System**: Organized project display with responsive layout
- **Hover Effects**: Interactive project cards with smooth animations
- **Gradient Hero Section**: Eye-catching landing area with grid pattern overlay
- **Responsive Design**: Optimized for all device sizes

### Accessibility Features
- **WCAG 2.1 AA Compliant**: Full accessibility standards compliance
- **Keyboard Navigation**: Complete keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators and logical tab order
- **High Contrast Support**: Enhanced visibility for users with visual impairments
- **Reduced Motion**: Respects user's motion preferences
- **Voice Navigation**: Optimized for voice control software

### Technical Features
- **Semantic HTML5**: Proper document structure and meaning
- **CSS Custom Properties**: Modern CSS with custom variables
- **JavaScript Enhancements**: Interactive functionality without dependencies
- **Performance Optimized**: Fast loading with lazy image loading
- **Cross-browser Compatible**: Works across all modern browsers
- **Print-friendly**: Optimized print styles

## 🚀 Getting Started

### Prerequisites
- Modern web browser
- Local web server (optional, for development)

### Installation

1. **Clone or Download**
   ```bash
   git clone <repository-url>
   cd technical-portfolio
   ```

2. **Open in Browser**
   - Simply open `index.html` in your web browser
   - Or serve with a local server for development

3. **Customize Content**
   - Edit `index.html` to update project information
   - Modify `styles.css` for custom styling
   - Update `script.js` for additional functionality

## 📁 Project Structure

```
technical-portfolio/
├── index.html          # Main HTML file
├── styles.css          # Custom CSS styles
├── script.js           # JavaScript functionality
├── README.md           # Project documentation
└── assets/             # Images and other assets (optional)
```

## 🎨 Customization

### Adding Projects
To add a new project to the 3x3 grid:

1. **Duplicate a project card** in `index.html`
2. **Update the content**:
   ```html
   <div class="card project-card" tabindex="0" role="button" aria-label="Your Project Name">
       <div class="card-image">
           <figure class="image is-4by3">
               <img src="your-project-image.jpg" alt="Your Project Description">
           </figure>
       </div>
       <div class="card-content">
           <div class="content">
               <h3 class="title is-4">Your Project Name</h3>
               <p class="project-description">Your project description...</p>
               <div class="tags">
                   <span class="tag is-primary">Technology 1</span>
                   <span class="tag is-info">Technology 2</span>
               </div>
           </div>
       </div>
       <footer class="card-footer">
           <a href="your-project-url" class="card-footer-item">
               <span class="icon"><i class="fas fa-external-link-alt"></i></span>
               <span>View Project</span>
           </a>
       </footer>
   </div>
   ```

### Styling Customization
- **Colors**: Modify CSS custom properties in `:root`
- **Typography**: Update font families and sizes
- **Animations**: Adjust transition timings and effects
- **Layout**: Customize grid spacing and card dimensions

### Content Updates
- **Personal Information**: Update hero section and about content
- **Contact Details**: Modify contact form and social links
- **Project Links**: Update project URLs and descriptions

## ♿ Accessibility Features

### Keyboard Navigation
- **Tab Navigation**: All interactive elements are keyboard accessible
- **Enter/Space**: Activate buttons and cards
- **Escape Key**: Close modals and dropdowns
- **Skip Links**: Jump to main content

### Screen Reader Support
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **ARIA Labels**: Descriptive labels for interactive elements
- **Alt Text**: Meaningful image descriptions
- **Form Labels**: Associated labels for form inputs

### Visual Accessibility
- **High Contrast**: Enhanced borders and focus indicators
- **Focus Indicators**: Clear visual focus states
- **Color Independence**: Information not conveyed by color alone
- **Text Scaling**: Responsive to browser text size settings

## 🌐 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Desktop**: 1024px and above
- **Tablet**: 768px to 1023px
- **Mobile**: Below 768px

## 🔧 Development

### Local Development Server
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

### Code Quality
- **HTML**: Valid HTML5 with semantic markup
- **CSS**: Modern CSS with custom properties and flexbox/grid
- **JavaScript**: Vanilla JS with modern ES6+ features
- **Performance**: Optimized for fast loading and smooth interactions

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For questions or support, please open an issue in the repository.

---

**Built with ❤️ using Bulma CSS Framework** 


---

List of Projects


https://social.learntosolveit.com/explore
https://options.learntosolveit.com/
https://introspect.learntosolveit.com/
https://teamcity.learntosolveit.com
https://lovematch.learntosolveit.com/
https://www.justdobeaver.com/
https://asimov.learntosolveit.com
https://senthil.learntosolveit.com/
https://github.com/orsenthil/obsidian-study-tracker
https://github.com/orsenthil/wikipedia-mac-wallpaper
https://github.com/orsenthil/obsidian 
https://community-courses.memrise.com/community/course/5916249/sourashtra/
https://family.thinnal.org/

### Logo Optimization

When adding logos to the portfolio, you may want to add padding for better visual balance. Use ImageMagick to add transparent padding around logos:

#### Adding Padding to Logos

```bash
# Install ImageMagick (Ubuntu/Debian)
sudo apt install imagemagick-6.q16 -y

# Add 50% padding around a logo with transparent background
convert original-logo.png -background transparent -gravity center -extent 150%x150% padded-logo.png

# For more padding, adjust the percentage
convert original-logo.png -background transparent -gravity center -extent 200%x200% more-padded-logo.png
```

**Command Breakdown:**
- `convert` - ImageMagick command for image manipulation
- `-background transparent` - Sets transparent background for added space
- `-gravity center` - Centers the original image in the new canvas
- `-extent 150%x150%` - Extends canvas size to 150% of original dimensions
- Final parameter is the output filename

**Example Usage:**
```bash
# Used for beaver logo in this portfolio
convert images/beaver-logo.png -background transparent -gravity center -extent 150%x150% images/beaver-logo-padded.png
```

This technique ensures logos appear centered with proper whitespace while maintaining the original CSS box structure and responsive design.

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom styling with CSS Grid and Flexbox
- **Bulma** - CSS framework for responsive design
- **Font Awesome** - Icon library
- **ImageMagick** - Logo optimization and padding

## File Structure

```
├── index.html          # Main portfolio page
├── styles.css          # Custom CSS styles
├── script.js          # JavaScript functionality
├── favicon.ico        # Browser favicon
├── favicon.svg        # SVG favicon
├── images/            # Project images and logos
│   ├── beaver-logo.png
│   ├── beaver-logo-padded.png
│   ├── introspect-logo.svg
│   ├── lovematch-logo.svg
│   ├── options-trading-screenshot.svg
│   └── ...
└── README.md          # This file
```

## License

This portfolio is a personal project showcasing technical work and expertise.
