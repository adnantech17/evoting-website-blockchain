from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    agency_name = serializers.SerializerMethodField(read_only = True)

    class Meta:
        model = User
        fields = ['id', 'username', 'name', 'password']

    # def validate(self, attr):
    #     validate_password(attr['password'])
    #     return attr


    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            name=validated_data['name'],
        )
        user.set_password(validated_data['password'])
        user.save()

        return user
