import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE } from "./configStorage";

type UserProps = {
  username: string;
};

export async function storageGetUser(): Promise<string> {
  const username = await AsyncStorage.getItem(USER_STORAGE);
  if (!username) return "";
  return username;
}

export async function storageSaveUser({ username }: UserProps) {
  await AsyncStorage.setItem(USER_STORAGE, username);
}
