
import React, { useEffect, useRef } from 'react'

export const SnowParticles = () => {
  const canvasRef = useRef(null);
  

    useEffect(()=>{
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let particles = [];

        const PARTICLES_RANGE = 200;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener("resize",resize);
        let radius = Math.random() * 3 + 1;
        particles = Array.from({length:PARTICLES_RANGE}, ()=>({
            x: Math.random() * canvas.width,
            y:Math.random() * canvas.height,
            radius,
            speedY: radius * 0.2,
            speedX: Math.random() * 0.5 - 0.25,
            opacity: Math.random(),

        }));

        const animate = ()=> {
            ctx.clearRect(0,0,canvas.width, canvas.height);
            particles.forEach((p, i) => {
                
                p.y +=p.speedY;
                p.x += Math.sin(p.y*0.01);
                if(p.y > canvas.height){
                    p.y = -10;
                    p.x = Math.random() * canvas.width;
                }

                ctx.beginPath();
                ctx.arc(p.x,p.y,p.radius,1,Math.PI * 0.2);
                ctx.fillStyle = `${i % 2 === 0 ? 'rgb(0, 241, 241)':'rgb(2, 150, 248)'}`;
                ctx.fill();
                
            });
            requestAnimationFrame(animate);
        };

        animate();
        return () => {
            window.removeEventListener("resize",resize);
        }
        

    },[])
  
    return (
    <canvas 
     ref={canvasRef}
     className='fixed inset-0 -z-10 '
    />
  )
}
