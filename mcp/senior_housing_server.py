"""
Senior Housing MCP Server

This MCP server provides tools for senior housing search and analysis.
It uses Google Maps Places API and provides interactive preference elicitation.
"""

import os
import asyncio
import aiohttp
from typing import Optional
from fastmcp import FastMCP
from pydantic import BaseModel, Field

# Initialize MCP server
mcp = FastMCP("Senior Housing Search")

# API Configuration
GOOGLE_MAPS_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY_SERVER")
GOOGLE_PLACES_API_URL = "https://places.googleapis.com/v1/places:searchText"


# Preference Models
class HousingSearchPreferences(BaseModel):
    """Preferences for searching senior housing"""
    location: str = Field(description="City and state (e.g., 'Cleveland, OH')")
    budget_min: int = Field(description="Minimum monthly budget", ge=0, default=500)
    budget_max: int = Field(description="Maximum monthly budget", ge=0, default=5000)
    housing_type: list[str] = Field(
        description="Types of housing (assisted_living, independent_living, memory_care, senior_apartments)",
        default=["assisted_living", "independent_living"]
    )
    radius_miles: int = Field(description="Search radius in miles", default=10, ge=1, le=50)


class AccessibilityPreferences(BaseModel):
    """Accessibility and health-related preferences"""
    wheelchair_accessible: bool = Field(description="Requires wheelchair accessibility", default=False)
    elevator_required: bool = Field(description="Requires elevator access", default=False)
    ground_floor_preferred: bool = Field(description="Prefers ground floor", default=False)
    grab_bars_needed: bool = Field(description="Needs grab bars in bathroom", default=False)
    medical_equipment: list[str] = Field(
        description="Medical equipment needs (walker, wheelchair, oxygen, etc.)",
        default=[]
    )


class BudgetAnalysisPreferences(BaseModel):
    """Preferences for budget planning"""
    monthly_income: float = Field(description="Total monthly income", ge=0)
    current_expenses: float = Field(description="Current monthly expenses", ge=0, default=0)
    savings: float = Field(description="Available savings", ge=0, default=0)
    healthcare_costs: float = Field(description="Monthly healthcare costs", ge=0, default=0)
    include_utilities: bool = Field(description="Include utilities in budget", default=True)
    include_meals: bool = Field(description="Include meals in budget", default=True)


class LocationPreferences(BaseModel):
    """Location and proximity preferences"""
    proximity_to_family: str = Field(
        description="Distance to family members (same_city, within_30min, within_1hour, flexible)",
        default="flexible"
    )
    near_hospital: bool = Field(description="Must be near hospital", default=False)
    near_pharmacy: bool = Field(description="Must be near pharmacy", default=True)
    near_shopping: bool = Field(description="Prefer near shopping", default=False)
    public_transport: bool = Field(description="Needs public transportation access", default=False)


# API Helper Functions
async def make_google_maps_request(query: str, location_bias: dict, radius_meters: int) -> dict:
    """Make request to Google Maps Places API"""

    if not GOOGLE_MAPS_API_KEY:
        return {
            "status": "API_KEY_MISSING",
            "error": "Google Maps API key not configured",
            "results": []
        }

    headers = {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.priceLevel,places.types'
    }

    body = {
        "textQuery": query,
        "locationBias": {
            "circle": {
                "center": location_bias,
                "radius": radius_meters
            }
        }
    }

    try:
        async with aiohttp.ClientSession() as session:
            async with session.post(GOOGLE_PLACES_API_URL, headers=headers, json=body) as response:
                if response.status == 200:
                    data = await response.json()
                    return {
                        "status": "success",
                        "results": data.get("places", [])
                    }
                else:
                    error_text = await response.text()
                    return {
                        "status": "API_ERROR",
                        "error": f"HTTP {response.status}: {error_text}",
                        "results": []
                    }
    except Exception as e:
        return {
            "status": "REQUEST_FAILED",
            "error": str(e),
            "results": []
        }


async def geocode_location(location: str) -> Optional[dict]:
    """Geocode a location string to lat/lng"""

    if not GOOGLE_MAPS_API_KEY:
        return None

    geocode_url = f"https://maps.googleapis.com/maps/api/geocode/json?address={location}&key={GOOGLE_MAPS_API_KEY}"

    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(geocode_url) as response:
                if response.status == 200:
                    data = await response.json()
                    if data.get("results"):
                        location_data = data["results"][0]["geometry"]["location"]
                        return {
                            "latitude": location_data["lat"],
                            "longitude": location_data["lng"]
                        }
    except Exception as e:
        print(f"Geocoding error: {e}")

    return None


# MCP Tools
@mcp.tool()
async def search_senior_housing(ctx) -> dict:
    """
    Search for senior housing options based on user preferences.
    Elicits location, budget, and housing type preferences.
    """

    # Elicit preferences from user
    response = await ctx.elicit(HousingSearchPreferences)

    match response:
        case ctx.AcceptedElicitation():
            prefs = response.value

            # Geocode the location
            coords = await geocode_location(prefs.location)

            if not coords:
                return {
                    "status": "error",
                    "message": f"Could not find location: {prefs.location}",
                    "preferences": prefs.model_dump(),
                    "results": []
                }

            # Build search query
            housing_types_map = {
                "assisted_living": "assisted living",
                "independent_living": "independent living",
                "memory_care": "memory care",
                "senior_apartments": "senior apartments"
            }

            housing_queries = [housing_types_map.get(ht, ht) for ht in prefs.housing_type]
            query = f"{' or '.join(housing_queries)} in {prefs.location}"

            # Search using Google Maps
            radius_meters = prefs.radius_miles * 1609.34  # Convert miles to meters

            results = await make_google_maps_request(
                query=query,
                location_bias=coords,
                radius_meters=int(radius_meters)
            )

            return {
                "status": results["status"],
                "query": query,
                "location": prefs.location,
                "coordinates": coords,
                "preferences": prefs.model_dump(),
                "results": results.get("results", []),
                "count": len(results.get("results", []))
            }

        case ctx.DeclinedElicitation():
            return {
                "status": "declined",
                "message": "User declined to provide search preferences"
            }

        case ctx.CancelledElicitation():
            return {
                "status": "cancelled",
                "message": "Search cancelled by user"
            }


