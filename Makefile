install:
	npm ci

gendiff:
	node bin/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint .

link:
	npm link

test:
	npm test

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage

