# Weekend MVP Quick Start Guide

## 🎯 Goal
Test the AI Concierge Assistant with your mom and sister this weekend to validate the **emotional magazine + AI guide** concept.

## ⏱️ Pre-Launch Checklist (30 minutes)

### 1. Get Anthropic API Key (5 minutes)
- [ ] Go to https://console.anthropic.com/
- [ ] Sign up/login
- [ ] Create new API key
- [ ] Copy the key (starts with `sk-ant-`)

### 2. Configure Environment (2 minutes)
```bash
# Create .env.local file in project root
echo "ANTHROPIC_API_KEY=sk-ant-your-key-here" > .env.local
```

### 3. Start Development Server (1 minute)
```bash
npm run dev
```

Visit: `http://localhost:3000`

### 4. Test AI Assistant (5 minutes)

- [ ] See floating message button (bottom-right)
- [ ] Click to open chat
- [ ] Type: "I need help finding a new place"
- [ ] Verify response is empathetic
- [ ] Click "Read aloud" button - verify it works
- [ ] Send 2-3 more messages to test conversation flow

### 5. Mobile Test (5 minutes)

**On iPad/iPhone:**
- [ ] Open the site
- [ ] Chat window is responsive
- [ ] Touch targets are easy to tap
- [ ] Text-to-speech works
- [ ] Keyboard doesn't hide input

### 6. Magazine Content Check (5 minutes)

- [ ] Homepage shows magazine cover (NOT affected by AI)
- [ ] "Open Magazine" button works
- [ ] Letter from Editor loads
- [ ] Table of Contents works
- [ ] At least 2 articles load properly

### 7. Accessibility Quick Check (5 minutes)

- [ ] Text is large and readable (18px base)
- [ ] High contrast between text and background
- [ ] All buttons are at least 48px x 48px
- [ ] Can navigate with keyboard (Tab key)

---

## 📱 Sharing with Mom & Sister

### What to Send Them

**Subject**: Something I built for you - would love your honest feedback this weekend

**Message**:
```
Hi Mom (and Sister),

I built something I'd love you to test this weekend. It's a magazine-style
website that helps people like you explore housing options - but it's not
like other sites. It has a personal guide you can chat with who actually
listens.

Here's the link: [YOUR_DEPLOYED_URL or localhost]

Please explore at your own pace. There's no rush. The little message icon
in the corner - that's your guide. Click it and just... talk. About whatever
is on your mind.

I'd love to know:
1. Does it feel helpful or annoying?
2. Was anything confusing?
3. Would you actually use this?

Take your time. No pressure. Just honest feedback.

Love,
[Your Name]
```

### Questions to Ask After They Test

**For Mom:**
1. How did the AI assistant make you feel?
2. Did you feel rushed or pressured at any point?
3. Was the text large enough to read comfortably?
4. Did you try the "Read aloud" feature? Was it helpful?
5. Would you want to continue using this?

**For Sister (UX Perspective):**
1. Was the AI assistant helpful or intrusive?
2. Did Mom get frustrated at any point?
3. What features did she gravitate toward?
4. What was confusing?
5. How does this compare to other senior housing sites?

---

## 🧪 Test Scenarios for Mom

### Scenario 1: First Contact (Emotional Response Test)
**What Mom might type**: "My husband recently passed away. I'm thinking about moving."

**What to watch for**:
- Does the AI respond with appropriate compassion?
- Does it ask a thoughtful follow-up question?
- Does Mom feel heard or dismissed?

**Success**: Mom continues the conversation naturally

---

### Scenario 2: Budget Concerns (Non-Judgment Test)
**What Mom might type**: "I don't think I can afford much."

**What to watch for**:
- Does the AI ask about budget without being pushy?
- Does it help her think through options?
- Does it avoid making her feel bad about budget?

**Success**: Mom shares more details about her financial situation

---

### Scenario 3: Family Dynamics (Agency Test)
**What Mom might type**: "My daughter thinks I should move but I'm not sure."

**What to watch for**:
- Does the AI respect Mom's agency?
- Does it explore HER feelings vs. daughter's opinions?
- Does it help her think for herself?

**Success**: Mom feels empowered to make her own decision

---

### Scenario 4: Physical Needs (Practical Test)
**What Mom might type**: "I have trouble with stairs."

**What to watch for**:
- Does the AI remember this for later in conversation?
- Does it ask about other mobility needs?
- Does it suggest relevant features (elevator, ground floor)?

**Success**: AI remembers and references this in future messages

---

