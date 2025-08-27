import React from "react";

export default function Services() {
  const services = [
    {
      title: "Pediatric Consultation",
      description:
        "Video and in-person consultations with certified pediatricians for routine and urgent concerns.",
    },
    {
      title: "Feeding Guidance",
      description:
        "Track feeds and get personalized guidance for breastfeeding, formula, and solids.",
    },
    {
      title: "Sleep Coaching",
      description:
        "Evidence-based sleep schedules and tracking to build healthy sleep habits.",
    },
    {
      title: "Vaccine Reminders",
      description:
        "Smart reminders and education to keep your child on schedule.",
    },
    {
      title: "Learning Hub",
      description:
        "Curated articles and checklists for every developmental stage.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Our Services</h1>
        <p className="text-gray-600">
          Compassionate, evidence-based care and tools to support your baby’s first years.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, idx) => (
          <div key={idx} className="rounded-2xl border border-gray-200 p-6 shadow-sm bg-white">
            <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
            <p className="text-gray-600">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
