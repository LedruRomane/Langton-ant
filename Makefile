EXAMPLES=$(shell ls -d ant*)

.PHONY: all
all:
	for i in $(EXAMPLES); do make -C "$$i"; done

.PHONY: clean-all
clean-all:
	for i in $(EXAMPLES); do make clean -C "$$i"; done

.PHONY: check
check:
	jshint -c jshint-config.json */*.js

.PHONY: serve
serve:
	python3 -m http.server 8080 --bind 0.0.0.0

restart:
	make clean-all
	make
	make serve