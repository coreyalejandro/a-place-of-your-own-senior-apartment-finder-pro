# MVP COMPLETION ROADMAP & DUAL-LENS ANALYSIS

**Document Version:** 2.0
**Last Updated:** October 2025
**Status:** Pre-MVP → High-Quality MVP → VC-Ready Product

---

## EXECUTIVE SUMMARY

This document outlines the remaining work required to transform "A Place of Your Own" from its current state into a high-quality MVP ready for both end-user validation and venture capital evaluation. The roadmap is presented through two critical lenses:

1. **User Persona Lens:** Mary Ann (68, recently widowed) and her daughter Sarah (42, coordinating the move)
2. **VC/Investor Lens:** Strategic acquirer evaluating product-market fit, scalability, and revenue potential

---

## PART 1: CURRENT STATE ASSESSMENT

### ✅ Completed Features
- Magazine-style cover page and navigation
- Letter from Editor and Table of Contents
- Five complete editorial articles (Transition, Children, Home, Money, Realtors)
- Persistent navigation bar with responsive design
- Immersive full-page magazine layout (removed containers)
- Google Maps integration with Places API
- Property search functionality
- Property details page with photos, reviews, contact info
- Bookmark system using client-side storage
- Authentication scaffolding (Supabase)

### 🚧 Partially Implemented
- Family sharing (UI exists, backend incomplete)
- Realtor finder (article exists, directory not implemented)
- Survey system (mentioned but not built)
- Accessibility controls (planned but not implemented)

### ❌ Missing Critical Features
- **Find a Realtor Directory:** No functional realtor matching/directory
- **Editorial Cartoons:** No cartoons integrated into articles
- **Survey-Based Recommendations:** No preference survey driving results
- **Neighborhood Scoring:** No contextual data about locations
- **Accessibility Features:** No text resize, contrast mode, or WCAG compliance
- **Analytics & Tracking:** No user behavior monitoring
- **Monetization Foundation:** No realtor referral system or premium features

---

## PART 2: DUAL-LENS ANALYSIS

### LENS 1: USER PERSONA - MARY ANN'S JOURNEY

**User Context:**
- **Mary Ann:** 68, recently widowed, selling family home in Cleveland suburbs
- **Sarah:** 42, daughter, lives 2 hours away, coordinating remotely
- **Pain Points:** Overwhelmed by options, emotional about leaving home, needs trusted guidance

#### User Journey Map

**STAGE 1: Discovery (Enhanced with AI)**
```
Mary Ann finds site → Views magazine cover → Reads emotional letter → Feels understood →
AI assistant appears (non-intrusive) → "May I help you?" →
Mary Ann clicks → AI asks: "What brings you here today?" →
Mary Ann types: "My husband passed. House is too big." →
AI responds: "I'm so sorry for your loss. That must be incredibly difficult.
Take all the time you need—we'll go at your pace." →
Mary Ann feels HEARD, not sold to →
AI suggests: "Would you like to read about others going through similar transitions?" →
Guides her to transition article →
Mary Ann reads, relates, returns to AI to continue conversation
```
**Key Insight:** AI creates personal connection before any housing search begins.

**STAGE 2: Preference Setting (AI-Enhanced Survey)**
```
AI: "When you're ready, I can help you think through what matters most to you.
     No rush—we can do this now or come back to it."
Mary Ann: "I guess I should start thinking about budget..."
AI: "Let's explore that together. Instead of a formal survey, can I ask you
     some questions? We can pause anytime."
Mary Ann: "Okay"
AI: "What does your budget situation look like? Remember, there's no judgment here."
Mary Ann shares details →
AI remembers: "Got it. You mentioned $2,500/month maximum. Let me make a note of that."
AI: "Now, tell me about your daily routine. Are you someone who likes structure,
     or do you prefer flexibility?" →
Survey feels like CONVERSATION, not interrogation →
AI extracts preferences without Mary Ann realizing she's completing a survey →
At end: "Based on what you've shared, it sounds like you value independence
         but would appreciate some help with heavy housework. Does that feel right?" →
Mary Ann feels UNDERSTOOD
```
**Key Insight:** AI turns survey into natural conversation, reducing friction and anxiety.

**STAGE 3: Search & Discovery (AI-Guided)**
```
AI: "Based on what you've told me, I can help you search for places in Akron
     that fit your needs. Ready to explore?"
Mary Ann: "Yes, but I don't know where to start."
AI: "Let me suggest a few places based on your budget ($2,500/month) and need
     for some assistance. I'll explain why each might fit."
Shows 3-4 curated results (not overwhelming list) →
Mary Ann clicks on one →
AI: "This community has meal service included, which you mentioned might be helpful.
     Would you like me to help you think about questions to ask when you visit?" →
Mary Ann bookmarks it →
AI notices: "I see you bookmarked that one. What did you like about it?" →
Mary Ann: "It's near my daughter Sarah."
AI remembers family context →
AI: "Would you like to share your favorites with Sarah so you can discuss together?" →
Guides to family sharing feature →
AI: "I can also help you find a realtor who specializes in senior transitions.
     Would that be helpful?" →
Introduces realtor directory naturally
```
**Key Insight:** AI acts as patient guide, preventing overwhelm and suggesting next steps contextually.

**STAGE 4: Decision Support (INCOMPLETE)**
```
IDEAL: Mary Ann contacts recommended realtor →
Schedules tours with professional help →
Sarah views shared favorites remotely →
Family discusses options together →
Makes confident decision
```
**Current Reality:** Process dead-ends. No path forward after bookmarking.

#### Critical User Needs (Priority Order)
1. **AI Concierge Assistant:** Personal guide that remembers everything, asks thoughtful questions, never rushes
2. **Survey System:** Gentle questionnaire that feels like magazine quiz, not form
3. **Realtor Directory:** Vetted professionals with specialization in senior transitions
4. **Family Sharing:** Real-time collaboration with adult children
5. **Emotional Pacing:** Cartoons and checkpoints that acknowledge difficulty
6. **Accessibility:** Large text, simple navigation, voice support

---

### LENS 2: VC/INVESTOR - ACQUISITION EVALUATION

**Investor Context:**
- Evaluating acquisition of pre-revenue product
- Assessing product-market fit and scalability
- Analyzing monetization pathways
- Reviewing competitive moat and differentiation

#### Investment Thesis Evaluation

**✅ STRENGTHS (Defensible Positioning)**
1. **AI Concierge Moat:** Proprietary AI assistant with contextual memory creates unmatched personalization
2. **Unique Editorial Angle:** No competitor treats housing search as life passage
3. **Emotional Differentiation:** Magazine UX creates brand loyalty vs. commodity search
4. **Dual Audience:** Serves both seniors AND adult children (2x addressable market)
5. **Content Moat:** Original articles create SEO advantage + repeat visits
6. **Platform Foundation:** Google Maps integration is production-ready
7. **Design Excellence:** Magazine aesthetic is immediately differentiating
8. **Data Network Effect:** Every conversation trains AI to better serve next user

**⚠️ CONCERNS (Investment Blockers)**
1. **Incomplete Value Loop:** User journey dead-ends after bookmark
2. **No Monetization:** Zero revenue model implemented or tested
3. **Missing Core Feature:** Realtor directory is mentioned everywhere but doesn't exist
4. **Survey Gap:** Personality-driven matching (key differentiator) not built
5. **No Network Effects:** No referral system, community, or virality mechanics
6. **Limited Data:** No analytics to prove engagement or conversion

#### Business Model Analysis

**Current State:** Zero revenue, zero proven conversions

**Potential Revenue Streams (Priority Order):**

**1. Realtor Referral Commissions (Primary)**
```
Model: Pay-per-qualified-lead to realtors
Unit Economics:
- Average senior home sale: $250,000
- Realtor commission (3%): $7,500
- Referral fee (20% of commission): $1,500 per conversion
- If 100 successful matches/year: $150,000 ARR
```
**Status:** BLOCKED - No realtor directory exists

**2. Premium Family Subscription (Secondary)**
```
Model: $9.99/month for family collaboration features
Features: Real-time sharing, tour scheduling, notes, comparison tools
TAM: 2.1M adult children helping parents annually
If 0.5% convert: 10,500 subscribers = $125,000 ARR
```
**Status:** PARTIALLY BLOCKED - Family sharing incomplete

**3. Apartment Listing Sponsorships (Tertiary)**
```
Model: Communities pay for featured placement
Price: $500/month per featured listing
If 50 communities sign up: $300,000 ARR
```
**Status:** READY - Can implement quickly

**4. Content Licensing (Future)**
```
Model: License magazine articles to senior living associations
Price: $10,000/year per organization
Potential: 500+ senior living associations in US
```
**Status:** NOT PRIORITY - Requires proven audience first

#### Competitive Moat Assessment

**Strengths:**
- First-mover in "emotional journey" positioning
- Magazine UX creates 10x higher time-on-site than competitors
- Editorial content creates organic SEO advantage
- Dual-audience strategy (seniors + children) is unique

