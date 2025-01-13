from rest_framework import serializers
from .models import Monster   
from PIL import Image
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
class MonsterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Monster
        fields = ['id', 'name', 'species', 'description', 'image']
    
'''def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        from .models import Monster  # Delayed import here
        self.Meta.model = Monster '''