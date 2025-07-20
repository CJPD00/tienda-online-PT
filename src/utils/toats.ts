import { toast } from "react-toastify";

export const notifySuccess = (msg: string) => toast.success(msg);
export const notifyError = (msg: string) => toast.error(msg);
