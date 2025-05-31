# AI Dashboard - HeroUI Hackathon Project 🚀

An innovative AI-powered interface template built for the HeroUI Hackathon with the theme "AI-Powered Interfaces: Templates leveraging AI capabilities". This project showcases a modern, interactive dashboard where users can drag and drop various AI widgets into a customizable playground.

![Playground Link](https://aiplayground.acmdom.dev/)

## 🏆 Hackathon Theme

**AI-Powered Interfaces**: Templates leveraging AI capabilities (chatbots, recommendation systems, etc.)

## ✨ Key Features

### 🎯 AI Widget Playground
- **Drag & Drop Interface**: Intuitive drag-and-drop system to add AI widgets to your workspace
- **Flexible Layouts**: Switch between grid view (2x2) for multiple widgets or expanded view for focused work
- **Smart Widget Selection**: Choose up to 5 widgets from a curated collection of 15 AI tools
- **Responsive Design**: Seamlessly works on desktop, tablet, and mobile devices

### 🤖 Implemented AI Widgets

#### 1. **Image Generator** 🎨
- AI-powered image generation from text prompts
- Real-time preview and customization options
- Support for various artistic styles

#### 2. **Data Analysis** 📊
- Upload CSV/Excel files for instant analysis
- Interactive charts using Recharts
- Data breakdown with key insights
- Visual representations of your data patterns

#### 3. **Document AI** 📄
- Smart document processing and analysis
- Summary generation for uploaded documents
- Support for multiple document formats
- Intelligent content extraction

#### 4. **Music Composer** 🎵
- Create AI-generated music by selecting:
  - Genre (Pop, Rock, Jazz, Classical, Electronic, etc.)
  - Mood (Happy, Sad, Energetic, Relaxing, etc.)
  - Tempo (60-180 BPM)
  - Instruments (Piano, Guitar, Drums, Strings, etc.)
  - Duration (30s to 3 minutes)
- Real-time audio visualization with dynamic waveforms
- Playback controls with volume adjustment
- Download and share generated tracks

#### 5. **Research Helper** 🔬
- Academic paper search and summarization
- Markdown rendering for research content
- Intelligent research insights
- Citation management

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