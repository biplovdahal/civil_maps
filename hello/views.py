'''
    File name: views.py
    Author: Biplov Dahal
    Date created: 05/08/2018
    Date last modified: 05/08/2018
    Python Version: 3
'''

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
        r = requests.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query='+location+'+point+of+interest&key=AIzaSyAXXy92G1yHeMbNAkva737XCVGcXbIE4aE')
        dictionary = {}
        results = r.json()['results']
        #for items in results
        output_arr = []
        for items in range(len(results)):
            dictionary = {}
            dictionary['id'] = items
            if results[items].get('photos'):
                photo_reference = results[items]['photos'][0]['photo_reference']
                #key = 'AIzaSyDVmmJxaTel3f6q-dk5BY7VTpy_RSVLpug'
                dictionary['a_href'] = results[items]['photos'][0]['html_attributions'][0].replace('<a href=\"','')
                key='AIzaSyAXXy92G1yHeMbNAkva737XCVGcXbIE4aE'
                dictionary['height'] = results[items]['photos'][0]['height']
                dictionary['place_id'] = results[items]['place_id']
                dictionary['image_url'] = ('https://maps.googleapis.com/maps/api/place/photo?maxwidth=250&photoreference='+photo_reference+'&sensor=false&key='+key)
                dictionary['iframe_url'] = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAmmWZcWiCzouqxF-GMgI4RjJmnOjD2AJM&q="+results[items]['formatted_address'].replace(',',' ').replace(' ','+')
            else:
                dictionary['image_url'] = None
            dictionary['address'] = results[items]['formatted_address']

            output_arr.append(dictionary)
        #print("This is data", output_arr)
        return Response(output_arr)
