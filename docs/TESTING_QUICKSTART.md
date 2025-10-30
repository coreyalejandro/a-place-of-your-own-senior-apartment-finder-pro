# Testing Quick Start Guide

**Get testing in 5 minutes!**

---

## Prerequisites

Ensure you have:
- ✅ Node.js 20+ installed
- ✅ Dependencies installed: `npm install`
- ✅ Anthropic API key in `.env.local`

---

## Quick Commands

### Run All Tests
```bash
npm run test:all          # Runs unit + E2E tests
```

### During Development
```bash
npm run test              # Unit tests in watch mode
```

### E2E Tests
```bash
npm run test:e2e          # Run E2E tests (headless)
npm run test:e2e:ui       # Interactive UI mode (recommended!)
```

### Check Coverage
```bash
npm run test:coverage     # Generate coverage report
```

---

## Your First Test Run

### 1. Run Unit Tests (Fast - 5 seconds)

```bash
npm run test:unit
```

You should see output like:
```
 PASS  tests/components/AIConcierge.test.tsx
 PASS  tests/api/chat.test.ts

Test Suites: 2 passed, 2 total
Tests:       25 passed, 25 total
Time:        5.123 s
```

### 2. Run E2E Tests (Slower - 30 seconds)

```bash
npm run test:e2e:ui
```

This opens an interactive UI where you can:
- ✨ See tests run in real-time
- 🐛 Debug failures easily
- 📸 View screenshots
- 🎬 Watch test recordings

### 3. Run Everything

```bash
npm run test:all
```

All green? You're good to go! 🎉

---

## Test Structure

```
tests/
├── e2e/                    # End-to-end tests (Playwright)
│   ├── homepage.spec.ts    # Homepage tests
│   ├── ai-concierge.spec.ts # AI assistant tests
│   └── navigation.spec.ts   # Navigation tests
│
├── components/             # Component tests (React Testing Library)
│   └── AIConcierge.test.tsx
│
├── api/                    # API route tests
│   └── chat.test.ts
│
├── setup.ts               # Test configuration
└── __mocks__/             # Mock files
```

---

## Writing a Test

### E2E Test (User Journey)

```typescript
// tests/e2e/my-feature.spec.ts
import { test, expect } from '@playwright/test';

test('user can complete task', async ({ page }) => {
  // 1. Go to page
  await page.goto('/');

  // 2. Interact with element
  const button = page.getByRole('button', { name: /Click Me/i });
  await button.click();

  // 3. Verify outcome
  await expect(page.getByText('Success!')).toBeVisible();
});
```

Run it:
```bash
npm run test:e2e -- tests/e2e/my-feature.spec.ts
```

### Component Test

```typescript
// tests/components/MyComponent.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent title="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

Run it:
```bash
npm run test:unit -- MyComponent
```

---

## Debugging Failed Tests

### Jest Tests Failed?

```bash
# Run specific test
npm run test:unit -- -t "should send message"

# See full output
npm run test:unit -- --verbose

# Update snapshots
npm run test:unit -- -u
```

### Playwright Tests Failed?

```bash
# Debug mode - step through test
npm run test:e2e:debug

# See browser in action
npm run test:e2e:headed

# Run specific test
npm run test:e2e -- -g "should open chat"
```

### Common Fixes

**"Element not found"**
→ Add wait: `await expect(element).toBeVisible()`

**"Test timeout"**
→ Increase timeout: `{ timeout: 30000 }`

**"Flaky test"**
→ Replace `setTimeout` with proper waits

---

## CI/CD

Tests run automatically on:
- Every push to GitHub
- Every pull request
- Before deployment

Check status in GitHub Actions tab.

---

## What to Test

### ✅ Always Test
- User journeys (homepage → navigation → interaction)
- Form submissions
- Error states
- API endpoints
- Critical business logic

### ⚠️ Test Sparingly
- Styling (unless critical to UX)
- Third-party libraries
- Configuration

### ❌ Don't Test
- Implementation details
- Static content
- External APIs (mock them!)

---

## Getting Help

- **Full documentation**: `docs/TESTING_SOP.md`
- **Test not working?** Run with `--debug` flag
- **Questions?** Check GitHub issues

---

## Next Steps

1. ✅ Run `npm run test:all` - ensure everything passes
2. 📝 Write a test for your next feature
3. 🔁 Make testing part of your workflow
4. 📊 Check coverage regularly: `npm run test:coverage`

**Happy testing! 🧪**
