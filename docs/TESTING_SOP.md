# Testing Standard Operating Procedure (SOP)

**Version:** 1.0
**Last Updated:** 2025-10-23
**Status:** Active

---

## Overview

This document defines the comprehensive testing strategy for "A Place of Your Own" senior apartment finder. Our testing framework is designed to be:

- **Robust**: Multi-layer testing with E2E, component, unit, and API tests
- **Flexible**: Works across different domains and industries
- **Future-proof**: Industry-standard tools and patterns
- **Automated**: CI/CD integration for continuous quality assurance

## Testing Philosophy

### Core Principles

1. **Test what matters to users**: Focus on user journeys and critical paths
2. **Write tests that give confidence**: Tests should catch real bugs
3. **Fast feedback loops**: Quick tests for rapid iteration
4. **Maintainable tests**: Clean, readable, well-documented test code
5. **Test early, test often**: Integrate testing into daily development

### Testing Pyramid

```
        /\
       /  \      E2E Tests (10%)
      /____\     - Critical user journeys
     /      \    - Cross-browser testing
    /________\   Integration Tests (30%)
   /          \  - Component interactions
  /____________\ - API endpoints
 /              \ Unit Tests (60%)
/______________\ - Business logic
                 - Utilities
                 - Pure functions
```

---

## Testing Stack

### Tools & Frameworks

| Purpose | Tool | Version | Why |
|---------|------|---------|-----|
| **E2E Testing** | Playwright | ^1.56 | Industry standard, multi-browser, fast, reliable |
| **Component Testing** | React Testing Library | ^16.3 | User-centric testing, encourages best practices |
| **Unit Testing** | Jest | ^30.2 | Fast, powerful, great ecosystem |
| **Assertion Library** | Jest + jest-dom | ^6.9 | Rich matchers, excellent DX |
| **Test Runner** | Jest + Playwright | - | Parallel execution, watch mode |
| **Coverage** | Jest Coverage | - | Built-in, comprehensive reports |

---

## Test Types & When to Use Them

### 1. End-to-End (E2E) Tests

**Location:** `tests/e2e/`

**When to write:**
- Testing complete user journeys (homepage → navigation → AI chat)
- Multi-page flows
- Critical business paths
- Cross-browser compatibility
- Mobile responsiveness
- Accessibility compliance

**Example scenarios:**
- User opens homepage, clicks AI button, sends message, gets response
- User navigates through magazine pages (Cover → Letter → Contents)
- User can use keyboard navigation throughout the app

**Run command:**
```bash
npm run test:e2e          # Run all E2E tests
npm run test:e2e:ui       # Interactive UI mode
npm run test:e2e:headed   # See browser in action
npm run test:e2e:debug    # Debug mode
```

**Best practices:**
- Use data-testid sparingly; prefer role-based selectors
- Keep tests independent (no shared state)
- Test real user scenarios, not implementation details
- Use Page Object Model for complex flows

### 2. Component Tests

**Location:** `tests/components/`

**When to write:**
- Testing React components in isolation
- User interactions (clicks, typing, form submission)
- Conditional rendering
- Props variations
- State changes

**Example scenarios:**
- AI Concierge opens/closes correctly
- Messages are sent and displayed
- Input validation works
- Error states render properly

**Run command:**
```bash
npm run test:unit         # Run all unit tests
npm run test              # Watch mode for development
```

**Best practices:**
- Render components with realistic props
- Test from the user's perspective
- Mock external dependencies (APIs, localStorage)
- Use userEvent over fireEvent for realistic interactions

### 3. API Route Tests

**Location:** `tests/api/`

**When to write:**
- Testing Next.js API routes
- Request/response handling
- Error handling
- Authentication/authorization
- Data validation

**Example scenarios:**
- `/api/chat` returns AI response for valid request
- API handles errors gracefully
- Correct headers are sent
- Rate limiting works

**Run command:**
```bash
npm run test:unit         # Runs all Jest tests including API tests
```

**Best practices:**
- Mock external services (Anthropic, Supabase, Google Maps)
- Test both success and error cases
- Verify request/response structure
- Test edge cases

### 4. Utility/Hook Tests

**Location:** `tests/utils/`, `tests/hooks/`

**When to write:**
- Testing pure functions
- Custom React hooks
- Business logic
- Calculations
- Data transformations

