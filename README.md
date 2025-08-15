# Anand Jaiswal - Portfolio Website

A beautiful, modern, and creative developer portfolio website built with Next.js, featuring dynamic animations, glassmorphism design, and a comprehensive blog system.

## ✨ Features

### 🎨 Design & UI
- **Modern Glassmorphism & Neumorphism** effects
- **Dynamic Animations** with Framer Motion
- **Parallax Effects** for immersive scrolling
- **Creative Grids & Layouts** for visual appeal
- **Responsive Design** optimized for all devices
- **Dark/Light/System Theme** toggle

### 🚀 Pages & Sections
- **Homepage** with hero section, skills preview, and featured projects
- **About Page** with personal story, timeline, and detailed skills
- **Projects Page** with filtering and interactive project cards
- **Blog System** with markdown support and dynamic routing
- **Responsive Navigation** with mobile-friendly menu

### 🛠️ Technical Features
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Icons** for consistent iconography
- **Markdown Blog** system with gray-matter
- **Performance Optimized** with lazy loading and animations
- **SEO Optimized** with proper meta tags

## 🎯 Design Philosophy

The website embodies modern web design principles:
- **Dynamic Animations**: Smooth, purposeful animations that enhance UX
- **Parallax Effects**: Subtle depth and movement for visual interest
- **Glassmorphism**: Translucent elements with backdrop blur effects
- **Neumorphism**: Soft, extruded design elements
- **Creative Layouts**: Asymmetric grids and floating elements

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/anandjaiswal/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
bun install
# or
npm install
```

3. Start the development server:
```bash
bun dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── blog/              # Blog pages and dynamic routes
│   ├── projects/          # Projects showcase
│   ├── globals.css        # Global styles and theme variables
│   └── layout.tsx         # Root layout with navigation and footer
├── components/            # Reusable React components
│   ├── sections/          # Page sections (hero, skills, etc.)
│   ├── ui/               # UI components (buttons, cards, etc.)
│   ├── navigation.tsx     # Main navigation component
│   └── footer.tsx         # Footer component
├── content/              # Markdown content
│   └── blog/             # Blog posts in markdown format
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and blog processing
└── public/               # Static assets
```

## 📝 Adding Blog Posts

Create new blog posts by adding markdown files to the `content/blog/` directory:

```markdown
---
title: "Your Blog Post Title"
date: "2024-01-15"
excerpt: "A brief description of your post"
author: "Anand Jaiswal"
tags: ["Next.js", "React", "Web Development"]
featured: true
---

# Your Blog Content

Write your blog content here using markdown syntax.
```

## 🎨 Customization

### Colors & Themes
Edit the CSS variables in `app/globals.css` to customize the color scheme:

```css
:root {
  --color-primary: #ed6028;
  --color-accent: #f17f51;
  /* Add your custom colors */
}
```

### Content
- Update personal information in the components
- Replace placeholder project data with your actual projects
- Add your social media links and contact information

## 🚀 Deployment

The website is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration!

For other platforms, build the project:
```bash
bun run build
# or
npm run build
```

## 📱 Performance Features

- **Optimized Images** with Next.js Image component
- **Lazy Loading** for animations and content
- **Code Splitting** automatic with Next.js
- **Performance Monitoring** hooks for metrics
- **Responsive Design** with mobile-first approach

## 🎯 SEO Features

- **Meta Tags** optimized for search engines
- **Open Graph** tags for social media sharing
- **Structured Data** for better search results
- **Sitemap** generation (can be added)
- **Fast Loading** for better search rankings

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Next.js** team for the amazing framework
- **Framer Motion** for smooth animations
- **Tailwind CSS** for utility-first styling
- **React Icons** for beautiful icons

---

Built with ❤️ by [Anand Jaiswal](https://github.com/anandjaiswal)