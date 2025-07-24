import React, { useState } from "react";
import { addWeeks, format } from "date-fns";

const vaccineSchedule = [
  { name: "BCG", dueAfterWeeks: 0 },
  { name: "Hepatitis B (1st dose)", dueAfterWeeks: 6 },
  { name: "DTP (1st dose)", dueAfterWeeks: 10 },
  { name: "Hib (1st dose)", dueAfterWeeks: 14 },
  { name: "MMR", dueAfterWeeks: 36 },
  { name: "DTP Booster", dueAfterWeeks: 60 },
];

const VaccineReminder = () => {
  const [birthDate, setBirthDate] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [completed, setCompleted] = useState({});

  const handleCheck = (vaccine) => {
    setCompleted((prev) => ({ ...prev, [vaccine]: !prev[vaccine] }));
  };

  const getDueDate = (weeks) =>
    format(addWeeks(new Date(birthDate), weeks), "dd MMM yyyy");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="vaccine-container">
      <h1 className="title">🍼 Vaccine Reminder</h1>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="birthDate">👶 Enter Baby's Birthdate:</label>
        <input
          type="date"
          id="birthDate"
          required
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        <button type="submit">Show Schedule</button>
      </form>

      {submitted && (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>💉 Vaccine</th>
                <th>📅 Due Date</th>
                <th>✅ Done?</th>
              </tr>
            </thead>
            <tbody>
              {vaccineSchedule.map((vaccine) => (
                <tr key={vaccine.name}>
                  <td>{vaccine.name}</td>
                  <td>{getDueDate(vaccine.dueAfterWeeks)}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={!!completed[vaccine.name]}
                      onChange={() => handleCheck(vaccine.name)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Cute emoji decoration */}
      <div className="footer-baby">🌈🐣✨</div>

      <style>
        {`
        body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', sans-serif; /* Using Inter font */
          background: linear-gradient(135deg, #0f0c29, #3a005c, #4c2269); /* Full screen background */
          min-height: 100vh; /* Ensure it takes full viewport height */
          display: flex;
          align-items: center;
          justify-content: center;
          overflow-x: hidden; /* Prevent body horizontal scroll */
        }

        .vaccine-container {
          background: linear-gradient(135deg, #1b1a42, #4c2269);
          color: #fff;
          padding: 2rem;
          border-radius: 1rem;
          width: 95%; /* Make it take up 95% of the screen width */
          /* Removed max-width to allow it to expand further */
          margin: 2rem auto; /* Center the container */
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
          box-sizing: border-box; /* Include padding in width calculation */
        }

        .title {
          text-align: center;
          font-size: 2rem;
          color: #ffd6f5;
          margin-bottom: 1rem;
        }

        .form {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .form label {
          font-size: 1.1rem;
        }

        .form input[type="date"] {
          padding: 0.75rem; /* Increased padding for better touch target */
          border-radius: 8px;
          border: none;
          width: 100%; /* Full width for input */
          max-width: 300px; /* Limit input width on larger screens */
          box-sizing: border-box;
          color: #333; /* Explicitly set text color to black for visibility */
        }

        .form button {
          padding: 0.75rem 1.5rem; /* Increased padding for better touch target */
          background-color: #ff79c6;
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease; /* Added transform for hover effect */
          box-shadow: 0 4px 10px rgba(0,0,0,0.2); /* Subtle shadow */
        }

        .form button:hover {
          background-color: #ff95dd;
          transform: translateY(-2px); /* Lift effect on hover */
        }

        .table-wrapper {
          overflow-x: auto; /* Allows horizontal scrolling on small screens if table content is too wide */
          border-radius: 10px; /* Apply rounded corners to the wrapper */
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          color: #333;
          border-radius: 10px;
          overflow: hidden; /* Ensures rounded corners are visible */
          min-width: 400px; /* Ensure table is not too narrow on small screens, but allow overflow-x to handle it */
        }

        th, td {
          padding: 1rem;
          text-align: center;
          border-bottom: 1px solid #ddd;
        }

        th {
          background: #ffe0f0;
          color: #5e2a5c;
          font-weight: bold;
        }

        tr:hover {
          background-color: #f9f2ff;
        }

        /* Responsive adjustments for smaller screens */
        @media (max-width: 600px) {
          .vaccine-container {
            padding: 1rem; /* Reduce padding on smaller screens */
            margin: 1rem auto; /* Adjust margin */
            width: 95%; /* Take more width on small screens */
          }

          .title {
            font-size: 1.5rem; /* Smaller title on small screens */
          }

          .form input[type="date"],
          .form button {
            width: 90%; /* Make input and button wider */
          }

          th, td {
            padding: 0.75rem; /* Smaller padding in table cells */
            font-size: 0.9rem; /* Smaller font size in table */
          }
        }

        .footer-baby {
          margin-top: 2rem;
          text-align: center;
          font-size: 1.8rem; /* Slightly larger emoji */
          animation: bounce 2s infinite; /* Simple animation for fun */
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        `}
      </style>
    </div>
  );
};

export default VaccineReminder;
