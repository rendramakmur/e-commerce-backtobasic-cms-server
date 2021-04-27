const app = require('../app');
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Back to Basic app listening on port: ${port}`);
})
