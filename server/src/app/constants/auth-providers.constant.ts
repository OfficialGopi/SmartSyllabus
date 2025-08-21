enum AUTH_PROVIDERS {
  GOOGLE = "google",
  GITHUB = "github",
}

const AUTH_PROVIDERS_ENUM = Object.values(AUTH_PROVIDERS);

type TYPE_AUTH_PROVIDERS = (typeof AUTH_PROVIDERS_ENUM)[number];

export type { TYPE_AUTH_PROVIDERS };

export { AUTH_PROVIDERS, AUTH_PROVIDERS_ENUM };
