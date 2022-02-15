from django.urls import path

from calculator import views

urlpatterns = [
    path("getelement/", views.Elements.as_view({"get": "get_elements"})),
    path("addelement/", views.Elements.as_view({"post": "create"})),
    path("chapter/", views.ChapterViewSet.as_view({"post": "create", "get": "list"})),
]