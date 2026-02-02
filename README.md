# Netflix Clone - React Application

A fully responsive Netflix clone built with React, featuring a modern UI, movie browsing, search functionality, and trailer playback capabilities.

![Netflix Clone](./public/Netflix-1.png)
![Poster trend ](./public/Netfilx-2.png)
![Movie Category](./public/Netfix-3.png)

## 🎬 Features

### Core Functionality

- **Movie Browsing**: Browse movies by categories (Netflix Originals, Trending, Top Rated, etc.)
- **Search System**: Real-time movie search with autocomplete and results dropdown
- **Trailer Playback**: Watch movie trailers with YouTube integration
- **Responsive Design**: Fully responsive from 320px to large desktop screens
- **Interactive UI**: Hover effects, animations, and smooth transitions

### User Interface

- **Netflix-Style Header**: Sticky navigation with scroll effects
- **Carousel Banner**: Auto-rotating featured content with manual controls
- **Movie Rows**: Horizontally scrollable movie categories
- **Mobile Menu**: Hamburger menu for mobile navigation
- **User Profile**: Profile dropdown with user information and settings
- **Notifications**: Smart notification system with categorized alerts

### Technical Features

- **Mobile-First Design**: Optimized for all screen sizes (320px+)
- **Performance Optimized**: Fast loading with optimized images and API calls
- **Modern React**: Built with React hooks and functional components
- **CSS Modules**: Scoped styling with CSS modules
- **API Integration**: The Movie Database (TMDb) API integration
- **Error Handling**: Comprehensive error handling and loading states

## 🚀 Live Demo

[View Live Demo](https://naol724.github.io/react-movie-app)

## 📱 Responsive Design

The application is fully responsive and works seamlessly across all devices:

- **Mobile**: 320px - 767px (Optimized for small screens)
- **Tablet**: 768px - 1023px (Enhanced layout)
- **Desktop**: 1024px - 1439px (Full features)
- **Large Desktop**: 1440px+ (Maximum experience)

## 🛠️ Technologies Used

- **Frontend**: React 18+, JavaScript ES6+
- **Styling**: CSS3, CSS Modules, Flexbox, Grid
- **Icons**: Material-UI Icons
- **API**: The Movie Database (TMDb) API
- **Video**: YouTube API for trailer playback
- **Build Tool**: Create React App
- **Package Manager**: npm

## 📦 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TMDb API key

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/netflix-clone.git
   cd netflix-clone
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   REACT_APP_API_KEY=your_tmdb_api_key_here
   ```

4. **Start the development server**

   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### GitHub Pages Deployment

This project is configured for easy deployment to GitHub Pages:

1. **Update your repository**:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

2. **Deploy using npm script**:
   ```bash
   npm run deploy
   ```
   
   This will:
   - Build the production version
   - Deploy to the `gh-pages` branch
   - Make your app live at `https://yourusername.github.io/repository-name`

### Manual Deployment to Other Platforms

#### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variable: `REACT_APP_API_KEY=your_api_key`

#### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts and add your API key as environment variable

#### AWS Amplify
1. Connect your GitHub repository
2. Configure build settings:
   - Build command: `npm run build`
   - Base directory: `/`
   - Publish directory: `build`
3. Add environment variables in the console

### Environment Variables for Production

**Important**: Always add your API key as an environment variable in your hosting platform's settings:

- **GitHub Pages**: Add to repository secrets (Settings > Secrets > Actions)
- **Netlify**: Site settings > Build & deploy > Environment variables
- **Vercel**: Project settings > Environment variables
- **AWS Amplify**: App settings > Environment variables

### Custom Domain Setup

For custom domains, update the `homepage` field in `package.json`:

```json
{
  "homepage": "https://yourdomain.com"
}
```

Then rebuild and redeploy:
```bash
npm run build
npm run deploy
```

## 🎯 Available Scripts

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`

Launches the test runner in interactive watch mode

### `npm run build`

Builds the app for production to the `build` folder

### `npm run deploy`

Deploys the app to GitHub Pages (requires `gh-pages` package)

### `npm run eject`

**Note: This is a one-way operation!** Ejects from Create React App

## 📁 Project Structure

```
netflix-clone/
├── public/
│   ├── index.html
│   ├── Netflix (1).ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.js
│   │   │   └── header.module.css
│   │   ├── Banner/
│   │   │   ├── Banner.js
│   │   │   └── Banner.module.css
│   │   ├── Rows/
│   │   │   ├── Row/
│   │   │   └── RowsList/
│   │   ├── Search/
│   │   ├── UserProfile/
│   │   ├── Notifications/
│   │   ├── MovieModal/
│   │   └── Footer/
│   ├── utils/
│   │   ├── axios.js
│   │   └── requests.js
│   ├── assets/
│   │   └── images/
│   ├── App.js
│   ├── App.css
│   └── index.js
├── .env
├── package.json
└── README.md
```

## 🎨 Key Components

### Header Component

- Responsive navigation with mobile hamburger menu
- Search functionality with real-time results
- User profile dropdown with settings
- Notifications system
- Scroll-based styling changes

### Banner Component

- Auto-rotating carousel with featured content
- Manual navigation controls
- Progress indicators
- Responsive design for all screen sizes

### Row Component

- Horizontally scrollable movie lists
- Hover effects with movie descriptions
- Trailer playback integration
- Category-based movie organization

### Search Component

- Real-time search with debouncing
- Dropdown results with movie posters
- Mobile-optimized interface
- Clear and loading states

## 🔧 Configuration

### API Setup

1. Get your API key from [The Movie Database](https://www.themoviedb.org/settings/api)
2. Add it to your `.env` file as `REACT_APP_API_KEY`

### Customization

- **Colors**: Modify CSS variables in component files
- **Layout**: Adjust responsive breakpoints in CSS
- **Content**: Update movie categories in `requests.js`

## 📱 Mobile Features

- **Touch-friendly**: Optimized touch targets (minimum 44px)
- **Swipe navigation**: Horizontal scrolling for movie rows
- **Mobile menu**: Collapsible navigation for small screens
- **Responsive images**: Optimized image loading for mobile
- **Performance**: Fast loading on mobile networks

## 🎭 UI/UX Features

- **Smooth animations**: CSS transitions and transforms
- **Loading states**: Skeleton screens and spinners
- **Error handling**: User-friendly error messages
- **Accessibility**: ARIA labels and keyboard navigation
- **Visual feedback**: Hover states and active indicators

## 🚀 Performance Optimizations

- **Lazy loading**: Images load as needed
- **Debounced search**: Reduced API calls
- **Optimized re-renders**: React.memo and useCallback
- **Compressed assets**: Optimized images and fonts
- **Efficient API calls**: Cached responses where possible

## 🐛 Known Issues & Solutions

- **Trailer loading**: Some movies may not have available trailers
- **API limits**: Rate limiting may occur with heavy usage
- **Mobile Safari**: Some CSS features may need fallbacks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [The Movie Database (TMDb)](https://www.themoviedb.org/) for the movie data API
- [Netflix](https://netflix.com) for design inspiration
- [Material-UI](https://mui.com/) for icons
- [Create React App](https://create-react-app.dev/) for the project setup

## 📞 Contact

Your Name - [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/yourusername/netflix-clone](https://github.com/yourusername/netflix-clone)

---

⭐ **Star this repository if you found it helpful!**
