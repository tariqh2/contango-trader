from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from django.db import IntegrityError
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.utils.crypto import get_random_string
from django.http import JsonResponse
from game.forms import BidOfferForm

# Create your views here.

# Function 1: A function to render the index.html file when the app initially launches
def index(request):
    return render(request,'index.html')

# Function 2: A function to render the game.html file without user authentication and including the bid offer form
def game(request):
    form = BidOfferForm()
    return render(request,'game.html',{
        'form':form
    })

# Function 3: A Register function that creates an authenticated user and then renders the game.html file accordingly
def register(request):
    if request.method == "POST":
        # Retrieve name from Post method
        name = request.POST["name"]
        
        # Check if the name field is empty
        if not name:
            return JsonResponse({'message': 'Name field is required.'}, status=400)

        # Generate a secure random password
        password = get_random_string(50)

        # Attempt to create new user
        try:
            user = User.objects.create(username=name)
            user.set_password(password)
            user.save()
            # commented out as player model not created yet
            # player, created = Player.objects.get_or_create(user=user) 
            # print(f'Player created: {created}')
            # print(f'Player: {player}')
        except IntegrityError:
            return JsonResponse({'message': 'Name is already taken.'}, status=400)

        # Authenticate and login the user automatically
        user = authenticate(request, username=name, password=password)
        if user is not None:
            login(request, user)

            # Start a new game session for the user (if required), currently commented out as player model not created yet
            # start_game_session(player)

            return JsonResponse({'redirect': reverse('game')})
    else:
        return render(request, "index.html")

# Function 4: A function that handles the POST request from the BidOfferForm
def update_bid_offer(request):
    if request.method == 'POST':
        form = BidOfferForm(request.POST)
        if form.is_valid():
            bid = form.cleaned_data['bid']
            offer = form.cleaned_data['offer']
            # here we would save this data to a database
            # for now we just send the data back as a JSON
            return JsonResponse({
                'bid': bid,
                'offer': offer,
            })
        else:
            # Handle the case when the form is not valid
            return JsonResponse({'error': 'Invalid Form'}, status=400)