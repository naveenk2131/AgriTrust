// QR Code Utility Functions

// Function to download QR code as image
export const downloadQRCode = (value, filename = 'qrcode.png') => {
  // Create a temporary canvas to convert QR code to image
  const canvas = document.createElement('canvas');
  const svg = document.querySelector(`[data-value="${value}"]`);
  
  if (!svg) {
    console.error('QR code element not found');
    return;
  }
  
  // Convert SVG to canvas
  const xml = new XMLSerializer().serializeToString(svg.querySelector('svg'));
  const svgBlob = new Blob([xml], {type: 'image/svg+xml;charset=utf-8'});
  const url = URL.createObjectURL(svgBlob);
  
  const img = new Image();
  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    
    // Convert to PNG and trigger download
    const pngUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = filename;
    link.href = pngUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  };
  img.src = url;
};

// Function to copy QR code data to clipboard
export const copyQRCodeData = async (value) => {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch (err) {
    console.error('Failed to copy QR code data: ', err);
    return false;
  }
};