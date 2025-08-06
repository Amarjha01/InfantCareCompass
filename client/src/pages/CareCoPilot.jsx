import { useState } from "react";
import {
  FaBaby,
  FaThermometerHalf,
  FaPills,
  FaExclamationTriangle,
  FaInfoCircle,
} from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";

const CareCoPilot = () => {
  const [formData, setFormData] = useState({
    childAge: "",
    childWeight: "",
    symptoms: "",
    additionalNotes: "",
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("http://localhost:5000/api/care-co-pilot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setResponse(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatResponse = (text) => {
    // Convert markdown-style formatting to HTML with better styling for user-friendly format
    return text
      .replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-semibold text-gray-900">$1</strong>'
      )
      .replace(/\*(.*?)\*/g, '<em class="italic text-gray-800">$1</em>')
      .replace(
        /^# (.*?)$/gm,
        '<h1 class="text-2xl font-bold text-blue-600 mt-6 mb-4">$1</h1>'
      )
      .replace(
        /^## (.*?)$/gm,
        '<h2 class="text-xl font-bold text-gray-800 mt-6 mb-3 border-b border-gray-200 pb-2">$1</h2>'
      )
      .replace(
        /^### (.*?)$/gm,
        '<h3 class="text-lg font-semibold text-gray-700 mt-4 mb-2">$1</h3>'
      )
      .replace(/• (.*?)$/gm, '<li class="ml-4 mb-1">• $1</li>')
      .replace(/(\n\n)/g, '</p><p class="mb-4 leading-relaxed">')
      .replace(/\n/g, "<br />")
      .replace(/^/, '<p class="mb-4 leading-relaxed">')
      .replace(/$/, "</p>")
      .replace(
        /<li class="ml-4 mb-1">• (.*?)<\/li>/g,
        '<li class="ml-4 mb-2 text-gray-700">• $1</li>'
      );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <MdHealthAndSafety className="text-4xl text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Care Co-Pilot</h1>
          </div>
          <p className="text-xl text-gray-600 mb-4">
            AI-Powered Medicine Finder for All Ages
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex items-center">
              <FaExclamationTriangle className="text-yellow-400 mr-3 text-xl" />
              <div>
                <p className="text-yellow-800 font-semibold text-lg">
                  ⚠️ Important: This is for learning only!
                </p>
                <p className="text-yellow-700 text-sm mt-1">
                  Always ask a doctor before taking any medicine. This tool
                  cannot replace a real doctor.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <FaBaby className="mr-2 text-blue-500" />
              Patient Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Age Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patient`s Age (years) *
                </label>
                <input
                  type="number"
                  name="childAge"
                  value={formData.childAge}
                  onChange={handleInputChange}
                  min="0"
                  max="90"
                  step="0.1"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 5"
                />
              </div>

              {/* Weight Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patient`s Weight (kg) - Optional but recommended
                </label>
                <input
                  type="number"
                  name="childWeight"
                  value={formData.childWeight}
                  onChange={handleInputChange}
                  min="0"
                  max="200"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 20.5"
                />
              </div>

              {/* Symptoms Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Symptoms *
                </label>
                <textarea
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the symptoms in detail (e.g., fever 38°C, runny nose, sore throat)"
                />
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes - Optional
                </label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any additional information that might be helpful (e.g., allergies, recent medications)"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <FaPills className="mr-2" />
                    Get Medicine Guidance
                  </>
                )}
              </button>
            </form>

            {/* Safety Information */}
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-start">
                <FaExclamationTriangle className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">
                    Important Safety Notice
                  </h3>
                  <ul className="mt-2 text-sm text-red-700 space-y-1">
                    <li>
                      • Never give medication to children under 2 without
                      consulting a doctor
                    </li>
                    <li>
                      • Always verify dosage with a healthcare professional
                    </li>
                    <li>
                      • Seek immediate medical attention if symptoms worsen
                    </li>
                    <li>
                      • This AI cannot diagnose or provide medical treatment
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Response Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <FaThermometerHalf className="mr-2 text-green-500" />
              AI Guidance
            </h2>

            {loading && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                  <div className="animate-pulse">
                    <div className="h-4 bg-blue-200 rounded w-1/4 mb-4"></div>
                    <div className="space-y-3">
                      <div className="h-3 bg-blue-200 rounded"></div>
                      <div className="h-3 bg-blue-200 rounded w-5/6"></div>
                      <div className="h-3 bg-blue-200 rounded w-4/6"></div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-lg p-6">
                  <div className="animate-pulse">
                    <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-11/12"></div>
                      <div className="h-4 bg-gray-200 rounded w-9/12"></div>
                      <div className="h-4 bg-gray-200 rounded w-7/12"></div>
                      <div className="h-4 bg-gray-200 rounded w-10/12"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <FaExclamationTriangle className="text-red-500 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-red-800 font-medium">Error</p>
                    <p className="text-red-700 text-sm mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {response && (
              <div className="space-y-6">
                {/* Child Info Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                    <FaBaby className="mr-2" />
                    Patient Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-700">
                    <div className="flex items-center">
                      <span className="font-medium w-16">Age:</span>
                      <span>{response.patientAge} years</span>
                    </div>
                    {response.patientWeight && (
                      <div className="flex items-center">
                        <span className="font-medium w-16">Weight:</span>
                        <span>{response.patientWeight} kg</span>
                      </div>
                    )}
                    <div className="md:col-span-2">
                      <span className="font-medium">Symptoms:</span>
                      <p className="mt-1 text-blue-600">{response.symptoms}</p>
                    </div>
                  </div>
                </div>

                {/* AI Response */}
                <div className="bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800 flex items-center">
                      <FaThermometerHalf className="mr-2 text-green-500" />
                      Medical Guidance
                    </h3>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                      AI Generated
                    </span>
                  </div>
                  <div
                    className="text-gray-700 leading-relaxed text-base"
                    dangerouslySetInnerHTML={{
                      __html: formatResponse(response.guidance),
                    }}
                  />
                </div>

                {/* Timestamp and Disclaimer */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="text-xs text-gray-500 text-center mb-2">
                    Generated on:{" "}
                    {new Date(response.timestamp).toLocaleString()}
                  </div>
                  {response.note && (
                    <div className="text-xs text-gray-600 text-center italic">
                      {response.note}
                    </div>
                  )}
                </div>
              </div>
            )}

            {!loading && !error && !response && (
              <div className="text-center py-12">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-8">
                  <FaInfoCircle className="text-5xl mx-auto mb-4 text-blue-300" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Ready to Get Started
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Fill out the form on the left and submit to get AI-powered
                    medicine guidance for any age.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Safety Information */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaExclamationTriangle className="mr-2 text-red-500" />
            When to Seek Immediate Medical Attention
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <h4 className="font-medium text-red-600 mb-2">
                Emergency Symptoms:
              </h4>
              <ul className="space-y-1">
                <li>• High fever (above 40°C/104°F)</li>
                <li>• Difficulty breathing</li>
                <li>• Severe allergic reactions</li>
                <li>• Unconsciousness or confusion</li>
                <li>• Severe pain or injury</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-orange-600 mb-2">
                Call Doctor If:
              </h4>
              <ul className="space-y-1">
                <li>• Symptoms persist for more than 3 days</li>
                <li>• Child is under 3 months old</li>
                <li>• Child has underlying health conditions</li>
                <li>• You`re unsure about medication</li>
                <li>• Child refuses to eat or drink</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareCoPilot;
