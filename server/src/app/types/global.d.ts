declare global {
  namespace Express {
    interface Request {
      user: {
        _id: Types.ObjectId;
        name: string;
        email: string;
        avatar: string;
        provider: TYPE_AUTH_PROVIDERS;
        credits: number;
        refreshToken: string;
        createdAt: Date;
        updatedAt: Date;
      };
    }
  }
}
export {};
