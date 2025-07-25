import { Link } from 'react-router-dom';

export const StarRating = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const isFull = i <= rating;
    const isHalf = !isFull && i - 0.5 <= rating;

    if (isFull) {
      stars.push(
        <svg
          key={i}
          aria-hidden="true"
          className="w-5 h-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      );
    } else if (isHalf) {
      stars.push(
        <div key={i} className="relative w-5 h-5">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <div className="absolute top-0 left-0 h-full w-1/2 overflow-hidden">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          </div>
        </div>
      );
    } else {
      stars.push(
        <svg
          key={i}
          aria-hidden="true"
          className="w-5 h-5 text-gray-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      );
    }
  }

  return (
    <div className="flex items-center">
      {stars}
      <span className="ml-2 text-sm text-gray-400">({rating})</span>
    </div>
  );
};

const DoctorCard = ({ doctor }) => {
  const { _id, firstName, lastName, about, experience, rating = 0 } = doctor;

  return (
    <li className="mb-4">
      <Link
        to={`/consultation/doctordetail/${_id}`}
        className="block p-4 bg-slate-800 rounded-lg hover:bg-slate-700 hover:shadow-lg transition-all duration-200"
      >
        <div className="flex items-start space-x-4">
          <img
            src={`https://api.dicebear.com/8.x/initials/svg?seed=${firstName} ${lastName}`}
            alt={`${firstName} ${lastName}`}
            className="w-16 h-16 rounded-full bg-slate-600 flex-shrink-0"
          />

          <div className="flex-1">
            <h3 className="font-bold text-lg text-white mb-1">
              Dr. {firstName} {lastName}
            </h3>
            <p className="text-sm text-gray-400 mb-2">{about}</p>

            <div className="flex justify-between items-center mt-2 text-sm">
              <div>
                <p className="text-xs text-gray-500">Experience</p>
                <p className="text-gray-300 font-semibold">{experience} years</p>
              </div>
              <div className="font-semibold">
                <StarRating rating={rating} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default DoctorCard;
