# MCP Senior Housing Coach

Multi-agent system for intelligent senior housing assistance inspired by the lastmile-ai/mcp-agent realtor framework.

## Architecture

This implementation provides a **conversational coach** that helps seniors find housing through:

### Multi-Agent System

1. **Housing Research Agent** - Searches properties using Google Maps API
2. **Accessibility Analyst** - Evaluates mobility and accessibility needs
3. **Budget Advisor** - Provides financial planning and affordability analysis
4. **Location Analyst** - Assesses proximity to family, healthcare, shopping
5. **Comparison Agent** - Provides side-by-side property comparisons
6. **Decision Guide Writer** - Creates family-shareable reports

### Dual Search Approach

The system supports BOTH search methods:
- ✅ **Traditional Filters**: Checkboxes and dropdowns (FilterSidebar)
- ✅ **Conversational AI**: Natural language chat with voice support

## Files

```
mcp/
├── senior_housing_server.py       # MCP server with Google Maps integration
├── housing_coach_orchestrator.py  # Multi-agent coordinator
└── README.md                       # This file

app/api/coach/
└── route.ts                        # API endpoint (TypeScript fallback + Python orchestrator)

components/chat/
└── SeniorHousingCoach.tsx          # React component with welcome UI
```

## Features

### Interactive Preference Elicitation

Instead of forms, the assistant **asks questions conversationally**:

```python
@mcp.tool()
async def search_senior_housing(ctx) -> dict:
    # Automatically elicits preferences through conversation
    response = await ctx.elicit(HousingSearchPreferences)
```

**User Experience:**
- Mom types: "Help me find a place"
- Coach responds: "Where are you looking? What's your budget?"
- Preferences gathered naturally through conversation

### Budget Coaching

```python
@mcp.tool()
async def plan_budget(ctx) -> dict:
    # Helps plan affordable housing budget
    # Analyzes income, expenses, savings
    # Provides 30% rule guidance
```

### Accessibility Analysis

```python
@mcp.tool()
async def analyze_accessibility(ctx) -> dict:
    # Evaluates wheelchair, walker, elevator needs
    # Provides critical questions to ask properties
```

### Location Fit Analysis

```python
@mcp.tool()
async def analyze_location_fit(ctx) -> dict:
    # Analyzes proximity to family, healthcare, shopping
    # Provides transportation recommendations
```

## Setup (Python MCP - Optional)

The app works without Python setup using the TypeScript fallback. To enable full MCP capabilities:

### 1. Install Dependencies

```bash
cd mcp
pip install fastmcp aiohttp pydantic
```

### 2. Configure Environment

```bash
# .env.local
GOOGLE_MAPS_API_KEY_SERVER=your_google_maps_api_key
```

### 3. Run MCP Server

```bash
python senior_housing_server.py
```

### 4. Enable in API

```typescript
// app/api/coach/route.ts
const USE_PYTHON_ORCHESTRATOR = true;  // Set to true
```

## Current Implementation

**Status:** ✅ **Working with TypeScript fallback**

The coach currently uses the TypeScript orchestrator which provides:
- Intent detection (budget, accessibility, search, compare, report)
- Conversational responses
- Context-aware guidance
- Multi-stage conversations

**When you add Python MCP**, you get additional capabilities:
- Interactive preference elicitation (structured schemas)
- Direct Google Maps API integration
- Advanced budget calculations
- Accessibility scoring
- Location proximity analysis

## Usage

### For Users (Your Mom)

1. Click the housing coach button (waving hand emoji)
2. See welcome screen with 6 capabilities
3. Click a capability OR just start typing
4. Have natural conversation
5. Use voice button for hands-free

### Conversation Flows

**Budget Planning:**
```
User: "Help me figure out what I can afford"
Coach: "What's your monthly income?"
User: "$2500 from Social Security"
Coach: "Based on 30% rule, you could afford $750-1000/month..."
```

**Accessibility:**
```
User: "I use a walker"
Coach: "Do you need grab bars? Ground floor? Elevator?"
User: "Ground floor would be best"
Coach: "I'll make sure to find ground floor units. Any other needs?"
```

**Search:**
```
User: "Find assisted living in Cleveland"
Coach: "What's your budget range?"
User: "Around $1500/month"
Coach: "Searching Cleveland assisted living under $1500..."
```

## Integration with Existing Search

The coach **complements** the traditional search:
- Mom can check boxes in FilterSidebar
- OR chat with coach
- OR use voice search
- All methods work together

## Future Enhancements

When ready to add Python MCP:

1. **Report Generation**: Create PDF reports for family
2. **Deep Property Analysis**: Multi-source data gathering (reviews, inspections, etc.)
3. **Healthcare Proximity**: Calculate distances to hospitals/pharmacies
4. **Investment Analysis**: Aging-in-place cost projections
5. **Moving Coordination**: Connect with moving services

## Related Files

- `components/search/FilterSidebar.tsx` - Traditional checkbox filters
- `components/search/AssistantPanel.tsx` - Quick search assistant
- `components/chat/SeniorHousingCoach.tsx` - Full conversational coach
- `app/search/page.tsx` - Apartment search with dual approach
- `app/realtors/page.tsx` - Realtor search with dual approach

## References

Based on: https://github.com/lastmile-ai/mcp-agent/tree/main/examples/usecases/mcp_realtor_agent
