import axios from 'axios';

interface CopilotTokenResponse {
  token: string;
}

export async function fetchCopilotToken(tokenUrl: string): Promise<string> {
  const res = await axios.get<CopilotTokenResponse>(tokenUrl);
  return res.data.token;
}
