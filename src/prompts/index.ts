import { MarketPrompt } from './marketPrompt';
import { SeedPrompt } from './seedPrompt';
import { SimplePrompt } from './simplePrompt';

const seedPrompt = new SeedPrompt();
const simplePrompt = new SimplePrompt();
const marketPrompt = new MarketPrompt();

export { seedPrompt, simplePrompt, marketPrompt };
