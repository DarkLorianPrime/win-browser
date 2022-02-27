from django.urls import path

from calculator import views

urlpatterns = [
    path("addelement/", views.Elements.as_view({"post": "create"})),
    path("getelement/", views.Elements.as_view({"get": "get_elements"})),
    path("addchapter/", views.ChapterViewSet.as_view({"post": "create"})),
    path("chapter/", views.ChapterViewSet.as_view({"get": "list"})),
    path("addvideo/", views.VideoViewSet.as_view({"post": "create"})),
    path("getvideos/", views.VideoViewSet.as_view({"get": "list"})),
    path("addconspect/", views.ConspectViewSet.as_view({"post": "create"})),
    path("getconspects/", views.ConspectViewSet.as_view({"get": "list"}))
]