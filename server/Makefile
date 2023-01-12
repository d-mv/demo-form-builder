.PHONY: build
build:
	docker rm -f demo-form-builder-server >> error.log
	docker rmi -f demo-form-builder-server >> error.log
	docker build -t demo-form-builder-server .

.PHONY: build-no-cache
build-no-cache:
	docker build --no-cache -t demo-form-builder-server .

.PHONY: run
run:
	docker run -v ~/code:/root/code -p 8000:8000 --name demo-form-builder-server -it demo-form-builder-server

.PHONY: re-run
re-run:
	docker rm -f demo-form-builder-server >> error.log
	make run

.PHONY: start
start:
	docker start demo-form-builder-server
	docker attach demo-form-builder-server

.PHONY: rebuild-n-start
rebuild-n-start:
	make build
	make run