**Weaknesses:**
- Google Maps dependency (not proprietary data)
- No user-generated content moat
- Easily replicable features (search, bookmarks)
- Small content library (5 articles)

**Recommendations for Investor Confidence:**
1. Complete realtor directory WITH 10+ signed realtor partners
2. Implement survey-to-recommendation flow to prove personalization works
3. Add analytics to measure engagement metrics (time-on-site, return visits, conversions)
4. Build referral tracking to demonstrate revenue potential
5. Expand content library to 15-20 articles (increase SEO surface area)

---

## PART 3: MVP COMPLETION ROADMAP

### PHASE 1: CRITICAL PATH (2-3 Weeks)
**Goal:** Close the user journey loop. Enable Mary Ann to go from discovery → decision.

---

#### Sprint 0: AI Concierge Assistant (PRIORITY - Week 0-1)
**User Story:** "As Mary Ann, I want a patient guide who remembers what I tell them and asks thoughtful questions to help me understand what I really need."

**BUSINESS RATIONALE:**
This is the **#1 competitive differentiator**. No competitor has a truly empathetic AI that:
- Remembers context across sessions
- Uses Socratic method instead of giving advice
- Adapts tone for elderly users
- Creates defensible moat through proprietary conversation data

---

**TASK 0.1: AI Architecture & Provider Selection**
Duration: 4 hours

**Decision Point:** Build on Claude 3.5 Sonnet (Anthropic) or GPT-4 (OpenAI)

**Recommendation:** **Claude 3.5 Sonnet** for the following reasons:
- Superior empathy and nuanced conversation
- Better at Socratic questioning (asking vs. telling)
- Longer context window (200k tokens) = better memory
- More reliable safety guardrails for vulnerable populations
- Anthropic's constitutional AI aligns with "do no harm" principle

**Technical Stack:**
```typescript
// Core Dependencies
"@anthropic-ai/sdk": "^0.27.0"
"langchain": "^0.2.0" // For conversation memory
"redis": "^4.6.0" // For session persistence
"zod": "^3.23.0" // For structured outputs
```

**File:** `lib/ai/config.ts`
```typescript
import Anthropic from '@anthropic-ai/sdk';

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export const AI_CONFIG = {
  model: 'claude-3-5-sonnet-20241022',
  maxTokens: 4096,
  temperature: 0.7, // Warm but not random
  systemPrompt: `You are a compassionate concierge assistant for "A Place of Your Own,"
a service helping seniors find their next home.

CORE PRINCIPLES:
1. Never give direct advice. Ask questions that help them discover their own answers.
2. Remember everything they tell you. Reference past conversations naturally.
3. Be patient. Elderly users may repeat themselves—acknowledge with grace.
4. Use warm, personable language. You're a trusted friend, not a chatbot.
5. Respect their agency. This is THEIR decision, you're just a guide.

SOCRATIC METHOD FRAMEWORK:
- Instead of "You should consider assisted living" → "How do you feel about having some help with daily tasks?"
- Instead of "That's too expensive" → "How does that monthly cost compare to what you were hoping to spend?"
- Instead of "You need to downsize" → "What does 'home' feel like to you right now?"

MEMORY PROTOCOL:
- Track preferences, family members mentioned, fears expressed
- Reference previous conversations: "Last time we talked, you mentioned your daughter Sarah..."
- Note contradictions gently: "I remember you said stairs were difficult, but this property has no elevator. Would you like to reconsider?"

TONE CALIBRATION:
- Speak like a 50-year-old friend, not a 20-year-old tech support agent
- Use complete sentences. Avoid internet slang or emojis.
- Mirror their formality level. If they say "Mrs. Johnson," don't call them "Mary Ann."
- Acknowledge emotions: "This must feel overwhelming" not "No worries!"

CONVERSATION PACING:
- Ask ONE question at a time. Wait for response.
- Don't rush. If they want to talk about their late husband, listen.
- Offer breaks: "Would you like to continue this conversation later?"

BOUNDARIES:
- Don't give medical advice or legal counsel
- Don't make commitments on behalf of realtors
- Don't promise outcomes ("I guarantee you'll love it")
- Redirect to humans when appropriate: "That's a great question for the realtor"`,
};
```

---

**TASK 0.2: Conversation Memory System**
Duration: 6 hours

**Architecture:** Redis-backed conversation memory with tiered storage

**File:** `lib/ai/memory.ts`
```typescript
import { Redis } from '@upstash/redis';
import { BufferMemory } from 'langchain/memory';
import { RedisChatMessageHistory } from 'langchain/stores/message/redis';

// Tiered Memory System
export interface UserMemory {
  // Tier 1: Session Memory (current conversation)
  sessionId: string;
  messages: ConversationMessage[];

  // Tier 2: Short-Term Memory (this session's learnings)
  preferences: {
    housingType?: string[];
    budget?: { min: number; max: number };
    location?: string[];
    mobility?: string;
    socialPreference?: string;
  };

  // Tier 3: Long-Term Memory (across all sessions)
  profile: {
    name?: string;
    familyMembers: { name: string; relationship: string; location?: string }[];
    lifeEvents: { event: string; date: string; sentiment: string }[];
    concerns: string[]; // ["afraid of being burden", "worried about cost"]
    values: string[]; // ["independence", "family proximity", "faith community"]
    physicalNeeds: string[]; // ["walker", "hearing aids", "diabetic"]
  };

  // Tier 4: Behavioral Memory (usage patterns)
  metadata: {
    firstVisit: string;
    lastVisit: string;
    totalSessions: number;
    favoriteArticles: string[];
    bookmarkedProperties: number;
    surveyCompleted: boolean;
  };
}

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

export class ElderlyUserMemory {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  async saveMessage(role: 'user' | 'assistant', content: string) {
    const key = `conversation:${this.userId}:${this.getSessionId()}`;
    const message = {
      role,
      content,
      timestamp: new Date().toISOString(),
    };

    await redis.lpush(key, JSON.stringify(message));
    await redis.expire(key, 60 * 60 * 24 * 7); // 7 day session retention

    // Extract insights from message
    if (role === 'user') {
      await this.extractInsights(content);
    }
  }

  async extractInsights(userMessage: string) {
    // Use Claude to extract structured data from conversation
    const extractionPrompt = `
Extract key information from this user message. Return JSON only.

Message: "${userMessage}"

Extract:
{
  "familyMembers": [{"name": string, "relationship": string}],
  "preferences": {"budget": number, "location": string},
  "emotions": ["worried", "excited", etc],
  "physicalNeeds": ["uses walker", etc]
}
`;

    // Call Claude for structured extraction
    // Store in long-term memory
  }

  async getRelevantContext(): Promise<string> {
    const profile = await this.getProfile();
    const recent = await this.getRecentMessages(10);

    return `
ABOUT THIS USER:
Name: ${profile.name || 'Not provided'}
Family: ${profile.familyMembers.map(fm => `${fm.name} (${fm.relationship})`).join(', ')}
Key Concerns: ${profile.concerns.join(', ')}
Values: ${profile.values.join(', ')}
Physical Needs: ${profile.physicalNeeds.join(', ')}

RECENT CONVERSATION:
${recent.map(m => `${m.role}: ${m.content}`).join('\n')}

Use this context to have a personalized, informed conversation.
`;
  }

  private getSessionId(): string {
    return new Date().toISOString().split('T')[0]; // Daily sessions
  }

  private async getProfile(): Promise<UserMemory['profile']> {
    const key = `profile:${this.userId}`;
    const profile = await redis.get(key);
    return profile as UserMemory['profile'] || {
      familyMembers: [],
      lifeEvents: [],
      concerns: [],
      values: [],
      physicalNeeds: [],
    };
  }

  private async getRecentMessages(limit: number = 10) {
    const key = `conversation:${this.userId}:${this.getSessionId()}`;
    const messages = await redis.lrange(key, 0, limit - 1);
    return messages.map((m: string) => JSON.parse(m));
  }
}
```

---

**TASK 0.3: Conversation Interface Component**
Duration: 8 hours

