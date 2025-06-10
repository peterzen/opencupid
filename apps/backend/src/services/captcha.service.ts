import { verifySolution } from 'altcha-lib'

export class CaptchaService {
  constructor(private readonly hcmacKey: string) {}

  async validate(captchaSolution: string): Promise<boolean> {
    return await verifySolution(captchaSolution, this.hcmacKey)
  }
}
