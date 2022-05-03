# ttn-rest-api
ttn rest api with Mongo

What Does the System Do

    -Allows users(admins) to register sensors and gateways from the front end client.
    -Associates telemetry to a particular sensor using the sensorId that will be received as part of the query paramters
    -Returns telemetry data for a particular sensor to the client
    -Allows admins to view both the sensors they have created and other sensors in the system
    -Allows users to delete their own sensors and also allows admins to delete any sensor
    -No user registration functionality-users will be registered by an admin who has logged in to the system
    -Use JWT for authentication and authorization


Routes
 

    -Telemetry
        - POST telemetry/:sensorId    -insert a telemtry record to the db
        -GET telemetry/:sensorId  -get telemetry records of a particular sensor
    -Sensor
        - POST /sensors/new    -create a new sensor
        -GET  /sensors   -get a list of all the sensors
        -GET PUT DELETE PATCH /sensors/sensor/:sensorId   -Get details of an individual sensor
        -
    -User
        -POST admin/createUser  -create a new user(set them to admin or not)
        -GET admin/allusers      -get all users in the system
        -DELETE admin/:userId     -delete a user,admin cannot delete another admin
