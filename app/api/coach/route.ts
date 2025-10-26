import { NextRequest, NextResponse } from 'next/server';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface CoachRequest {
  message: string;
  history: Message[];
}

/**
 * Senior Housing Coach API
 *
 * This endpoint provides conversational AI assistance for senior housing search.
 * It uses a multi-agent approach to help with:
 * - Budget planning
 * - Needs assessment
 * - Property search
 * - Deep analysis
 * - Decision reports
 * - Real estate preparation
 */
export async function POST(request: NextRequest) {
  try {
    const body: CoachRequest = await request.json();
    const { message, history } = body;

    if (!message?.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Detect the intent of the message
    const intent = detectIntent(message, history);

    // Route to appropriate handler based on intent
    let response: string;
    let messageType: string;

    switch (intent) {
      case 'budget':
        response = await handleBudgetCoaching(message, history);
        messageType = 'budget';
        break;
      case 'needs':
        response = await handleNeedsAssessment(message, history);
        messageType = 'assessment';
        break;
      case 'search':
        response = await handlePropertySearch(message, history);
        messageType = 'search';
        break;
      case 'analysis':
        response = await handleDeepAnalysis(message, history);
        messageType = 'analysis';
        break;
      case 'report':
        response = await handleReportGeneration(message, history);
        messageType = 'report';
        break;
      case 'prep':
        response = await handleRealEstatePrep(message, history);
        messageType = 'prep';
        break;
      default:
        response = await handleGeneralConversation(message, history);
        messageType = 'general';
    }

    return NextResponse.json({
      message: response,
      type: messageType,
      autoSpeak: false // Can be set to true for important messages
    });

  } catch (error) {
    console.error('Coach API error:', error);
    return NextResponse.json(
      {
        message: "I'm having a bit of trouble right now. Could you try asking me that again?",
        type: 'error'
      },
      { status: 500 }
    );
  }
}

/**
 * Detect the user's intent from their message
 */
function detectIntent(message: string, history: Message[]): string {
  const lowerMessage = message.toLowerCase();

  // Budget-related keywords
  if (lowerMessage.match(/budget|afford|cost|price|money|income|expense|financial|pay/i)) {
    return 'budget';
  }

  // Needs assessment keywords
  if (lowerMessage.match(/need|should|looking for|require|important|must have|prefer/i)) {
    return 'needs';
  }

  // Search keywords
  if (lowerMessage.match(/find|search|show me|look for|apartment|housing|place|location|area|neighborhood/i)) {
    return 'search';
  }

  // Analysis keywords
  if (lowerMessage.match(/compare|analyze|difference|better|pros and cons|evaluate|assess/i)) {
    return 'analysis';
  }

  // Report keywords
  if (lowerMessage.match(/report|document|share with|show my|family|kids|children/i)) {
    return 'report';
  }

  // Real estate prep keywords
  if (lowerMessage.match(/agent|realtor|broker|questions to ask|prepare|ready to|next steps/i)) {
    return 'prep';
  }

  return 'general';
}

/**
 * Handle budget-related coaching
 */
async function handleBudgetCoaching(message: string, history: Message[]): Promise<string> {
  // TODO: Integrate with MCP agent for budget analysis

  const hasDiscussedIncome = history.some(m =>
    m.content.toLowerCase().includes('income') ||
    m.content.toLowerCase().includes('social security')
  );

  if (!hasDiscussedIncome) {
    return `Great question about budgeting! Let's work through this together.

First, let's talk about your monthly income. This might include:
- Social Security benefits
- Pension or retirement funds
- Investment income
- Any other regular income

Don't worry about exact numbers right now - we can work with estimates. What's your approximate monthly income?`;
  }

  return `Let me help you think through your housing budget.

A good rule of thumb is to spend no more than 30-40% of your monthly income on housing. But everyone's situation is different!

Things to consider:
💰 Monthly rent or entrance fees
🏥 Healthcare costs
🍽️ Meals (if included)
🚗 Transportation needs
💡 Utilities (if not included)

Would you like me to help you break down these costs?`;
}

/**
 * Handle needs assessment
 */
async function handleNeedsAssessment(message: string, history: Message[]): Promise<string> {
  // TODO: Integrate with MCP agent for needs analysis

  return `That's a great question! Let's figure out what's most important for you.

Think about your daily life:

🏠 **Living Space**
- Do you want your own kitchen, or prefer meals provided?
- How much space do you need?
- Ground floor or okay with stairs?

🏥 **Health & Support**
- Do you need help with daily activities?
- How important is 24/7 staff?
- Any medical equipment needs?

👨‍👩‍👧‍👦 **Social & Location**
- Close to family and friends?
- Active community important?
- Prefer city or quiet area?

What matters most to you right now?`;
}

/**
 * Handle property search
 */
async function handlePropertySearch(message: string, history: Message[]): Promise<string> {
  // TODO: Integrate with MCP agent and Google Maps API

  return `I'd love to help you search!

To find the best options for you, tell me:

📍 **Location**: What city or area are you looking in?
💰 **Budget**: What's your price range?
🏠 **Type**: Are you looking for independent living, assisted living, or something else?
✨ **Must-haves**: Anything specific you need?

Once you tell me these details, I'll search and explain each option in plain language. No real estate jargon!`;
}

/**
 * Handle deep analysis
 */
async function handleDeepAnalysis(message: string, history: Message[]): Promise<string> {
  // TODO: Integrate with MCP multi-agent analysis

  return `I can definitely help you analyze and compare options!

For each place, I'll look at:

✅ **Accessibility**: Is it easy to get around?
🏥 **Healthcare**: How close to doctors and hospitals?
💰 **Value**: What's included for the price?
👥 **Community**: What's the atmosphere like?
🚗 **Transportation**: Easy to get places?
🍽️ **Amenities**: What services and activities?

Which properties would you like me to compare? You can share addresses or names, or I can search for options first.`;
}

/**
 * Handle report generation
 */
async function handleReportGeneration(message: string, history: Message[]): Promise<string> {
  // TODO: Integrate with MCP report writer agent

  return `I can create a clear report that you can share with your family!

The report will include:

📋 **What You're Looking For**
- Your needs and preferences
- Budget considerations

🏠 **Top Options**
- Properties that match your needs
- Pros and cons for each

💡 **My Recommendations**
- Why each place might work
- Things to watch out for

📝 **Next Steps**
- Questions to ask
- How to move forward

Would you like me to create this report with the information we've discussed so far?`;
}

/**
 * Handle real estate preparation
 */
async function handleRealEstatePrep(message: string, history: Message[]): Promise<string> {
  return `Great! Let's make sure you're ready to work with a real estate agent.

📝 **Important Questions to Ask:**

About the Property:
- What's included in the monthly cost?
- Are there additional fees?
- What happens if my needs change?
- Can I see the contract before committing?

About Care & Services:
- What level of care is provided?
- How do you handle emergencies?
- What's the staff-to-resident ratio?

Financial Questions:
- Are there entrance fees?
- Will costs increase? How much?
- What's your refund policy?

I can help you prepare a list of questions specific to the places you're considering. Just let me know which ones!`;
}

/**
 * Handle general conversation
 */
async function handleGeneralConversation(message: string, history: Message[]): Promise<string> {
  // Simple conversational responses
  // TODO: Integrate with more sophisticated LLM

  const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon'];
  if (greetings.some(g => message.toLowerCase().includes(g))) {
    return `Hello! It's nice to hear from you.

I'm here to help you find the right senior housing. We can talk about:
- Planning your budget
- Understanding what you need
- Searching for places
- Comparing options
- Getting ready to talk with real estate agents

What would you like to explore first?`;
  }

  const thanks = ['thank', 'thanks', 'appreciate'];
  if (thanks.some(t => message.toLowerCase().includes(t))) {
    return `You're very welcome! I'm happy to help. Is there anything else you'd like to know or talk about?`;
  }

  return `I want to make sure I understand and can help you properly. Could you tell me a bit more about what you're looking for?

For example:
- Are you trying to figure out your budget?
- Do you want to search for properties?
- Need help understanding your options?
- Want to compare places you've found?

Just let me know what's on your mind!`;
}
