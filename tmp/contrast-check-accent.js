const hexToRgb = (hex) => {
  const cleaned = hex.replace('#','');
  const bigint = parseInt(cleaned,16);
  if (cleaned.length === 6) {
    return { r: (bigint>>16)&255, g:(bigint>>8)&255, b: bigint&255 };
  }
  return null;
}
function luminance(r,g,b){
  const a = [r,g,b].map((v)=>{
    v = v/255;
    return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055,2.4);
  });
  return 0.2126*a[0] + 0.7152*a[1] + 0.0722*a[2];
}
function contrast(hex1,hex2){
  const c1 = hexToRgb(hex1);
  const c2 = hexToRgb(hex2);
  const L1 = luminance(c1.r,c1.g,c1.b);
  const L2 = luminance(c2.r,c2.g,c2.b);
  const light = Math.max(L1,L2);
  const dark = Math.min(L1,L2);
  return Number(( (light+0.05)/(dark+0.05) ).toFixed(2));
}

const palette = {
  primary: '#F5EBE0',
  secondary: '#D5B4A1',
  accent: '#C88A55',
  neutral: '#4E443F',
  text: '#312B27',
  white: '#ffffff'
}

console.log('Contrast report for adjusted accent:');
console.log('text on accent ->', contrast(palette.text,palette.accent));
console.log('white on accent ->', contrast(palette.white,palette.accent));
console.log('text on primary ->', contrast(palette.text,palette.primary));
console.log('text on secondary ->', contrast(palette.text,palette.secondary));