## 📊 Success Metrics for Weekend

### Must-Have (Deal Breakers)
- [ ] Mom spends >10 minutes on site
- [ ] Mom has at least 1 meaningful AI conversation (5+ messages)
- [ ] No critical bugs that block usage
- [ ] Mom doesn't get frustrated or confused

### Nice-to-Have (Bonus)
- [ ] Mom reads at least 2 full articles
- [ ] Mom uses text-to-speech feature
- [ ] Sister provides actionable feedback
- [ ] Mom asks to use it again

### Red Flags (Need Immediate Fix)
- ❌ AI responses feel generic or robotic
- ❌ Mom gets frustrated with UI
- ❌ Text too small to read
- ❌ Chat doesn't work on iPad
- ❌ Mom feels sold to or pressured

---

## 🐛 Common Issues & Quick Fixes

### Issue: "Failed to process chat message"
**Fix**: Check `.env.local` has correct API key, restart server

### Issue: Chat window doesn't appear
**Fix**: Check browser console (F12), look for JavaScript errors

### Issue: Text-to-speech doesn't work
**Fix**: Try on Safari or Chrome, check audio permissions

### Issue: Conversation doesn't save
**Fix**: Check localStorage is enabled, try incognito mode

### Issue: AI responses are slow
**Fix**: Normal for first message (cold start), should speed up after

---

## 📝 Feedback Collection Template

Create a simple Google Form or doc with these questions:

**Basic Info**
- Name:
- Age:
- Device used (iPhone, iPad, Desktop):

**AI Assistant Experience**
1. Did you try the AI assistant? (Yes/No)
2. How many messages did you exchange?
3. Rate the helpfulness (1-5): ___
4. Rate the tone/empathy (1-5): ___
5. What did you like about it?
6. What would you change?

**Magazine Content**
1. Did you read any articles? Which ones?
2. Was the text easy to read?
3. Did the magazine style feel appropriate?

**Overall**
1. Would you use this again? (Yes/No/Maybe)
2. Would you recommend to a friend? (Yes/No/Maybe)
3. What's the ONE thing we should improve first?

**Open Feedback**
Any other thoughts or observations:

---

## 🎬 After the Weekend

### Monday Morning Review

1. **Collect Feedback**
   - Review notes from Mom & Sister
   - Check analytics (if added)
   - Review any error logs

2. **Categorize Findings**
   - ✅ What worked well
   - 🔧 What needs tweaking
   - 🚨 What needs major fix
   - 💡 New ideas that emerged

3. **Prioritize Next Steps**
   Based on the roadmap (docs/planning/MVP-COMPLETION-ROADMAP.md):
   - If AI worked well → Add memory system
   - If text size issues → Enhance accessibility
   - If survey interest → Build preference survey
   - If content resonated → Commission more articles

4. **Make Decision**
   - **Continue building?** Feedback was positive, users engaged
   - **Pivot?** Major issues with core concept
   - **Simplify?** Too complex, need to streamline

---

## 💰 Cost Tracking

### Weekend Test Budget
- **Anthropic API**: ~$5 (100 conversations)
- **Total**: $5

### What You're Testing For $5
- Product-market fit with real elderly user
- Validation of empathetic AI concept
- UX feedback from target demographic
- Insights for next iteration

**This is the cheapest, fastest way to validate your core hypothesis.**

---

## 🚀 If Test Goes Well

You've validated:
1. ✅ Emotional magazine approach resonates
2. ✅ AI concierge adds value (not annoyance)
3. ✅ Elderly users can navigate interface
4. ✅ Concept is differentiated from competitors

**Next steps** (from roadmap):
1. Deploy to production (Vercel)
2. Add realtor directory (Sprint 1)
3. Implement full memory system (Sprint 0.5)
4. Commission editorial cartoons
5. Build preference survey
6. Launch beta with 10 users

---

## 📞 Emergency Contacts

**If something breaks during testing:**
1. Check docs/AI_ASSISTANT_SETUP.md
2. Check browser console for errors
3. Restart development server
4. Clear browser cache/localStorage

**Anthropic API Status**: https://status.anthropic.com

---

## ✨ Remember

The goal isn't perfection. The goal is to answer one question:

**"Does the combination of emotional magazine content + empathetic AI assistant create genuine engagement with elderly users in transition?"**

If your mom:
1. Reads articles with interest
2. Has a meaningful conversation with the AI
3. Feels understood rather than sold to

**Then you've validated the core concept** and can confidently build the rest.

Good luck! 🍀
