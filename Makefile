TESTS  = $(shell find test -type f -name test-*)

-TESTS 			:= $(sort $(TESTS))
-BIN-MOCHA 	:= ./node_modules/.bin/mocha

default: test

npm-install:
	@npm --color=true --registry=https://registry.npmmirror.com/ install

test: npm-install
	@$(-BIN-MOCHA) \
		--colors \
		--reporter spec \
		$(-TESTS)

.PHONY: test