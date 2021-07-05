import { RtcRole, RtcTokenBuilder } from 'agora-access-token';

const appId = process.env.AGORA_APP_ID!;
const appCertificate = process.env.AGORA_APP_CERTIFICATE!;

export class AgoraVideo {
  static generateAccessToken(
    channelName: string,
    uid: number,
    role: string,
    expireTime: string,
  ) {
    const userId = uid || 0;
    const userRole = role === 'publisher'
      ? RtcRole.PUBLISHER
      : RtcRole.SUBSCRIBER;
    const expirationTime = expireTime ? parseInt(expireTime, 10) : 3600;
    const privilegeExpireTime = Math.floor(Date.now() / 1000) + expirationTime;

    const token = RtcTokenBuilder.buildTokenWithUid(
      appId,
      appCertificate,
      channelName,
      userId,
      userRole,
      privilegeExpireTime,
    );

    return token;
  }
}
