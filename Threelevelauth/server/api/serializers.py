from rest_framework import serializers
from .models import CustomUser

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password')

class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()