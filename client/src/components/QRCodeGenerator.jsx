import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = ({ value, size = 128 }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <QRCode 
        value={value} 
        size={size}
        fgColor="#16a34a" 
        bgColor="#ffffff"
        level="H"
      />
    </div>
  );
};

export default QRCodeGenerator;