from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'), # This is the configuration for the index.html file
    path('game/', views.game, name='game'), # This is the configuration for the game.html file
    path('register', views.register, name='register'), # This is the configuration for the registration function
    path('update-bid-offer/', views.update_bid_offer, name='update_bid_offer'), # This is the configuration for the bid offer function
]
