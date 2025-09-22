// utils/downloadUtils.ts
import html2canvas from 'html2canvas';

export const downloadElementAsImage = async (
  element: HTMLElement,
  filename: string
): Promise<void> => {
  try {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      throw new Error('Download is only available in the browser');
    }

    // Create a simplified version for capture to avoid external resource issues
    const container = document.createElement('div');
    container.style.backgroundColor = '#ffffff';
    container.style.padding = '20px';
    container.style.borderRadius = '12px';
    container.style.fontFamily = 'sans-serif';
    
    // Extract the palette name if available
    const nameElement = element.querySelector('h3, h2, h1');
    const paletteName = nameElement?.textContent || 'color-palette';
    
    // Add title
    const title = document.createElement('h2');
    title.textContent = paletteName;
    title.style.margin = '0 0 20px 0';
    title.style.textAlign = 'center';
    title.style.color = '#333';
    container.appendChild(title);
    
    // Extract and add color boxes
    const colorElements = element.querySelectorAll('[style*="background-color"]');
    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = `repeat(${colorElements.length}, 1fr)`;
    grid.style.gap = '16px';
    grid.style.marginBottom = '20px';
    
    colorElements.forEach((colorEl, index) => {
      const bgColor = colorEl.getAttribute('style')?.match(/background-color:\s*(#[0-9a-fA-F]{3,6}|[a-zA-Z]+)/i);
      const colorValue = bgColor ? bgColor[1] : '#D9D9D9';
      
      const colorContainer = document.createElement('div');
      colorContainer.style.display = 'flex';
      colorContainer.style.flexDirection = 'column';
      colorContainer.style.alignItems = 'center';
      colorContainer.style.gap = '8px';
      
      const colorBox = document.createElement('div');
      colorBox.style.width = '80px';
      colorBox.style.height = '80px';
      colorBox.style.borderRadius = '8px';
      colorBox.style.backgroundColor = colorValue;
      
      const colorCode = document.createElement('span');
      colorCode.textContent = colorValue.toUpperCase();
      colorCode.style.fontFamily = 'monospace';
      colorCode.style.fontSize = '12px';
      colorCode.style.color = '#666';
      
      colorContainer.appendChild(colorBox);
      colorContainer.appendChild(colorCode);
      grid.appendChild(colorContainer);
    });
    
    container.appendChild(grid);
    
    // Add to DOM for capture
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    document.body.appendChild(container);
    
    const canvas = await html2canvas(container, {
      backgroundColor: '#ffffff',
      scale: 2,
      logging: false
    });
    
    // Remove from DOM
    document.body.removeChild(container);
    
    // Create download link
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading image:', error);
    throw new Error('Failed to download image. Please try again.');
  }
};

// Generate an image directly from a palette definition (preferred)
export const downloadPaletteDataAsImage = async (
  colors: string[],
  name: string
): Promise<void> => {
  // Build a clean DOM tree that html2canvas can capture reliably
  const container = document.createElement('div');
  container.style.backgroundColor = '#ffffff';
  container.style.padding = '24px';
  container.style.borderRadius = '12px';
  container.style.fontFamily = 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif';
  container.style.width = 'fit-content';

  const title = document.createElement('h2');
  title.textContent = name && name.trim() ? name : 'color-palette';
  title.style.margin = '0 0 20px 0';
  title.style.textAlign = 'center';
  title.style.color = '#333';
  container.appendChild(title);

  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = `repeat(${colors.length}, 1fr)`;
  grid.style.gap = '16px';

  colors.forEach((hex) => {
    const colorContainer = document.createElement('div');
    colorContainer.style.display = 'flex';
    colorContainer.style.flexDirection = 'column';
    colorContainer.style.alignItems = 'center';
    colorContainer.style.gap = '8px';

    const colorBox = document.createElement('div');
    colorBox.style.width = '120px';
    colorBox.style.height = '120px';
    colorBox.style.borderRadius = '10px';
    colorBox.style.backgroundColor = hex;

    const colorCode = document.createElement('span');
    colorCode.textContent = (hex || '#D9D9D9').toUpperCase();
    colorCode.style.fontFamily = 'monospace';
    colorCode.style.fontSize = '13px';
    colorCode.style.color = '#444';

    colorContainer.appendChild(colorBox);
    colorContainer.appendChild(colorCode);
    grid.appendChild(colorContainer);
  });

  container.appendChild(grid);

  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '0';
  document.body.appendChild(container);

  const canvas = await html2canvas(container, {
    backgroundColor: '#ffffff',
    scale: Math.min(2, window.devicePixelRatio || 1),
    logging: false
  });

  document.body.removeChild(container);

  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name || 'color-palette'}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 'image/png');
};