from rest_framework import serializers
from .models import Monster   

class MonsterSerializer(serializers.ModelSerializer):
    #from .models import Monster
    class Meta:
        model = Monster
        fields = ['id', 'name', 'species', 'description']
        
'''def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        from .models import Monster  # Delayed import here
        self.Meta.model = Monster '''