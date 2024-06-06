"use client";

import React from "react";
import { type Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";

const classZine: Sketch = (p5) => {
  p5.setup = () => p5.createCanvas(p5.windowWidth, p5.windowHeight);

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
        p5.ellipse(0, 0, size, size);
        p5.pop();
      }
    }
  }

  // innerGrid of circles 5x5 offset to overlap with mainGrid
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