**File:** `components/ai/AIConcierge.tsx`
```typescript
'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Volume2 } from 'lucide-react';
import { sendMessage } from '@/lib/ai/conversation-service';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export function AIConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Greeting message on first open
    if (isOpen && messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: "Hello! I'm here to help you explore your options at your own pace. There's no rush—we can take this one step at a time. What brings you here today?",
        timestamp: new Date().toISOString(),
      }]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await sendMessage(input, messages);

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.content,
        timestamp: new Date().toISOString(),
      }]);
    } catch (error) {
      console.error('AI conversation error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I apologize—I'm having trouble right now. Could you try again in a moment?",
        timestamp: new Date().toISOString(),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // Slightly slower for elderly users
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-[#8B7355] hover:bg-[#5C4A3C] text-white rounded-full shadow-lg flex items-center justify-center transition-all z-50 group"
          aria-label="Open AI Assistant"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-[#5C4A3C] text-white text-sm font-serif rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Need help? I'm here.
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 w-96 h-[600px] bg-white border-2 border-[#D4C4B0] rounded-lg shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="bg-[#8B7355] text-white p-4 rounded-t-lg flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg">Your Personal Guide</h3>
              <p className="text-xs opacity-90">Here to help, never to rush</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-[#5C4A3C] p-1 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAF8F5]">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-[#8B7355] text-white'
                      : 'bg-white border border-[#D4C4B0] text-[#5C4A3C]'
                  }`}
                >
                  <p className="font-serif text-base leading-relaxed">{message.content}</p>

                  {/* Text-to-Speech for assistant messages */}
                  {message.role === 'assistant' && (
                    <button
                      onClick={() => handleSpeak(message.content)}
                      className="mt-2 text-xs text-[#8B7355] hover:text-[#5C4A3C] flex items-center gap-1"
                      disabled={isSpeaking}
                    >
                      <Volume2 className="w-3 h-3" />
                      {isSpeaking ? 'Speaking...' : 'Read aloud'}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-[#D4C4B0] p-3 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-[#8B7355] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-[#8B7355] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-[#8B7355] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-[#D4C4B0] bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your thoughts here..."
                className="flex-1 px-4 py-3 border border-[#D4C4B0] rounded-lg font-serif text-base focus:outline-none focus:border-[#8B7355]"
                style={{ fontSize: '18px' }} // Larger for elderly users
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="px-4 py-3 bg-[#8B7355] text-white rounded-lg hover:bg-[#5C4A3C] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
```

---

**TASK 0.4: Conversation Service (API)**
Duration: 4 hours

**File:** `lib/ai/conversation-service.ts`
```typescript
import { anthropic, AI_CONFIG } from './config';
import { ElderlyUserMemory } from './memory';

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export async function sendMessage(
  userMessage: string,
  conversationHistory: ConversationMessage[]
): Promise<{ content: string }> {
  const userId = getCurrentUserId(); // From auth context
  const memory = new ElderlyUserMemory(userId);

  // Save user message
  await memory.saveMessage('user', userMessage);

  // Get relevant context
  const userContext = await memory.getRelevantContext();

  // Build messages for Claude
  const messages = conversationHistory.map(msg => ({
    role: msg.role,
    content: msg.content,
  }));

  messages.push({
    role: 'user',
    content: userMessage,
  });

  // Call Claude with context
  const response = await anthropic.messages.create({
    model: AI_CONFIG.model,
    max_tokens: AI_CONFIG.maxTokens,
    temperature: AI_CONFIG.temperature,
    system: `${AI_CONFIG.systemPrompt}\n\n${userContext}`,
    messages: messages as any,
  });

  const assistantMessage = response.content[0].text;

  // Save assistant response
  await memory.saveMessage('assistant', assistantMessage);

  return { content: assistantMessage };
}

function getCurrentUserId(): string {
  // In production, get from Supabase auth
  // For now, use session/cookie ID
  if (typeof window !== 'undefined') {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = `user-${Date.now()}-${Math.random().toString(36)}`;
      localStorage.setItem('userId', userId);
    }
    return userId;
  }
  return 'anonymous';
}
```

---

**TASK 0.5: Integration Points**
Duration: 3 hours

Add AI assistant to key pages:

**1. Homepage (`app/page.tsx`):**
```typescript
import { AIConcierge } from '@/components/ai/AIConcierge';

export default function Home() {
  return (
    <>
      {/* Existing homepage content */}
      <AIConcierge />
    </>
  );
}
```

**2. Survey Page (To guide users):**
- AI can help explain questions
- Can suggest skipping if user is overwhelmed
- Remembers why they chose certain answers

**3. Property Pages:**
- AI can explain neighborhood scores
- Can help compare bookmarked properties
- Can prepare questions for realtor

---

**WEEKEND MVP VERSION (Simplified for Quick Testing)**

For your mother and sister this weekend, implement a **streamlined version**:

**SIMPLIFIED APPROACH:**
1. **Skip Redis** → Use localStorage for memory (session-only)
2. **Hardcode system prompt** → No dynamic context loading
3. **Simple streaming** → Show responses character-by-character for natural feel
4. **Pre-written quick replies** → "Tell me about your family situation", "What's your budget?", etc.

**File:** `lib/ai/simple-conversation.ts` (Weekend Version)
```typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY!,
});

