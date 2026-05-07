document.addEventListener('DOMContentLoaded', () => {
    // ── Register GSAP Plugins ──
    gsap.registerPlugin(ScrollTrigger);

    const cursorDot = document.getElementById('cursor-dot');
    const cursorBlur = document.getElementById('cursor-blur');

    // ── Interactive Cursor ──
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        
        gsap.to(cursorDot, { x: clientX, y: clientY, duration: 0.1 });
        gsap.to(cursorBlur, { x: clientX, y: clientY, duration: 0.8, ease: "power2.out" });
    });

    // ── Hero Animations ──
    const heroTl = gsap.timeline();
    
    heroTl.from(".hero-brand", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out"
    })
    .from(".hero-slogan .char", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out"
    }, "-=1");

    // ── Scrollytelling Panels ──
    const panels = gsap.utils.toArray(".panel");

    panels.forEach((panel, i) => {
        if (i === 0) return; // Skip hero for entry animation

        const text = panel.querySelector(".massive-text");
        const sub = panel.querySelector(".story-p") || panel.querySelector(".section-label");

        gsap.from(text, {
            scrollTrigger: {
                trigger: panel,
                start: "top center+=100",
                toggleActions: "play none none reverse",
            },
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: "expo.out"
        });

        if (sub) {
            gsap.from(sub, {
                scrollTrigger: {
                    trigger: panel,
                    start: "top center+=200",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                delay: 0.2,
                ease: "expo.out"
            });
        }
    });

    // ── Japanese BG Parallax ──
    gsap.to(".japanese-bg", {
        scrollTrigger: {
            trigger: ".hero-v2",
            start: "top top",
            end: "bottom top",
            scrub: true
        },
        y: -100,
        opacity: 0
    });

    // ── Hover Effects ──
    const interactables = document.querySelectorAll('a, button, .btn-sm');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursorDot, { scale: 8, background: "rgba(255,255,255,0.1)", backdropFilter: "blur(4px)" });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursorDot, { scale: 1, background: "white", backdropFilter: "none" });
        });
    });
});
