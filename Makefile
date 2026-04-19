.PHONY: install build start dev clean help

help:
	@echo "Доступні команди:"
	@echo "  make install  - Встановити залежності"
	@echo "  make dev      - Запустити сервер у режимі розробки (nodemon)"
	@echo "  make build    - Скомпілювати TypeScript у JavaScript"
	@echo "  make start    - Запустити скомпільований проект"
	@echo "  make clean    - Видалити dist та node_modules"

install:
	npm install

build:
	npm run build

start: build
	npm start

dev:
	npm run dev

clean:
	rm -rf dist node_modules
