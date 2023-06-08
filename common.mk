%.wasm: %.c
	clang "$<" -o "$@" \
	    -Wpedantic \
	    --target=wasm32 \
	    -nostdlib \
	    -Xlinker --no-entry \
	    -Xlinker --export-dynamic \
	    -Xlinker --import-undefined

