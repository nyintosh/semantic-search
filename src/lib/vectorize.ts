import { HfInference } from '@huggingface/inference';
import 'dotenv/config';

const hf = new HfInference(process.env.HF_TOKEN);

export const vectorize = async (input: string) => {
	const output = await hf.featureExtraction({
		model: 'intfloat/e5-small-v2',
		inputs: input,
	});

	return output as number[];
};
