import { base_endpoint } from "./endpoints"

export const requestEmailOtp = async (body) =>{

    let url = `${base_endpoint}/auth/send-otp`

    const settings = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    const res = await fetch(url, settings)
    const data = await res.json()

    return data
}