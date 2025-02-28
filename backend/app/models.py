from django.db import models
from django.contrib.auth.models import AbstractBaseUser
# Create your models here.
def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)

class Monster(models.Model):
    id = models.AutoField(primary_key=True)             
    name = models.CharField(max_length=100, unique=True) 
    species = models.CharField(max_length=100)           
    description = models.TextField(blank=True)         
    image = models.ImageField(blank=True, null=True, upload_to=upload_to)

    created_at = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now=True)     



class User(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['email','username', 'password']
    def __str__(self):
        return self.username