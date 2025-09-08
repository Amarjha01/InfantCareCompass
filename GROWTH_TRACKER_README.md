# 🌱 Growth Tracker Feature

## Overview
The Growth Tracker is a comprehensive feature that allows parents to monitor and visualize their child's physical growth over time. It includes data logging, interactive charts, growth insights, and reminder settings.

## Features Implemented

### 📊 Core Features
- **Data Logging**: Parents can log height, weight, milestones, and notes
- **Visualization**: Interactive line and bar charts using Chart.js
- **Growth Insights**: AI-powered growth analysis and recommendations
- **Reminder System**: Configurable reminders (daily/weekly/monthly)
- **Multi-child Support**: Track multiple children
- **Statistics**: Growth rate calculations and trends

### 🎯 Key Components

#### Backend (Node.js/Express + MongoDB)
- **Model**: `GrowthLog.js` - MongoDB schema for growth data
- **Controller**: `growthTracker.js` - API endpoints and business logic
- **Routes**: Integrated into main routes with authentication

#### Frontend (React)
- **Page**: `GrowthTracker.jsx` - Main component with full functionality
- **API Service**: `growthTrackerAPI.jsx` - Backend communication
- **Navigation**: Added to header menu with TrendingUp icon

### 📈 Chart Features
- **Line Charts**: Show growth trends over time
- **Bar Charts**: Month-to-month comparisons
- **Dual Y-axis**: Height and weight on separate scales
- **Interactive**: Hover tooltips and responsive design

### 🔔 Reminder System
- **Frequency Options**: Daily, weekly, or monthly
- **Toggle Control**: Enable/disable reminders
- **Settings Persistence**: Saved per child

### 💡 Growth Insights
- **Growth Rate Analysis**: Calculates cm/month growth rate
- **Status Indicators**: Excellent, Good, Normal, or Concern
- **Statistics Display**: Total entries, growth metrics, averages

## API Endpoints

### Growth Logs
- `POST /api/growth-logs` - Create new growth entry
- `GET /api/growth-logs` - Get all growth logs (with filters)
- `GET /api/growth-logs/:id` - Get specific growth log
- `PUT /api/growth-logs/:id` - Update growth log
- `DELETE /api/growth-logs/:id` - Delete growth log

### Statistics & Settings
- `GET /api/growth-logs/stats` - Get growth statistics
- `PATCH /api/growth-logs/reminder-settings` - Update reminder settings

## Database Schema

```javascript
{
  userId: ObjectId,        // Reference to user
  childId: String,         // Child identifier
  date: Date,             // Entry date
  height_cm: Number,      // Height in centimeters
  weight_kg: Number,      // Weight in kilograms
  milestone: String,      // Optional milestone
  notes: String,          // Optional notes
  reminderEnabled: Boolean, // Reminder toggle
  reminderFrequency: String // 'daily'|'weekly'|'monthly'
}
```

## Usage

### For Parents
1. Navigate to "Growth Tracker" in the main menu
2. Select the child to track
3. Click "Add New Entry" to log measurements
4. View charts and insights
5. Configure reminder settings

### For Developers
1. Ensure MongoDB is running
2. Start the server: `cd server && npm run dev`
3. Start the client: `cd client && npm run dev`
4. Access at: `http://localhost:5173/growth-tracker`

## Dependencies Added
- `chart.js`: Chart library
- `react-chartjs-2`: React wrapper for Chart.js

## Future Enhancements
- [ ] WHO growth percentile comparisons
- [ ] PDF export functionality
- [ ] Smart device integration
- [ ] Growth prediction AI
- [ ] Photo uploads for milestones
- [ ] Doctor sharing capabilities

## Technical Notes
- Uses JWT authentication for API access
- Responsive design for mobile devices
- Real-time data validation
- Error handling with toast notifications
- Optimized database queries with indexing

## Contributing
This feature follows the existing project patterns:
- MongoDB for data persistence
- Express.js for API endpoints
- React with functional components
- Tailwind CSS for styling
- Redux for state management (if needed)

## Testing
The feature includes:
- Form validation
- API error handling
- Responsive design testing
- Chart interaction testing
- Data persistence verification
