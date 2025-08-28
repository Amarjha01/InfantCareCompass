# First Aid AI Chatbot Documentation

## Overview

The First Aid AI Chatbot is an intelligent assistant integrated into the InfantCareCompass project that provides immediate first aid guidance and medical advice using Google's Gemini 2.5 Flash model. This feature helps parents and caregivers get quick, reliable first aid information for infants and children.

## Features

### 🚨 Core Functionality
- **AI-Powered First Aid Guidance**: Uses Gemini 2.5 Flash for intelligent responses
- **Symptom Assessment**: Analyzes described conditions and provides severity assessment
- **Step-by-Step Instructions**: Offers clear, actionable first aid steps
- **Medical Attention Alerts**: Automatically flags situations requiring professional medical care
- **Age-Appropriate Advice**: Considers patient age for tailored recommendations
- **Safety Disclaimers**: Includes comprehensive safety warnings and disclaimers

### 💬 Chat Interface
- **Real-time Chat**: Interactive conversation-style interface
- **Chat History**: Maintains conversation history during session
- **Message Formatting**: Supports markdown-style formatting with emojis
- **Loading States**: Visual feedback during AI processing
- **Error Handling**: Graceful error handling with user-friendly messages

### 📋 Patient Information
- **Age Input**: Optional patient age for age-specific guidance
- **Weight Input**: Optional weight for dosage considerations
- **Additional Context**: Space for extra information or details
- **Form Validation**: Input validation and error handling

### 🚑 Emergency Information
- **Emergency Contact Display**: Shows emergency service numbers
- **Medical Attention Indicators**: Visual alerts for serious conditions
- **Safety Guidelines**: Prominent safety warnings and disclaimers
- **Professional Medical Disclaimer**: Clear educational purpose statement

## Technical Implementation

### Backend (Node.js/Express)

#### API Endpoints
- `POST /api/first-aid-chatbot` - Main chatbot endpoint
- `GET /api/first-aid-chatbot/health` - Health check endpoint

#### Key Components
- **Gemini 2.5 Flash Integration**: Uses `@google/generative-ai` package
- **Input Validation**: Comprehensive validation for age, weight, and symptoms
- **Safety Prompting**: Structured prompts for consistent, safe responses
- **Error Handling**: Graceful handling of API errors and service unavailability
- **Logging**: Monitors usage for safety and improvement purposes

#### Environment Variables Required
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

#### Model Configuration
```javascript
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
```

### Frontend (React)

#### Components
- **FirstAidChatbot.jsx**: Main page component with chat interface
- **Form Validation**: Real-time validation with user feedback
- **Response Formatting**: Converts AI responses to readable HTML
- **Safety Notifications**: Prominent safety warnings throughout the interface

#### Features
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Loading States**: Visual feedback during AI processing
- **Error Handling**: User-friendly error messages
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Dark Mode Support**: Full dark mode compatibility

## Setup Instructions

### 1. Backend Setup

