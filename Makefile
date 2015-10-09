TESTS  = $(shell find tests -type f -name test-*)

-TESTS 			:= $(sort $(TESTS))
-BIN-MOCHA 	:= ./node_modules/.bin/mocha


test:
	@$(-BIN-MOCHA) \
		--colors \
		--reporter spec \
		--require should \
		$(-TESTS)

.PHONY: test