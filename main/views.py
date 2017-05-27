from django.shortcuts import render
from django.http import HttpResponse
import json
import numpy as np
import cv2
# Create your views here.

def index(request):
	data = {}
	data['key'] = 'value'
	json_data = json.dumps(data)
	return HttpResponse(json_data)