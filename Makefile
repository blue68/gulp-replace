TESTS  = $(shell find test -type f -name test-*)

-TESTS 			:= $(sort $(TESTS))
-BIN-MOCHA 	:= ./node_modules/.bin/mocha

default: test

npm-install:
	@npm --color=true --registry=http://registry.npm.taobao.org/ install

test: npm-install
	@$(-BIN-MOCHA) \
		--colors \
		--reporter spec \
		$(-TESTS)

.PHONY: test