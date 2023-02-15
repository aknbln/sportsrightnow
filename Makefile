# get git config
config:
	git config -l

# get git log
SportsRightNow.log.txt:
	git log > SportsRightNow.log.txt
	
clean:
	rm -f *.tmp
# docker for front end: runs website on local 3000 port
frontend-docker:
	docker run --rm -dp 3000:3000 front-end
# Docker for running the backend as a developer on local machine
backend-dev-docker:
	docker run --rm -it -p 5000:5000 SportsRightNow-backend-dev
#build backend
build-backend :
	docker build -t SportsRightNow-backend-dev -f dev.Dockerfile .
#build frontend
build-frontend :
	docker build -t front-end front-end/

#run unit tests
python-tests:
	echo "Running python unit tests..."
	python3 back-end/tests.py

# get git status
status:
	make clean
	@echo
	git branch
	git remote -v
	git status

# download files from the IDB code repo
pull:
	make clean
	@echo
	git pull
	git status

all: