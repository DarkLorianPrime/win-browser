from functools import reduce

from django.db.models import Q
from rest_framework.exceptions import ValidationError
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from calculator.models import ConstElement, VideoHelp, Chapter, Conspect

from calculator.serializers import ConstSerializer, VideoSerializer, ChapterSerializer, ConspectSerializer


class Elements(ModelViewSet):
    queryset = ConstElement.objects.all()
    serializer_class = ConstSerializer
    pagination_class = PageNumberPagination

    def get_elements(self, request, *args, **kwargs):
        return reduce(lambda k, v: v(k),
                      (self.get_queryset(), self.paginate_queryset, lambda x: self.get_serializer(x, many=True).data,
                       self.get_paginated_response))

    def create(self, request, *args, **kwargs):
        data = request.data
        if ConstElement.objects.filter(Q(element_name=data.get("element_name")) | Q(name=data.get("name"))):
            raise ValidationError({"error": "Постоянная физическая с таким названием или элементом уже существует."})
        serialize = self.get_serializer(data=request.data)
        serialize.is_valid(raise_exception=True)
        serialize.save()
        return Response({"response": serialize.data})


class VideoViewSet(ModelViewSet):
    queryset = VideoHelp.objects.all()
    serializer_class = VideoSerializer
    pagination_class = None

    def create(self, request, *args, **kwargs):
        data = request.data
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        Chapter.objects.filter(id=request.data.get('chapters')).first().videos.add(serializer.instance.id)
        return Response({"response": serializer.data})


class ConspectViewSet(ModelViewSet):
    queryset = Conspect.objects.all()
    serializer_class = ConspectSerializer
    pagination_class = None

    def create(self, request, *args, **kwargs):
        data = request.data
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        Chapter.objects.filter(id=request.data.get('chapters')).first().conspects.add(serializer.instance.id)
        return Response({"response": serializer.data})


class ChapterViewSet(ModelViewSet):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    pagination_class = None
