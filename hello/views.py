from .models import Greeting
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
import requests
from rest_framework.exceptions import APIException
import json


# Create your views here.
class placesAPI(APIView):
    def get(self, request, *args, **kw):
        location = request.GET.get('location','')
        r = requests.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query='+location+'&sensor=false&key=AIzaSyDVmmJxaTel3f6q-dk5BY7VTpy_RSVLpug')
        return Response(r.json())
