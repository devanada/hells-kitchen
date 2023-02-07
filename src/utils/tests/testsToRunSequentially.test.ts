import { authTest } from "../../auth/auth.testsuite";
import { usersTest } from "../../users/users.testsuite";

describe("sequentially run tests", () => {
  authTest();
  usersTest();
});
