from django import forms

class BidOfferForm(forms.Form):
    bid = forms.IntegerField(required=False, widget=forms.NumberInput(attrs={'placeholder': 'Enter your bid'}))
    offer = forms.IntegerField(required=False, widget=forms.NumberInput(attrs={'placeholder': 'Enter your offer'}))
