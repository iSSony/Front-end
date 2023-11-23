// Imports
import { ENUM_USER_ROLES } from "@/enums/user";
import { IMeta } from "@/types";
import { IUser } from "@/types";

export const isObjectFieldValuesEqual = (obj1: any, obj2: any) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Check if both objects have the same number of keys
  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    // Check if the key exists in both objects and their values are equal
    if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
};

export const calcPaginationTotalPage = (
  meta: IMeta,
  userRole?: ENUM_USER_ROLES
): number => {
  const totalCourses = meta?.total;
  const limit = meta?.limit;
  const totalPage = meta?.totalPage;

  if (!userRole || (userRole && userRole === ENUM_USER_ROLES.STUDENT)) {
    return totalPage;
  }

  const pageRequiredForData = totalCourses / limit;
  const result = pageRequiredForData === totalPage ? totalPage + 1 : totalPage;

  return result;
};

export const getUserFullName = (user: IUser | null) => {
  if (user === null) {
    return "";
  }

  const { firstName, middleName, lastName } = user;

  if (middleName && middleName.length > 0) {
    return firstName + " " + middleName + " " + lastName;
  }

  return firstName + " " + lastName;
};

export const handleCopyClick = (inputValue: string) => {
  // Create a temporary input element
  const tempInput = document.createElement("input");
  // Set its value to the current input value
  tempInput.value = inputValue;
  // Append it to the DOM
  document.body.appendChild(tempInput);
  // Select the text inside the input
  tempInput.select();
  // Execute the copy command
  document.execCommand("copy");
  // Remove the temporary input element
  document.body.removeChild(tempInput);
};
