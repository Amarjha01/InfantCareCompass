import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Appointments() {
  const { user, isAuthenticated } = useSelector(state => state.user);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  const appointmentTypes = [
    "Well-child visit",
    "Sick visit", 
    "Vaccination",
    "Follow-up",
    "Consultation"
  ];

  // Fetch doctors from the backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('/api/doctorinfo');
        const data = await response.json();
        if (data.success) {
          setDoctors(data.doctors || []);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  // Fetch available time slots when date or doctor changes
  useEffect(() => {
    if (selectedDate && selectedDoctor) {
      fetchAvailableTimeSlots();
    }
  }, [selectedDate, selectedDoctor]);

  const fetchAvailableTimeSlots = async () => {
    try {
      const response = await fetch(`/api/appointments/available-slots?doctorId=${selectedDoctor}&date=${selectedDate}`);
      const data = await response.json();
      if (data.success) {
        setAvailableTimeSlots(data.data.availableTimeSlots);
        // Reset selected time if it's no longer available
        if (!data.data.availableTimeSlots.includes(selectedTime)) {
          setSelectedTime("");
        }
      }
    } catch (error) {
      console.error('Error fetching available time slots:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setMessage("Please sign in to book an appointment");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const appointmentData = {
        patientId: user._id,
        doctorId: selectedDoctor,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        appointmentType: appointmentType,
        notes: notes
      };

      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(appointmentData)
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Appointment booked successfully!");
        // Reset form
        setSelectedDate("");
        setSelectedTime("");
        setSelectedDoctor("");
        setAppointmentType("");
        setNotes("");
      } else {
        setMessage(data.message || "Failed to book appointment");
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      setMessage("An error occurred while booking the appointment");
    } finally {
      setLoading(false);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Book an Appointment</h1>
        <p className="text-gray-600">
          Schedule a consultation with our experienced pediatricians
        </p>
      </div>

      {!isAuthenticated && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-center">
          <p className="text-yellow-800">
            Please sign in to book an appointment
          </p>
        </div>
      )}

      {message && (
        <div className={`mb-6 p-4 rounded-lg text-center ${
          message.includes('successfully') 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {message}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Appointment Date *
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={today}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
                disabled={!isAuthenticated}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Time *
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
                disabled={!isAuthenticated || !selectedDate || !selectedDoctor}
              >
                <option value="">Select a time</option>
                {availableTimeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Doctor *
              </label>
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
                disabled={!isAuthenticated}
              >
                <option value="">Choose a doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    {doctor.name} - {doctor.specialty}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Appointment Type *
              </label>
              <select
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
                disabled={!isAuthenticated}
              >
                <option value="">Select type</option>
                {appointmentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Any specific concerns or information you'd like to share..."
              disabled={!isAuthenticated}
            />
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={!isAuthenticated || loading}
              className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-300 ${
                !isAuthenticated || loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:shadow-lg'
              } text-white`}
            >
              {loading ? 'Booking...' : 'Book Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
