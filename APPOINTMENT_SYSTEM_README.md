# Appointment System - Backend & Frontend Integration

## Overview
This document describes the complete appointment booking system implemented for the InfantCareCompass application, including both backend and frontend components.

## Backend Implementation

### 1. Database Model
- **File**: `server/models/Appointment.js`
- **Schema**: MongoDB schema with fields for patient, doctor, date, time, type, status, and notes
- **Features**: Automatic timestamp updates, status validation, and reference relationships

### 2. API Controller
- **File**: `server/controller/appointmentController.js`
- **Endpoints**:
  - `POST /api/appointments` - Create new appointment
  - `GET /api/appointments/user/:patientId` - Get user's appointments
  - `GET /api/appointments/doctor/:doctorId` - Get doctor's appointments
  - `PATCH /api/appointments/:id/status` - Update appointment status
  - `PATCH /api/appointments/:id/cancel` - Cancel appointment
  - `DELETE /api/appointments/:id` - Delete appointment (admin only)
  - `GET /api/appointments/available-slots` - Get available time slots

### 3. Routes Configuration
- **File**: `server/routes/routes.js`
- **Middleware**: Authentication required for most endpoints
- **Admin Access**: Delete operations require admin privileges

## Frontend Implementation

### 1. Appointments Page
- **File**: `client/src/pages/Appointments.jsx`
- **Features**:
  - Dynamic doctor loading from backend
  - Real-time available time slot checking
  - Form validation and error handling
  - Authentication state management
  - Responsive design with Tailwind CSS

### 2. API Integration
- **Proxy Configuration**: `client/vite.config.js` forwards `/api` calls to backend
- **State Management**: Redux integration for user authentication
- **Error Handling**: Comprehensive error messages and loading states

## Key Features

### 1. Smart Time Slot Management
- Automatically checks for conflicts when booking
- Updates available slots based on date and doctor selection
- Prevents double-booking of time slots

### 2. Authentication & Authorization
- Users must be logged in to book appointments
- Doctor information is fetched dynamically
- Admin-only operations for appointment management

### 3. Real-time Validation
- Date restrictions (no past dates)
- Time slot availability checking
- Form field dependencies (time slots depend on date/doctor)

## API Endpoints

### Create Appointment
```http
POST /api/appointments
Authorization: Bearer <token>
Content-Type: application/json

{
  "patientId": "user_id",
  "doctorId": "doctor_id", 
  "appointmentDate": "2024-01-15",
  "appointmentTime": "10:00 AM",
  "appointmentType": "Well-child visit",
  "notes": "Optional notes"
}
```

### Get Available Time Slots
```http
GET /api/appointments/available-slots?doctorId=123&date=2024-01-15
```

### Get User Appointments
```http
GET /api/appointments/user/:patientId
Authorization: Bearer <token>
```

## Setup Instructions

### 1. Backend Setup
1. Ensure MongoDB is running
2. Install dependencies: `npm install`
3. Set environment variables in `.env`
4. Start server: `npm start`

### 2. Frontend Setup
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Backend should be running on port 5000

### 3. Database Requirements
- MongoDB instance running
- User and Doctor collections populated
- Proper indexes on appointment fields

## Security Features

- JWT token authentication
- CORS configuration for production
- Input validation and sanitization
- Role-based access control
- Rate limiting considerations

## Future Enhancements

- Email notifications for appointments
- Calendar integration
- Recurring appointment support
- Payment processing
- Video call integration
- SMS reminders

## Testing

Test the system by:
1. Creating a user account
2. Logging in to get authentication token
3. Navigating to `/appointments`
4. Selecting date, doctor, and time
5. Submitting the appointment form
6. Verifying the appointment appears in the database

## Troubleshooting

### Common Issues:
1. **CORS errors**: Check backend CORS configuration
2. **Authentication failures**: Verify JWT token in localStorage
3. **Time slot conflicts**: Check appointment model validation
4. **Database connection**: Verify MongoDB connection string

### Debug Steps:
1. Check browser console for frontend errors
2. Check server logs for backend errors
3. Verify API endpoints are accessible
4. Check database connectivity
