from django.db import models

# Create your models here.
class Monster(models.Model):
    id = models.AutoField(primary_key=True)              # An ID that autoincrements 
    name = models.CharField(max_length=100, unique=True) # Monster name
    species = models.CharField(max_length=100)           # Species (e.g., Flying Wyvern, Elder Dragon)
    description = models.TextField(blank=True)           # A short description of the monster


    # Rewards
    #carve_rewards = models.JSONField(null=True, blank=True)       # Materials dropped after hunting (e.g., {"Fang": 10, "Hide": 5})

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True) # When the monster was added
    updated_at = models.DateTimeField(auto_now=True)     # When the monster was last updated
