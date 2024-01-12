from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone

from .managers import UserManager



class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(unique=True, max_length=64)
    name = models.CharField(max_length=64, null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'username'
    
    objects = UserManager()

    def __str__(self):
        return self.username
