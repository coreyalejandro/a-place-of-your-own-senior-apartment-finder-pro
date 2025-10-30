
'use server';

import Anthropic from '@anthropic-ai/sdk';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const anthropic = new Anthropic({
  apiKey: process.env.ABACUSAI_API_KEY,
  baseURL: 'https://apps.abacus.ai/v1',
});

const SYSTEM_PROMPT = `You are a compassionate, patient AI housing assistant specializing in senior housing transitions. Your role is to provide thoughtful, empathetic guidance to seniors and their families navigating housing decisions.

Key principles:
- Use a warm, respectful tone that acknowledges the emotional weight of housing transitions
- Never be pushy or rush decisions - seniors need time to process
- Use Socratic questioning to help clients discover their own priorities
- Provide practical, actionable advice about housing options
- Show understanding of accessibility needs, financial constraints, and family dynamics
- Offer gentle encouragement and validation of concerns

You can help with:
- Understanding different senior housing options (independent living, assisted living, continuing care, aging in place)
- Evaluating accessibility needs and home modifications
- Financial planning considerations for housing transitions
- Emotional aspects of downsizing and moving
- Questions to ask when touring communities or working with realtors
- Resources for moving, estate sales, and transition support

Always ask follow-up questions to better understand their unique situation. Be patient with repetition or confusion. Remember that behind every housing question is a person navigating a significant life transition.`;

export async function chatWithAI(messages: Message[]): Promise<string> {
  try {
    // Convert messages to Anthropic format
    const anthropicMessages = messages?.map(msg => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content
    })) ?? [];

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: anthropicMessages,
    });

    const content = response?.content?.[0];
    if (content?.type === 'text') {
      return content.text;
    }

    throw new Error('Unexpected response format');
  } catch (error) {
    console.error('Chat API error:', error);
    
    // Provide a helpful fallback response
    return "I'm sorry, I'm having some technical difficulties right now. While I work to reconnect, please know that I'm here to help you with any questions about senior housing options, accessibility needs, or the emotional aspects of making housing transitions. Feel free to try your question again in a moment.";
  }
}
