cd  ~/vegetation-management/catkin_ws/launch/

roscore &
python launch.py -hold &
python app.py &
python app2.py &
python app_graph.py &
./runAngularApplication.sh


