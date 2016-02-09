Welcome to arlosrvc - **A Service to Automate Mode Change for Arlo Security Cameras**
===================

[New] Use a deployed solution
-------------
Endpoints : 
> - Arm : https://gintoo.com/api/arm
> - Disarm : https://gintoo.com/api/disarm

Refer to [this](#how-to-issue-requests-against-the-service) section for learning how to issue requests. (Replace localhost with the above endpoints)

How to Run
-------------
> - You can run this as a standalone node server or in a docker on your local machine. 
> - To run this as a standalone node server, 
	>  - Install npm  on your machine
	>  - Run the command  ````npm install ```` followed by ````node server.js ````
> - To run this in a docker
	>  - First install docker on your machine
	>  - Then run ````./scripts/dockerBuild.sh```` followed by ````./scripts/dockerLocal.sh````
> - In either case, the server console should be greeted with the familiar message:
````Magic happens on port 8080````
	

How to Issue Requests against the service
---------------------------------------------------

#### <i class="icon-upload"></i> Arm the Arlo System

 - Run the curl command after replacing ARLO_USERNAME and ARLO_PASSWORD with yours. 
````curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d 'username=ARLO_USERNAME&password=ARLO_PASSWORD&mode=mode1' "http://localhost:8080/api/arm"````
 -  The above request assumes that the mode to arm the system is **mode1**. Refer to [Finding the mode](#finding-the-mode) section to verify if this is correct.
 -  You should get an output :
	 ````Arming the Arlo system
	200 OK````

#### <i class="icon-upload"></i> Disarm the Arlo System

 - Run the curl command after replacing ARLO_USERNAME and ARLO_PASSWORD with yours.   
````curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d 'username=ARLO_USERNAME&password=ARLO_PASSWORD&mode=mode0' "http://localhost:8080/api/disarm"````
 -  The above request assumes that the mode to arm the system is **mode0**. Refer to [Finding the mode](#finding-the-mode) section to verify if this is correct.
 -  You should get an output :
	 ````Disarming the Arlo system
	200 OK````

Finding the mode
---------------------------------------------------
 - Log onto https://arlo.netgear.com
 - Go to modes and select your base station
 - The next screen shows your available modes:
	 - The first mode is mode0
	 - The second mode is mode1 and so on.  


Report Issues
-------------------
- This code is free to use and you are welcome to contribute to this project. 
- Please report any issues here:  https://github.com/punitag/arlosrvc/issues


