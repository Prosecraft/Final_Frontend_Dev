export interface GrammarCorrection {
  original: string;
  suggestion: string;
  explanation: string;
}

export interface GrammarAnalysis {
  corrections: GrammarCorrection[];
}

export const getGrammarSuggestions = async (text: string): Promise<GrammarAnalysis> => {
  const GEMINI_API_URL = process.env.GEMINI_API_URL;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  const prompt = `
    You are a grammar expert. Review the following text and return corrections in JSON format.
    Text: """${text}"""
    Format: {
      "corrections": [
        { "original": "...", "suggestion": "...", "explanation": "..." }
      ]
    }
  `;

  const body = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }]
  });

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body
    });

    const data = await response.json();
    const content = data.candidates[0]?.content?.parts[0]?.text;

    const jsonMatch = content.match(/```json\s*([\s\S]*?)```/);
    let jsonString = '';

    if (jsonMatch) {
      jsonString = jsonMatch[1];
    } else {
      jsonString = content;
    }

    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to analyze text');
  }
};

export const getStyleEnhancement = async (text: string): Promise<any> => {
  const GEMINI_API_URL = process.env.GEMINI_API_URL;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  const prompt = `
    You are a writing style expert. Analyze the following text and provide style enhancement suggestions in JSON format.
    Text: """${text}"""
    Format: {
      "suggestions": [
        { "type": "sentence_structure", "suggestion": "...", "explanation": "..." },
        { "type": "vocabulary", "suggestion": "...", "explanation": "..." },
        { "type": "clarity", "suggestion": "...", "explanation": "..." }
      ],
      "overall_score": 85,
      "improvements": ["Use more active voice", "Vary sentence length", "Add transitional phrases"]
    }
  `;

  const body = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }]
  });

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body
    });

    const data = await response.json();
    const content = data.candidates[0]?.content?.parts[0]?.text;

    const jsonMatch = content.match(/```json\s*([\s\S]*?)```/);
    let jsonString = '';

    if (jsonMatch) {
      jsonString = jsonMatch[1];
    } else {
      jsonString = content;
    }

    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to analyze style');
  }
};

export const getToneAnalysis = async (text: string): Promise<any> => {
  const GEMINI_API_URL = process.env.GEMINI_API_URL;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  const prompt = `
    You are a tone analysis expert. Analyze the tone of the following text and return results in JSON format.
    Text: """${text}"""
    Format: {
      "tone": {
        "formality": "Professional/Casual/Formal",
        "sentiment": "Positive/Negative/Neutral",
        "confidence": "High/Medium/Low",
        "clarity": "Excellent/Good/Fair/Poor"
      },
      "score": 85,
      "suggestions": ["Consider using more confident language", "Add emotional context"]
    }
  `;

  const body = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }]
  });

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body
    });

    const data = await response.json();
    const content = data.candidates[0]?.content?.parts[0]?.text;

    const jsonMatch = content.match(/```json\s*([\s\S]*?)```/);
    let jsonString = '';

    if (jsonMatch) {
      jsonString = jsonMatch[1];
    } else {
      jsonString = content;
    }

    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to analyze tone');
  }
};

export const getPlagiarismCheck = async (text: string): Promise<any> => {
  const GEMINI_API_URL = process.env.GEMINI_API_URL;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  const prompt = `
    You are a plagiarism detection expert. Analyze the following text for potential plagiarism indicators and return results in JSON format.
    Text: """${text}"""
    Format: {
      "plagiarism_score": 5,
      "originality_score": 95,
      "risk_level": "Low/Medium/High",
      "analysis": "This text appears to be original content with no significant plagiarism indicators.",
      "suggestions": ["Consider adding more unique insights", "Cite sources if using external information"]
    }
  `;

  const body = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }]
  });

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body
    });

    const data = await response.json();
    const content = data.candidates[0]?.content?.parts[0]?.text;

    const jsonMatch = content.match(/```json\s*([\s\S]*?)```/);
    let jsonString = '';

    if (jsonMatch) {
      jsonString = jsonMatch[1];
    } else {
      jsonString = content;
    }

    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to check plagiarism');
  }
}; 