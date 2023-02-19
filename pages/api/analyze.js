import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


const generateAction = async (req, res) => {
    const basePromptPrefix = '';
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `You're a chess grandmaster, your job is to analyze a chess position provided in FEN format. Analyze safety of the kings, pawn structure, pieces activity, tactical motifs and strategical motifs and possible plans for both players. Avoid describing the positions by obvious statements. State who is winning or has an advantage.
                Position: ${req.body.userInput}
                Analysis: \n`,
        temperature: 0.15,
        max_tokens: 512,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
