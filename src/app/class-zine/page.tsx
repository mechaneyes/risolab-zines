"use client";

import React, { useEffect } from "react";
import { type Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import init, { p5SVG } from "p5.js-svg";

const classZine: Sketch = (p: p5SVG) => {
  const colorsCols = 7;
  const colorsRows = 6;
  const colorsOpacity = 0.6;
  const size = 124;

  // Function to shuffle an array
  const shuffleArray = (array: any[]): any[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  /* Color Theme Swatches in Hex */
  // $Miami-Beach #031CA6;
  // $Miami-Beach #0468BF;
  // $Miami-Beach #049DD9;
  // $Miami-Beach #D97904;
  // $Miami-Beach #D91E1E;

  // Create a 2D array to store the colors
  const colors = Array(colorsCols)
    .fill(0)
    .map(() => Array(colorsRows).fill(0));

  // Generate the colors
  for (let x = 0; x < colorsCols; x++) {
    for (let y = 0; y < colorsRows; y++) {
      const color = [
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        0.8,
      ];
      colors[x][y] = color;
    }
  }

  // Get the color array
  let colorArray;

  for (let x = 0; x < colors.length; x++) {
    for (let y = 0; y < colors[x].length; y++) {
      colorArray = colors[x][y];
    }
  }

  // Shuffle the color array
  colorArray = shuffleArray(colorArray);

  // Destructure the color array
  const [r, g, b] = colorArray;

  const gridMain = (fillCallback: (p: any) => void) => {
    const cols = 8;
    const rows = 5;

    p.noFill();
    p.stroke(0);
    p.strokeWeight(2);

    const totalWidth = size * (cols - 1);
    const totalHeight = size * (rows - 1);

    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        p.push();
        p.translate(
          p.map(
            x,
            0,
            cols - 1,
            p.width / 2 - totalWidth / 2,
            p.width / 2 + totalWidth / 2
          ),
          p.map(
            y,
            0,
            rows - 1,
            p.height / 2 - totalHeight / 2,
            p.height / 2 + totalHeight / 2
          ),
          0
        );

        // Fill is passed as parameter when calling gridMain()
        fillCallback(p);

        p.ellipse(0, 0, size, size);
        p.pop();
      }
    }
  };

  // inner grid of circles 5x5 offset to overlap with gridMain
  //
  const gridInner = () => {
    const cols = 7;
    const rows = 4;

    p.noFill();
    p.stroke(0);
    p.strokeWeight(2);

    const totalWidth = size * (cols - 1);
    const totalHeight = size * (rows - 1);

    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        p.push();
        p.translate(
          p.map(
            x,
            0,
            cols - 1,
            p.width / 2 - totalWidth / 2,
            p.width / 2 + totalWidth / 2
          ),
          p.map(
            y,
            0,
            rows - 1,
            p.height / 2 - totalHeight / 2,
            p.height / 2 + totalHeight / 2
          ),
          0
        );

        // Get the color array
        let colorArray = colors[x][y];

        // Shuffle the color array
        colorArray = shuffleArray(colorArray);

        // Destructure the color array
        const [r, g, b] = colorArray;

        // Set the fill color with 80% opacity
        p.fill(r, g, b, 255 * colorsOpacity);

        p.ellipse(0, 0, size, size);
        p.pop();
      }
    }
  };

  p.setup = () => {
    const cnv = p.createCanvas(1024, 664, p.SVG);
    p.noLoop();

    // Scale up the canvas for printing purposes
    p.pixelDensity(3);

    // Save the canvas as PNG when pressing 's'
    p.keyPressed = () => {
      if (p.key === "s") {
        const date = new Date();
        const timestamp = date.toISOString().replace(/[:.]/g, "-").slice(0, -5);

        p.save(cnv, `class-zine-${timestamp}.png`);
      }
    };
  };

  p.draw = () => {
    p.background(255);

    // Draw 2px stroke around the canvas with aspect ratio 17:11
    p.stroke(0);
    p.strokeWeight(2);
    p.noFill();
    p.rect(0, 0, 1024, 664);

    gridMain((p5) => p.fill(r, g, b, 255 * colorsOpacity));
    gridInner();
    gridMain((p5) => {
      p.stroke(0); // Set the stroke color to white
      p.noFill(); // Disable filling geometry
    });
  };
};

export default function ClassZine() {
  return <NextReactP5Wrapper sketch={classZine} />;
}