@mcp.tool()
async def analyze_accessibility(ctx) -> dict:
    """
    Analyze accessibility needs and provide recommendations.
    Elicits detailed accessibility preferences.
    """

    response = await ctx.elicit(AccessibilityPreferences)

    match response:
        case ctx.AcceptedElicitation():
            prefs = response.value

            # Generate accessibility score and recommendations
            requirements = []
            if prefs.wheelchair_accessible:
                requirements.append("Wheelchair accessible entrances and common areas")
            if prefs.elevator_required:
                requirements.append("Building must have elevator")
            if prefs.ground_floor_preferred:
                requirements.append("Ground floor unit preferred")
            if prefs.grab_bars_needed:
                requirements.append("Grab bars in bathroom required")

            recommendations = {
                "critical_features": requirements,
                "questions_to_ask": [
                    "Are doorways at least 32 inches wide?",
                    "Is there a roll-in shower available?",
                    "What is the path from parking to unit?",
                    "Are common areas wheelchair accessible?",
                ],
                "medical_equipment": prefs.medical_equipment,
                "accessibility_score": "high_needs" if len(requirements) > 2 else "moderate_needs"
            }

            return {
                "status": "success",
                "preferences": prefs.model_dump(),
                "recommendations": recommendations
            }

        case ctx.DeclinedElicitation():
            return {"status": "declined"}

        case ctx.CancelledElicitation():
            return {"status": "cancelled"}


@mcp.tool()
async def plan_budget(ctx) -> dict:
    """
    Help plan housing budget based on income and expenses.
    Provides detailed budget analysis and affordability guidance.
    """

    response = await ctx.elicit(BudgetAnalysisPreferences)

    match response:
        case ctx.AcceptedElicitation():
            prefs = response.value

            # Calculate affordable housing budget
            available_income = prefs.monthly_income - prefs.current_expenses - prefs.healthcare_costs
            recommended_housing_budget = prefs.monthly_income * 0.30  # 30% rule
            max_housing_budget = prefs.monthly_income * 0.40  # 40% max

            # Calculate emergency fund needs
            recommended_savings_reserve = recommended_housing_budget * 6  # 6 months

            analysis = {
                "monthly_income": prefs.monthly_income,
                "available_after_expenses": available_income,
                "recommended_housing_budget": round(recommended_housing_budget, 2),
                "maximum_housing_budget": round(max_housing_budget, 2),
                "recommended_savings_reserve": round(recommended_savings_reserve, 2),
                "current_savings": prefs.savings,
                "budget_breakdown": {
                    "base_rent": round(recommended_housing_budget * 0.70, 2),
                    "utilities": round(recommended_housing_budget * 0.15, 2) if prefs.include_utilities else 0,
                    "meals": round(recommended_housing_budget * 0.15, 2) if prefs.include_meals else 0
                },
                "affordability_status": "comfortable" if available_income > recommended_housing_budget else "tight",
                "recommendations": []
            }

            # Add recommendations
            if available_income < recommended_housing_budget:
                analysis["recommendations"].append("Consider shared housing or studios to reduce costs")
                analysis["recommendations"].append("Look into housing assistance programs")

            if prefs.savings < recommended_savings_reserve:
                analysis["recommendations"].append(f"Build emergency fund to ${recommended_savings_reserve:.0f}")

            analysis["recommendations"].append("Compare what's included: meals, utilities, activities")
            analysis["recommendations"].append("Ask about rate increases and fee structures")

            return {
                "status": "success",
                "analysis": analysis,
                "preferences": prefs.model_dump()
            }

        case ctx.DeclinedElicitation():
            return {"status": "declined"}

        case ctx.CancelledElicitation():
            return {"status": "cancelled"}


@mcp.tool()
async def analyze_location_fit(ctx) -> dict:
    """
    Analyze how well a location fits user's proximity and lifestyle needs.
    """

    response = await ctx.elicit(LocationPreferences)

    match response:
        case ctx.AcceptedElicitation():
            prefs = response.value

            priorities = []
            if prefs.proximity_to_family != "flexible":
                priorities.append(f"Family within {prefs.proximity_to_family.replace('_', ' ')}")
            if prefs.near_hospital:
                priorities.append("Hospital within 5 miles")
            if prefs.near_pharmacy:
                priorities.append("Pharmacy within walking distance")
            if prefs.near_shopping:
                priorities.append("Shopping centers nearby")
            if prefs.public_transport:
                priorities.append("Public transportation access")

            questions = [
                "How far is the nearest hospital?",
                "Is there a pharmacy on-site or nearby?",
                "What transportation options are available?",
                "How often do shuttle services run?",
                "Are there grocery stores within easy reach?"
            ]

            return {
                "status": "success",
                "location_priorities": priorities,
                "questions_to_ask": questions,
                "preferences": prefs.model_dump()
            }

        case ctx.DeclinedElicitation():
            return {"status": "declined"}

        case ctx.CancelledElicitation():
            return {"status": "cancelled"}


if __name__ == "__main__":
    # Run the MCP server
    mcp.run()
