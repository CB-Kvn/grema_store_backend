import {
  ProfilePassword,
  Users,
  KeysToValidateProfilePassword,
  KeysToValidateUserCreate,
  KeysToValidateProfileLogin,
} from "../../interfaces/grema.interfaces";
import { Verified_Fields_Algorith } from "./verify_algorith_fields";

export const  Verified_Fields = (body: Users | ProfilePassword, type: string) => {
  let data = {};
  let valiField = false;
  let valiFieldContent = false;
  let noFieldExist: String[] = [];
  let errorField: String[] = [];
  switch (type) {
    case "createNewUser": {
      return Verified_Fields_Algorith(body,KeysToValidateUserCreate)
    }
    case "updateProfilePassword": {
      return Verified_Fields_Algorith(body,KeysToValidateProfilePassword)
    }
    case "loginUser": {
      return Verified_Fields_Algorith(body,KeysToValidateProfileLogin)
    }
  }
};
