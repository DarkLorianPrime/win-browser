from functools import reduce

from django.db.models import Q
from django.utils.text import slugify
from rest_framework.exceptions import ValidationError
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet, ModelViewSet

from calculator.models import ConstElement, VideoHelp, Chapter

from calculator.serializers import ConstSerializer, VideoSerializer, ChapterSerializer


class Elements(ModelViewSet):
    queryset = ConstElement.objects.all()
    serializer_class = ConstSerializer
    pagination_class = PageNumberPagination

    def get_elements(self, request, *args, **kwargs):
        return reduce(lambda k, v: v(k), (
            self.get_queryset(), self.paginate_queryset, lambda x: self.get_serializer(x, many=True).data,
            self.get_paginated_response))

    def create(self, request, *args, **kwargs):
        data = request.data
        if ConstElement.objects.filter(Q(element_name=data.get("element_name")) | Q(name=data.get("name"))):
            raise ValidationError({"error": "Постоянная физическая с таким названием или элементом уже существует."})
        data['author_slug'] = slugify(data['author'])
        serialize = self.get_serializer(data=request.data)
        serialize.is_valid(raise_exception=True)
        serialize.save()
        return Response({"response": serialize.data})


class VideoViewSet(ModelViewSet):
    queryset = VideoHelp.objects.all()
    serializer_class = VideoSerializer


class ChapterViewSet(ModelViewSet):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
