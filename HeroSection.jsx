import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";
import "./HeroSection.css";

function FurnitureModel() {
  const { scene } = useGLTF("/models/Sofa.glb"); 
  return <primitive object={scene} scale={2} />;
}

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-text">
        <h1>Modern Interior <br /> Design Studio</h1>
        <p>
          Discover furniture and décor that perfectly blends comfort and style.
With Roomify, every corner of your home becomes a statement of elegance.
        </p>
        <div className="hero-buttons">
          <button className="shop-btn">Shop Now</button>
          <button className="explore-btn">Explore</button>
        </div>
      </div>
      <div className="hero-3d">
        <Canvas camera={{ position: [5, 2, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <Stage environment="city" intensity={0.6}>
            <FurnitureModel />
          </Stage>
          <OrbitControls enableZoom={true} />
        </Canvas>
      </div>
    </section>
  );
};

export default HeroSection;
