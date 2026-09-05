import { useState, useEffect } from 'react'

// 1. Import all valid images matching your assets folder
import img7cr from '../assets/7cr.jpg'
import imgAllu from '../assets/allu.jpg'
import imgChina from '../assets/china.jpg'
import imgD1 from '../assets/d1.jpg'
import imgD2 from '../assets/d2.jpg'
import imgD3 from '../assets/d3.jpg'
import imgD4 from '../assets/d4.jpg'
import imgDonkey from '../assets/donkey.jpg'
import imgLhc from '../assets/lhc.jpg'
import imgOhno from '../assets/ohno.jpg'
import imgOkay from '../assets/okay.jpg'
import imgRobo from '../assets/robo.jpg'
import imgTailung from '../assets/tailung.jpg'

// Import the sound effect (assuming .mp3 based on adjacent files)
import audioFahh from '../assets/fahhhhhhhhhhhhhh.mp3'

const MEME_IMAGES = [
  img7cr, imgAllu, imgChina, imgD1, imgD2, imgD3, imgD4, imgDonkey,
  imgLhc, imgOhno, imgOkay,
  imgRobo, imgTailung,
]

// 3. Generate massive array of memes, corners first!
function generateParticles() {
  const totalMemes = 45;

  return Array.from({ length: totalMemes }).map((_, i) => {
    let left, top;

    // The first 4 memes are forced into the 4 corners
    if (i === 0) { left = 2; top = 2; }         // Top Left
    else if (i === 1) { left = 85; top = 2; }   // Top Right
    else if (i === 2) { left = 2; top = 75; }   // Bottom Left
    else if (i === 3) { left = 85; top = 75; }  // Bottom Right
    else {
      // The remaining memes are placed randomly
      left = Math.random() * 85;
      top = Math.random() * 85;
    }

    return {
      id: i,
      src: MEME_IMAGES[i % MEME_IMAGES.length],
      left: left,
      top: top,
      delay: i * 0.15, // Staggered appearance
      size: 150 + (i * 22), // Progressively gets massive
      rotation: (Math.random() - 0.5) * 80,
    }
  })
}

function MemeExplosion() {
  const [particles] = useState(generateParticles)

  // 4. Play the sound effect on mount
  useEffect(() => {
    const sound = new Audio(audioFahh)
    sound.volume = 1.0 // Maximum volume for maximum chaos
    sound.play().catch((err) => console.error("Audio playback blocked by browser:", err))
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none', // Lets clicks pass through to the Try Again button
        overflow: 'hidden',
        zIndex: 250,
      }}
    >
      <style>{`
        @keyframes memePop {
          0% { transform: scale(0); opacity: 0; }
          75% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}vw`,
            top: `${p.top}vh`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        >
          <img
            src={p.src}
            alt="exploding meme"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              objectFit: 'contain',
              opacity: 0, // Hidden until animation starts
              animation: `memePop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${p.delay}s forwards`,
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              borderRadius: '12px'
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default MemeExplosion
