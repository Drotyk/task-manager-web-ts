.PHONY: install build dev deploy clean

install:
	npm install

dev:
	npm run dev

build:
	npm run build

deploy:
	npm run deploy

clean:
	rm -rf dist node_modules
