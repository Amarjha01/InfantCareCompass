import React, { useState } from "react";
import { MessageCircle, X, Heart } from "lucide-react";
import FirstAidChatbotCompact from "./FirstAidChatbotCompact.jsx";

const FirstAidChatbotButton = () => {
  const [open, setOpen] = useState(false);
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setDragging(true);
    setRel({
      x: e.clientX - drag.x,
      y: e.clientY - drag.y,
    });
    e.preventDefault();
  };

  const handleMouseUp = () => setDragging(false);

  const handleMouseMove = (e) => {
    if (!dragging) return;
    setDrag({
      x: e.clientX - rel.x,
      y: e.clientY - rel.y,
    });
    e.preventDefault();
  };

  React.useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    // eslint-disable-next-line
  }, [dragging]);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 animate-pulse"
          onClick={() => setOpen((o) => !o)}
          title="First Aid AI Assistant"
        >
          <Heart className="w-6 h-6" />
        </button>
      </div>
      {open && (
        <div
          className="fixed bottom-24 right-8 z-50 bg-white/95 dark:bg-gray-800/95 rounded-2xl shadow-2xl border border-red-200 dark:border-red-800 w-[90vw] max-w-md h-[70vh] flex flex-col animate-fade-in"
          style={{
            transform: `translate(${drag.x}px, ${drag.y}px)`,
            cursor: dragging ? "grabbing" : "grab",
          }}
        >
          <div
            className="flex items-center justify-between p-3 bg-gradient-to-r from-red-100 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-t-2xl border-b border-red-100 dark:border-red-800 cursor-move select-none"
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-600 dark:text-red-400" />
              <span className="font-bold text-red-700 dark:text-red-300">First Aid AI</span>
            </div>
            <button
              className="text-red-700 dark:text-red-300 hover:text-red-500 transition"
              onClick={() => setOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <FirstAidChatbotCompact />
          </div>
        </div>
      )}
    </>
  );
};

export default FirstAidChatbotButton;
