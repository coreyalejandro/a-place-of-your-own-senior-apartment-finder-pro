"""
Senior Housing Coach - Multi-Agent Orchestrator

Coordinates multiple specialized agents to provide comprehensive
senior housing guidance, analysis, and decision support.
"""

from typing import Optional, Dict, Any, List


class HousingCoachOrchestrator:
    """
    Orchestrates multiple AI agents for senior housing assistance.

    Agents:
    1. Housing Research Agent - Searches and gathers property data
    2. Accessibility Analyst - Evaluates accessibility needs and options
    3. Budget Advisor - Analyzes finances and affordability
    4. Location Analyst - Assesses proximity and convenience
    5. Healthcare Proximity Agent - Analyzes medical facility access
    6. Decision Guide Writer - Creates family-shareable reports
    """

    def __init__(self, api_key: Optional[str] = None):
        """Initialize the orchestrator with API credentials"""
        self.api_key = api_key
        self.conversation_history: List[Dict[str, str]] = []
        self.user_preferences: Dict[str, Any] = {}
        self.search_results: List[Dict[str, Any]] = []

    def detect_intent(self, message: str, history: List[Dict[str, str]]) -> str:
        """
        Detect user's intent from their message.

        Returns:
            - 'search': Looking for properties
            - 'budget': Budget planning/analysis
            - 'accessibility': Accessibility needs
            - 'location': Location/proximity concerns
            - 'compare': Comparing multiple options
            - 'report': Wants decision guide/report
            - 'prep': Real estate agent preparation
            - 'general': General conversation
        """
        message_lower = message.lower()

        # Budget intent
        if any(word in message_lower for word in ['budget', 'afford', 'cost', 'price', 'income', 'expense']):
            return 'budget'

        # Accessibility intent
        if any(word in message_lower for word in ['wheelchair', 'walker', 'elevator', 'accessible', 'mobility', 'disability']):
            return 'accessibility'

        # Location intent
        if any(word in message_lower for word in ['near', 'close to', 'proximity', 'distance', 'family', 'hospital', 'pharmacy']):
            return 'location'

        # Search intent
        if any(word in message_lower for word in ['find', 'search', 'show me', 'looking for', 'apartment', 'housing']):
            return 'search'

        # Compare intent
        if any(word in message_lower for word in ['compare', 'difference', 'better', 'versus', 'vs', 'which one']):
            return 'compare'

        # Report intent
        if any(word in message_lower for word in ['report', 'document', 'share', 'family', 'kids', 'children', 'show my']):
            return 'report'

        # Prep intent
        if any(word in message_lower for word in ['realtor', 'agent', 'questions', 'prepare', 'ready to']):
            return 'prep'

        return 'general'

    async def handle_budget_analysis(self, message: str, history: List[Dict[str, str]]) -> Dict[str, Any]:
        """
        Budget Advisor Agent: Analyzes financial situation and provides guidance.
        """

        # Extract budget information from conversation
        # Note: context available via self._build_context(history) if needed

        response = {
            "type": "budget_analysis",
            "message": "",
            "data": {}
        }

        # Check if we have enough info
        has_income = any('income' in msg['content'].lower() for msg in history)

        if not has_income:
            response["message"] = """Great question about budgeting! Let's work through this together.

First, I need to understand your financial situation. What's your approximate monthly income? This could include:
- Social Security benefits
- Pension or retirement funds
- Investment income
- Any other regular income

Don't worry about being exact - a rough estimate works fine."""

            response["data"] = {
                "stage": "gathering_income",
                "needs": ["monthly_income"]
            }

        else:
            # Provide budget guidance
            response["message"] = """Let me help you plan a realistic housing budget.

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

Would you like me to run through a detailed budget analysis with you?"""

            response["data"] = {
                "stage": "ready_for_analysis",
                "next_steps": ["detailed_analysis", "compare_options"]
            }

        return response

    async def handle_accessibility_analysis(self, message: str, history: List[Dict[str, str]]) -> Dict[str, Any]:
        """
        Accessibility Analyst Agent: Evaluates accessibility needs and recommendations.
        """

        response = {
            "type": "accessibility_analysis",
            "message": "",
            "data": {}
        }

        response["message"] = """Let's talk about accessibility needs - this is really important!

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

Don't worry - there's no judgment here! The more you share, the better I can help you find a place that truly works for you."""

        response["data"] = {
            "assessment_areas": [
                "mobility_devices",
                "building_access",
                "unit_features",
                "bathroom_modifications",
                "medical_equipment"
            ],
            "critical_questions": [
                "Door width (minimum 32 inches for wheelchairs)",
                "Elevator access to all common areas",
                "Emergency call systems",
                "Accessible parking distance"
            ]
        }

        return response

    async def handle_property_search(self, message: str, history: List[Dict[str, str]]) -> Dict[str, Any]:
        """
        Housing Research Agent: Searches for properties and explains options.
        """

        response = {
            "type": "property_search",
            "message": "",
            "data": {}
        }

        # Check if we have location
        has_location = any(
            word in ' '.join([msg['content'].lower() for msg in history])
            for word in ['cleveland', 'akron', 'columbus', 'city', 'area']
        )

        if not has_location:
            response["message"] = """I'd love to help you search! Let's find you some great options.

First, where are you looking? Tell me:
📍 **Location**: What city or area? (e.g., Cleveland, Akron)
👨‍👩‍👧 **Family**: Do you want to be near family? Where are they?
🏙️ **Setting**: Do you prefer city, suburbs, or quiet area?

Once I know where to look, I'll find properties and explain each one in plain language - no confusing real estate terms!"""

        else:
            response["message"] = """Perfect! I'll search for senior housing in your area.

For each place I find, I'll tell you:
- What it costs and what's included
- Who it's best suited for
- The good points and things to watch for
- How to contact them

I'll also make sure to consider everything we've talked about - your budget, accessibility needs, and proximity preferences.

Ready for me to search? Just say yes and I'll get started!"""

        response["data"] = {
            "search_ready": has_location,
            "filters_needed": [] if has_location else ["location", "housing_type"]
        }

        return response

    async def handle_comparison_analysis(self, message: str, history: List[Dict[str, str]]) -> Dict[str, Any]:
        """
        Comparison Agent: Provides detailed comparison of options.
        """

        response = {
            "type": "comparison_analysis",
            "message": """I can help you compare options side-by-side!

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

Which properties would you like me to compare? You can give me names, addresses, or just describe them.""",
            "data": {
                "comparison_criteria": [
                    "monthly_cost",
                    "included_services",
                    "accessibility",
                    "location_convenience",
                    "care_level",
                    "community_features"
                ]
            }
        }

        return response

    async def handle_report_generation(self, message: str, history: List[Dict[str, str]]) -> Dict[str, Any]:
        """
        Decision Guide Writer: Creates comprehensive reports for family.
        """

        response = {
            "type": "report_generation",
            "message": """I can create a clear report that you can share with your family!

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

This way your family can understand your thinking and help you decide. Sound good?""",
            "data": {
                "report_sections": [
                    "needs_assessment",
                    "budget_analysis",
                    "property_options",
                    "recommendations",
                    "action_plan"
                ],
                "ready_to_generate": len(history) > 5  # Need some conversation first
            }
        }

        return response

    async def handle_general_conversation(self, message: str, history: List[Dict[str, str]]) -> Dict[str, Any]:
        """
        General Conversational Agent: Handles greetings and general questions.
        """

        message_lower = message.lower()

        # Greetings
        if any(greeting in message_lower for greeting in ['hello', 'hi', 'hey', 'good morning']):
            return {
                "type": "greeting",
                "message": """Hello! It's wonderful to hear from you.

I'm here to help you find the right senior housing. We can work together on:

💰 Planning your budget
🏠 Searching for places
♿ Understanding accessibility options
📍 Finding locations near family
📊 Comparing your options
📄 Creating reports for family

What would you like to explore today?""",
                "data": {}
            }

        # Thanks
        if any(thanks in message_lower for thanks in ['thank', 'thanks', 'appreciate']):
            return {
                "type": "acknowledgment",
                "message": "You're very welcome! I'm here to help whenever you need. Is there anything else you'd like to talk about?",
                "data": {}
            }

        # General help
        return {
            "type": "general",
            "message": """I want to make sure I understand how I can best help you.

Could you tell me a bit more about what's on your mind? For example:
- Are you just starting to look at options?
- Do you have specific questions about costs?
- Need help understanding what type of housing fits your needs?
- Want to compare places you've already found?

Whatever you're thinking about, I'm here to help you work through it!""",
            "data": {}
        }

    def _build_context(self, history: List[Dict[str, str]]) -> str:
        """Build context string from conversation history"""
        return "\n".join([
            f"{msg['role']}: {msg['content']}"
            for msg in history[-5:]  # Last 5 messages
        ])

    async def process_message(self, message: str, history: List[Dict[str, str]]) -> Dict[str, Any]:
        """
        Main entry point: Process user message and route to appropriate agent.
        """

        # Detect intent
        intent = self.detect_intent(message, history)

        # Route to appropriate agent
        if intent == 'budget':
            return await self.handle_budget_analysis(message, history)
        elif intent == 'accessibility':
            return await self.handle_accessibility_analysis(message, history)
        elif intent == 'search':
            return await self.handle_property_search(message, history)
        elif intent == 'compare':
            return await self.handle_comparison_analysis(message, history)
        elif intent == 'report':
            return await self.handle_report_generation(message, history)
        else:
            return await self.handle_general_conversation(message, history)


# Singleton instance
_orchestrator_instance = None


def get_orchestrator() -> HousingCoachOrchestrator:
    """Get or create the orchestrator singleton"""
    global _orchestrator_instance
    if _orchestrator_instance is None:
        _orchestrator_instance = HousingCoachOrchestrator()
    return _orchestrator_instance
