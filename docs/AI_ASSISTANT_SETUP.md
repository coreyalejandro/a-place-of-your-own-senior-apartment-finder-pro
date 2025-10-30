# AI Assistant Setup Guide

## Overview

The AI Concierge Assistant is a compassionate, patient guide that helps seniors navigate the emotional journey of finding their next home. Built with Claude 3.5 Sonnet from Anthropic, it uses Socratic questioning to help users discover their own answers rather than giving direct advice.

## Key Features

- **Empathetic Conversation**: Uses natural, warm language calibrated for elderly users
- **Persistent Memory**: Remembers conversation context within a session (saved to localStorage)
- **Text-to-Speech**: Every assistant message can be read aloud for accessibility
- **Socratic Method**: Asks thoughtful questions instead of giving advice
- **Mobile Optimized**: Large text (18px), easy touch targets (48px minimum)
- **Non-Intrusive**: Floating button that users can choose to engage with

## Setup Instructions

### Step 1: Get Your Anthropic API Key

1. Go to [https://console.anthropic.com/](https://console.anthropic.com/)
2. Sign up or log in to your account
3. Navigate to **API Keys** in the dashboard
4. Click **Create Key**
5. Give it a name (e.g., "A Place of Your Own - Development")
6. Copy the API key (it starts with `sk-ant-`)
7. **Important**: Save this key securely - you won't be able to see it again

### Step 2: Add API Key to Your Environment

1. In your project root, create a `.env.local` file (if it doesn't exist):

```bash
touch .env.local
```

2. Add your Anthropic API key to `.env.local`:

```bash
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
```

3. Make sure `.env.local` is in your `.gitignore` (it should be by default in Next.js)

### Step 3: Install Dependencies

The `@anthropic-ai/sdk` package has already been installed. If you need to reinstall:

```bash
npm install @anthropic-ai/sdk
```

### Step 4: Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## How It Works

### Architecture

```
User Browser
    ↓
AIConcierge.tsx (UI Component)
    ↓
/api/chat/route.ts (API Endpoint)
    ↓
Anthropic Claude 3.5 Sonnet
    ↓
Response back to user
```

### Conversation Flow

1. **User opens chat**: Greeting message appears automatically
2. **User types message**: Sent to `/api/chat` endpoint
3. **System prompt** provides context to Claude about being empathetic, patient, using Socratic method
4. **Claude generates response**: Returns thoughtful question or acknowledgment
5. **Response displayed**: User can read or hear it via text-to-speech
6. **Conversation saved**: Stored in localStorage for persistence within browser

### System Prompt Highlights

The AI is instructed to:
- **Never give direct advice** - ask questions instead
- **Remember context** - reference earlier parts of conversation
- **Be patient** - acknowledge if users repeat themselves
- **One question at a time** - don't overwhelm
- **Validate emotions** - "This must feel overwhelming" vs. "No worries!"
- **Respect agency** - it's their decision, not the AI's
- **Know boundaries** - redirect medical/legal questions to professionals

## Testing the AI Assistant

### Basic Functionality Test

1. Open the homepage (`/`)
2. Look for the floating message icon in the bottom-right corner
3. Click the icon to open the chat window
4. Type a message like: "I'm thinking about moving to a smaller place"
5. Verify:
   - [ ] Response feels empathetic and asks a follow-up question
   - [ ] "Read aloud" button works (click the volume icon)
   - [ ] Text is large and readable (18px minimum)
   - [ ] Can continue the conversation naturally

### Elderly User Testing (Critical for Weekend MVP)

Have your mom test with these scenarios:

**Scenario 1: Initial Contact**
- Message: "My husband recently passed away. The house feels too big."
- Expected: Compassionate acknowledgment + gentle question about her situation
- Look for: Does she feel heard? Is the tone appropriate?

**Scenario 2: Budget Concerns**
- Message: "I don't know if I can afford this."
- Expected: Non-judgmental question about budget, not advice
- Look for: Does it help her think through her situation?

**Scenario 3: Family Dynamics**
- Message: "My daughter thinks I should move but I'm not sure."
- Expected: Question exploring her feelings vs. daughter's opinions
- Look for: Does it respect her agency?

### Mobile/iPad Testing

1. Open on iPad or iPhone
2. Verify:
   - [ ] Chat window is responsive
   - [ ] Touch targets are large enough (48px minimum)
   - [ ] Text-to-speech works on mobile Safari
   - [ ] Input field doesn't get hidden by keyboard
   - [ ] Floating button doesn't overlap with important content

## Troubleshooting

### "Failed to process chat message" Error

**Cause**: API key not set or invalid

**Solution**:
1. Check `.env.local` has `ANTHROPIC_API_KEY=sk-ant-...`
2. Restart the development server: `npm run dev`
3. Verify API key is valid at [console.anthropic.com](https://console.anthropic.com/)

### Conversation Not Persisting

**Cause**: localStorage issues

**Solution**:
- Check browser console for errors
- Try clearing localStorage: `localStorage.clear()` in browser console
- Refresh the page

### Text-to-Speech Not Working

**Cause**: Browser compatibility

**Solution**:
- Ensure using modern browser (Chrome, Safari, Edge)
- Check browser permissions for audio
- Try on different device

### AI Responses Feel Generic

**Cause**: System prompt not being applied

**Solution**:
- Check `/app/api/chat/route.ts` has the full system prompt
- Restart development server
- Try a new conversation (clear the chat)

## Cost Monitoring

### Weekend MVP Testing (Expected Costs)

**Scenario**: 100 conversations with your mom and sister
- **Average conversation**: 10 messages (5 back-and-forth)
- **Tokens per conversation**: ~5,000 tokens
- **Total tokens**: 500,000 tokens
- **Cost**: ~$3-5 (Claude 3.5 Sonnet pricing)

### Production Estimates

**Scenario**: 1,000 users/month, 5 conversations each
- **Total conversations**: 5,000/month
- **Tokens**: ~25 million/month
- **Cost**: ~$250/month

**Revenue Impact**:
- If AI increases realtor contact rate by 20%
- 100 extra realtor contacts/month
- At $1,500 per conversion (20% success rate)
- Revenue: +$300/month
- **ROI: Positive from day 1**

## Privacy & Security

### User Data
- Conversations stored **locally** in browser (localStorage)
- No conversation data sent to your servers (weekend MVP)
- Only sent to Anthropic API for processing
- Anthropic's data retention: [anthropic.com/legal/privacy](https://www.anthropic.com/legal/privacy)

### For Production
- Move to server-side storage (Supabase)
- Implement user authentication
- Add conversation encryption
- Comply with HIPAA if storing health information

## Next Steps After Weekend Test

Based on feedback from your mom and sister:

### If AI is Helpful ✅
1. Implement Redis-based memory (remember across sessions)
2. Add insight extraction (automatically capture preferences)
3. Connect to property search (suggest places based on conversation)
4. Build admin dashboard to review conversations
5. Add conversation analytics

### If Text Size Issues 🔍
- Already have TextSizeControl component
- Consider voice input (speech-to-text)
- Add high contrast mode integration

### If Conversation Feels Rushed ⏸️
- Increase response length (max_tokens)
- Add conversation pacing indicators
- Offer explicit "pause" button

### If Users Want More Features 🚀
- Ability to email conversation transcript
- Share conversation with family members
- Save specific preferences for property search
- Connect to realtor recommendations

## Support

For questions or issues during weekend testing:
1. Check browser console for errors (F12 or Cmd+Option+I)
2. Review this guide's Troubleshooting section
3. Check Anthropic API status: [status.anthropic.com](https://status.anthropic.com/)

## Weekend Test Success Criteria

- [ ] Mom can open and use the chat without confusion
- [ ] Responses feel empathetic and patient
- [ ] Text-to-speech works and is helpful
- [ ] Conversation helps her think through her situation
- [ ] She would want to use it again
- [ ] No frustrating bugs or errors
- [ ] Sister provides positive UX feedback
