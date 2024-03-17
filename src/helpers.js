export function getContrastColor(colorCode) {
    if(colorCode === "transparent") return "black";
    // Convert hex color to RGB
    const rgb = rgbStringToObject(colorCode);
    // Calculate relative luminance
    const luminance = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;
    // Return white or black based on luminance
    return luminance > 0.5 ? "#000000" : "#ffffff";
  }
  
  function rgbStringToObject(rgbString) {
    // Extract numbers between parentheses
    const matches = rgbString.match(/\((\d+),\s*(\d+),\s*(\d+)\)/);
  
    // If matches are found, extract values for r, g, and b
    if (matches) {
      const [, r, g, b] = matches;
      return { r: parseInt(r), g: parseInt(g), b: parseInt(b) };
    }
  
    // Return null if no matches are found
    return null;
  }

 export function hexToRgb(hex) {
    // Remove '#' if present
    hex = hex.replace(/^#/, "");
  
    // Convert 3-digit hex to 6-digit
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((char) => char + char)
        .join("");
    }
  
    // Convert hex to RGB
    const num = parseInt(hex, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  }
  