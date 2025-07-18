import express,{  Request, Response }  from 'express';
import {router as r} from "./routers/routes";
import {checkDbConnection} from "./services/db_service";






const app = express();




app.use(express.json());



app.use('/',r);



const PORT = process.env.PORT || 3000;
checkDbConnection();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
