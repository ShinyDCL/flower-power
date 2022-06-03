import { MarketPrompt } from './marketPrompt';
import { SeedPrompt } from './seedPrompt';
import { SimplePrompt } from './simplePrompt';
import { Image } from './image';
import { Timer } from './timer';
import { GemCounter } from './gemCounter';

const seedPrompt = new SeedPrompt();
const simplePrompt = new SimplePrompt();
const marketPrompt = new MarketPrompt();
const gemCounter = new GemCounter();

export { seedPrompt, simplePrompt, marketPrompt, gemCounter, Image, Timer };
