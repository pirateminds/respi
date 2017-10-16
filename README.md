<h1 align="center">respi</h1>

<h5 align="center">Express.js api creation automation tool</h5>

```js
import app from 'respi';
import actions from './actions';
import myMiddleware from 'anMiddleware';

// express middle wares before all
// you can handle private public actions globally
app.use(myMiddleware);

// all arguments are optional
app.init({
    port: 9000,
    https: true,
    corsDomains: ['localhost:9000', 'somedomain.com']
    actions
});

export default app;
```

---
Copyright (c) 2017 pirateminds.com. [Licensed with The MIT License (MIT)](/LICENSE)