**Run command:**
```bash
npm run test:unit
```

---

## Writing Your First Test

### E2E Test Example

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should do something user-facing', async ({ page }) => {
    // Arrange: Set up test state
    const button = page.getByRole('button', { name: /Submit/i });

    // Act: Perform user action
    await button.click();

    // Assert: Verify expected outcome
    await expect(page.getByText(/Success/i)).toBeVisible();
  });
});
```

### Component Test Example

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MyComponent } from '@/components/MyComponent';

describe('MyComponent', () => {
  it('should render with correct text', () => {
    render(<MyComponent title="Hello" />);

    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('should handle click events', async () => {
    const handleClick = jest.fn();
    render(<MyComponent onClick={handleClick} />);

    await userEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

---

## Development Workflow

### Daily Development

1. **Before starting work:**
   ```bash
   npm run build          # Ensure no build errors
   npm run test:unit      # Run unit tests
   ```

2. **During development (TDD approach):**
   ```bash
   npm run test           # Watch mode - runs tests on file save
   ```

3. **Before committing:**
   ```bash
   npm run test:all       # Run all tests
   npm run test:coverage  # Check coverage
   npm run lint           # Lint code
   ```

### Adding a New Feature

1. **Write E2E test for the user journey** (tests/e2e/)
2. **Write component tests** (tests/components/)
3. **Write API tests if needed** (tests/api/)
4. **Implement the feature**
5. **Run tests**: `npm run test:all`
6. **Check coverage**: `npm run test:coverage`
7. **Commit with tests**

### Fixing a Bug

1. **Write a failing test that reproduces the bug**
2. **Fix the bug**
3. **Verify test passes**
4. **Run full test suite**
5. **Commit fix with test**

---

## Coverage Requirements

### Minimum Coverage Thresholds

| Metric | Target | Current |
|--------|--------|---------|
| **Statements** | 70% | TBD |
| **Branches** | 70% | TBD |
| **Functions** | 70% | TBD |
| **Lines** | 70% | TBD |

### What to Prioritize for Coverage

**Must have 90%+ coverage:**
- Critical user paths (AI Concierge, navigation)
- Payment/transaction flows (future)
- Authentication/authorization
- Data validation

**Should have 70%+ coverage:**
- All UI components
- API routes
- Business logic

**Can have lower coverage:**
- Configuration files
- Type definitions
- Generated code
- Deprecated features

---

## CI/CD Integration

### Automated Testing Pipeline

Tests run automatically on:
- **Every push** to any branch
- **Every pull request**
- **Before deployment** to production

### GitHub Actions Workflow

```yaml
# Runs on every push and PR
- Checkout code
- Install dependencies
- Run linting
- Run unit tests (Jest)
- Run E2E tests (Playwright)
- Generate coverage report
- Upload test results
- Fail build if tests fail
```

**Status badges:**
- [![Tests](badge)](link) - All tests passing
- [![Coverage](badge)](link) - Code coverage %

---

## Debugging Failed Tests

### Jest Tests Failing

```bash
# Run specific test file
npm run test:unit -- tests/components/AIConcierge.test.tsx

# Run tests matching pattern
npm run test:unit -- --testNamePattern="should send message"

# Run with verbose output
npm run test:unit -- --verbose

# Update snapshots if UI changed
npm run test:unit -- -u
```

### Playwright Tests Failing

```bash
# Run specific test file
npm run test:e2e -- tests/e2e/homepage.spec.ts

# Run in headed mode (see browser)
npm run test:e2e:headed

# Debug mode (step through test)
npm run test:e2e:debug

# Run specific browser
npm run test:e2e -- --project=chromium

