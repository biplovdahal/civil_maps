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
from time import sleep


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
                query_parameter = results[items]['name']
                dictionary['iframe_url'] = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAmmWZcWiCzouqxF-GMgI4RjJmnOjD2AJM&q="+query_parameter
            else:# if image not found using google places api; try street view image
                lat = results[items]['geometry']['location']['lat']
                lng = results[items]['geometry']['location']['lng']
                image_url = 'https://maps.googleapis.com/maps/api/streetview?size=400x400&location='+str(lat)+','+str(lng)+'+&fov=90&heading=235&pitch=10&key=AIzaSyAmmWZcWiCzouqxF-GMgI4RjJmnOjD2AJM'
                dictionary['image_url'] = image_url

            dictionary['address'] = results[items]['formatted_address']
            if results[items].get('opening_hours'):
                if results[items]['opening_hours'].get('open_now'):
                    dictionary['open_now'] = results[items]['opening_hours'].get('open_now')
            else:
                dictionary['open_now'] = ''

            if results[items].get('rating'):
                dictionary['rating'] = results[items].get('rating')
            else:
                dictionary['rating'] = '--'

            if results[items].get('types'):
                dictionary['types'] = ','.join(results[items].get('types'))
            else:
                dictionary['types'] = '--'

            if results[items].get('name'):
                dictionary['name'] = results[items].get('name')
            else:
                dictionary['name'] = '--'

            #dictionary[]

            output_arr.append(dictionary)
        last_index = output_arr[-1]['id']
        print('intial last_index', last_index)
        if r.json().get('next_page_token'):
            headers = {

                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',

            }
            page_token = str(r.json().get('next_page_token'))
            #print("this is type", type(page_token))
            params = (
                ('pagetoken', str(page_token)),
                ('key', 'AIzaSyAmmWZcWiCzouqxF-GMgI4RjJmnOjD2AJM')
            )
            url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
            sleep(2)
            followUpRequest = requests.get(str(url),headers=headers,params=params).json()
            print (followUpRequest)


            for items in range(len(followUpRequest['results'])):
                dictionary = {}
                last_index += 1
                if last_index == 26:
                    return Response(output_arr)
                else:
                    dictionary['id'] = last_index
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
                        lat = results[items]['geometry']['location']['lat']
                        lng = results[items]['geometry']['location']['lng']
                        image_url = 'https://maps.googleapis.com/maps/api/streetview?size=400x400&location='+str(lat)+','+str(lng)+'+&fov=90&heading=235&pitch=10&key=AIzaSyAmmWZcWiCzouqxF-GMgI4RjJmnOjD2AJM'
                        dictionary['image_url'] = image_url
                    dictionary['address'] = results[items]['formatted_address']
                    if results[items].get('opening_hours'):
                        if results[items]['opening_hours'].get('open_now'):
                            dictionary['open_now'] = results[items]['opening_hours'].get('open_now')
                    else:
                        dictionary['open_now'] = ''

                    if results[items].get('rating'):
                        dictionary['rating'] = results[items].get('rating')
                    else:
                        dictionary['rating'] = '--'

                    if results[items].get('types'):
                        dictionary['types'] = ','.join(results[items].get('types'))
                    else:
                        dictionary['types'] = '--'

                    if results[items].get('name'):
                        dictionary['name'] = results[items].get('name')
                    else:
                        dictionary['name'] = '--'
                    output_arr.append(dictionary)

        return Response(output_arr)
