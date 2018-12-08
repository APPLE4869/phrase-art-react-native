import { AxiosError } from "axios";
import { Alert } from "react-native";

export default class ApplicationError {
  private readonly error: Error | AxiosError;

  constructor(error: Error | AxiosError) {
    this.error = error;
  }

  alertMessage() {
    Alert.alert(this.message());
  }

  message() {
    if ("response" in this.error && this.error.response) {
      const { response } = this.error;
      if (response.status === 400) {
        return response.data.message;
      }
    }

    return "予期しないエラーが発生しました。時間をあけて再度実行してみてください。";
  }
}
