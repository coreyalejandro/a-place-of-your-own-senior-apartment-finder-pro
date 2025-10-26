import { NextRequest, NextResponse } from 'next/server';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface CoachRequest {
  message: string;
  history: Message[];
}

// Import Python orchestrator via subprocess (if available)
// Otherwise use TypeScript fallback implementation
const USE_PYTHON_ORCHESTRATOR = false; // Set to true when Python MCP is set up

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

    // Get the orchestrator and process message
    const coach = getOrchestrator();
    const result = await coach.processMessage(message, history);

    return NextResponse.json({
      message: result.message,
      type: result.type,
      data: result.data,
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
 * TypeScript Orchestrator - Fallback implementation
 * Mirrors the Python orchestrator for when Python MCP is not available
 */
class CoachOrchestrator {
  detectIntent(message: string, history: Message[]): string {
    const lowerMessage = message.toLowerCase();

    // Budget-related keywords
    if (lowerMessage.match(/budget|afford|cost|price|money|income|expense|financial|pay/i)) {
      return 'budget';
    }

    // Accessibility keywords
    if (lowerMessage.match(/wheelchair|walker|elevator|accessible|mobility|disability|grab bar/i)) {
      return 'accessibility';
    }

    // Location keywords
    if (lowerMessage.match(/near|close to|proximity|distance|family|hospital|pharmacy/i)) {
      return 'location';
    }

    // Search keywords
    if (lowerMessage.match(/find|search|show me|look for|apartment|housing|place/i)) {
      return 'search';
    }

    // Compare keywords
    if (lowerMessage.match(/compare|difference|better|versus|vs|which one/i)) {
      return 'compare';
    }

    // Report keywords
    if (lowerMessage.match(/report|document|share with|show my|family|kids|children/i)) {
      return 'report';
    }

    // Real estate prep keywords
    if (lowerMessage.match(/agent|realtor|broker|questions to ask|prepare|ready to/i)) {
      return 'prep';
    }

    return 'general';
  }

  async processMessage(message: string, history: Message[]): Promise<{ type: string; message: string; data?: any }> {
    const intent = this.detectIntent(message, history);

    switch (intent) {
      case 'budget':
        return this.handleBudgetAnalysis(message, history);
      case 'accessibility':
        return this.handleAccessibilityAnalysis(message, history);
      case 'location':
        return this.handleLocationAnalysis(message, history);
      case 'search':
        return this.handlePropertySearch(message, history);
      case 'compare':
        return this.handleComparisonAnalysis(message, history);
      case 'report':
        return this.handleReportGeneration(message, history);
      default:
        return this.handleGeneralConversation(message, history);
    }
  }

  private handleBudgetAnalysis(message: string, history: Message[]) {
    const hasIncome = history.some(m => m.content.toLowerCase().includes('income'));

    if (!hasIncome) {
      return {
        type: 'budget_analysis',
        message: `Great question about budgeting! Let's work through this together.

First, let's talk about your financial situation. What's your approximate monthly income? This could include:
- Social Security benefits
- Pension or retirement funds
- Investment income
- Any other regular income

Don't worry about being exact - a rough estimate works fine.`,
        data: { stage: 'gathering_income' }
      };
    }

    return {
      type: 'budget_analysis',
      message: `Let me help you plan a realistic housing budget.

A good rule of thumb is to spend no more than 30-40% of your monthly income on housing. This includes:
💰 Base rent or monthly fee
🏠 Utilities (if not included)
🍽️ Meals (if not included)
🚗 Transportation costs

Based on what you've shared, I can help you:
1. Calculate what you can comfortably afford
2. Break down what should be included in your budget
3. Identify questions to ask about hidden costs
4. Suggest ways to maximize your housing dollar

Would you like me to run through a detailed budget analysis with you?`,
      data: { stage: 'ready_for_analysis' }
    };
  }

  private handleAccessibilityAnalysis(message: string, history: Message[]) {
    return {
      type: 'accessibility_analysis',
      message: `Let's talk about accessibility needs - this is really important!

Tell me about your situation:

🚶 **Mobility**
- Do you use a wheelchair, walker, or cane?
- Are stairs difficult?
- Do you need grab bars?

🚗 **Transportation**
- Do you drive, or need accessible parking close by?
- Would you use public transportation or shuttles?

🏠 **Living Space**
- Do you need a ground floor unit?
- Is a roll-in shower important?
- Do you use any medical equipment?

Don't worry - there's no judgment here! The more you share, the better I can help you find a place that truly works for you.`,
      data: { assessment_stage: 'gathering_needs' }
    };
  }

  private handleLocationAnalysis(message: string, history: Message[]) {
    return {
      type: 'location_analysis',
      message: `Location is so important - let's make sure we find you the right spot!

Tell me what matters most to you:

👨‍👩‍👧 **Family & Friends**
- How close do you want to be to family?
- Do they visit often?

🏥 **Healthcare**
- Do you need to be near a specific hospital or doctor?
- How important is having a pharmacy nearby?

🛒 **Daily Life**
- Do you like to shop in person, or mostly online?
- Want to be near restaurants and activities?
- Need public transportation access?

🏙️ **Setting**
- Prefer bustling city life or quiet neighborhoods?

Whatever your preferences, we'll find something that fits!`,
      data: { assessment_stage: 'location_preferences' }
    };
  }

  private handlePropertySearch(message: string, history: Message[]) {
    const hasLocation = history.some(m =>
      /cleveland|akron|columbus|city|area/i.test(m.content)
    );

    if (!hasLocation) {
      return {
        type: 'property_search',
        message: `I'd love to help you search! Let's find you some great options.

First, where are you looking? Tell me:
📍 **Location**: What city or area? (e.g., Cleveland, Akron)
👨‍👩‍👧 **Family**: Do you want to be near family? Where are they?
🏙️ **Setting**: Do you prefer city, suburbs, or quiet area?

Once I know where to look, I'll find properties and explain each one in plain language - no confusing real estate terms!`,
        data: { search_ready: false }
      };
    }

    return {
      type: 'property_search',
      message: `Perfect! I'll search for senior housing in your area.

For each place I find, I'll tell you:
- What it costs and what's included
- Who it's best suited for
- The good points and things to watch for
- How to contact them

I'll also make sure to consider everything we've talked about - your budget, accessibility needs, and proximity preferences.

Ready for me to search? Just say yes and I'll get started!`,
      data: { search_ready: true }
    };
  }

  private handleComparisonAnalysis(message: string, history: Message[]) {
    return {
      type: 'comparison_analysis',
      message: `I can help you compare options side-by-side!

For each place, I'll compare:

💰 **Cost & Value**
- Monthly fees and what's included
- Hidden costs to watch for
- Value for your money

🏠 **Living Experience**
- Space and layout
- Accessibility features
- Community atmosphere

📍 **Location**
- Distance to family
- Healthcare access
- Shopping and services

🏥 **Care & Support**
- Level of assistance available
- Emergency response
- Healthcare coordination

Which properties would you like me to compare? You can give me names, addresses, or just describe them.`,
      data: { comparison_ready: true }
    };
  }

  private handleReportGeneration(message: string, history: Message[]) {
    return {
      type: 'report_generation',
      message: `I can create a clear report that you can share with your family!

The report will include:

📋 **Your Situation**
- What you're looking for and why
- Your needs and preferences
- Budget considerations

🏠 **Top Options**
- Properties that match your needs
- Detailed pros and cons
- Cost breakdowns

💡 **My Recommendations**
- Why I think each place might work
- Important questions to ask
- Red flags to watch for

📝 **Next Steps**
- How to schedule tours
- What to bring/ask
- Decision timeline

This way your family can understand your thinking and help you decide. Sound good?`,
      data: { ready_to_generate: history.length > 5 }
    };
  }

  private handleGeneralConversation(message: string, history: Message[]) {
    const lower = message.toLowerCase();

    if (/hello|hi|hey|good morning/i.test(lower)) {
      return {
        type: 'greeting',
        message: `Hello! It's wonderful to hear from you.

I'm here to help you find the right senior housing. We can work together on:

💰 Planning your budget
🏠 Searching for places
♿ Understanding accessibility options
📍 Finding locations near family
📊 Comparing your options
📄 Creating reports for family

What would you like to explore today?`
      };
    }

    if (/thank|thanks|appreciate/i.test(lower)) {
      return {
        type: 'acknowledgment',
        message: "You're very welcome! I'm here to help whenever you need. Is there anything else you'd like to talk about?"
      };
    }

    return {
      type: 'general',
      message: `I want to make sure I understand how I can best help you.

Could you tell me a bit more about what's on your mind? For example:
- Are you just starting to look at options?
- Do you have specific questions about costs?
- Need help understanding what type of housing fits your needs?
- Want to compare places you've already found?

Whatever you're thinking about, I'm here to help you work through it!`
    };
  }
}

// Singleton orchestrator
let orchestrator: CoachOrchestrator | null = null;

function getOrchestrator(): CoachOrchestrator {
  if (!orchestrator) {
    orchestrator = new CoachOrchestrator();
  }
  return orchestrator;
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