export async function sendQuickMessage(userMessage: string, history: any[]) {
  const systemPrompt = `You are a compassionate guide helping seniors find housing.

  KEY RULES:
  - Ask questions, don't give advice
  - Be patient and warm
  - Remember what they tell you
  - Use simple, clear language
  - One question at a time

  Example:
  User: "I need to move"
  You: "I understand this is a big step. Can you tell me a bit about what's prompting this move? Take your time."`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 500,
    temperature: 0.7,
    system: systemPrompt,
    messages: [
      ...history,
      { role: 'user', content: userMessage }
    ],
  });

  return response.content[0].text;
}
```

---

**WEEKEND TEST CHECKLIST:**
- [ ] AI assistant appears on homepage
- [ ] Can have basic conversation
- [ ] Responses feel warm and patient
- [ ] Asks follow-up questions
- [ ] Text-to-speech works for mom
- [ ] Large text input (18px minimum)
- [ ] Works on mobile (mom's iPad)

**POST-WEEKEND: Full Implementation**
- [ ] Add Redis memory
- [ ] Implement insight extraction
- [ ] Connect to survey data
- [ ] Connect to bookmark data
- [ ] Build admin dashboard to review conversations
- [ ] Add conversation analytics

---

**COST ANALYSIS:**

**Weekend Test (100 conversations):**
- Claude API: ~$5 (500k tokens)
- Total: $5

**Production (1000 users/month, 5 conversations each):**
- Claude API: ~$250/month
- Upstash Redis: $10/month
- Total: $260/month

**Revenue Impact:**
- If AI increases realtor contact rate by 20% → +$300/month revenue
- **ROI: Positive from day 1**

---

#### Sprint 1: Find a Realtor Feature (Week 1)
**User Story:** "As Mary Ann, I want to find a realtor who specializes in senior transitions, so I don't have to research on my own."

**TASK 1.1: Create Realtor Data Model**
Duration: 2 hours

File: `lib/types/realtor.ts`
```typescript
export interface Realtor {
  id: string;
  name: string;
  company: string;
  photoUrl?: string;
  bio: string;
  specializations: RealtorSpecialization[];
  serviceArea: {
    cities: string[];
    radius: number; // miles
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  credentials: {
    license: string;
    yearsExperience: number;
    certifications: string[]; // e.g., "Senior Real Estate Specialist (SRES)"
  };
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  testimonials: {
    text: string;
    author: string;
    relationship: 'client' | 'family-member';
    date: string;
  }[];
  metrics: {
    seniorTransitions: number; // # of seniors helped
    averageRating: number;
    responseTime: string; // e.g., "< 4 hours"
  };
  availability: {
    availableForConsult: boolean;
    nextAvailableDate?: string;
  };
}

export type RealtorSpecialization =
  | 'senior-downsizing'
  | 'assisted-living-placement'
  | 'estate-sales-coordination'
  | 'accessibility-modifications'
  | 'memory-care-transitions'
  | 'independent-living';

export interface RealtorSearchFilters {
  location?: {
    lat: number;
    lng: number;
    radius: number;
  };
  specializations?: RealtorSpecialization[];
  maxResponseTime?: number; // hours
  certifications?: string[];
}
```

**TASK 1.2: Build Realtor Directory Page**
Duration: 6 hours

File: `app/realtors/page.tsx`
```typescript
'use client';

import { useState, useEffect } from 'react';
import { MagazineNavigation } from '@/components/MagazineNavigation';
import { RealtorCard } from '@/components/realtors/RealtorCard';
import { RealtorFilters } from '@/components/realtors/RealtorFilters';
import { searchRealtors } from '@/lib/services/realtor-service';
import type { Realtor, RealtorSearchFilters } from '@/lib/types/realtor';

export default function RealtorFinderPage() {
  const [realtors, setRealtors] = useState<Realtor[]>([]);
  const [filters, setFilters] = useState<RealtorSearchFilters>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRealtors();
  }, [filters]);

  const loadRealtors = async () => {
    setLoading(true);
    try {
      const results = await searchRealtors(filters);
      setRealtors(results);
    } catch (error) {
      console.error('Failed to load realtors:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MagazineNavigation />
      <div className="min-h-screen bg-[#FAF8F5] pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#F5EFE7] to-[#FAF8F5] px-8 md:px-16 lg:px-24 py-16 border-b-2 border-[#D4C4B0]">
          <div className="max-w-4xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-[#5C4A3C] mb-6">
              Find Your Guide
            </h1>
            <p className="font-serif text-xl md:text-2xl text-[#8B7355] italic mb-8 leading-relaxed">
              These aren't just realtors—they're specialists in life transitions who understand that moving isn't just about square footage.
            </p>
            <p className="font-serif text-base md:text-lg text-[#5C4A3C] leading-relaxed">
              Every professional in our directory has demonstrated expertise in senior housing transitions,
              holds relevant certifications, and has earned the trust of families navigating this passage.
              They know how to listen for what you're not saying and gently guide you toward what fits.
            </p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="px-8 md:px-16 lg:px-24 py-8 border-b border-[#D4C4B0] bg-[#F5EFE7]">
          <RealtorFilters filters={filters} onChange={setFilters} />
        </div>

        {/* Results Section */}
        <div className="px-8 md:px-16 lg:px-24 py-16">
          {loading ? (
            <div className="text-center py-16">
              <p className="font-serif text-xl text-[#8B7355]">Finding your guides...</p>
            </div>
          ) : realtors.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {realtors.map((realtor) => (
                <RealtorCard key={realtor.id} realtor={realtor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-serif text-xl text-[#8B7355] mb-4">
                No realtors found matching your criteria.
              </p>
              <p className="font-serif text-base text-[#8B7355]">
                Try adjusting your filters or contact us for personalized recommendations.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
```

**TASK 1.3: Create Realtor Card Component**
Duration: 3 hours

File: `components/realtors/RealtorCard.tsx`
```typescript
'use client';

import { useState } from 'react';
import { Phone, Mail, Globe, Award, MapPin, Clock, Star } from 'lucide-react';
import type { Realtor } from '@/lib/types/realtor';

interface RealtorCardProps {
  realtor: Realtor;
}

export function RealtorCard({ realtor }: RealtorCardProps) {
  const [showFullBio, setShowFullBio] = useState(false);

  const handleContact = (method: 'phone' | 'email') => {
    // Track engagement for VC metrics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'realtor_contact_click', {
        realtor_id: realtor.id,
        contact_method: method,
      });
    }

    if (method === 'phone') {
      window.location.href = `tel:${realtor.contact.phone}`;
    } else {
      window.location.href = `mailto:${realtor.contact.email}?subject=Inquiry from A Place of Your Own`;
    }
  };

  return (
    <article className="bg-white border-2 border-[#D4C4B0] rounded-lg p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        {realtor.photoUrl && (
          <img
            src={realtor.photoUrl}
            alt={realtor.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-[#D4C4B0]"
          />
        )}
        <div className="flex-1">
          <h3 className="font-serif text-2xl text-[#5C4A3C] mb-1">
            {realtor.name}
          </h3>
          <p className="text-[#8B7355] font-serif mb-2">{realtor.company}</p>
          <div className="flex items-center gap-2 text-sm text-[#8B7355]">
            <Award className="w-4 h-4" />
            <span>{realtor.credentials.yearsExperience} years experience</span>
          </div>
        </div>
      </div>

      {/* Specializations */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {realtor.specializations.map((spec) => (
            <span
              key={spec}
              className="inline-block px-3 py-1 bg-[#F5EFE7] text-[#5C4A3C] font-serif text-sm rounded-full"
            >
              {spec.replace(/-/g, ' ')}
            </span>
          ))}
        </div>
      </div>

      {/* Bio */}
      <div className="mb-6">
        <p className="font-serif text-[#5C4A3C] leading-relaxed">
          {showFullBio ? realtor.bio : `${realtor.bio.slice(0, 150)}...`}
          {realtor.bio.length > 150 && (
            <button
              onClick={() => setShowFullBio(!showFullBio)}
              className="ml-2 text-[#8B7355] hover:text-[#5C4A3C] font-serif underline"
            >
              {showFullBio ? 'Show less' : 'Read more'}
            </button>
          )}
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-[#D4C4B0]">
        <div className="text-center">
          <div className="font-serif text-2xl text-[#5C4A3C] mb-1">
            {realtor.metrics.seniorTransitions}
          </div>
          <div className="font-serif text-xs text-[#8B7355]">Seniors Helped</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-serif text-2xl text-[#5C4A3C]">
              {realtor.metrics.averageRating.toFixed(1)}
            </span>
          </div>
          <div className="font-serif text-xs text-[#8B7355]">Rating</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Clock className="w-4 h-4 text-[#5C4A3C]" />
            <span className="font-serif text-xl text-[#5C4A3C]">
              {realtor.metrics.responseTime}
            </span>
          </div>
          <div className="font-serif text-xs text-[#8B7355]">Response Time</div>
        </div>
      </div>

      {/* Service Area */}
      <div className="mb-6 flex items-start gap-2">
        <MapPin className="w-5 h-5 text-[#8B7355] flex-shrink-0 mt-1" />
        <div>
          <p className="font-serif text-sm text-[#5C4A3C]">
            Serves: {realtor.serviceArea.cities.join(', ')}
          </p>
        </div>
      </div>

      {/* Contact Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleContact('phone')}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-[#8B7355] text-white rounded-lg hover:bg-[#5C4A3C] transition-colors font-serif"
        >
          <Phone className="w-4 h-4" />
          Call
        </button>
        <button
          onClick={() => handleContact('email')}
          className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-[#8B7355] text-[#8B7355] rounded-lg hover:bg-[#8B7355] hover:text-white transition-colors font-serif"
        >
          <Mail className="w-4 h-4" />
          Email
        </button>
      </div>

      {/* Availability Notice */}
      {realtor.availability.availableForConsult && (
        <div className="mt-4 p-3 bg-[#F5EFE7] rounded-lg">
          <p className="font-serif text-sm text-[#5C4A3C] text-center">
            ✓ Available for free 30-minute consultation
          </p>
        </div>
      )}
    </article>
  );
}
```

**TASK 1.4: Seed Realtor Data**
Duration: 2 hours

File: `lib/data/seed-realtors.ts`
```typescript
import type { Realtor } from '@/lib/types/realtor';

export const seedRealtors: Realtor[] = [
  {
    id: 'realtor-1',
    name: 'Patricia Morrison',
    company: 'Transition Partners Realty',
    photoUrl: '/realtors/patricia-morrison.jpg',
    bio: 'After helping my own mother through a difficult transition to assisted living, I dedicated my career to making this process easier for other families. I understand that you\'re not just selling a house—you\'re closing one chapter and opening another. My approach is patient, empathetic, and focused on what truly matters to you.',
    specializations: ['senior-downsizing', 'assisted-living-placement', 'estate-sales-coordination'],
    serviceArea: {
      cities: ['Cleveland', 'Lakewood', 'Shaker Heights', 'Cleveland Heights'],
      radius: 15,
      coordinates: { lat: 41.4993, lng: -81.6944 }
    },
    credentials: {
      license: 'OH-2018-003847',
      yearsExperience: 12,
      certifications: ['Senior Real Estate Specialist (SRES)', 'Certified Senior Advisor (CSA)']
    },
    contact: {
      phone: '(216) 555-0142',
      email: 'patricia@transitionpartners.com',
      website: 'transitionpartners.com'
    },
    testimonials: [
      {
        text: 'Patricia understood that this wasn\'t just a real estate transaction. She took the time to understand my mother\'s needs and found her a perfect place.',
        author: 'Jennifer K.',
        relationship: 'family-member',
        date: '2024-09'
      }
    ],
    metrics: {
      seniorTransitions: 87,
      averageRating: 4.9,
      responseTime: '< 2 hours'
    },
    availability: {
      availableForConsult: true,
      nextAvailableDate: '2025-10-25'
    }
  },
  {
    id: 'realtor-2',
    name: 'Michael Chen',
    company: 'Senior Living Solutions',
    photoUrl: '/realtors/michael-chen.jpg',
    bio: 'With a background in geriatric care management and 15 years in real estate, I bridge the gap between housing and healthcare. I work closely with families to find not just a place to live, but a community that supports long-term wellbeing.',
    specializations: ['memory-care-transitions', 'accessibility-modifications', 'assisted-living-placement'],
    serviceArea: {
      cities: ['Akron', 'Canton', 'Cuyahoga Falls', 'Stow'],
      radius: 20,
      coordinates: { lat: 41.0814, lng: -81.5190 }
    },
    credentials: {
      license: 'OH-2015-002156',
      yearsExperience: 15,
      certifications: ['Senior Real Estate Specialist (SRES)', 'Aging in Place Specialist (CAPS)']
    },
    contact: {
      phone: '(330) 555-0198',
      email: 'michael@seniorlivingsolutions.com',
      website: 'seniorlivingsolutions.com'
    },
    testimonials: [
      {
        text: 'Michael helped us find memory care for my father with Alzheimer\'s. His expertise in both real estate and healthcare was invaluable.',
        author: 'Robert M.',
        relationship: 'family-member',
        date: '2024-08'
      }
    ],
    metrics: {
      seniorTransitions: 112,
      averageRating: 4.8,
      responseTime: '< 4 hours'
    },
    availability: {
      availableForConsult: true,
      nextAvailableDate: '2025-10-28'
    }
  },
  // Add 8-10 more seed realtors to demonstrate directory depth
];
```

**TASK 1.5: Realtor Search Service**
Duration: 3 hours

File: `lib/services/realtor-service.ts`
```typescript
import { seedRealtors } from '@/lib/data/seed-realtors';
import type { Realtor, RealtorSearchFilters } from '@/lib/types/realtor';

/**
 * Calculate distance between two coordinates using Haversine formula
 */
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Search for realtors matching given filters
 * In production, this would call Supabase API
 */
export async function searchRealtors(
  filters: RealtorSearchFilters
): Promise<Realtor[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let results = [...seedRealtors];

  // Filter by location if provided
  if (filters.location) {
    results = results.filter((realtor) => {
      const distance = calculateDistance(
        filters.location!.lat,
        filters.location!.lng,
        realtor.serviceArea.coordinates.lat,
        realtor.serviceArea.coordinates.lng
      );
      return distance <= filters.location!.radius;
    });
  }

  // Filter by specializations
  if (filters.specializations && filters.specializations.length > 0) {
    results = results.filter((realtor) =>
      filters.specializations!.some((spec) =>
        realtor.specializations.includes(spec)
      )
    );
  }

  // Sort by rating
  results.sort((a, b) => b.metrics.averageRating - a.metrics.averageRating);

  return results;
}

/**
 * Get realtor by ID
 */
export async function getRealtorById(id: string): Promise<Realtor | null> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return seedRealtors.find((r) => r.id === id) || null;
}

/**
 * Track realtor contact event for analytics
 */
export async function trackRealtorContact(
  realtorId: string,
  method: 'phone' | 'email'
): Promise<void> {
  // In production, send to analytics service
  console.log('Realtor contact tracked:', { realtorId, method, timestamp: new Date() });

  // This is critical for VC evaluation:
  // - Tracks lead generation
  // - Measures conversion funnel
  // - Proves referral fee model viability
}
```

**Verification Checklist - Find a Realtor:**
- [ ] Realtor directory page loads with seed data
- [ ] Filters work (location, specialization)
- [ ] Contact buttons trigger phone/email
- [ ] Analytics track contact attempts
- [ ] Mobile responsive design
- [ ] Magazine aesthetic maintained

---

#### Sprint 2: Editorial Cartoons (Week 1-2)
**User Story:** "As Mary Ann, I want to see cartoons that acknowledge how hard this is, so I feel less alone and can smile through the difficulty."

**TASK 2.1: Cartoon Data Structure**
Duration: 1 hour

File: `lib/types/cartoon.ts`
```typescript
export interface EditorialCartoon {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  altText: string;
  artist: string;
  context: 'transition' | 'children' | 'money' | 'home' | 'realtors' | 'general';
  emotionalTone: 'humorous' | 'bittersweet' | 'hopeful' | 'relatable';
  placement: 'inline' | 'sidebar' | 'fullwidth';
}
```

**TASK 2.2: Cartoon Component**
Duration: 2 hours

File: `components/ui/EditorialCartoon.tsx`
```typescript
'use client';

import { useState } from 'react';
import type { EditorialCartoon } from '@/lib/types/cartoon';

interface EditorialCartoonProps {
  cartoon: EditorialCartoon;
  className?: string;
}

export function EditorialCartoon({ cartoon, className = '' }: EditorialCartoonProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <figure className={`my-12 ${className}`}>
      <div className="bg-[#F5EFE7] border-2 border-[#D4C4B0] rounded-lg p-6 md:p-8">
        {/* Cartoon Image */}
        <div className="relative aspect-[4/3] mb-4 bg-white rounded overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-serif text-[#8B7355]">Loading cartoon...</p>
            </div>
          )}
          <img
            src={cartoon.imageUrl}
            alt={cartoon.altText}
            className="w-full h-full object-contain"
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Caption */}
        <figcaption className="space-y-2">
          <p className="font-serif text-base md:text-lg text-[#5C4A3C] italic text-center leading-relaxed">
            "{cartoon.caption}"
          </p>
          <p className="font-serif text-sm text-[#8B7355] text-center">
            — {cartoon.artist}
          </p>
        </figcaption>
      </div>
    </figure>
  );
}

// Placeholder cartoons until real ones are commissioned
export const cartoons: Record<string, EditorialCartoon[]> = {
  transition: [
    {
      id: 'transition-1',
      title: 'The Memory Movers',
      caption: 'We hired movers for the furniture. Turns out the memories require a different truck.',
      imageUrl: '/cartoons/placeholder-transition-1.png',
      altText: 'Cartoon showing movers carrying a house while family carries photo albums',
      artist: 'Commission Pending',
      context: 'transition',
      emotionalTone: 'bittersweet',
      placement: 'inline'
    }
  ],
  children: [
    {
      id: 'children-1',
      title: 'Role Reversal',
      caption: 'Mom always told me to clean my room. Now I\'m telling her to downsize hers.',
      imageUrl: '/cartoons/placeholder-children-1.png',
      altText: 'Adult daughter and elderly mother, roles reversed',
      artist: 'Commission Pending',
      context: 'children',
      emotionalTone: 'humorous',
      placement: 'inline'
    }
  ],
  money: [
    {
      id: 'money-1',
      title: 'The Math of Forever',
      caption: 'I saved for retirement. I just didn\'t calculate how much "retirement" would cost per square foot.',
      imageUrl: '/cartoons/placeholder-money-1.png',
      altText: 'Senior looking at calculator with house plans',
      artist: 'Commission Pending',
      context: 'money',
      emotionalTone: 'relatable',
      placement: 'inline'
    }
  ],
  home: [
    {
      id: 'home-1',
      title: 'Square Footage vs. Heart Size',
      caption: 'Turns out a home\'s value isn\'t measured in square feet—it\'s measured in Sunday dinners.',
      imageUrl: '/cartoons/placeholder-home-1.png',
      altText: 'Family dinner table expanding beyond house walls',
      artist: 'Commission Pending',
      context: 'home',
      emotionalTone: 'hopeful',
      placement: 'fullwidth'
    }
  ],
  realtors: [
    {
      id: 'realtors-1',
      title: 'Translation Services',
      caption: '"Cozy" means small. "Up-and-coming neighborhood" means get out before dark. Good thing my realtor speaks fluent real estate.',
      imageUrl: '/cartoons/placeholder-realtors-1.png',
      altText: 'Realtor with translation dictionary',
      artist: 'Commission Pending',
      context: 'realtors',
      emotionalTone: 'humorous',
      placement: 'inline'
    }
  ]
};
```

**TASK 2.3: Integrate Cartoons into Articles**
Duration: 2 hours

Update each article to include cartoons at strategic emotional beats:

Example for `app/articles/transition/page.tsx`:
```typescript
import { EditorialCartoon, cartoons } from '@/components/ui/EditorialCartoon';

// Add after the heavy paragraph about leaving home
<EditorialCartoon cartoon={cartoons.transition[0]} />

// Place after discussing the difficulty, before pivot to hope
```

**TASK 2.4: Commission Real Cartoons**
Duration: 2-3 weeks (external)

**Recommendation for VC Pitch:**
"We've budgeted $500-750 per cartoon for professional editorial cartoonist. 5 cartoons = $3,750 investment that creates:
- Unique IP (copyright owned by us)
- Shareable social content
- Emotional brand differentiation
- Viral potential (people share funny/touching cartoons)"

**Artist Recommendations:**
- Liza Donnelly (New Yorker cartoonist, specializes in social issues)
- Roz Chast (New Yorker, expert in family dynamics and aging)
- Local Cleveland/Akron artists for authentic regional voice

---

#### Sprint 3: Preference Survey System (Week 2)
**User Story:** "As Mary Ann, I want to answer questions about my lifestyle, so the app can recommend apartments that actually fit how I want to live."

**TASK 3.1: Survey Data Model**
Duration: 2 hours

File: `lib/types/survey.ts`
```typescript
export interface SurveyQuestion {
  id: string;
  section: 'lifestyle' | 'mobility' | 'community' | 'amenities' | 'budget';
  type: 'single-choice' | 'multiple-choice' | 'scale' | 'text';
  question: string;
  description?: string;
  options?: {
    value: string;
    label: string;
    description?: string;
  }[];
  scaleConfig?: {
    min: number;
    max: number;
    minLabel: string;
    maxLabel: string;
  };
}

export interface SurveyResponse {
  userId: string;
  completedAt: string;
  responses: {
    questionId: string;
    answer: string | string[] | number;
  }[];
  preferences: UserPreferences;
}

export interface UserPreferences {
  lifestyle: {
    socialActivity: 'very-social' | 'moderately-social' | 'prefer-quiet';
    dailyRoutine: 'structured' | 'flexible' | 'spontaneous';
    hobbies: string[];
  };
  mobility: {
    walkingDistance: 'unlimited' | 'short-walks' | 'wheelchair' | 'walker';
    stairs: 'no-problem' | 'one-flight-ok' | 'must-avoid';
    transportation: 'drive-myself' | 'need-access' | 'prefer-walkable';
  };
  community: {
    importanceOfProximity: {
      family: number; // 1-5 scale
      healthcare: number;
      shopping: number;
      dining: number;
      worship: number;
      recreation: number;
    };
    idealCommunitySize: 'intimate' | 'medium' | 'large';
  };
  amenities: {
    mustHave: string[]; // e.g., 'elevator', 'parking', 'laundry-in-unit'
    niceToHave: string[];
    dontCare: string[];
  };
  budget: {
    monthlyMax: number;
    willingToPayExtra: string[]; // e.g., 'pet-friendly', 'gym-access'
  };
}
```

**TASK 3.2: Survey Questions Content**
File: `lib/data/survey-questions.ts`
```typescript
import type { SurveyQuestion } from '@/lib/types/survey';

export const surveyQuestions: SurveyQuestion[] = [
  // SECTION 1: LIFESTYLE
  {
    id: 'lifestyle-social',
    section: 'lifestyle',
    type: 'single-choice',
    question: 'How would you describe your ideal daily social interaction?',
    description: 'There\'s no right answer—we just want to match you with a community that fits your style.',
    options: [
      {
        value: 'very-social',
        label: 'I thrive on company',
        description: 'Shared meals, group activities, and spontaneous conversations energize me'
      },
      {
        value: 'moderately-social',
        label: 'Balance is key',
        description: 'I enjoy social time but also need my solitude'
      },
      {
        value: 'prefer-quiet',
        label: 'I treasure my quiet',
        description: 'I prefer smaller gatherings or one-on-one time with close friends'
      }
    ]
  },
  {
    id: 'lifestyle-routine',
    section: 'lifestyle',
    type: 'single-choice',
    question: 'How do you like to structure your days?',
    options: [
      {
        value: 'structured',
        label: 'I like a schedule',
        description: 'Meals at consistent times, activities I can plan around'
      },
      {
        value: 'flexible',
        label: 'I like options',
        description: 'Some routine, but freedom to change plans'
      },
      {
        value: 'spontaneous',
        label: 'I go with the flow',
        description: 'I prefer to decide day-by-day how I feel'
      }
    ]
  },
  {
    id: 'lifestyle-hobbies',
    section: 'lifestyle',
    type: 'multiple-choice',
    question: 'What activities bring you joy?',
    description: 'Select all that apply. This helps us find communities with relevant amenities.',
    options: [
      { value: 'reading', label: 'Reading' },
      { value: 'gardening', label: 'Gardening' },
      { value: 'arts-crafts', label: 'Arts & Crafts' },
      { value: 'fitness', label: 'Exercise/Fitness' },
      { value: 'music', label: 'Music (playing or listening)' },
      { value: 'cooking', label: 'Cooking/Baking' },
      { value: 'games', label: 'Games (cards, puzzles, board games)' },
      { value: 'volunteering', label: 'Volunteering' },
      { value: 'technology', label: 'Technology/Computers' },
      { value: 'pets', label: 'Spending time with pets' }
    ]
  },

  // SECTION 2: MOBILITY
  {
    id: 'mobility-walking',
    section: 'mobility',
    type: 'single-choice',
    question: 'How would you describe your current mobility?',
    description: 'Be honest—this is about finding a place that works for you now and in the future.',
    options: [
      {
        value: 'unlimited',
        label: 'I walk freely',
        description: 'No limitations on walking distance or terrain'
      },
      {
        value: 'short-walks',
        label: 'I prefer shorter distances',
        description: 'I can walk but tire after a block or two'
      },
      {
        value: 'walker',
        label: 'I use a walker',
        description: 'I need walker assistance for stability'
      },
      {
        value: 'wheelchair',
        label: 'I use a wheelchair',
        description: 'Full-time or part-time wheelchair use'
      }
    ]
  },
  {
    id: 'mobility-stairs',
    section: 'mobility',
    type: 'single-choice',
    question: 'How do you feel about stairs?',
    options: [
      {
        value: 'no-problem',
        label: 'Stairs are fine',
        description: 'Multiple flights don\'t bother me'
      },
      {
        value: 'one-flight-ok',
        label: 'One flight is manageable',
        description: 'I can do one flight but prefer not to do more'
      },
      {
        value: 'must-avoid',
        label: 'I need to avoid stairs',
        description: 'Elevator or ground floor is essential'
      }
    ]
  },

  // SECTION 3: COMMUNITY PROXIMITY
  {
    id: 'proximity-family',
    section: 'community',
    type: 'scale',
    question: 'How important is proximity to family?',
    scaleConfig: {
      min: 1,
      max: 5,
      minLabel: 'Not important',
      maxLabel: 'Essential'
    }
  },
  {
    id: 'proximity-healthcare',
    section: 'community',
    type: 'scale',
    question: 'How important is proximity to healthcare?',
    scaleConfig: {
      min: 1,
      max: 5,
      minLabel: 'Not important',
      maxLabel: 'Essential'
    }
  },
  {
    id: 'proximity-shopping',
    section: 'community',
    type: 'scale',
    question: 'How important is proximity to shopping?',
    scaleConfig: {
      min: 1,
      max: 5,
      minLabel: 'Not important',
      maxLabel: 'Essential'
    }
  },

  // SECTION 4: AMENITIES
  {
    id: 'amenities-must-have',
    section: 'amenities',
    type: 'multiple-choice',
    question: 'Which features are absolutely necessary?',
    description: 'These are non-negotiables for you.',
    options: [
      { value: 'elevator', label: 'Elevator access' },
      { value: 'parking', label: 'Assigned parking space' },
      { value: 'laundry-in-unit', label: 'In-unit laundry' },
      { value: 'pet-friendly', label: 'Pet-friendly' },
      { value: 'wheelchair-accessible', label: 'Wheelchair accessible' },
      { value: 'emergency-call', label: 'Emergency call system' },
      { value: 'meal-service', label: 'Meal service available' },
      { value: 'housekeeping', label: 'Housekeeping included' },
      { value: 'fitness-center', label: 'Fitness center' },
      { value: 'outdoor-space', label: 'Patio/balcony' }
    ]
  },

  // SECTION 5: BUDGET
  {
    id: 'budget-monthly',
    section: 'budget',
    type: 'single-choice',
    question: 'What is your comfortable monthly budget?',
    description: 'Include rent and basic utilities. Be realistic—this is for your benefit.',
    options: [
      { value: '1000-1500', label: '$1,000 - $1,500' },
      { value: '1500-2000', label: '$1,500 - $2,000' },
      { value: '2000-2500', label: '$2,000 - $2,500' },
      { value: '2500-3000', label: '$2,500 - $3,000' },
      { value: '3000-4000', label: '$3,000 - $4,000' },
      { value: '4000-plus', label: '$4,000+' }
    ]
  }
];
```

**TASK 3.3: Survey Page Component**
Duration: 8 hours

File: `app/survey/page.tsx`
```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MagazineNavigation } from '@/components/MagazineNavigation';
import { SurveyQuestion } from '@/components/survey/SurveyQuestion';
import { ProgressBar } from '@/components/survey/ProgressBar';
import { surveyQuestions } from '@/lib/data/survey-questions';
import { saveSurveyResponses } from '@/lib/services/survey-service';
import type { SurveyResponse } from '@/lib/types/survey';

export default function SurveyPage() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sections = [
    { name: 'Lifestyle', key: 'lifestyle' },
    { name: 'Mobility', key: 'mobility' },
    { name: 'Community', key: 'community' },
    { name: 'Amenities', key: 'amenities' },
    { name: 'Budget', key: 'budget' }
  ];

  const currentSectionQuestions = surveyQuestions.filter(
    (q) => q.section === sections[currentSection].key
  );

  const progress = ((currentSection + 1) / sections.length) * 100;

  const handleAnswer = (questionId: string, answer: any) => {
    setResponses({ ...responses, [questionId]: answer });
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await saveSurveyResponses(responses);
      router.push('/search?survey=completed');
    } catch (error) {
      console.error('Failed to save survey:', error);
      alert('There was a problem saving your responses. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = currentSectionQuestions.every((q) => {
    return responses[q.id] !== undefined && responses[q.id] !== '';
  });

  return (
    <>
      <MagazineNavigation />
      <div className="min-h-screen bg-[#FAF8F5] pt-16">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#F5EFE7] to-[#FAF8F5] px-8 md:px-16 lg:px-24 py-16 border-b-2 border-[#D4C4B0]">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl font-light text-[#5C4A3C] mb-6">
              Let's Find What Fits You
            </h1>
            <p className="font-serif text-xl text-[#8B7355] leading-relaxed">
              This isn't a test—there are no right answers. We're simply trying to understand
              what matters to you, so we can show you places that actually feel like home.
            </p>
          </div>
        </div>

        {/* Progress */}
        <ProgressBar
          progress={progress}
          currentSection={sections[currentSection].name}
        />

        {/* Questions */}
        <div className="px-8 md:px-16 lg:px-24 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12">
              <h2 className="font-serif text-3xl text-[#5C4A3C] mb-3">
                {sections[currentSection].name}
              </h2>
              <div className="h-1 bg-[#D4C4B0] w-24" />
            </div>

            <div className="space-y-12">
              {currentSectionQuestions.map((question) => (
                <SurveyQuestion
                  key={question.id}
                  question={question}
                  value={responses[question.id]}
                  onChange={(value) => handleAnswer(question.id, value)}
                />
              ))}
            </div>

            {/* Navigation */}
            <div className="mt-16 flex justify-between items-center">
              <button
                onClick={handleBack}
                disabled={currentSection === 0}
                className="px-6 py-3 font-serif text-[#8B7355] hover:text-[#5C4A3C] disabled:opacity-0 transition-all"
              >
                ← Back
              </button>

              <button
                onClick={handleNext}
                disabled={!canProceed || isSubmitting}
                className="px-8 py-3 bg-[#8B7355] text-white rounded-lg hover:bg-[#5C4A3C] disabled:opacity-50 disabled:cursor-not-allowed font-serif text-lg transition-colors"
              >
                {isSubmitting ? 'Saving...' : currentSection === sections.length - 1 ? 'See My Matches' : 'Continue →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
```

**Verification Checklist - Survey:**
- [ ] All 5 sections display correctly
- [ ] Progress bar updates as user proceeds
- [ ] Can't proceed without answering required questions
- [ ] Back button works without losing answers
- [ ] Responses save to localStorage (then Supabase)
- [ ] Redirects to search with personalized results
- [ ] Mobile responsive

---

### PHASE 2: CORE FUNCTIONALITY (1-2 Weeks)

#### Sprint 4: Property Details Enhancement
**TASK 4.1:** Add neighborhood scoring to property pages
**TASK 4.2:** Integrate walking score data
**TASK 4.3:** Show nearby amenities (healthcare, grocery, pharmacy)
**TASK 4.4:** Add transit information

#### Sprint 5: Family Sharing (Backend)
**TASK 5.1:** Supabase schema for shared bookmarks
**TASK 5.2:** Email invitation system
**TASK 5.3:** Real-time updates for family members
**TASK 5.4:** Permission levels (view-only vs. can-edit)

#### Sprint 6: Accessibility Implementation
**TASK 6.1:** Text size controls (16px - 24px range)
**TASK 6.2:** High contrast mode
**TASK 6.3:** Keyboard navigation
**TASK 6.4:** Screen reader optimization
**TASK 6.5:** Touch target sizing (min 48px)

---

### PHASE 3: BUSINESS VALIDATION (1 Week)

#### Sprint 7: Analytics & Tracking
**TASK 7.1:** Google Analytics 4 integration
**TASK 7.2:** Custom events tracking:
- `survey_started`, `survey_completed`
- `property_viewed`, `property_bookmarked`
- `realtor_contacted` (CRITICAL for VC pitch)
- `share_clicked`, `family_invited`

**TASK 7.3:** Conversion funnel dashboards
**TASK 7.4:** Heat mapping (Hotjar or similar)

#### Sprint 8: Referral Tracking System
**TASK 8.1:** Realtor referral link generation
**TASK 8.2:** Cookie-based attribution
**TASK 8.3:** Referral dashboard for realtors
**TASK 8.4:** Commission calculation engine

---

## PART 4: VC EVALUATION CRITERIA

### For Venture Capitalist Lens

When presenting this app to potential acquirers, they will evaluate:

#### 1. **Product-Market Fit Evidence**
**What They Look For:**
- Active user engagement (time on site, return visits)
- Conversion metrics (survey completion, realtor contacts)
- User testimonials proving emotional resonance

**What We Need to Demonstrate:**
- [ ] 500+ survey completions
- [ ] 50+ realtor contact events tracked
- [ ] 20+ documented user testimonials
- [ ] Average session duration >5 minutes
- [ ] 30% return visitor rate

#### 2. **Revenue Model Clarity**
**What They Look For:**
- Clear path to profitability
- Multiple revenue streams
- Unit economics that scale

**What We Need to Demonstrate:**
- [ ] Signed LOIs from 10+ realtors committing to referral fees
- [ ] Pricing model document (realtor fees, premium subscriptions)
- [ ] Financial projections showing break-even at 500 conversions/year
- [ ] CAC < LTV by 3x ratio

#### 3. **Scalability Assessment**
**What They Look For:**
- Geographic expansion potential
- Technology stack that scales
- Operational leverage

**What We Need to Demonstrate:**
- [ ] Market size analysis: 2.1M seniors relocating annually
- [ ] Expansion plan: Cleveland/Akron → Ohio → Midwest → National
- [ ] Partnership model with senior living associations
- [ ] Technology roadmap (mobile app, AI matching algorithm)

#### 4. **Competitive Moat**
**What They Look For:**
- Defensible differentiation
- Network effects
- Brand strength

**What We Need to Demonstrate:**
- [ ] Content library (20+ articles) creates SEO moat
- [ ] Exclusive realtor partnerships in each market
- [ ] Proprietary matching algorithm based on survey data
- [ ] Brand recognition ("The magazine-style senior housing search")

#### 5. **Team & Execution**
**What They Look For:**
- Founder expertise
- Ability to execute
- Vision clarity

**What We Need to Demonstrate:**
- [ ] Founder story (personal connection to problem)
- [ ] MVP shipped in 3 months
- [ ] User feedback incorporated iteratively
- [ ] Clear 12-month roadmap

---

## PART 5: SUCCESS METRICS & MILESTONES

### MVP Success Criteria (Must-Have Before VC Pitch)

**User Metrics:**
- [ ] 100 completed surveys
- [ ] 300 property searches performed
- [ ] 50 bookmarks created
- [ ] 15 realtor contact events
- [ ] 10 family sharing activations

**Technical Metrics:**
- [ ] <2 second page load time
- [ ] 95%+ uptime
- [ ] WCAG 2.1 AA compliance
- [ ] Mobile responsive on iOS/Android
- [ ] Zero critical bugs

**Business Metrics:**
- [ ] 10 signed realtor partnerships
- [ ] 5 user testimonials (video preferred)
- [ ] 1 successful placement (user→apartment via realtor)
- [ ] $0 customer acquisition cost (organic only for MVP)

### 90-Day Post-MVP Milestones

**Month 1:** Validation
- 500 unique visitors
- 100 survey completions
- 25 realtor contacts
- 3 successful placements

**Month 2:** Refinement
- Iterate based on user feedback
- Add 10 more articles
- Expand realtor network to 25
- Launch premium family features

**Month 3:** Scale Preparation
- 1,000 unique visitors
- 10 successful placements
- $15,000 referral revenue generated
- Prepare Series Seed pitch deck

---

## PART 6: IMPLEMENTATION PRIORITY MATRIX

### Critical Path (Must Complete Before MVP)
1. ✅ Find a Realtor Directory
2. ✅ Preference Survey System
3. ✅ Editorial Cartoons
4. ❌ Family Sharing (Backend)
5. ❌ Analytics Tracking
6. ❌ Realtor Referral System

### High Value (Complete Before VC Pitch)
1. ❌ Accessibility Features
2. ❌ Neighborhood Scoring
3. ❌ User Testimonials Collection
4. ❌ Content Expansion (10 more articles)
5. ❌ Mobile App (React Native wrapper)

### Nice to Have (Post-MVP)
1. AI-powered matching algorithm
2. Virtual tour integration
3. Tour scheduling automation
4. Community forums
5. Elder law attorney directory

---

## PART 7: RISK MITIGATION

### Technical Risks
**Risk:** Google Maps API costs exceed budget
**Mitigation:** Implement caching, use Places API Text Search (cheaper than Nearby Search)

**Risk:** Supabase free tier limits reached
**Mitigation:** Upgrade to Pro plan ($25/month) once 50+ active users

### Business Risks
**Risk:** Realtors don't see value in referral fees
**Mitigation:** Offer first 5 referrals free to prove conversion quality

**Risk:** Seniors don't complete online survey
**Mitigation:** Offer phone-based survey option with human assistance

### Market Risks
**Risk:** Seniors prefer traditional realtor search
**Mitigation:** Position as complementary tool, not replacement. Partner with existing realtors.

---

## APPENDIX A: REALTOR PARTNERSHIP PITCH

### Email Template for Realtor Outreach

**Subject:** Partnership Opportunity: Pre-Qualified Senior Housing Leads

**Body:**
```
Dear [Realtor Name],

I'm building "A Place of Your Own"—a specialized platform helping seniors and their
families find their next home. Think of it as a magazine-quality guide that
pre-qualifies leads through an empathetic, personality-based matching process.

Here's why this matters to you:
• Every lead has completed a 15-minute lifestyle survey
• Families are actively searching (not just browsing)
• We handle the emotional heavy lifting before connecting them to you

We're launching in Cleveland/Akron and looking for 10 founding realtor partners
who specialize in senior transitions.

What you get:
• Free featured profile in our directory
• Pre-qualified leads matched to your specialization
• No upfront cost—you only pay if they close ($1,500 referral fee)
• First 5 referrals completely free to prove value

Would you have 15 minutes this week to discuss? I'd love to show you the platform
and hear how we can best support your senior client work.

Best,
[Your Name]
```

---

## APPENDIX B: USER TESTIMONIAL COLLECTION SYSTEM

### Post-Placement Survey (Send 30 Days After Move)

**Subject:** How's your new place feeling?

**Questions:**
1. On a scale of 1-10, how would you rate your overall experience using A Place of Your Own?
2. What was the most helpful part of the process?
3. Did the preference survey accurately capture what you were looking for?
4. Would you recommend us to a friend going through a similar transition?
5. Can we share your story? (Full testimonial collection form)

**Incentive:** $50 Amazon gift card for video testimonial

---

---

## PART 8: EXPEDITED WEEKEND TEST MVP

**CRITICAL CONTEXT:** Mother and sister testing this weekend (2 days from now)

**DESIGN PRINCIPLE:** Magazine cover MUST remain as homepage at all times.

---

### Weekend MVP Goals

**Primary Objective:**
Test if the **emotional magazine experience + AI concierge** creates genuine engagement with elderly users.

**Success Metrics for Weekend:**
- [ ] Mom spends >10 minutes exploring site
- [ ] Mom has at least 1 meaningful conversation with AI assistant
- [ ] Mom reads at least 2 full articles
- [ ] Mom completes at least half of survey
- [ ] Sister provides actionable UX feedback
- [ ] No critical bugs or confusion points

---

### Implementation Priority (48-Hour Sprint)

#### HOUR 0-4: AI Assistant Core (MUST HAVE)
**Task:** Build simplified AI concierge

**Files to Create:**
1. `lib/ai/simple-conversation.ts` (simplified version from Sprint 0)
2. `components/ai/AIConcierge.tsx` (UI from Sprint 0)
3. `app/api/chat/route.ts` (API endpoint)

**Shortcuts for Speed:**
- Skip Redis → Use localStorage only
- Skip insight extraction → Simple conversation only
- Skip authentication → Anonymous users OK
- Use client-side API key (acceptable for test, fix post-weekend)

**Deployment:**
```bash
npm install @anthropic-ai/sdk
# Add to .env.local:
NEXT_PUBLIC_ANTHROPIC_API_KEY=your_key_here
```

**Implementation:**
```typescript
// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(request: NextRequest) {
  const { messages } = await request.json();

  const systemPrompt = `You are a compassionate guide helping seniors find housing.

  KEY RULES:
  - Ask questions, don't give advice
  - Be patient and warm
  - Remember what they tell you in this conversation
  - Use simple, clear language
  - One question at a time
  - Acknowledge emotions and difficulty of this transition

  Example:
  User: "I need to move"
  You: "I understand this is a big step. Can you tell me a bit about what's prompting this move? Take your time."`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 500,
    temperature: 0.7,
    system: systemPrompt,
    messages,
  });

  return NextResponse.json({
    content: response.content[0].text
  });
}
```

**Integration into Homepage:**
```typescript
// app/page.tsx - ADD AI COMPONENT
import { AIConcierge } from '@/components/ai/AIConcierge';

export default function Home() {
  return (
    <>
      {/* EXISTING MAGAZINE COVER - DO NOT CHANGE */}
      {/* ... existing homepage content ... */}

      {/* NEW: Add AI assistant floating button */}
      <AIConcierge />
    </>
  );
}
```

---

#### HOUR 5-8: Text Size & Mobile Optimization (MUST HAVE)

**Critical for Elderly Users:**

1. **Increase Base Font Sizes:**
```typescript
// tailwind.config.ts - UPDATE
theme: {
  fontSize: {
    'base': '18px',    // Was 16px
    'lg': '20px',      // Was 18px
    'xl': '22px',      // Was 20px
    '2xl': '26px',     // Was 24px
    '3xl': '32px',     // Was 30px
  }
}
```

2. **Add Text Size Control Component:**
```typescript
// components/ui/TextSizeControl.tsx
'use client';

import { useState, useEffect } from 'react';
import { Type } from 'lucide-react';

export function TextSizeControl() {
  const [size, setSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  useEffect(() => {
    const saved = localStorage.getItem('textSize') as any;
    if (saved) setSize(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-text-size', size);
    localStorage.setItem('textSize', size);
  }, [size]);

  return (
    <div className="fixed top-20 right-4 bg-white border-2 border-[#D4C4B0] rounded-lg p-2 shadow-lg z-40">
      <div className="flex flex-col gap-2">
        <button
          onClick={() => setSize('normal')}
          className={`px-3 py-2 rounded ${size === 'normal' ? 'bg-[#8B7355] text-white' : 'bg-[#F5EFE7]'}`}
        >
          <Type className="w-4 h-4" />
        </button>
        <button
          onClick={() => setSize('large')}
          className={`px-3 py-2 rounded ${size === 'large' ? 'bg-[#8B7355] text-white' : 'bg-[#F5EFE7]'}`}
        >
          <Type className="w-5 h-5" />
        </button>
        <button
          onClick={() => setSize('xlarge')}
          className={`px-3 py-2 rounded ${size === 'xlarge' ? 'bg-[#8B7355] text-white' : 'bg-[#F5EFE7]'}`}
        >
          <Type className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
```

3. **Add CSS for text scaling:**
```css
/* app/globals.css - ADD */
[data-text-size="large"] {
  font-size: 112.5%; /* 18px base */
}

[data-text-size="xlarge"] {
  font-size: 125%; /* 20px base */
}
```

4. **Test on iPad:**
- Ensure magazine cover scales properly
- Touch targets minimum 48px x 48px
- AI chat window works in landscape/portrait

---

#### HOUR 9-12: Survey Implementation (NICE TO HAVE)

**Decision:** Only implement if time permits after AI + accessibility.

**Minimal Survey:**
- 5 questions only (down from full survey)
- Save to localStorage
- No backend integration needed

**Critical Questions:**
1. Budget range
2. Mobility needs
3. Social preference
4. Location preference
5. Must-have amenities

---

### Weekend Test Protocol

#### Before Sending to Mom & Sister:

**Checklist:**
- [ ] Magazine cover loads in <2 seconds
- [ ] AI assistant button is visible and clickable
- [ ] First AI message appears welcoming
- [ ] Text-to-speech button works
- [ ] Text size control appears and works
- [ ] Mobile responsive on iPhone/iPad
- [ ] All articles load without errors
- [ ] No console errors in browser
- [ ] Test on both Chrome and Safari

#### During Weekend Test:

**What to Tell Mom:**
"Mom, I built something special for you and anyone going through what you're experiencing. It's like a magazine that helps you think through finding your next place. There's also a guide you can chat with - think of it like having a patient friend who asks good questions. Just explore at your own pace. No rush."

**What to Ask Sister:**
1. "Was the AI assistant helpful or annoying?"
2. "Did mom get frustrated at any point?"
3. "What features did mom gravitate toward?"
4. "What was confusing or overwhelming?"
5. "Would mom actually use this?"

**Analytics to Track:**
- Time spent on site
- Which articles read
- Number of AI conversations
- Survey completion rate
- Any error messages encountered

---

### Post-Weekend Iteration Plan

**Monday Morning Review:**

1. **If AI Assistant Worked Well:**
   - Implement full memory system (Redis)
   - Add insight extraction
   - Connect to property search
   - Build admin dashboard to read conversations

2. **If Text Size Issues:**
   - Expand text controls
   - Add high contrast mode
   - Consider voice navigation

3. **If Survey Confusing:**
   - Rewrite questions
   - Add more examples
   - Consider AI-guided survey (conversational)

4. **If Magazine Content Resonated:**
   - Commission 5 more articles
   - Add cartoons
   - Expand "Letter from Editor"

---

### Critical Notes for Weekend MVP

**DO:**
- Keep magazine cover as homepage (user's requirement)
- Make AI assistant optional (floating button, not intrusive)
- Use large, readable fonts
- Test on actual elderly user (your mom!)
- Get raw, honest feedback

**DON'T:**
- Rush to add every feature
- Make UI cluttered
- Overwhelm with too many options
- Worry about perfect code (iterate post-weekend)
- Skip mobile testing

**REMEMBER:**
The goal isn't to complete the roadmap - it's to validate that the **emotional magazine + AI concierge concept** resonates with the target user (elderly person in transition).

If your mom:
1. Reads multiple articles
2. Has a meaningful AI conversation
3. Feels understood rather than sold to

**Then you've validated product-market fit and can confidently build the rest.**

---

**END OF MVP COMPLETION ROADMAP**

This document should be appended to the existing Prompt-PRD-Plan.md as:
## PART 4: MVP COMPLETION & DUAL-LENS ANALYSIS
