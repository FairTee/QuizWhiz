from django.contrib import admin
from django.contrib import admin
from .models import Quiz, Question, UserQuizResult

admin.site.register(Quiz)
admin.site.register(Question)
admin.site.register(UserQuizResult)
