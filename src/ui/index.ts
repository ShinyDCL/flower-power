import { MarketPrompt } from './marketPrompt';
import { SeedPrompt } from './seedPrompt';
import { SimplePrompt } from './simplePrompt';
import { Image } from './image';
import { Timer } from './timer';

const seedPrompt = new SeedPrompt();
const simplePrompt = new SimplePrompt();
const marketPrompt = new MarketPrompt();

export { seedPrompt, simplePrompt, marketPrompt, Image, Timer };
