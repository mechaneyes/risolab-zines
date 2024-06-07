"use client";

import React, { useEffect } from "react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";

const classZine = (p) => {
  // Function to shuffle an array
  const shuffleArray = (array) => {
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

  const systemOneColors = [
    [0, 120, 191, colorsOpacity],
    [98, 168, 229, colorsOpacity],
    [0, 157, 165, colorsOpacity],
    [0, 169, 92, colorsOpacity],
    [247, 255, 0, colorsOpacity],
    [255, 108, 47, colorsOpacity],
    [241, 80, 96, colorsOpacity],
    [255, 72, 176, colorsOpacity],
    [157, 122, 210, colorsOpacity],
    [172, 147, 110, colorsOpacity],
  ];

  const systemTwoColors = [
    [73, 130, 207, colorsOpacity],
    [94, 200, 229, colorsOpacity],
    [227, 237, 85, colorsOpacity],
    [247, 255, 0, colorsOpacity],
    [246, 80, 88, colorsOpacity],
    [255, 72, 176, colorsOpacity],
    [172, 147, 110, colorsOpacity],
  ];

  const colors = Array(colorsCols)
    .fill(0)
    .map(() => Array(colorsRows).fill(0));

  for (let x = 0; x < colorsCols; x++) {
    for (let y = 0; y < colorsRows; y++) {
      const color =
        systemTwoColors[Math.floor(Math.random() * systemTwoColors.length)];
      colors[x][y] = color;
    }
  }

  let colorArray;

  for (let x = 0; x < colors.length; x++) {
    for (let y = 0; y < colors[x].length; y++) {
      colorArray = colors[x][y];
    }
  }

  colorArray = shuffleArray(colorArray);

  const [r, g, b] = colorArray;

  const gridMain = (fillCallback) => {
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

        fillCallback(p);

        p.ellipse(0, 0, size, size);
        p.pop();
      }
    }
  };

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

        let colorArray = colors[x][y];

        colorArray = shuffleArray(systemTwoColors);

        const [r, g, b, a] = colorArray;

        p.fill(r, g, b, a);

        p.ellipse(0, 0, size, size);
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
  };

  p.draw = () => {
    p.background(255);
    p.strokeWeight(2);
    p.noFill();
    p.rect(0, 0, 1280, 989);

    gridInner();
    gridMain((p5) => {
      p.stroke(0);
      p.noFill();
    });
  };
};

export default function ClassZine() {
  return <NextReactP5Wrapper sketch={classZine} />;
}