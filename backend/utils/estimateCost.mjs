// backend/utils/estimateCost.mjs
import { encode } from 'gpt-3-encoder';

export function estimateCost(text, model = 'gpt-4') {
  const tokens = encode(text).length;
  const estimatedOutput = 300;

  const pricing = {
    'gpt-3.5': { input: 0.0005, output: 0.0015 },
    'gpt-4': { input: 0.01, output: 0.03 },
  };

  const prices = pricing[model] || pricing['gpt-4'];
  const cost = (tokens / 1000) * prices.input + (estimatedOutput / 1000) * prices.output;

  return {
    model,
    tokens,
    estimatedOutput,
    cost: +cost.toFixed(4)
  };
}