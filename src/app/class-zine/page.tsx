"use client";

import React, { useEffect } from "react";
import { type Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";

const classZine: Sketch = (p) => {
  // Function to shuffle an array
  const shuffleArray = (array: any[]): any[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const colorsCols = 9;
  const colorsRows = 7;
  const colorsOpacity = 0.6;
  const size = 120;

  /* Color Theme Swatches in Hex */
  // $Miami-Beach-1-hex: #031CA6;
  // $Miami-Beach-2-hex: #0468BF;
  // $Miami-Beach-3-hex: #049DD9;
  // $Miami-Beach-4-hex: #D97904;
  // $Miami-Beach-5-hex: #D91E1E;

  /* Color Theme Swatches in RGBA */
  // 3, 27, 165;
  // 3, 103, 191;
  // 4, 156, 216;
  // 216, 121, 4;
  // 216, 30, 30;

  const predefinedColors = [
    [3, 27, 165], // Red
    [3, 103, 191], // Green
    [4, 156, 216], // Blue
    [216, 121, 4], // Yellow
    [216, 30, 30], // Cyan
  ];

  const systemTwoColors = [
    [73, 130, 207], // sky blue
    [94, 200, 229], // aqua
    [227, 237, 85], // light lime
    [247, 255, 0], // Yellow
    [246, 80, 88], // scarlet
    [255, 72, 176], // fluorescent pink
    [172, 147, 110], // metallic gold
    // [0, 0, 0], // black
  ];

  const colors = Array(colorsCols)
    .fill(0)
    .map(() => Array(colorsRows).fill(0));

  // Generate the colors
  for (let x = 0; x < colorsCols; x++) {
    for (let y = 0; y < colorsRows; y++) {
      // Select a random color from predefinedColors
      const color =
        systemTwoColors[Math.floor(Math.random() * systemTwoColors.length)];
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
    const cols = 10;
    const rows = 8;

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
    const cols = 9;
    const rows = 7;

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
        colorArray = shuffleArray(systemTwoColors);

        // Destructure the color array
        const [r, g, b] = colorArray;

        // Set the fill color with 80% opacity
        // p.fill(r, g, b, 255 * colorsOpacity);
        p.fill(r, g, b, 0.3 * 255);

        p.ellipse(0, 0, size, size);
        p.pop();
      }
    }
  };

  p.setup = () => {
    // 1280x989 === 11x8.5 inches
    const cnv = p.createCanvas(1280, 989);
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
    p.rect(0, 0, 1280, 989);

    // gridMain((p5) => p.fill(r, g, b, 255 * colorsOpacity));
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
