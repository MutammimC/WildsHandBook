from django.db import models

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
