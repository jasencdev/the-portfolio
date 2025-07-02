---
title: "Recipe Recommendation Engine: Deploying K-means Clustering in Production"
date: 2025-03-16
---

# Recipe Recommendation Engine: Deploying K-means Clustering in Production

## Overview
This project is a recipe recommendation system that leverages machine learning to suggest recipes based on recipe complexity and preparation time. Using K-means clustering for similarity matching, the application provides a practical demonstration of deploying ML models in production with modern MLOps practices.

## Live Link
[Recipe Recommender](https://recipe-recommender.jasenc.dev/)

## Architecture

### Data Architecture
- **Data Pipeline**: Extract-Transform-Load (ETL) system for recipe datasets with preprocessing filters to remove recipes over 60 minutes or with more than 20 ingredients.
- **Feature Engineering**: Calculation of complexity scores (steps * ingredients) for ML processing.
- **Model Storage**: Serialized model artifacts (`recipe_recommender.joblib` and `scaler.joblib`) with versioning.

### Application Architecture
- **ML Service**: Python backend with scikit-learn for clustering
- **Frontend**: Streamlit interface for user interactions

## Technologies Used
- **Backend**: 
  - Python 3.9 for core functionality
  - pandas for data manipulation
  - scikit-learn for K-means implementation
- **Frontend**: 
  - Streamlit for interactive UI
  - Bootstrap components for styling
- **DevOps**: 
  - Docker for containerization
  - GitHub Actions for CI/CD pipelines
  - Railway for cloud hosting

## Features
- **Ingredient-Based Search**: 
  - Match available ingredients to possible recipes
  - Rank recipes by ingredient coverage
  - Handle substitutions and alternative ingredients
- **Recommendation Engine**: 
  - Complexity-based filtering
  - Preparation time-based recommendations
  - Top-rated recipes filtered based on rating and interactions
- **User Experience**: 
  - Intuitive ingredient selection interface
  - Recipe cards with images and instructions
  - Dietary restriction filtering
- **System Features**: 
  - Performance monitoring
  - A/B testing infrastructure for model improvements

## Development Process

### Motivation and Evolution
This project began as an exploration of practical applications for clustering algorithms:
- Initial prototype used classification-based methods like k-NN before evolving to K-means clustering for better scalability.
- Added production-ready features like caching and monitoring.

### Architecture Decisions
- **K-means over Neural Models**: Chose K-means for interpretability and deployment simplicity
- **Streamlit over React**: Selected Streamlit for rapid ML application development
- **Railway Deployment**: Utilized for simplified containerized deployment

### Workflow
1. Data collection and cleaning from public recipe datasets
2. Feature engineering to convert text ingredients to numerical vectors, filtering only recipes with a complexity score ≤100 and ratings ≥4.
3. K-means model training and optimal k determination using elbow and silhouette analysis.
4. Streamlit frontend development with responsive design
5. Containerization and deployment pipeline setup

### Key Advantages
- Lightweight model that can run in resource-constrained environments
- Easily explainable recommendations based on recipe complexity and preparation time
- Simple deployment and scaling through containerization
- Interactive UI that requires no ML knowledge from end-users

## Implementation Details

### Vectorization Approach
The system transforms recipe details into numerical vectors, including:

- Recipe complexity score.
- Normalized preparation time.

### Clustering Implementation
K-means clustering is implemented to find similar recipes:

```python
from sklearn.cluster import KMeans

def train_kmeans(vectors, n_clusters=20):
    kmeans = KMeans(n_clusters=n_clusters, random_state=42)
    kmeans.fit(vectors)
    return kmeans

def get_recommendations(user_ingredients, kmeans_model, recipe_vectors, recipes):
    # Vectorize user ingredients
    user_vector = vectorize_ingredients(user_ingredients, all_ingredients)
    
    # Find closest cluster
    cluster = kmeans_model.predict([user_vector])[0]
    
    # Get recipes from same cluster
    cluster_recipes = []
    for i, label in enumerate(kmeans_model.labels_):
        if label == cluster:
            similarity = cosine_similarity([user_vector], [recipe_vectors[i]])[0][0]
            cluster_recipes.append((recipes[i], similarity))
    
    # Sort by similarity
    return sorted(cluster_recipes, key=lambda x: x[1], reverse=True)
```

## Deployment

The system is containerized with Docker and deployed to Railway:

```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8501

CMD ["streamlit", "run", "app.py"]
```

Railway deployment is configured with environment variables for API keys and resource allocation.

## Lessons Learned

Throughout this project, I gained valuable insights:
- **Data Quality Challenges**: None. Whatsoever. This was a great dataset and I am thankful. 
- **Clustering Efficiency**: Clustering improved efficiency over traditional search-based methods.
- **User Experience Design**: ML applications require intuitive interfaces to be useful.

## Future Improvements

Planned enhancements include:
- Expanding dataset beyond Food.com recipes.
- Adding additional filtering options (e.g., cuisine type, dietary restrictions).
- Exploring collaborative filtering to complement content-based recommendations.
