import logoNear from '../public/logo-near.webp';
import logoBrackets from '../public/logo-brackets.webp';
import logoHijack1 from '../public/logo-hijack-1.webp';
import logoHijack2 from '../public/logo-hijack-2.webp';
import logoHijack3 from '../public/logo-hijack-3.webp';
import logoHijack4 from '../public/logo-hijack-4.webp';
import logoHijack5 from '../public/logo-hijack-5.webp';
import logoHijack6 from '../public/logo-hijack-6.webp';
import explorerLogo1 from '../public/explorer-logo-1.webp';
import explorerLogo2 from '../public/explorer-logo-2.webp';
import explorerLogo3 from '../public/explorer-logo-3.webp';
import explorerLogo4 from '../public/explorer-logo-4.webp';
import explorerLogo5 from '../public/explorer-logo-5.webp';
import explorerLogo6 from '../public/explorer-logo-6.webp';
import explorerLogo7 from '../public/explorer-logo-7.webp';
import { useEffect, useState } from 'react';

function weightedRandom(items: Array<{ url: string; weight: number }>): string {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (let item of items) {
      if (random < item.weight) {
          return item.url;
      }
      random -= item.weight;
  }
  
  return items[items.length - 1].url;
}

export default function NearblocksLogo({ size }: { size: string }) {
  const logos = [
    { url: logoNear.src, weight: 82 },
    { url: logoHijack1.src, weight: 3 },
    { url: logoHijack2.src, weight: 3 },
    { url: logoHijack3.src, weight: 3 },
    { url: logoHijack4.src, weight: 3 },
    { url: logoHijack5.src, weight: 3 },
    { url: logoHijack6.src, weight: 3 },
  ];

  const texts = [
    { url: explorerLogo1.src, weight: 982 },
    { url: explorerLogo2.src, weight: 3 },
    { url: explorerLogo3.src, weight: 3 },
    { url: explorerLogo4.src, weight: 3 },
    { url: explorerLogo5.src, weight: 3 },
    { url: explorerLogo6.src, weight: 3 },
    { url: explorerLogo7.src, weight: 3 },
  ];

  const [randomLogo, setRandomLogo] = useState(logos[0].url);
  const [randomText, setRandomText] = useState(texts[0].url);

  useEffect(() => {
    const randomLogo = weightedRandom(logos);
    const randomText = weightedRandom(texts);
  }, []);

  return (
    <div className="relative" style={{ height: size, display: 'flex', alignItems: 'center' }}>
      <div className="relative" style={{ height: size, width: size }}>
        <img src={logoBrackets.src} className="absolute inset-0 h-full" alt="[]" />
        <img src={randomLogo} key={randomLogo} className="absolute inset-0 h-full" alt="N" />
      </div>
      <img src={randomText} key={randomText} style={{ height: '100%', marginLeft: '10px' }} alt="E" />
    </div>
  );
}
