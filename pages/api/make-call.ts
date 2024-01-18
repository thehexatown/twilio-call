import { NextApiRequest, NextApiResponse } from 'next';
import VoiceResponse from 'twilio/lib/twiml/VoiceResponse';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { phoneNumber } = req.body;

    try {
      const client = require("twilio")(accountSid, authToken);

      client.calls.create({
        url: "http://demo.twilio.com/docs/voice.xml",
        to: phoneNumber,
        from: twilioPhoneNumber,
      })
        .then((call: any) => {
          res.status(200).json({ success: true, message: "Call initiated successfully" });
        })
        .catch((error: string) => {
          res.status(500).json({ success: false, message: "Failed to initiate call", });
        });

    } catch (error) {
      console.error('Twilio error:', error);
      res.status(500).json({ error: 'Failed to initiate call' });
    }
  } else {
    res.status(405).end();
  }
}
