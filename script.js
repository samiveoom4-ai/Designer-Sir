 document.addEventListener("DOMContentLoaded", () => {
            
            /* --- 1. Intersection Observer for Scroll Reveal --- */
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.15 // Triggers when 15% of the element is visible
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-revealed');
                        observer.unobserve(entry.target); // Only animate once
                    }
                });
            }, observerOptions);

            // Target all sections/elements with the reveal class
            document.querySelectorAll('.reveal-on-scroll').forEach(el => {
                observer.observe(el);
            });


            /* --- 2. 3D Mouse-Tracking Tilt Effect --- */
            const tiltElements = document.querySelectorAll('.tilt');

            tiltElements.forEach(el => {
                el.addEventListener('mousemove', (e) => {
                    const rect = el.getBoundingClientRect();
                    // Calculate mouse position relative to the element
                    const x = e.clientX - rect.left; 
                    const y = e.clientY - rect.top;  
                    
                    // Center coordinates of the element
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    // Calculate rotation degrees (Max 8 degrees for a premium, subtle Apple-like feel)
                    // Invert Y axis for natural tilt physics
                    const rotateX = ((y - centerY) / centerY) * -8;
                    const rotateY = ((x - centerX) / centerX) * 8;
                    
                    // Apply the 3D transform with perspective
                    el.style.transform = `perspective(1200px) scale3d(1.02, 1.02, 1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                });

                // Reset smoothly when the mouse leaves the element bounds
                el.addEventListener('mouseleave', () => {
                    // Add a CSS transition temporarily for the snap-back effect
                    el.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
                    el.style.transform = 'perspective(1200px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg)';
                    
                    // Remove the inline transition after animation completes 
                    // so it doesn't lag the subsequent mousemove events
                    setTimeout(() => {
                        el.style.transition = '';
                    }, 600);
                });
                
                // Ensure no transition delay when mouse first enters
                el.addEventListener('mouseenter', () => {
                    el.style.transition = '';
                });
            });
        });
