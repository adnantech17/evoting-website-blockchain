from django.db import models
from users.models import User

class Election(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    public_key = models.CharField(max_length=1024)
    contract_address = models.CharField(max_length=1024)
    keygen_contract_address = models.CharField(max_length=1024)

    def __str__(self):
        return self.title

class Vote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    vote_done = models.BooleanField()
