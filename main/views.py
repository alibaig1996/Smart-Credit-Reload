from django.shortcuts import render
from django.http import HttpResponse
import json
import numpy as np
import cv2
from skimage.filters import threshold_adaptive
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
# Create your views here.

def index(request):
	# body_unicode = request.body.decode('utf-8')
	# body = json.loads(body_unicode)
	
	p = request.FILES['photo']
	path = default_storage.save('tmp/im.jpg', ContentFile(p.read()))
	
	im = cv2.imread('tmp/im.jpg')
	gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
	# print gray.shape
	gray = cv2.GaussianBlur(gray,(5,5),0)
	imThresh2 = threshold_adaptive(gray, 251, offset = 10)
	imThresh2 = cv2.bitwise_not(imThresh2.astype("uint8") * 255)
	edged2 = cv2.Canny(imThresh2, 75, 200)
	cv2.imshow("threshed2", imThresh2)
	cv2.imshow('edged2', edged2)
	cv2.waitKey(0)

	(cnts, _) = cv2.findContours(imThresh2.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

	rects = [cv2.boundingRect(cnt) for cnt in cnts]

	heightThresh = int(max([x[3] for x in rects]) * 0.8)

	rects = sorted(rects, key=lambda x: x[0])
	print heightThresh
	i = 0
	for x, y, w, h in rects:
		if (h > heightThresh):
			cv2.rectangle(im, (x, y), (x + w, y + h),(0,255,0),3)

		# leng = int(rect[3] * 1.6)
		# pt1 = int(rect[1] + rect[3] // 2 - leng // 2)
		# pt2 = int(rect[0] + rect[2] // 2 - leng // 2)
		 	roi = imThresh2[y:y+h, x:x+w]

		# #roi = cv2.resize(roi, (28,28), interpolation = cv2.INTER_AREA)
		# #roi = cv2.dilate(roi, (3,3))
		
			# print x,y,w,h
			# cv2.imwrite("roi" + str(i) + ".png", roi)
			# break
			i = i  + 1
	cv2.imshow("countours", im)
	cv2.waitKey(0)
	cv2.destroyAllWindows()

	data = {}
	data['key'] = 'value'
	json_data = json.dumps(data)
	return HttpResponse(json_data)