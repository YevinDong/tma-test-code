import React from "react";
import ReactDOM from "react-dom/client";
import { Particle } from "./particle.tsx";

export interface ParticleReactOptions {
  element: HTMLElement;
}

export function initParticleReact(options: ParticleReactOptions) {
  ReactDOM.createRoot(options.element).render(<Particle />);
}
