# AI Dashboard - HeroUI Hackathon Project 🚀

An innovative AI-powered interface template built for the HeroUI Hackathon with the theme "AI-Powered Interfaces: Templates leveraging AI capabilities". This project showcases a modern, interactive dashboard where users can drag and drop various AI widgets into a customizable playground.

🔗 **[Live Demo: https://aiplayground.acmdom.dev/](https://aiplayground.acmdom.dev/)**

## 🏆 Hackathon Theme

**AI-Powered Interfaces**: Templates leveraging AI capabilities (chatbots, recommendation systems, etc.)

## ✨ Key Features

### 🎯 AI Widget Playground
- **Drag & Drop Interface**: Intuitive drag-and-drop system to add AI widgets to your workspace
- **Flexible Layouts**: Switch between grid view (2x2) for multiple widgets or expanded view for focused work
- **Smart Widget Selection**: Choose up to 5 widgets from a curated collection of 15 AI tools
- **Responsive Design**: Seamlessly works on desktop, tablet, and mobile devices
- **Frontend Only**: This is a frontend-only implementation showcasing UI/UX patterns (no actual AI APIs integrated)

### 🤖 Working AI Widgets

These widgets demonstrate complete UI functionality:

1. **Image Generator** 🎨 - Simulates AI image generation with prompt input and style selection (*Could integrate: DALL-E, Stable Diffusion, Midjourney APIs*)

2. **Data Analysis** 📊 - Fully functional file upload and chart visualization using Recharts (*Could integrate: OpenAI data analysis, custom ML models*)

3. **Document AI** 📄 - Working document upload interface with simulated summarization (*Could integrate: GPT-4, Claude, document processing APIs*)

4. **Music Composer** 🎵 - Interactive music creation UI with genre/mood selection and real-time audio visualization (*Could integrate: AI music generation APIs like Suno, MusicGen*)

5. **Research Helper** 🔬 - Demonstrates research paper interface with markdown rendering (*Could integrate: Academic APIs, ArXiv, citation databases*)

### 🎨 Design & UX
- **Modern Glass-morphism**: Sleek, transparent UI elements with blur effects
- **Dark Theme**: Eye-friendly dark interface perfect for extended use
- **Smooth Animations**: Framer Motion powered transitions and interactions
- **Accessibility**: Full keyboard navigation and screen reader support

## 🛠️ Technologies Used

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **UI Library**: [HeroUI v2](https://heroui.com/) - Modern React UI library
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [Tailwind Variants](https://tailwind-variants.org)
- **Drag & Drop**: [@dnd-kit](https://dndkit.com/) - Modern drag and drop for React
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/) - Composable charting library
- **3D Graphics**: [Three.js](https://threejs.org/) - For advanced visualizations
- **TypeScript**: Full type safety throughout the application
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes) - Perfect dark/light mode

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/domvnxk/aidashboard.git
cd aidashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm run start
```

## 📱 Responsive Design

The AI Dashboard is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1440px+)

## 🎯 Use Cases

This template is perfect for:
- **AI Tool Aggregators**: Combine multiple AI services in one interface
- **Data Science Platforms**: Interactive data analysis and visualization
- **Creative Studios**: AI-powered content generation tools
- **Research Platforms**: Academic and scientific research assistance
- **Enterprise Dashboards**: Internal AI tool management
- **Educational Platforms**: Teaching AI concepts interactively

## 🔧 Customization

### Adding New AI Widgets

1. Create a new component in `/components/your-widget/`
2. Add widget metadata to `/components/ai-suggestions/WidgetCards.tsx`
3. Implement the widget interface in `/components/playground/widgets/WidgetRenderer.tsx`

### Styling

- Modify `/styles/globals.css` for global styles
- Update `/tailwind.config.js` for theme customization
- Use HeroUI's theming system for component-level styling


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Domxnvk/aidashboard?tab=MIT-1-ov-file) file for details.

---

Built with ❤️ for the HeroUI Hackathon