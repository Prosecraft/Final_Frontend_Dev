export interface GrammarCorrection {
  original: string;
  suggestion: string;
  explanation: string;
}

export interface GrammarAnalysis {
  corrections: GrammarCorrection[];
}

// API Configuration
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const GEMINI_API_KEY = 'AIzaSyDoeZiYRUg8xYylpNuuY-810GEtSO2u1qs';

export const getGrammarSuggestions = async (text: string): Promise<GrammarAnalysis> => {
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

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const content = data.candidates[0]?.content?.parts[0]?.text;

    if (!content) {
      throw new Error('No content received from API');
    }

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
    throw new Error('Failed to analyze text. Please check your internet connection.');
  }
};

export const getStyleEnhancement = async (text: string): Promise<any> => {
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

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const content = data.candidates[0]?.content?.parts[0]?.text;

    if (!content) {
      throw new Error('No content received from API');
    }

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
    throw new Error('Failed to analyze style. Please check your internet connection.');
  }
};

export const getToneAnalysis = async (text: string): Promise<any> => {
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

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const content = data.candidates[0]?.content?.parts[0]?.text;

    if (!content) {
      throw new Error('No content received from API');
    }

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
    throw new Error('Failed to analyze tone. Please check your internet connection.');
  }
};

export const getPlagiarismCheck = async (text: string): Promise<any> => {
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

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const content = data.candidates[0]?.content?.parts[0]?.text;

    if (!content) {
      throw new Error('No content received from API');
    }

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
    throw new Error('Failed to check plagiarism. Please check your internet connection.');
  }
}; 