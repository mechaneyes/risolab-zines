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
  const colorsOpacity = 255;
  const size = 120;

  // Riso Ink Colors
  // https://www.stencil.wiki/colors
  // 
  const systemOneColors = [
    // [0, 0, 0, colorsOpacity], // black
    [0, 120, 191, colorsOpacity], // blue
    [98, 168, 229, colorsOpacity], // cornflower
    [0, 157, 165, colorsOpacity], // light teal
    [0, 169, 92, colorsOpacity], // green
    [247, 255, 0, colorsOpacity], // yellow
    [255, 108, 47, colorsOpacity], // orange
    [241, 80, 96, colorsOpacity], // bright red
    [255, 72, 176, colorsOpacity], // fluorescent pink
    [157, 122, 210, colorsOpacity], // violet
    [172, 147, 110, colorsOpacity], // metallic gold
  ];

  const systemTwoColors = [
    // [0, 0, 0, colorsOpacity], // black
    [73, 130, 207, colorsOpacity], // sky blue
    [94, 200, 229, colorsOpacity], // aqua
    [227, 237, 85, colorsOpacity], // light lime
    [247, 255, 0, colorsOpacity], // Yellow
    [246, 80, 88, colorsOpacity], // scarlet
    [255, 72, 176, colorsOpacity], // fluorescent pink
    [172, 147, 110, colorsOpacity], // metallic gold
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
        const [r, g, b, a] = colorArray;

        // Set the fill color with 80% opacity
        // p.fill(r, g, b, 255 * colorsOpacity);
        p.fill(r, g, b, a);

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
