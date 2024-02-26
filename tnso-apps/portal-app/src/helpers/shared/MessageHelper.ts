import { Theme, toast, ToastOptions } from "react-toastify";

export class MessageHelper {
  static activeToast = false;
  static activeNotification = false;
  static theme: Theme = "colored";
  static toastObject: ToastOptions<Record<string, unknown>> | undefined = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    theme: this.theme
  };

  static setActiveToast(activeToast: boolean): void {
    this.activeToast = activeToast;
    setTimeout(() => {
      this.activeToast = false;
    }, 3000);
  }

  static successMessage = (message: string): void => {
    if (!this.activeToast) {
      toast.success(message, this.toastObject);
      this.setActiveToast(true);
    }
  };

  static errorMessage = (message: string): void => {
    if (!this.activeToast) {
      toast.error(message, this.toastObject);
      this.setActiveToast(true);
    }
  };

  static infoMessage = (message: string): void => {
    if (!this.activeToast) {
      toast.info(message, this.toastObject);
      this.setActiveToast(true);
    }
  };

  static warningMessage = (message: string): void => {
    if (!this.activeToast) {
      toast.warning(message, this.toastObject);
      this.setActiveToast(true);
    }
  };
}
