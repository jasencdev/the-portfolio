---
title: "Recipe Discovery Platform: Building an ML-Powered Recipe Discovery Platform with Flask and React"
date: 2025-09-22
---

# Recipe Discovery Platform: Building an ML-Powered Recipe Discovery Platform with Flask and React

## Overview

This project is a second iteration of the previous machine learning-powered recipe recommendation system that helps users discover recipes based on their preferences and cooking constraints. Using K-Means clustering and similarity scoring, the platform provides personalized recommendations while maintaining a modern, responsive user interface built with React and Flask. This provides a much enhanced user experience compared to the original Streamlit dashboard.

## Live Link
[Recipe Discovery Platform](https://recipes.jasenc.dev/)

## Architecture

### ML-Driven Architecture
- **Recommendation Engine**: K-Means clustering with similarity scoring for personalized recipe discovery
- **Data Pipeline**: Async web scraping with ingredient enrichment and feature engineering
- **Model Persistence**: Joblib serialization with automatic model loading and caching

### Application Architecture
- **Backend Service**: Flask with blueprint-based modular architecture and SQLAlchemy ORM
- **Frontend**: React 19 with TypeScript, React Router, and Tailwind CSS v4
- **Database Layer**: Dual SQLite/PostgreSQL support with automatic migration

## Technologies Used
- **Backend**:
  - Flask 3.1+ with factory pattern and blueprint organization
  - SQLAlchemy for ORM with Flask-Login for authentication
  - Scikit-learn for ML models and feature scaling
  - Async web scraping with aiohttp and BeautifulSoup
- **Frontend**:
  - React 19 with hooks and concurrent features
  - TypeScript for type safety across the application
  - Tailwind CSS v4 with Headless UI components
  - Vite for fast development and optimized builds
- **ML Pipeline**:
  - K-Means clustering for recipe similarity
  - Feature engineering with complexity scoring
  - StandardScaler for feature normalization
- **DevOps**:
  - Multi-stage Docker builds with frontend compilation
  - Railway deployment with PostgreSQL integration
  - Automated testing with Pytest and Vitest

## Features
- **Smart Recommendations**:
  - ML-powered recipe clustering based on cooking time, complexity, and ingredients
  - Text-based search with relevance scoring
  - Parameter-based filtering with real-time results
- **User Management**:
  - Secure authentication with Flask-Login sessions
  - Password reset via Resend email service
  - Rate limiting for abuse prevention
- **Recipe Collections**:
  - Save and organize favorite recipes
  - Personal notes and recently viewed tracking
  - Export capabilities for recipe data
- **Admin Dashboard**:
  - System health monitoring and email configuration
  - Rate limit inspection and maintenance tools
  - Data cleanup and analytics endpoints

## Development Process

### Motivation and Evolution
This project addressed the challenge of recipe discovery in an overwhelming digital cookbook landscape:
- Started with Food.com dataset analysis and feature exploration
- Evolved from simple clustering to comprehensive recommendation system
- Integrated real-time ingredient scraping for enhanced recipe data
- Built responsive frontend to make ML insights accessible

### Architecture Decisions
- **K-Means over Collaborative Filtering**: Chose clustering for better cold-start performance and interpretability
- **Flask Blueprints over Monolithic Routes**: Modular organization enabling team development and testing
- **React SPA over Server-Side Rendering**: Client-side routing for better user experience and API separation
- **Async Scraping over Batch Processing**: Real-time ingredient enrichment with respectful rate limiting

### Workflow
1. Dataset analysis and exploratory data analysis with visualization
2. Feature engineering pipeline with complexity scoring and rating aggregation
3. ML model optimization using elbow method and silhouette analysis
4. Async ingredient scraping system with SQLite persistence
5. Flask API development with comprehensive error handling
6. React frontend with TypeScript and component-based architecture
7. Integration testing across ML pipeline and API endpoints

### Key Advantages
- Sub-100ms recommendation response times through clustering optimization
- 90%+ test coverage ensuring reliability across ML and web components
- Type-safe frontend-to-backend communication with comprehensive API documentation
- Production-ready deployment with automatic SSL and database persistence

## Implementation Details

### ML Recommendation Pipeline
The recommendation system uses a sophisticated clustering approach:

```python
class RecipeRecommender:
    def __init__(self, recipes_df, n_clusters=6):
        self.scaler = StandardScaler()
        self.kmeans = KMeans(n_clusters=n_clusters, random_state=42)
        self.feature_names = ["minutes", "complexity_score", "ingredient_count"]
        self._prepare_data()

    def recommend_recipes(self, desired_time, desired_complexity, desired_ingredients):
        # Create user preference vector
        user_input = pd.DataFrame([[desired_time, desired_complexity, desired_ingredients]],
                                columns=self.feature_names)
        user_input_scaled = self.scaler.transform(user_input)

        # Find nearest cluster
        cluster = self.kmeans.predict(user_input_scaled)[0]
        cluster_recipes = self.data[self.data["cluster"] == cluster].copy()

        # Calculate similarity distance
        cluster_recipes["similarity_distance"] = cluster_recipes.apply(
            lambda x: np.sqrt((x["minutes"] - desired_time) ** 2 +
                            (x["complexity_score"] - desired_complexity) ** 2 +
                            (x["ingredient_count"] - desired_ingredients) ** 2), axis=1
        )

        return cluster_recipes.nsmallest(20, "similarity_distance")
```

### Async Ingredient Enrichment
Real-time ingredient scraping enhances recipe data quality:

```python
class AsyncIngredientScraper:
    async def scrape_dataset(self, recipes_df, batch_size=50, delay_between_batches=1.0):
        async with aiohttp.ClientSession() as session:
            for batch_start in range(0, len(recipes_df), batch_size):
                batch = recipes_df.iloc[batch_start:batch_start + batch_size]

                tasks = [
                    self.scrape_recipe_ingredients(recipe_id, recipe_name)
                    for recipe_id, recipe_name in batch[['food_recipe_id', 'name']].values
                ]

                await asyncio.gather(*tasks, return_exceptions=True)
                await asyncio.sleep(delay_between_batches)
```

### React Component Architecture
Frontend components follow modern React patterns with hooks:

```typescript
export default function SaveButton({ recipeId, onSaveChange }: SaveButtonProps) {
    const [isSaved, setIsSaved] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkSaveStatus = async () => {
            try {
                setIsLoading(true);
                const saved = await isRecipeSaved(recipeId);
                setIsSaved(saved);
            } catch (error) {
                console.error('Failed to check save status:', error);
            } finally {
                setIsLoading(false);
            }
        };
        checkSaveStatus();
    }, [recipeId]);

    const handleToggle = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            setIsToggling(true);
            const newSavedState = await toggleSaveRecipe(recipeId);
            setIsSaved(newSavedState);
            onSaveChange?.(newSavedState);
        } catch (error) {
            console.error('Failed to toggle save state:', error);
        } finally {
            setIsToggling(false);
        }
    };
}
```

## Deployment

The application uses a multi-stage Docker build for optimal production deployment:

```dockerfile
# Frontend build stage
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY food-recipe-recommender/app/frontend/package*.json ./
RUN npm ci
COPY food-recipe-recommender/app/frontend/ ./
RUN npm run build

# Runtime stage
FROM python:3.11-slim AS runtime
WORKDIR /app

# Install Python dependencies
COPY pyproject.toml uv.lock ./
RUN pip install uv && uv sync

# Copy built frontend into Flask templates/static
COPY --from=frontend-build /app/frontend/dist/index.html /app/food-recipe-recommender/app/templates/
COPY --from=frontend-build /app/frontend/dist/assets /app/food-recipe-recommender/app/static/assets

# Start with Waitress WSGI server
CMD ["uv", "run", "waitress-serve", "--listen=0.0.0.0:8080", "--call", "app:create_app"]
```

Railway deployment provides managed PostgreSQL and automatic SSL with environment-based configuration.

## Lessons Learned

Throughout this project, I gained valuable insights:
- **ML Model Interpretability**: K-Means clustering provided better user understanding compared to black-box approaches
- **Async Python Complexity**: Managing concurrent web scraping required careful rate limiting and error handling
- **React State Management**: Local state with context proved sufficient for this application scale
- **API Design Balance**: Finding the sweet spot between RESTful principles and frontend data requirements
- **Testing ML Systems**: Integration testing with real data uncovered edge cases missed by unit tests

## Future Improvements

Planned enhancements include:
- **Enhanced ML Features**: Collaborative filtering integration and ingredient substitution suggestions
- **Social Features**: Recipe sharing, user reviews, and community collections
- **Mobile App**: React Native version with offline recipe storage
- **Advanced Search**: Semantic search using embeddings and dietary restriction filtering
- **Recipe Generation**: AI-powered recipe creation based on available ingredients
- **Nutrition Integration**: Calorie counting and nutritional analysis with meal planning

## Performance Metrics

The system demonstrates strong performance characteristics:
- **Recommendation Latency**: <100ms average response time for 20 recommendations
- **Search Performance**: <200ms for text-based queries across 200K+ recipes
- **Frontend Bundle**: <500KB gzipped with code splitting
- **Test Coverage**: >90% backend, >85% frontend
- **Database Queries**: Optimized with proper indexing for sub-50ms response times
- **Memory Usage**: <150MB including loaded ML model in production
