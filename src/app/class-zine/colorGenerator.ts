export function generateColors(colorsCols: number, colorsRows: number) {
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

  let colorArrays = [];

  for (let i = 0; i < 4; i++) {
    let colorArray = [];
  
    for (let x = 0; x < 4; x++) {
      colorArray.push(colors[i][x]);
    }
  
    colorArray = shuffleArray(colorArray);
    colorArrays.push(colorArray);
  }
  
  return colorArrays;
}
