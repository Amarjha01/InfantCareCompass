// import { useEffect, useRef } from 'react';

// const CustomCursor = () => {
//   const dotRef = useRef(null);
//   const ringRef = useRef(null);

//   const mouse = useRef({ x: 0, y: 0 });
//   const pos = useRef({ x: 0, y: 0 });
//   const rafId = useRef(null);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       mouse.current.x = e.clientX;
//       mouse.current.y = e.clientY;
//     };

//     const animate = () => {
//       pos.current.x += (mouse.current.x - pos.current.x) * 0.1;
//       pos.current.y += (mouse.current.y - pos.current.y) * 0.1;

//       dotRef.current.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%)`;
//       ringRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;

//       rafId.current = requestAnimationFrame(animate);
//     };

//     document.addEventListener('mousemove', handleMouseMove);
//     rafId.current = requestAnimationFrame(animate);

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       cancelAnimationFrame(rafId.current);
//     };
//   }, []);

//   return (
//     <>
//       <div
//         ref={dotRef}
//         className="fixed z-[9999] w-4 h-4 bg-white rounded-full pointer-events-none mix-blend-difference"
//         style={{
//           top: 0,
//           left: 0,
//         }}
//       />
//       <div
//         ref={ringRef}
//         className="fixed z-[9998] w-8 h-8 border-[2px] border-violet-400 rounded-full pointer-events-none opacity-70 backdrop-blur-sm"
//         style={{
//           top: 0,
//           left: 0,
//         }}
//       />
//     </>
//   );
// };

// export default CustomCursor;

import React, { useEffect } from 'react';

const CustomCursor = () => {
  useEffect(() => {
    // Set default cursor for body
    document.body.style.cursor = 'default';

    return () => {
      // Cleanup: reset to auto on unmount if needed
      document.body.style.cursor = 'auto';
    };
  }, []);

  return null; // No visual component needed
};

export default CustomCursor;
