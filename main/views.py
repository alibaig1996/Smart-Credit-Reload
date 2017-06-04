from django.shortcuts import render
from django.http import HttpResponse
import json
import numpy as np
import cv2
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
# Create your views here.

def index(request):
	# body_unicode = request.body.decode('utf-8')
	# body = json.loads(body_unicode)
	print (request.FILES['photo'])
	p = request.FILES['photo']
	path = default_storage.save('tmp/im.jpg', ContentFile(p.read()))
	print path
	data = {}
	data['key'] = 'value'
	json_data = json.dumps(data)
	return HttpResponse(json_data)