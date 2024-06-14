"use client";

import React, { useState } from "react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";

const classZine = (p) => {
  const colorsOpacity = 180;
  const circSize = 120;

  const systemOneColors = [
    // [0, 0, 0, colorsOpacity, 1],     // black
    [0, 120, 191, colorsOpacity, 1], // blue
    [98, 168, 229, colorsOpacity, 1], // cornflower
    [0, 157, 165, colorsOpacity, 1], // light teal
    [0, 169, 92, colorsOpacity, 1], // green
    [247, 255, 0, colorsOpacity, 1], // yellow
    [255, 108, 47, colorsOpacity, 1], // orange
    [241, 80, 96, colorsOpacity, 1], // bright red
    [255, 72, 176, colorsOpacity, 1], // fluorescent pink
    [157, 122, 210, colorsOpacity, 1], // violet
    [172, 147, 110, colorsOpacity, 1], // metallic gold
    [255, 255, 255, colorsOpacity, 1], // white
  ];

  const systemTwoColors = [
    [0, 0, 0, colorsOpacity, 1], // black
    [73, 130, 207, colorsOpacity, 1], // sky blue
    [94, 200, 229, colorsOpacity, 1], // aqua
    [227, 237, 85, colorsOpacity, 1], // light lime
    [247, 255, 0, colorsOpacity, 1], // Yellow
    [246, 80, 88, colorsOpacity, 1], // scarlet
    [255, 72, 176, colorsOpacity, 1], // fluorescent pink
    [172, 147, 110, colorsOpacity, 1], // metallic gold
    [255, 255, 255, 255, 1], // white
  ];

  const chosen = [
    [73, 130, 207, colorsOpacity, 2], // sky blue
    [94, 200, 229, colorsOpacity, 3], // aqua
    [246, 80, 88, colorsOpacity, 1], // scarlet
    [255, 255, 255, 255, 2], // white
  ];

  // Take the 5th element of the color array and return
  // a new array with the colors repeated that many times
  //
  const repeatedColors = chosen.reduce((acc, [r, g, b, a, times]) => {
    return acc.concat(Array(times).fill([r, g, b, a]));
  }, []);

  const colorEmployed = repeatedColors;

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const gridCirc = (numCols, numRows, noFill) => {
    const cols = numCols;
    const rows = numRows;

    const totalWidth = circSize * (cols - 1);
    const totalHeight = circSize * (rows - 1);

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

        const colorArray = shuffleArray(colorEmployed);
        const [r, g, b, a] = colorArray;
        p.fill(r, g, b, a);
        p.stroke(0);

        if (noFill) {
          p.noFill();
        }

        p.ellipse(0, 0, circSize, circSize);
        p.pop();
      }
    }
  };

  p.setup = () => {
    const cnv = p.createCanvas(1280, 989);
    p.noLoop();

    p.pixelDensity(3);

    p.keyPressed = () => {
      if (p.key === "s") {
        const date = new Date();
        const timestamp = date.toISOString().replace(/[:.]/g, "-").slice(0, -5);

        p.save(cnv, `class-zine-${timestamp}.png`);
      }
    };

    p.keyPressed = () => {
      if (p.key === "p") {
        // exportPdf(cnv);
      }
    };
  };

  p.draw = () => {
    p.background(255);
    p.strokeWeight(1);
    p.noFill();
    p.strokeWeight(2);

    gridCirc(10, 8, false);
    gridCirc(9, 7, false);
    gridCirc(10, 8, true);
  };
};

export default function ClassZine() {
  const [refreshKey, setRefreshKey] = useState(true);

  const refreshSketch = () => {
    setRefreshKey((currentValue) => !currentValue);
  };

  return (
    <div>
      <button className="refresh-sketch" onClick={refreshSketch}>
        Refresh Sketch
      </button>
      <NextReactP5Wrapper sketch={(p) => classZine(p, refreshKey)} />
    </div>
  );
}
