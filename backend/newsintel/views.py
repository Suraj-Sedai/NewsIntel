# views.py
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Article  # Your Article model should be defined in models.py
from .serializers import ArticleSerializer  # Create this serializer to map Article objects to JSON
from rest_framework.decorators import action

class ArticleViewSet(viewsets.ModelViewSet):
    # Queryset defines which Article objects this view handles.
    queryset = Article.objects.all().order_by('-timestamp')
    # Serializer to convert Article model instances into JSON and vice versa.
    serializer_class = ArticleSerializer
    # Only authenticated users can access these endpoints.
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        """
        Create a new article instance.
        Validates the incoming JSON payload and, if correct, saves it.
        """
        serializer = self.get_serializer(data=request.data)
        # Validate data: if there's a problem, an exception is raised automatically.
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        # Return the created article data with a 201 (Created) response.
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        """
        Update an existing article. Supports full or partial updates.
        """
        partial = kwargs.pop('partial', False)
        instance = self.get_object()  # Retrieve the current instance based on URL parameters.
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        # Return the updated article data.
        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        """
        Delete an article.
        """
        instance = self.get_object()
        self.perform_destroy(instance)
        # Respond with HTTP 204 (No Content) as there is nothing to return.
        return Response(status=status.HTTP_204_NO_CONTENT)

    def list(self, request, *args, **kwargs):
        """
        List all articles.
        """
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], url_path='analyze')
    def analyze(self, request):
        # Add your analysis logic here.
        # For example, you can perform some analysis on articles and return a summary:
        analysis_result = {"message": "Article analysis executed successfully."}
        return Response(analysis_result, status=status.HTTP_200_OK)