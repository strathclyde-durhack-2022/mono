import React, { useState, useEffect, useRef } from "react";
import GLOBE from "vanta/dist/vanta.globe.min";
import * as THREE from "three";

import Nav from "../components/Nav"
import HomeMain from "../components/HomeMain"

const Background = () => {
    const [vantaEffect, setVantaEffect] = useState(0);
    const vantaRef = useRef();
  
    useEffect(() => {
      if (!vantaEffect) {
        setVantaEffect(
          GLOBE({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: false,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x4a3fff,
            size: 0.50,
            backgroundColor: 0xf3f1f7
          })
        );
      }
      return () => {
        if (vantaEffect) vantaEffect.destroy();
      };
    }, [vantaEffect]);
    return (
      <div ref={vantaRef} className="z-2 h-screen w-screen">
        <Nav />
        <HomeMain />
      </div>
    );
}

export default Background