# Disease Prediction Frontend

A modern, interactive React frontend for the AI-powered disease prediction system.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **Interactive Symptom Selection**: Easy-to-use symptom picker with categories
- **Real-time Search**: Filter symptoms quickly
- **Animated Results**: Smooth transitions and loading states
- **Responsive Design**: Works perfectly on all devices
- **Mock Data Support**: Works with or without backend

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Elegant notifications
- **Axios** - HTTP client for API calls

## 📦 Installation

1. **Install dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Open your browser**:
   Navigate to `http://localhost:3000`

## 🔧 Configuration

The frontend automatically connects to the backend API at `http://localhost:5000`. 
If your backend is running elsewhere, set the `REACT_APP_API_URL` environment variable:

```bash
REACT_APP_API_URL=http://your-backend-url:5000 npm start
```

## 📱 Features Overview

### Symptom Selection
- **Search**: Find symptoms quickly with real-time search
- **Categories**: Filter by symptom categories (General, Skin, Respiratory, etc.)
- **Visual Feedback**: Clear selection states and hover effects
- **Load More**: Progressive loading for better performance

### Prediction Results
- **Primary Prediction**: Main disease prediction with confidence score
- **Top 3 Predictions**: Alternative predictions with probabilities
- **Visual Confidence Bars**: Easy-to-understand confidence visualization
- **Selected Symptoms Review**: See which symptoms were used for prediction

### User Experience
- **Loading States**: Beautiful loading animations
- **Error Handling**: Graceful error messages
- **Responsive**: Works on mobile, tablet, and desktop
- **Accessibility**: Semantic HTML and ARIA labels

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#3b82f6 → #2563eb)
- **Secondary**: Green gradient (#22c55e → #16a34a)
- **Danger**: Red gradient (#ef4444 → #dc2626)

### Components
- **Cards**: Rounded corners, subtle shadows
- **Buttons**: Gradient backgrounds, hover effects
- **Forms**: Clean inputs with focus states
- **Animations**: Smooth transitions and micro-interactions

## 🔄 Mock Data Mode

The frontend includes comprehensive mock data, so it works even without the backend:
- **20 Common Symptoms**: Categorized symptom list
- **41 Diseases**: Complete disease database
- **Smart Predictions**: Context-aware mock predictions

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 Production Build

Create an optimized production build:

```bash
npm run build
```

The build files will be in the `build/` directory.

## 🔍 Development Tips

1. **Hot Reload**: The app automatically reloads on file changes
2. **Console Logs**: Check browser console for API requests and errors
3. **Network Tab**: Monitor API calls in browser dev tools
4. **Responsive Testing**: Use browser dev tools to test different screen sizes

## 🐛 Troubleshooting

### Common Issues

1. **Backend Not Connected**:
   - Ensure the Flask backend is running on port 5000
   - Check if CORS is properly configured
   - The app will fall back to mock data automatically

2. **Styling Issues**:
   - Ensure Tailwind CSS is properly installed
   - Check if PostCSS configuration is correct
   - Restart the development server

3. **Build Errors**:
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check for any syntax errors in components

## 🤝 Contributing

1. Follow the existing code style
2. Use meaningful component names
3. Add comments for complex logic
4. Test on different screen sizes
5. Ensure accessibility standards

## 📞 Support

For issues or questions:
1. Check the browser console for errors
2. Verify backend connectivity
3. Review the API endpoints
4. Test with mock data mode
