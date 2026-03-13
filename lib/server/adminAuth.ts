const adminCookieName = "portfolio_admin_session";

function toBase64Url(value: string) {
  return Buffer.from(value, "utf8")
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function fromBase64Url(value: string) {
  const normalized = value.replaceAll("-", "+").replaceAll("_", "/");
  const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  return Buffer.from(`${normalized}${padding}`, "base64").toString("utf8");
}

export function getAdminCookieName() {
  return adminCookieName;
}

function getAdminSecretMaterial() {
  const username = process.env.ADMIN_USERNAME ?? "";
  const password = process.env.ADMIN_PASSWORD ?? "";
  return `${username}:${password}`;
}

export function areAdminCredentialsConfigured() {
  return Boolean(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD);
}

export function isValidAdminLogin(username: string, password: string) {
  return (
    username === (process.env.ADMIN_USERNAME ?? "") &&
    password === (process.env.ADMIN_PASSWORD ?? "")
  );
}

export function createAdminSessionValue() {
  return toBase64Url(getAdminSecretMaterial());
}

export function isValidAdminSession(sessionValue: string | undefined) {
  if (!sessionValue || !areAdminCredentialsConfigured()) {
    return false;
  }

  try {
    return fromBase64Url(sessionValue) === getAdminSecretMaterial();
  } catch {
    return false;
  }
}
