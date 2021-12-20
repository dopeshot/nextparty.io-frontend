import axios from "axios";
import { config } from "../global.config";

export const request = axios.create({
    baseURL: config.baseApiUrl
})