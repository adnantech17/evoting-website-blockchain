from rest_framework import serializers
from .models import Election

class KeyDataSerializer(serializers.Serializer):
    key = serializers.CharField()  # Adjust field type if needed

class ElectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Election
        fields = '__all__'
