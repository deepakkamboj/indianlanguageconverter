# Indian Language Converter 🇮🇳

[![Next.js](https://img.shields.io/badge/Next.js-16.1.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](./LICENSE)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Live-success?style=for-the-badge&logo=github)](https://deepakkamboj.github.io/indianlanguageconverter/)

A comprehensive web application for converting text between various Indian language fonts and Unicode formats. Built with Next.js 16 and modern web technologies.

**🌐 Live Demo:** [https://deepakkamboj.github.io/indianlanguageconverter/](https://deepakkamboj.github.io/indianlanguageconverter/)

## ✨ Features

### 🔄 Font Converters
- **Kruti Dev ⇔ Unicode ⇔ Chanakya** - Three-way Hindi font conversion
- **Nepali Font Converter** - Preeti to Unicode and vice versa
- Support for legacy fonts to modern Unicode standards

### 🎨 Text Formatting Tools
- **WhatsApp Formatter** - Bold, italic, strikethrough, monospace formatting
- **LinkedIn Formatter** - Professional post formatting with Unicode styles
- **Bold Text Generator** - 25+ Unicode text styles (bold, italic, script, subscript, etc.)

### 🎯 Additional Tools
- **Emoji Assistant** - Searchable emoji library with categories
- Toast notifications for better UX
- Copy-to-clipboard functionality across all tools

## 🚀 Tech Stack

- **Framework**: Next.js 16.1.3 (App Router, Turbopack)
- **UI Library**: React 19.2.3
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Components**: Radix UI (Select, Tabs, ScrollArea, etc.)
- **Icons**: Lucide React
- **Deployment**: GitHub Pages (Static Export)

## 📦 Getting Started

### Prerequisites
- Node.js 20 or higher
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/deepakkamboj/indianlanguageconverter.git
cd indianlanguageconverter

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
# Create optimized production build
npm run build

# The static site will be exported to the 'out' directory
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (static export)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📂 Project Structure

```
indian-language-converter-app/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── tools/        # Individual tool pages
│   │   ├── converter/    # Main converter page
│   │   └── docs/         # Documentation
│   ├── components/       # React components
│   │   ├── layout/       # Layout components
│   │   └── ui/           # UI components (Radix UI)
│   ├── lib/              # Utility functions & converters
│   │   └── converters/   # Font conversion libraries
│   └── data/             # Static data (emojis, etc.)
├── public/               # Static assets
└── .github/workflows/    # GitHub Actions for deployment
```

## 🌐 Deployment

This project is configured for automatic deployment to GitHub Pages:

1. Push to `main` branch
2. GitHub Actions builds and deploys automatically
3. Live at `https://deepakkamboj.github.io/indianlanguageconverter/`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 🔤 Supported Conversions

### Hindi Fonts
- Kruti Dev 010 → Unicode (Mangal, Arial Unicode)
- Unicode → Kruti Dev 010
- Chanakya → Unicode
- Unicode → Chanakya
- Kruti Dev ⇔ Chanakya (via Unicode)

### Nepali Fonts
- Preeti → Unicode
- Unicode → Preeti

### Text Formatting
- Unicode Mathematical Bold Sans-Serif
- Unicode Mathematical Italic
- Unicode Subscript & Superscript
- Unicode Script styles
- And 20+ more styles

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

Original font conversion algorithms are also covered under GNU General Public License v2.

## 🙏 Acknowledgments

- Font conversion algorithms ported from original JavaScript implementations
- Built with modern React and Next.js best practices
- UI components from Radix UI and shadcn/ui inspiration

## 📞 Support

For issues and questions, please use the [GitHub Issues](https://github.com/deepakkamboj/indianlanguageconverter/issues) page.

---

**Live App:** [https://deepakkamboj.github.io/indianlanguageconverter/](https://deepakkamboj.github.io/indianlanguageconverter/)

Made with ❤️ for Indian language users
