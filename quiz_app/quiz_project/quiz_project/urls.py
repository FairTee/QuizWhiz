from django.contrib import admin
from django.urls import path
from quiz_app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('quiz/<int:quiz_id>/', views.quiz_detail, name='quiz_detail'),
    path('result/<int:result_id>/', views.quiz_result, name='quiz_result'),
]
