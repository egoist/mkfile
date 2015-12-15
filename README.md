# node-make

Makefile and JavaScript...

## Example

```javascript
log:
  log('hi')
  log('feel weird?')
  for (let i of [1, 2, 3]) {
    console.log(i)
  }

publish:
  npm run build
  npm test
  npm publish

// external task file:
clean: ./tasks/clean.mk.js
```

## License

MIT.
