import React, { useEffect, useRef, useState } from "react";

/**
 * AnimatedCounter
 * @param {number} target - The target number to count up to
 * @param {number} duration - Duration of animation in ms (default: 1500)
 * @param {string} suffix - Optional suffix (e.g., '+', '%')
 * @param {function} format - Optional formatting function for display
 * @param {boolean} start - If true, animation starts
 */
const AnimatedCounter = ({ target, duration = 1500, suffix = '', format, start = true }) => {
	const [count, setCount] = useState(0);
	const rafRef = useRef();
	const startTimeRef = useRef();

	useEffect(() => {
		if (!start) return;
		setCount(0);
		startTimeRef.current = null;

		const animate = (timestamp) => {
			if (!startTimeRef.current) startTimeRef.current = timestamp;
			const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
			const value = Math.floor(progress * target);
			setCount(progress < 1 ? value : target);
			if (progress < 1) {
				rafRef.current = requestAnimationFrame(animate);
			}
		};
		rafRef.current = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(rafRef.current);
	}, [target, duration, start]);

	let display = count;
	if (format) display = format(count);
	return (
		<span>
			{display}
			{suffix}
		</span>
	);
};

export default AnimatedCounter;
