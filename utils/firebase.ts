import {
  initializeApp,
  cert,
  ServiceAccount,
  getApps,
  App,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "../olj-app-keys.json" assert { type: "json" };

let app: App;

if (!getApps().length) {
  app = initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
  });
} else {
  app = getApps()[0];
}

const db = getFirestore(app);

export default db;