# Generate trace on failure
npm run test:e2e -- --trace on
```

### Common Issues

1. **"Element not found"**
   - Add wait: `await expect(element).toBeVisible()`
   - Check selector: Use Playwright Inspector
   - Verify element exists in DOM

2. **"Timeout exceeded"**
   - Increase timeout: `{ timeout: 30000 }`
   - Check for slow API calls
   - Verify network conditions

3. **"Test is flaky"**
   - Add proper waits instead of fixed delays
   - Ensure test independence
   - Check for race conditions

4. **"Mock not working"**
   - Verify mock is called before component renders
   - Check import paths
   - Clear mocks between tests: `jest.clearAllMocks()`

---

## Test Data & Fixtures

### Location
- `tests/fixtures/` - Reusable test data
- `tests/__mocks__/` - Mock implementations

### Best Practices
- Use realistic data
- Keep fixtures small and focused
- Version control test data
- Don't use production data in tests

### Example Fixture

```typescript
// tests/fixtures/messages.ts
export const mockMessages = [
  {
    role: 'user',
    content: 'I need help finding an apartment',
    timestamp: '2025-10-23T10:00:00Z',
  },
  {
    role: 'assistant',
    content: 'I'd be happy to help you...',
    timestamp: '2025-10-23T10:00:05Z',
  },
];
```

---

## Accessibility Testing

### Tools
- **Playwright**: Built-in accessibility tree
- **jest-axe** (optional): Automated a11y checks
- **Manual testing**: Screen readers, keyboard navigation

### Key Tests
- Keyboard navigation works
- ARIA labels present
- Color contrast meets WCAG 2.1 AA
- Screen reader friendly
- Focus management

### Example A11y Test

```typescript
test('should be keyboard accessible', async ({ page }) => {
  await page.goto('/');

  // Tab to AI button
  await page.keyboard.press('Tab');

  // Should be focused
  const button = page.getByRole('button', { name: /AI Assistant/i });
  await expect(button).toBeFocused();

  // Enter should open
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: /Personal Guide/i })).toBeVisible();
});
```

---

## Performance Testing

### What to Measure
- Page load time
- Time to interactive
- First contentful paint
- API response times

### Tools
- Lighthouse (built into Playwright)
- Next.js built-in metrics
- Web Vitals

### Example Performance Test

```typescript
test('should load homepage quickly', async ({ page }) => {
  const startTime = Date.now();
  await page.goto('/');
  const loadTime = Date.now() - startTime;

  // Should load in under 3 seconds
  expect(loadTime).toBeLessThan(3000);
});
```

---

## Maintenance & Updates

### Weekly
- Review test coverage reports
- Fix flaky tests
- Update snapshots if needed

### Monthly
- Review and update test documentation
- Check for outdated dependencies
- Refactor test code for clarity

### Quarterly
- Evaluate testing strategy
- Update coverage thresholds
- Review CI/CD performance

---

## Resources & References

### Documentation
- [Playwright Docs](https://playwright.dev/)
- [Testing Library Docs](https://testing-library.com/)
- [Jest Docs](https://jestjs.io/)

### Best Practices
- [Testing Library Guiding Principles](https://testing-library.com/docs/guiding-principles/)
- [Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

### Internal Docs
- [AI Assistant Setup](./AI_ASSISTANT_SETUP.md)
- [Weekend MVP Guide](./WEEKEND_MVP_QUICKSTART.md)

---

## Getting Help

- **Questions?** Ask in team chat or create GitHub issue
- **Bug in test?** Open issue with "test" label
- **New test pattern?** Document it and share with team

---

## Appendix: Quick Reference

### Test Commands

```bash
# Unit Tests
npm run test              # Watch mode
npm run test:unit         # Run once
npm run test:coverage     # With coverage

# E2E Tests
npm run test:e2e          # Headless
npm run test:e2e:ui       # UI mode
npm run test:e2e:headed   # See browser
npm run test:e2e:debug    # Debug

# All Tests
npm run test:all          # Run everything
npm run test:ci           # CI mode
```

### Useful Selectors

```typescript
// Playwright
page.getByRole('button', { name: /Submit/i })
page.getByText('Hello World')
page.getByLabel('Email')
page.getByTestId('custom-element')

// Testing Library
screen.getByRole('button', { name: /Submit/i })
screen.getByText('Hello World')
screen.getByLabelText('Email')
screen.getByTestId('custom-element')
```

### Assertions

```typescript
// Playwright
await expect(element).toBeVisible()
await expect(element).toHaveText('Hello')
await expect(page).toHaveURL('/dashboard')

// Jest + Testing Library
expect(element).toBeInTheDocument()
expect(element).toHaveClass('active')
expect(mockFn).toHaveBeenCalledWith('arg')
```

---

**Remember: Good tests give you confidence to ship. Write tests that make you sleep well at night.**
