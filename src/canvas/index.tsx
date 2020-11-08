import React, { useEffect, useRef } from "react";
import { getInitConfig, render } from "../lib";

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;
    render(context);
  }, []);

  const config = getInitConfig();

  return <canvas ref={canvasRef} width={config.width} height={config.height} />;
}

export default Canvas;
