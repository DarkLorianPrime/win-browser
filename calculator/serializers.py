from rest_framework.serializers import ModelSerializer

from calculator.models import ConstElement, VideoHelp, Chapter, Conspect


class ConstSerializer(ModelSerializer):
    class Meta:
        model = ConstElement
        fields = "__all__"


class ConspectSerializer(ModelSerializer):
    class Meta:
        model = Conspect
        fields = "__all__"


class VideoSerializer(ModelSerializer):
    class Meta:
        model = VideoHelp
        fields = "__all__"


class ChapterSerializer(ModelSerializer):
    class Meta:
        model = Chapter
        fields = "__all__"
