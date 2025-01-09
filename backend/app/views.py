
'''
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import MonsterSerializer
from rest_framework import status
from .models import Monster
'''
from django.http import Http404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Monster
from .serializers import MonsterSerializer



class MonsterAPI(APIView):

    def get_monster_object(self, pk):
        try:
            return Monster.objects.get(id=id)
        except Monster.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        if pk:  # Retrieve monster by ID
            try:
                monster = Monster.objects.get(id=pk)
                serializer = MonsterSerializer(monster)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Monster.DoesNotExist:
                return Response({"error": "Monster not found."}, status=status.HTTP_404_NOT_FOUND)
        else:  # Retrieve monsters by name if `name` query param is provided
            monster_name = request.GET.get('name', '')
            if monster_name:
                monster_objects = Monster.objects.filter(name__icontains=monster_name)
                if monster_objects.exists():
                    serializer = MonsterSerializer(monster_objects, many=True)
                    return Response(serializer.data, status=status.HTTP_200_OK)
            return Response({"error": "Monster not found."}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        serializer = MonsterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    def set_monster_data(self, request, pk, format=None):
            if request.method == 'POST':
                serializer = MonsterSerializer(data=request.data)
                if(serializer.is_valid()):
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



