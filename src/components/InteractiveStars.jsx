import React, { useEffect, useRef } from 'react';

const InteractiveStars = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;

        let stars = [];
        const STAR_COUNT = 1000; // Increased count for subtle density

        // Resize handler
        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initStars();
        };

        window.addEventListener('resize', handleResize);

        // Initialize stars
        const initStars = () => {
            stars = [];
            const centerX = width / 2;
            const centerY = height / 2;

            for (let i = 0; i < STAR_COUNT; i++) {
                // Random position anywhere in the screen to start
                stars.push(resetStar({}, centerX, centerY, true));
            }
        };

        // Helper to reset a star to the center (or random start)
        const resetStar = (star, cx, cy, randomStart = false) => {
            star.x = (Math.random() - 0.5) * width * (randomStart ? 2 : 0.1); // Start near center if not random
            star.y = (Math.random() - 0.5) * height * (randomStart ? 2 : 0.1);
            star.z = Math.random() * width; // Depth (used for perspective)
            star.pz = star.z; // Previous z (for streaks)
            return star;
        };

        // Animation Loop
        const animate = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.4)"; // Trail effect (optional, or clear)
            ctx.clearRect(0, 0, width, height);

            const centerX = width / 2;
            const centerY = height / 2;
            const speed = 0.2; // Moderate slow speed

            // ctx.fillStyle = "rgba(255, 255, 255, 0.6)"; 

            stars.forEach(star => {
                // Move star closer (decrease z)
                star.z = star.z - speed;

                // Reset if it passes the screen
                if (star.z <= 1) {
                    resetStar(star, centerX, centerY);
                    star.z = width;
                    star.pz = width;
                    star.x = (Math.random() - 0.5) * width;
                    star.y = (Math.random() - 0.5) * height;
                }

                // Project 3D coordinates to 2D
                const sx = (star.x / star.z) * width + centerX;
                const sy = (star.y / star.z) * height + centerY;

                // Calculate size based on proximity - Make them visible!
                const r = (1 - star.z / width) * 2.5;

                // Draw Star (Circle) - Always visible regardless of speed
                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.3, 1 - star.z / width)})`;
                ctx.arc(sx, sy, Math.max(0.5, r), 0, Math.PI * 2);
                ctx.fill();

                // Update previous z
                star.pz = star.z;
            });

            requestAnimationFrame(animate);
        };

        // Setup
        canvas.width = width;
        canvas.height = height;
        initStars();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0, // Behind content
                pointerEvents: 'none'
            }}
        />
    );
};

export default InteractiveStars;