1. **Install Dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp env.example .env
   ```
   
   Add your Gemini API key to `.env`:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

3. **Start the Server**
   ```bash
   npm run dev
   ```

### 2. Frontend Setup

1. **Install Dependencies**
   ```bash
   cd client
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```

### 3. Access the Feature

Navigate to `/first-aid-chatbot` in your browser or click "First Aid AI" in the navigation menu.

## Usage Instructions

### For Parents and Caregivers

1. **Navigate to First Aid AI**
   - Click "First Aid AI" in the main navigation
   - Or visit `/first-aid-chatbot` directly

2. **Enter Patient Information** (Optional but Recommended)
   - Age: Enter the child's age in years
   - Weight: Enter the child's weight in kilograms
   - Additional Context: Add any relevant information

3. **Describe the Situation**
   - Type a detailed description of symptoms or situation
   - Be specific about what happened and current condition
   - Include any relevant details (time, severity, etc.)

4. **Submit and Review**
   - Click the send button or press Enter
   - Review the AI-generated guidance
   - Pay attention to medical attention alerts

5. **Follow Recommendations**
   - Follow the provided first aid steps
   - Seek medical attention if recommended
   - Contact emergency services if needed

### Response Structure

The AI provides responses in the following format:

1. **Situation Assessment** - Brief analysis of the described condition
2. **First Aid Steps** - Numbered, actionable steps for immediate response
3. **Medical Attention Required?** - Clear YES/NO with explanation
4. **Emergency Actions** - What to do if symptoms worsen
5. **Prevention Tips** - How to avoid similar situations

## Safety Features

### 🚨 Safety Disclaimers
Every response includes a comprehensive safety disclaimer:
- Educational purpose only
- Not a replacement for professional medical advice
- Always seek medical attention for serious conditions
- Emergency service contact information

### ⚠️ Medical Attention Alerts
The system automatically detects serious conditions and:
- Displays prominent warning banners
- Recommends immediate medical attention
- Provides emergency contact information
- Flags situations requiring professional care

### 🔒 Input Validation
- Age validation (0-120 years)
- Weight validation (0-300 kg)
- Required prompt validation
- Error handling for invalid inputs

## API Reference

### POST /api/first-aid-chatbot

**Request Body:**
```json
{
  "prompt": "My 2-year-old fell and hit their head",
  "patientAge": "2",
  "patientWeight": "12.5",
  "additionalContext": "They seem alert but have a small bump"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "prompt": "My 2-year-old fell and hit their head",
    "patientAge": 2,
    "patientWeight": 12.5,
    "additionalContext": "They seem alert but have a small bump",
    "guidance": "First aid guidance text...",
    "timestamp": "2024-01-01T12:00:00.000Z",
    "disclaimer": "This response provides first aid guidance...",
    "model": "gemini-2.0-flash-exp",
    "requiresMedicalAttention": false
  }
}
```

### GET /api/first-aid-chatbot/health

**Response:**
```json
{
  "success": true,
  "message": "First Aid Chatbot AI service is operational",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "model": "gemini-2.0-flash-exp"
}
```

## Error Handling

### Common Error Scenarios
- **Missing API Key**: Returns 500 error with configuration message
- **Invalid Input**: Returns 400 error with validation details
- **API Rate Limits**: Returns 429 error with retry information
- **Network Issues**: Returns 503 error with service unavailable message

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

## Security Considerations

### Data Privacy
- No personal health data is stored permanently
- Chat history is session-based only
- API calls are logged without sensitive information
- All data is transmitted over HTTPS

### API Security
- Environment variable protection for API keys
- Input validation and sanitization
- Rate limiting considerations
- Error message sanitization

## Performance Optimization

### Response Time
- Gemini 2.5 Flash optimized for speed
- Efficient prompt engineering
- Minimal data processing overhead
- Caching considerations for common queries

### Scalability
- Stateless API design
- Horizontal scaling support
- Database independence
- Load balancing ready

## Troubleshooting

### Common Issues

1. **API Key Not Working**
   - Verify GEMINI_API_KEY in .env file
   - Check API key permissions and quotas
   - Ensure proper environment variable loading

2. **Slow Response Times**
   - Check network connectivity
   - Verify Gemini API service status
   - Monitor API rate limits

3. **Frontend Not Loading**
   - Check if both client and server are running
   - Verify CORS configuration
   - Check browser console for errors

4. **Chat Interface Issues**
   - Clear browser cache
   - Check JavaScript console for errors
   - Verify all dependencies are installed

### Debug Mode
Enable debug logging by setting:
```env
NODE_ENV=development
DEBUG=true
```

## Future Enhancements

### Planned Features
- **Voice Input**: Speech-to-text for hands-free operation
- **Image Analysis**: Photo upload for visual symptom assessment
- **Multi-language Support**: International language support
- **Offline Mode**: Basic first aid information without internet
- **Integration**: Connect with emergency services APIs
- **Personalization**: User preferences and medical history

### Technical Improvements
- **Caching**: Response caching for common queries
- **Analytics**: Usage analytics and improvement tracking
- **A/B Testing**: Different prompt strategies
- **Performance Monitoring**: Response time and accuracy tracking

## Contributing

### Development Guidelines
- Follow existing code style and patterns
- Add comprehensive error handling
- Include safety disclaimers in all responses
- Test with various input scenarios
- Update documentation for new features

### Testing
- Unit tests for API endpoints
- Integration tests for AI responses
- Frontend component testing
- End-to-end user flow testing

## Support

For technical support or questions about the First Aid Chatbot:
- Check the troubleshooting section
- Review API documentation
- Contact the development team
- Report issues through the project repository

---

**Important**: This AI assistant provides educational first aid guidance only and is not a replacement for professional medical care. Always seek immediate medical attention for serious injuries or medical emergencies.
