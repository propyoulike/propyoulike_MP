# PropYoulike WordPress Theme Integration Guide

This React application has been built to be easily integrated as a WordPress theme. Here's how to convert it:

## File Structure for WordPress Theme

```
propyoulike-theme/
├── style.css (WordPress theme header)
├── index.php (Main template)
├── functions.php (Theme functions)
├── header.php (Header template)
├── footer.php (Footer template)
├── page-properties.php (Properties page template)
├── page-about.php (About page template)
├── assets/
│   ├── css/ (Compiled CSS)
│   ├── js/ (Compiled JavaScript)
│   └── images/ (Theme images)
└── inc/ (Custom post types and functions)
```

## WordPress Theme Header (style.css)

```css
/*
Theme Name: PropYoulike Real Estate
Description: A modern real estate theme for property listings and real estate businesses
Author: PropYoulike Team
Version: 1.0.0
License: GPL v2 or later
Text Domain: propyoulike
*/
```

## Custom Post Types Needed

1. **Properties** (`properties`)
   - Fields: Price, Location, Type, Area, Developer, Images, Features
   
2. **Projects** (`projects`)
   - Fields: Project Name, Developer, Location, Price Range, Completion Date
   
3. **Developers** (`developers`)
   - Fields: Developer Name, Description, Projects, Contact Info

## Required WordPress Plugins

1. **Advanced Custom Fields (ACF)** - For property custom fields
2. **Contact Form 7** - For contact forms
3. **Yoast SEO** - For SEO optimization
4. **WP Property Search** - For property filtering

## Key Components Mapping

- `Header.tsx` → `header.php`
- `Footer.tsx` → `footer.php`  
- `HeroSection.tsx` → Home page hero section
- `PropertyCard.tsx` → Property listing loop
- `PropertyListings.tsx` → Properties archive template
- `ServicesSection.tsx` → Services page template

## Database Schema for Properties

```sql
-- Property Custom Fields
wp_postmeta entries:
- property_price
- property_location
- property_type
- property_area
- property_developer
- property_possession
- property_configuration
- property_features (serialized array)
- property_gallery (image IDs)
```

## WordPress Functions to Add

```php
// Custom post type registration
function register_property_post_type() {
    register_post_type('properties', [
        'label' => 'Properties',
        'public' => true,
        'supports' => ['title', 'editor', 'thumbnail'],
        'has_archive' => true,
        'rewrite' => ['slug' => 'properties'],
    ]);
}
add_action('init', 'register_property_post_type');

// Property search functionality
function property_search_filter() {
    // AJAX search implementation
}

// Property inquiry form handler
function handle_property_inquiry() {
    // Contact form processing
}
```

## SEO Integration

- Custom meta titles for property pages
- Schema.org markup for properties
- Breadcrumb navigation
- XML sitemap integration

## Performance Optimizations

- Image lazy loading
- CSS/JS minification
- Caching compatibility
- Mobile responsiveness

## Theme Customization Options

- Color scheme customizer
- Logo upload
- Contact information
- Social media links
- Homepage sections toggle

## Installation Instructions

1. Build the React app: `npm run build`
2. Copy build files to WordPress theme folder
3. Create PHP templates using the component structure
4. Install required plugins
5. Import demo content
6. Configure theme settings

## Demo Content Import

- Sample properties (50+ listings)
- Sample projects (10+ projects)
- Sample pages (About, Services, Contact)
- Sample blog posts
- Theme customizer settings

This structure ensures the WordPress theme maintains all the functionality and design of the React application while being fully WordPress-compatible.