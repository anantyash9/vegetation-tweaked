#!/usr/bin/env python
from flask import Flask, render_template, Response
import images
import cv2
import numpy as np
from time import sleep
app = Flask(__name__)


clipping_up=1.0
clipping_low=0.5
depth_scale=0.0010000000474974513
clipping_up_distance = clipping_up / depth_scale
clipping_low_distance = clipping_low / depth_scale

@app.route('/')
def index():
    return render_template('index.html')

def depth_gen():
    while True:
        sleep(0.0416)
        #blur = cv2.GaussianBlur(images.image['depth'],(3,3),0)
        depth_image=images.image['depth']

        depth_clipped = np.where((depth_image > clipping_up_distance)| (depth_image < clipping_low_distance), 0, depth_image)

        img = cv2.applyColorMap(cv2.convertScaleAbs(depth_clipped, alpha=0.20), cv2.COLORMAP_JET)
        if img is not None:
            frame = cv2.imencode('.jpeg', img)[1].tostring() 
            yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/depth_feed')
def depth_feed():
    return Response(depth_gen(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5003, debug=True)