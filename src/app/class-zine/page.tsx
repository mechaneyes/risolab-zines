"use client";

import React from "react";
import { type Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";

const classZine: Sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.noLoop();
  };

  // Function to shuffle an array
  const shuffleArray = (array: any[]): any[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const colorsCols = 6;
  const colorsRows = 6;

  // Create a 2D array to store the colors
  const colors = Array(colorsCols)
    .fill(0)
    .map(() => Array(colorsRows).fill(0));

  // Generate the colors
  for (let x = 0; x < colorsCols; x++) {
    for (let y = 0; y < colorsRows; y++) {
      // Cycle through the primary colors
      const color = [
        Number(x % 3 === 0) * 255,
        Number(x % 3 === 1) * 255,
        Number(x % 3 === 2) * 255,
      ];
      colors[x][y] = color;
    }
  }

  function gridMain() {
    const cols = 6;
    const rows = 6;
    const size = 128;

    p5.noFill();
    p5.stroke(0);
    p5.strokeWeight(2);

    const totalWidth = size * (cols - 1);
    const totalHeight = size * (rows - 1);

    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        p5.push();
        p5.translate(
          p5.map(
            x,
            0,
            cols - 1,
            p5.width / 2 - totalWidth / 2,
            p5.width / 2 + totalWidth / 2
          ),
          p5.map(
            y,
            0,
            rows - 1,
            p5.height / 2 - totalHeight / 2,
            p5.height / 2 + totalHeight / 2
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
        p5.fill(r, g, b, 255 * 0.8);

        p5.ellipse(0, 0, size, size);
        p5.pop();
      }
    }
  }

  // inner grid of circles 5x5 offset to overlap with gridMain
  //
  function gridInner() {
    const cols = 5;
    const rows = 5;
    const size = 128;

    p5.noFill();
    p5.stroke(0);
    p5.strokeWeight(2);

    const totalWidth = size * (cols - 1);
    const totalHeight = size * (rows - 1);

    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        p5.push();
        p5.translate(
          p5.map(
            x,
            0,
            cols - 1,
            p5.width / 2 - totalWidth / 2,
            p5.width / 2 + totalWidth / 2
          ),
          p5.map(
            y,
            0,
            rows - 1,
            p5.height / 2 - totalHeight / 2,
            p5.height / 2 + totalHeight / 2
          ),
          0
        );
        p5.ellipse(0, 0, size, size);
        p5.pop();
      }
    }
  }

  p5.draw = () => {
    p5.background(255);

    gridMain();
    gridInner();
  };
};

export default function ClassZine() {
  return <NextReactP5Wrapper sketch={classZine} />;
}
