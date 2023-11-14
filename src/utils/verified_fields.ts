import {
  ProfilePassword,
  Users,
  KeysToValidateProfilePassword,
  KeysToValidateUserCreate,
} from "../interfaces/users.interfaces";

export const verifiedFields = (body: Users | ProfilePassword, type: string) => {
  let data = {};
  let valiField = false;
  let valiFieldContent = false;
  let noFieldExist: String[] = [];
  let errorField: String[] = [];
  switch (type) {
    case "createNewUser": {
      const keysInBody = Object.keys(body).map((value) => {
        return value.toString();
      });
      const keysInEnum = Object.keys(KeysToValidateUserCreate).map((value) => {
        return value.toString();
      });

      if (keysInBody.length === 0)
        return {
          status: 400,
          msg: "Error body request empty",
          error: "Body is " + JSON.stringify(body),
          validate: false,
        };
      // se valida que el objeto contenga las claves requeridas
      keysInEnum.forEach((kv, index) => {
        if (!keysInBody.includes(kv)) {
          valiField = true;
          noFieldExist.push(kv);
        }
      });

      Object.values(body).forEach((element) => {
        if (element === null || element === '' || element === undefined) {
          valiFieldContent = true;

        }
      })

      if (valiField || valiFieldContent) {

        if (valiField && (noFieldExist.length !== 0) && !valiFieldContent) {
          return {
            status: 400,
            msg: "Error missing fields on body request",
            error: "Missing " + noFieldExist,
            validate: false,
          };
        }

        if (valiField && valiFieldContent) {
          return {
            status: 400,
            msg: "Error missing fields on body request and fields on body request are void ",
            error: "Missing " + noFieldExist,
            validate: false,
          };
        }
        return {
          status: 400,
          msg: "Error fields on body request are void, undefined or null",
          error: "Error fields on body request",
          validate: false,
        };
      }
      return { validate: true }
    }
    case "updateProfilePassword": {
      const keysInBody = Object.keys(body).map((value) => {
        return value.toString();
      });
      const keysInEnum = Object.keys(KeysToValidateProfilePassword).map((value) => {
        return value.toString();
      });

      if (keysInBody.length === 0)
        return {
          status: 400,
          msg: "Error body request empty",
          error: "Body is " + JSON.stringify(body),
          validate: false,
        };
      // se valida que el objeto contenga las claves requeridas
      keysInEnum.forEach((kv, index) => {
        if (!keysInBody.includes(kv)) {
          valiField = true;
          noFieldExist.push(kv);
        }
      });

      Object.values(body).forEach((element) => {
        if (element === null || element === '' || element === undefined) {
          valiFieldContent = true;

        }
      })

      if (valiField || valiFieldContent) {

        if (valiField && (noFieldExist.length !== 0) && !valiFieldContent) {
          return {
            status: 400,
            msg: "Error missing fields on body request",
            error: "Missing " + noFieldExist,
            validate: false,
          };
        }

        if (valiField && valiFieldContent) {
          return {
            status: 400,
            msg: "Error missing fields on body request and fields on body request are void ",
            error: "Missing " + noFieldExist,
            validate: false,
          };
        }
        return {
          status: 400,
          msg: "Error fields on body request are void, undefined or null",
          error: "Error fields on body request",
          validate: false,
        };
      }
      return { validate: true }
    }
  }
};
